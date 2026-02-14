"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  async function signUp() {
    setMsg(null);
    const { error } = await supabase.auth.signUp({ email, password });
    setMsg(error ? error.message : "Signed up. Now sign in.");
  }

  async function signIn() {
    setMsg(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return setMsg(error.message);
    router.push("/dashboard");
    router.refresh();
  }

  async function signOut() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <main className="max-w-md space-y-4">
      <h1 className="text-2xl font-semibold">Auth</h1>

      <div className="rounded-2xl bg-white p-6 ring-1 ring-neutral-200 space-y-3">
        <label className="block text-sm">
          Email
          <input
            className="mt-1 w-full rounded-xl border border-neutral-200 px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </label>

        <label className="block text-sm">
          Password
          <input
            className="mt-1 w-full rounded-xl border border-neutral-200 px-3 py-2"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </label>

        <div className="flex gap-2">
          <button className="rounded-xl bg-neutral-900 px-4 py-2 text-white text-sm" onClick={signIn}>
            Sign In
          </button>
          <button className="rounded-xl border border-neutral-200 px-4 py-2 text-sm" onClick={signUp}>
            Sign Up
          </button>
          <button className="ml-auto text-sm underline" onClick={signOut}>
            Sign Out
          </button>
        </div>

        {msg ? <p className="text-sm text-neutral-700">{msg}</p> : null}
      </div>
    </main>
  );
}

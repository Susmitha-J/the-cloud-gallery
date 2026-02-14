import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData?.user) {
    return (
      <main className="space-y-4">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-neutral-600">
          You need to{" "}
          <Link className="underline" href="/auth">
            sign in
          </Link>
          .
        </p>
      </main>
    );
  }

  // Load existing artist profile (if any)
  const { data: profile } = await supabase
    .from("artist_profiles")
    .select("*")
    .eq("user_id", userData.user.id)
    .maybeSingle();

  return (
    <main className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-neutral-600">
            Create your artist profile and post work.
          </p>
        </div>
        <nav className="text-sm">
          <Link className="underline" href="/">
            Home
          </Link>
        </nav>
      </header>

      <section className="rounded-2xl bg-white p-6 ring-1 ring-neutral-200 space-y-3">
        <h2 className="text-lg font-semibold">Artist Profile</h2>

        <form action="/api/profile/create" method="post" className="space-y-3">
          <label className="block text-sm">
            Handle (unique)
            <input
              name="handle"
              defaultValue={profile?.handle ?? ""}
              className="mt-1 w-full rounded-xl border border-neutral-200 px-3 py-2"
              placeholder="sumanth-art"
              required
            />
          </label>

          <label className="block text-sm">
            Display name
            <input
              name="display_name"
              defaultValue={profile?.display_name ?? ""}
              className="mt-1 w-full rounded-xl border border-neutral-200 px-3 py-2"
              placeholder="Sumanth Kumar"
              required
            />
          </label>

          <label className="block text-sm">
            Statement (shows on exhibit page)
            <textarea
              name="statement"
              defaultValue={profile?.statement ?? ""}
              className="mt-1 w-full rounded-xl border border-neutral-200 px-3 py-2"
              rows={4}
              placeholder="I paint quiet chaos in oil..."
            />
          </label>

          <button className="rounded-xl bg-neutral-900 px-4 py-2 text-white text-sm">
            Save Profile
          </button>

          {profile?.handle ? (
            <p className="text-sm text-neutral-600">
              Your public page:{" "}
              <Link className="underline" href={`/artist/${profile.handle}`}>
                /artist/{profile.handle}
              </Link>
            </p>
          ) : null}
        </form>
      </section>

      <section className="rounded-2xl bg-white p-6 ring-1 ring-neutral-200 space-y-3">
        <h2 className="text-lg font-semibold">Create Post</h2>

        {!profile ? (
          <p className="text-sm text-neutral-600">
            Create your artist profile first.
          </p>
        ) : (
          <form
            action="/api/posts/upsert"
            method="post"
            encType="multipart/form-data"
            className="space-y-3"
          >
            <input type="hidden" name="artist_id" value={profile.id} />
            <input type="hidden" name="artist_handle" value={profile.handle} />

            <label className="block text-sm">
              Type
              <select
                name="type"
                className="mt-1 w-full rounded-xl border border-neutral-200 px-3 py-2"
                defaultValue="artwork"
              >
                <option value="artwork">artwork</option>
                <option value="process">process</option>
              </select>
            </label>

            <label className="block text-sm">
              Title
              <input
                name="title"
                className="mt-1 w-full rounded-xl border border-neutral-200 px-3 py-2"
                required
              />
            </label>

            <label className="block text-sm">
              Description
              <textarea
                name="description"
                className="mt-1 w-full rounded-xl border border-neutral-200 px-3 py-2"
                rows={3}
              />
            </label>

            <label className="block text-sm">
              Medium (optional)
              <input
                name="medium"
                className="mt-1 w-full rounded-xl border border-neutral-200 px-3 py-2"
                placeholder="oil, acrylic, clay..."
              />
            </label>

            <label className="block text-sm">
              Image
              <input name="image" type="file" accept="image/*" required />
            </label>

            <button className="rounded-xl bg-neutral-900 px-4 py-2 text-white text-sm">
              Publish
            </button>
          </form>
        )}
      </section>
    </main>
  );
}

import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = await createSupabaseServerClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData?.user) return NextResponse.redirect(new URL("/auth", req.url));

  const form = await req.formData();
  const handle = String(form.get("handle") || "").trim();
  const display_name = String(form.get("display_name") || "").trim();
  const statement = String(form.get("statement") || "").trim();

  if (!handle || !display_name) {
    return NextResponse.json({ error: "Missing handle/display_name" }, { status: 400 });
  }

  const { error } = await supabase.from("artist_profiles").upsert(
    {
      user_id: userData.user.id,
      handle,
      display_name,
      statement: statement || null,
    },
    { onConflict: "user_id" }
  );

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.redirect(new URL("/dashboard", req.url), 303);

}

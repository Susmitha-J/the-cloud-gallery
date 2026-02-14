import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import GalleryGrid from "@/components/GalleryGrid";

export default async function HomePage() {
  const supabase = await createSupabaseServerClient();

  const { data: posts } = await supabase
    .from("posts")
    .select("id, title, description, created_at, artist_id, post_media(url, sort_order)")
    .eq("visibility", "public")
    .order("created_at", { ascending: false })
    .limit(24);

  return (
    <main className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Art Exhibit</h1>
          <p className="text-sm text-neutral-600">Browse recent work.</p>
        </div>
        <nav className="flex gap-3 text-sm">
          <Link className="underline" href="/auth">Auth</Link>
          <Link className="underline" href="/dashboard">Dashboard</Link>
        </nav>
      </header>

      <GalleryGrid posts={posts ?? []} />
    </main>
  );
}

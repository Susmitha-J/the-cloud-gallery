import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import ArtistHero from "@/components/ArtistHero";
import GalleryGrid from "@/components/GalleryGrid";

export default async function ArtistPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params; // ✅ unwrap params
  const supabase = await createSupabaseServerClient();

  const normalizedHandle = handle.trim().toLowerCase();

  const { data: artist } = await supabase
    .from("artist_profiles")
    .select("*")
    .eq("handle", normalizedHandle)
    .maybeSingle();

  if (!artist) {
    return (
      <main className="space-y-4">
        <h1 className="text-2xl font-semibold">Artist not found</h1>
        <p className="text-sm text-neutral-600">
          No profile exists for: <span className="font-mono">{handle}</span>
        </p>
        <Link className="underline text-sm" href="/">
          Back home
        </Link>
      </main>
    );
  }

  const { data: posts } = await supabase
    .from("posts")
    .select("id, title, description, created_at, artist_id, post_media(url, sort_order)")
    .eq("artist_id", artist.id)
    .eq("visibility", "public")
    .order("created_at", { ascending: false })
    .limit(60);

  return (
    <main className="space-y-6">
      <ArtistHero artist={artist} />
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Gallery</h2>
        <GalleryGrid posts={posts ?? []} />
      </section>
    </main>
  );
}

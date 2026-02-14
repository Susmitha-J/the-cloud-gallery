import ArtworkCard from "./ArtworkCard";

export default function GalleryGrid({ posts }: { posts: any[] }) {
  if (!posts.length) {
    return (
      <div className="rounded-2xl bg-white p-8 text-sm text-neutral-600 ring-1 ring-neutral-200">
        No posts yet.
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((p) => (
        <ArtworkCard key={p.id} post={p} />
      ))}
    </section>
  );
}

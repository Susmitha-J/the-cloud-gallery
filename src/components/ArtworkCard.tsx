import Link from "next/link";

type Media = { url: string; sort_order: number };
type Post = {
  id: string;
  title: string;
  description: string | null;
  created_at: string;
  artist_id: string;
  post_media?: Media[];
};

export default function ArtworkCard({ post }: { post: Post }) {
  const img = post.post_media?.sort((a, b) => a.sort_order - b.sort_order)?.[0]?.url;

  return (
    <div className="group rounded-2xl bg-white shadow-sm ring-1 ring-neutral-200 overflow-hidden">
      <div className="aspect-[4/3] bg-neutral-100">
        {img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={img} alt={post.title} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-neutral-500">
            No image
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-medium leading-snug">{post.title}</h3>
          <span className="text-xs text-neutral-500 whitespace-nowrap">
            {new Date(post.created_at).toLocaleDateString()}
          </span>
        </div>
        {post.description ? (
          <p className="mt-2 line-clamp-2 text-sm text-neutral-600">{post.description}</p>
        ) : null}
      </div>
    </div>
  );
}

type Artist = {
  handle: string;
  display_name: string;
  bio: string | null;
  statement: string | null;
  location: string | null;
  avatar_url: string | null;
  banner_url: string | null;
  artist_types: string[] | null;
};

export default function ArtistHero({ artist }: { artist: Artist }) {
  return (
    <section className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-neutral-200">
      <div className="h-40 bg-neutral-200">
        {artist.banner_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={artist.banner_url} alt="" className="h-full w-full object-cover" />
        ) : null}
      </div>

      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="h-16 w-16 rounded-2xl bg-neutral-200 overflow-hidden">
            {artist.avatar_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={artist.avatar_url} alt="" className="h-full w-full object-cover" />
            ) : null}
          </div>

          <div className="flex-1">
            <h1 className="text-2xl font-semibold">{artist.display_name}</h1>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-neutral-600">
              <span>@{artist.handle}</span>
              {artist.location ? <span>• {artist.location}</span> : null}
              {artist.artist_types?.length ? (
                <span>• {artist.artist_types.join(", ")}</span>
              ) : null}
            </div>
          </div>
        </div>

        {artist.statement ? (
          <p className="mt-4 text-sm text-neutral-700 whitespace-pre-line">
            {artist.statement}
          </p>
        ) : null}
      </div>
    </section>
  );
}

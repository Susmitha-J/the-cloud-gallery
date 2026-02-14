import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = await createSupabaseServerClient();

  // 0) Auth check
  const { data: userData, error: userErr } = await supabase.auth.getUser();
  if (userErr) {
    return NextResponse.json({ error: userErr.message }, { status: 401 });
  }
  if (!userData?.user) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  // 1) Parse form
  const form = await req.formData();

  const artist_id = String(form.get("artist_id") || "");
  const artist_handle = String(form.get("artist_handle") || "");
  const type = String(form.get("type") || "artwork");
  const title = String(form.get("title") || "").trim();
  const description = String(form.get("description") || "").trim();
  const medium = String(form.get("medium") || "").trim();

  const image = form.get("image") as File | null;

  if (!artist_id || !artist_handle || !title || !image) {
    return NextResponse.json(
      { error: "Missing required fields (artist_id, artist_handle, title, image)" },
      { status: 400 }
    );
  }

  // 2) Verify this artist profile belongs to logged-in user
  const { data: profile, error: profErr } = await supabase
    .from("artist_profiles")
    .select("id,user_id,handle")
    .eq("id", artist_id)
    .maybeSingle();

  if (profErr) {
    return NextResponse.json({ error: profErr.message }, { status: 400 });
  }

  if (!profile || profile.user_id !== userData.user.id) {
    return NextResponse.json({ error: "Not allowed" }, { status: 403 });
  }

  // 3) Create post row
  const metadata: Record<string, any> = {};
  if (medium) metadata.medium = medium;

  const { data: post, error: postErr } = await supabase
    .from("posts")
    .insert({
      artist_id,
      type,
      title,
      description: description || null,
      metadata,
      visibility: "public",
    })
    .select("id")
    .single();

  if (postErr) {
    return NextResponse.json({ error: postErr.message }, { status: 400 });
  }

  const postId = post.id as string;

  // 4) Upload image to Supabase Storage
  const bucket = "the-cloud-gallery";

  const bytes = Buffer.from(await image.arrayBuffer()); // ✅ reliable in Node
  const originalName = image.name || "upload.jpg";
  const ext = originalName.includes(".") ? originalName.split(".").pop() : "jpg";
  const safeExt = (ext || "jpg").toLowerCase();

  const fileName = `${crypto.randomUUID()}.${safeExt}`;
  const path = `${artist_handle}/${postId}/${fileName}`;

  const { error: uploadErr } = await supabase.storage
    .from(bucket)
    .upload(path, bytes, {
      contentType: image.type || "image/jpeg",
      upsert: false,
    });

  if (uploadErr) {
    // Optional: clean up the post row if upload fails
    await supabase.from("posts").delete().eq("id", postId);
    return NextResponse.json({ error: uploadErr.message }, { status: 400 });
  }

  const { data: pub } = supabase.storage.from(bucket).getPublicUrl(path);
  const publicUrl = pub.publicUrl;

  // 5) Save media record
  const { error: mediaErr } = await supabase.from("post_media").insert({
    post_id: postId,
    url: publicUrl,
    kind: "image",
    sort_order: 0,
    alt_text: title,
  });

  if (mediaErr) {
    // Optional cleanup: remove uploaded file + post row
    await supabase.storage.from(bucket).remove([path]);
    await supabase.from("posts").delete().eq("id", postId);

    return NextResponse.json({ error: mediaErr.message }, { status: 400 });
  }

  // 6) Redirect to artist page
  return NextResponse.redirect(new URL(`/artist/${artist_handle}`, req.url), 303);

}

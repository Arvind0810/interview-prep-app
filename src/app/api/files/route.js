import { getUser, unauthorized } from "@/lib/auth/server";
import {
  ALLOWED_TYPES,
  deleteFile,
  listUserFiles,
  MAX_UPLOAD_BYTES,
  ownsKey,
  signedUrl,
  uploadUserFile,
} from "@/lib/files";

export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "private, no-store" };
const fail = (status, error) => Response.json({ error }, { status, headers: NO_STORE });

// GET            → the user's files
// GET ?key=...   → a short-lived presigned download URL for one of the user's files
export async function GET(request) {
  const user = await getUser();
  if (!user) return unauthorized();
  const key = new URL(request.url).searchParams.get("key");
  try {
    if (key) {
      if (!ownsKey(user.id, key)) return fail(404, "File not found.");
      return Response.json({ url: await signedUrl(key) }, { headers: NO_STORE });
    }
    return Response.json({ files: await listUserFiles(user.id) }, { headers: NO_STORE });
  } catch (err) {
    console.error("[files] read failed:", err.message);
    return fail(502, "Storage is unavailable right now.");
  }
}

// multipart/form-data with one `file` field.
export async function POST(request) {
  const user = await getUser();
  if (!user) return unauthorized();

  let form;
  try {
    form = await request.formData();
  } catch {
    return fail(400, "Send multipart/form-data with a `file` field.");
  }
  const file = form.get("file");
  if (!file || typeof file === "string") return fail(400, "Missing `file`.");
  if (file.size === 0) return fail(400, "File is empty.");
  if (file.size > MAX_UPLOAD_BYTES) return fail(413, "Files are limited to 4 MB.");
  if (!ALLOWED_TYPES.has(file.type)) return fail(415, "Allowed: PDF, PNG, JPEG, WebP, plain text, Markdown.");

  try {
    const stored = await uploadUserFile(user.id, file);
    return Response.json({ key: stored.key, size: stored.size }, { status: 201, headers: NO_STORE });
  } catch (err) {
    console.error("[files] upload failed:", err.message);
    return fail(502, "Upload failed. Try again.");
  }
}

export async function DELETE(request) {
  const user = await getUser();
  if (!user) return unauthorized();
  const key = new URL(request.url).searchParams.get("key");
  if (!ownsKey(user.id, key)) return fail(404, "File not found.");
  try {
    await deleteFile(key);
    return new Response(null, { status: 204, headers: NO_STORE });
  } catch (err) {
    console.error("[files] delete failed:", err.message);
    return fail(502, "Delete failed. Try again.");
  }
}

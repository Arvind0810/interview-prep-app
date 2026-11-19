import "server-only";
import { randomUUID } from "node:crypto";
import { Files } from "files-sdk";
import { neon } from "files-sdk/neon";

// Neon Object Storage via the Files SDK; endpoint, region and credentials come from the
// AWS_* vars that `neon deploy` / `neon env pull` write. Bucket declared in neon.ts.
const BUCKET = "assets";
export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024; // under Vercel's 4.5 MB request body limit
export const SIGNED_URL_TTL_SECONDS = 300;
export const ALLOWED_TYPES = new Set([
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/webp",
  "text/plain",
  "text/markdown",
]);

let files;
const getFiles = () => (files ??= new Files({ adapter: neon({ bucket: BUCKET }) }));

// Every object a user owns lives under this prefix; ownership is checked against it.
export const userPrefix = (userId) => `users/${userId}/`;
export const ownsKey = (userId, key) =>
  typeof key === "string" && key.startsWith(userPrefix(userId)) && !key.includes("..");

const safeName = (name) =>
  String(name || "file").replace(/[^A-Za-z0-9._-]+/g, "_").replace(/^\.+/, "").slice(0, 80) || "file";

export async function uploadUserFile(userId, file) {
  const key = `${userPrefix(userId)}${randomUUID()}-${safeName(file.name)}`;
  const body = new Uint8Array(await file.arrayBuffer());
  return getFiles().upload(key, body, { contentType: file.type });
}

export async function listUserFiles(userId) {
  const { items } = await getFiles().list({ prefix: userPrefix(userId), limit: 100 });
  return items
    .map(({ key, size, contentType, lastModified }) => ({
      key,
      name: key.slice(userPrefix(userId).length).replace(/^[0-9a-f-]{36}-/, ""),
      size,
      contentType,
      lastModified,
    }))
    .sort((a, b) => (b.lastModified || 0) - (a.lastModified || 0));
}

export const signedUrl = (key) => getFiles().url(key, { expiresIn: SIGNED_URL_TTL_SECONDS });
export const deleteFile = (key) => getFiles().delete(key);

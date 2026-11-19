// Which localStorage keys sync to the signed-in user's cloud copy. Shared by the browser
// (what to send) and the server (what to accept). UI-only preferences stay per-device.
const KEY_PATTERN = /^iprep_[A-Za-z0-9_-]{1,64}$/;
const DEVICE_ONLY = new Set(["iprep_theme", "iprep_sidebarCollapsed"]);

export const MAX_SYNC_BATCH = 50;
export const MAX_VALUE_BYTES = 256 * 1024;

export function isSyncableKey(key) {
  return typeof key === "string" && KEY_PATTERN.test(key) && !DEVICE_ONLY.has(key);
}

import { defineConfig } from "@neon/config/v1";

// Browser origins allowed to open Realtime subscriptions and call the progress Function.
// Add your deployed origin here, then run `neon deploy --update-existing --env .env.local`.
const APP_ORIGINS = ["http://localhost:3000"];

export default defineConfig({
  preview: {
    realtime: { allowedOrigins: APP_ORIGINS },
  },
  auth: true,
  aiGateway: true,
  functions: {
    progress: {
      name: "Progress summary",
      source: "./functions/progress.ts",
      env: { ALLOWED_ORIGINS: APP_ORIGINS.join(",") },
    },
  },
  buckets: {
    // Private: every read goes through a short-lived presigned URL issued by /api/files.
    assets: { access: "private" },
  },
  // Branch policy: per-branch tuning
  branch: (branch) => {
    if (branch.isDefault) {
      // Default branch: no overrides, uses project defaults
      return {};
    }
    if (!branch.exists) {
      // New non-default branches: auto-expire
      // Run `neon checkout <name>` to create a new branch with these settings
      return { ttl: "7d" };
    }
    // Existing branch: no changes
    return {};
  },
});

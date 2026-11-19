"use client";
import { createAuthClient } from "@neon/auth/next";

// Talks to the same-origin proxy at /api/auth/[...path]; takes no arguments by design.
export const authClient = createAuthClient();

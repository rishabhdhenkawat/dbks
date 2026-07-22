"use client";

import { signOut } from "next-auth/react";

export function SignOutButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/" })}
      className={
        className ??
        "rounded-md border border-current/20 px-3 py-1.5 text-sm opacity-80 transition hover:opacity-100"
      }
    >
      Sign out
    </button>
  );
}

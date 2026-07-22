"use client";

import { signIn } from "next-auth/react";

export function GoogleSignInButton() {
  return (
    <button
      type="button"
      onClick={() => signIn("google", { callbackUrl: "/documents" })}
      className="inline-flex w-full items-center justify-center gap-3 rounded-lg bg-[#1a3a2f] px-6 py-3.5 text-sm font-medium text-[#f4f7f5] transition hover:bg-[#244a3d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a3a2f]"
    >
      <svg aria-hidden className="h-5 w-5" viewBox="0 0 24 24">
        <path
          fill="#EA4335"
          d="M12 10.2v3.6h5.1c-.2 1.2-1.5 3.6-5.1 3.6-3.1 0-5.6-2.5-5.6-5.6S8.9 6.2 12 6.2c1.8 0 3 .7 3.7 1.4l2.5-2.4C16.7 3.7 14.5 2.7 12 2.7 6.9 2.7 2.7 6.9 2.7 12S6.9 21.3 12 21.3c5.5 0 9.1-3.9 9.1-9.3 0-.6-.1-1.1-.2-1.6H12z"
        />
        <path
          fill="#34A853"
          d="M3.9 7.4l3 2.2C7.7 7.4 9.7 6.2 12 6.2c1.8 0 3 .7 3.7 1.4l2.5-2.4C16.7 3.7 14.5 2.7 12 2.7 8.5 2.7 5.5 4.7 3.9 7.4z"
        />
        <path
          fill="#FBBC05"
          d="M12 21.3c2.4 0 4.5-.8 6-2.2l-2.9-2.2c-.8.5-1.8.9-3.1.9-3.5 0-6.5-2.4-7.5-5.6l-3 2.3c1.6 3.2 4.9 5.8 10.5 5.8z"
        />
        <path
          fill="#4285F4"
          d="M21.1 12c0-.6-.1-1.1-.2-1.6H12v3.6h5.1c-.3 1.2-1.1 2.2-2.2 2.9l2.9 2.2c1.7-1.6 2.7-3.9 2.7-7.1z"
        />
      </svg>
      Continue with Google
    </button>
  );
}

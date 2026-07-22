import Link from "next/link";
import { GoogleSignInButton } from "@/components/GoogleSignInButton";
import { site } from "@/lib/site-content";

export const metadata = {
  title: "Documents Portal | Drishti Baadhit Karimik Sangh",
};

export default function DocumentsPortalPage() {
  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center px-5 py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#c5d9ce_0%,transparent_45%),radial-gradient(circle_at_80%_70%,#d4e0c8_0%,transparent_40%)]"
      />
      <div className="relative z-10 w-full max-w-md text-center">
        <p className="text-sm tracking-wide text-[var(--muted)]">
          {site.name}
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl tracking-tight text-[var(--ink)]">
          Documents Portal
        </h1>
        <p className="mt-4 text-[var(--body)]">
          Sign in with Google to access shared circulars, rules, and resources.
          Admins can upload files; members can view and download them.
        </p>
        <div className="mt-10">
          <GoogleSignInButton />
        </div>
        <p className="mt-6 text-sm text-[var(--muted)]">
          <Link href="/" className="underline-offset-4 hover:underline">
            Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
}

import Link from "next/link";
import { site } from "@/lib/site-content";

const nav = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/founding-members", label: "Founding Members" },
  { href: "/press-release", label: "Press Release" },
  { href: "/documents", label: "Documents Portal" },
];

function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-4 ${className}`} aria-label="Social media">
      <li>
        <a
          href={site.social.instagram}
          target="_blank"
          rel="noreferrer"
          className="text-sm underline-offset-4 hover:underline"
        >
          Instagram
        </a>
      </li>
      <li>
        <a
          href={site.social.facebook}
          target="_blank"
          rel="noreferrer"
          className="text-sm underline-offset-4 hover:underline"
        >
          Facebook
        </a>
      </li>
      <li>
        <a
          href={site.social.linkedin}
          target="_blank"
          rel="noreferrer"
          className="text-sm underline-offset-4 hover:underline"
        >
          LinkedIn
        </a>
      </li>
    </ul>
  );
}

export function SiteHeader() {
  return (
    <header className="border-b border-[var(--ink)]/10 bg-[var(--paper)]/90 backdrop-blur-sm">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-[var(--brand)] focus:px-3 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
        <Link href="/" className="group flex items-center gap-3">
          <span
            aria-hidden
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--brand)] font-[family-name:var(--font-display)] text-sm font-semibold text-[var(--paper)]"
          >
            {site.shortName}
          </span>
          <span className="text-left">
            <span className="block font-[family-name:var(--font-display)] text-lg leading-tight text-[var(--ink)] sm:text-xl">
              {site.name}
            </span>
            <span className="block text-xs tracking-wide text-[var(--muted)]">
              {site.region}
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="overflow-x-auto">
          <ul className="flex min-w-max items-center gap-1 sm:gap-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-md px-2.5 py-2 text-sm text-[var(--ink)]/85 transition hover:bg-[var(--brand)]/10 hover:text-[var(--brand)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <SocialLinks className="hidden xl:flex" />
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[var(--ink)]/10 bg-[var(--ink)] text-[var(--paper)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-[family-name:var(--font-display)] text-xl">
            {site.name}
          </p>
          <p className="mt-2 max-w-md text-sm text-[var(--paper)]/75">
            {site.tagline}
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <SocialLinks />
          <Link
            href="/documents"
            className="text-sm text-[var(--accent)] underline-offset-4 hover:underline"
          >
            Documents Portal
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-4 text-center text-xs text-[var(--paper)]/60">
        © {new Date().getFullYear()} {site.name} {site.region}
      </div>
    </footer>
  );
}

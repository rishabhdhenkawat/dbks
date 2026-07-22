import Link from "next/link";
import { MembershipForm } from "@/components/MembershipForm";
import {
  about,
  advisors,
  currentCommittee,
  objectives,
  otherMembers,
  site,
} from "@/lib/site-content";

export default function HomePage() {
  return (
    <>
      <section className="relative isolate min-h-[88vh] overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_20%,#7eb8a4_0%,transparent_42%),radial-gradient(ellipse_at_85%_10%,#f0c36a_0%,transparent_35%),linear-gradient(165deg,#0b3d32_0%,#145c4a_38%,#1a6b56_70%,#0f4a3c_100%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-30 [background-image:repeating-linear-gradient(120deg,transparent,transparent_18px,rgba(255,255,255,0.04)_18px,rgba(255,255,255,0.04)_19px)]"
        />
        <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 sm:pb-24">
          <p className="font-[family-name:var(--font-display)] text-5xl leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl">
            {site.name}
          </p>
          <h1 className="mt-6 max-w-2xl text-2xl font-medium text-[#e8f5f0] sm:text-3xl">
            Welcome to {site.name} {site.region}
          </h1>
          <p className="mt-4 max-w-xl text-base text-white/80 sm:text-lg">
            {site.tagline}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#become-member"
              className="rounded-lg bg-[#f0c36a] px-5 py-3 text-sm font-semibold text-[#102a22] transition hover:bg-[#f5d28a]"
            >
              Become a member
            </a>
            <Link
              href="/documents"
              className="rounded-lg border border-white/40 bg-white/10 px-5 py-3 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              Documents Portal
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-20" aria-labelledby="about-heading">
        <h2
          id="about-heading"
          className="font-[family-name:var(--font-display)] text-3xl text-[var(--ink)] sm:text-4xl"
        >
          About Us
        </h2>
        <div className="mt-6 space-y-5 text-base leading-relaxed text-[var(--body)] sm:text-lg">
          {about.paragraphs.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>
      </section>

      <section
        className="border-y border-[var(--ink)]/8 bg-[var(--wash)]"
        aria-labelledby="objectives-heading"
      >
        <div className="mx-auto max-w-3xl px-5 py-20">
          <h2
            id="objectives-heading"
            className="font-[family-name:var(--font-display)] text-3xl text-[var(--ink)] sm:text-4xl"
          >
            Objectives
          </h2>
          <ol className="mt-8 list-decimal space-y-5 pl-5 text-base leading-relaxed text-[var(--body)] sm:text-lg">
            {objectives.map((item) => (
              <li key={item.slice(0, 48)} className="pl-2">
                {item}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        className="mx-auto max-w-6xl px-5 py-20"
        aria-labelledby="committee-heading"
      >
        <h2
          id="committee-heading"
          className="font-[family-name:var(--font-display)] text-3xl text-[var(--ink)] sm:text-4xl"
        >
          Current Committee Members
        </h2>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {currentCommittee.map((m) => (
            <li key={m.name} className="border-t border-[var(--brand)]/30 pt-4">
              <p className="font-medium text-[var(--ink)]">{m.name}</p>
              <p className="mt-1 text-sm text-[var(--muted)]">{m.role}</p>
            </li>
          ))}
        </ul>

        <h3 className="mt-14 text-xl font-medium text-[var(--ink)]">
          Other Members
        </h3>
        <ul className="mt-4 space-y-2 text-[var(--body)]">
          {otherMembers.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>

        <h3 className="mt-14 text-xl font-medium text-[var(--ink)]">
          Advisor Committee
        </h3>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {advisors.map((m) => (
            <li key={m.name}>
              <p className="font-medium text-[var(--ink)]">{m.name}</p>
              <p className="text-sm text-[var(--muted)]">{m.role}</p>
            </li>
          ))}
        </ul>
      </section>

      <section
        id="become-member"
        className="border-t border-[var(--ink)]/8 bg-[var(--wash)] py-20"
        aria-labelledby="member-heading"
      >
        <div className="mx-auto max-w-6xl px-5">
          <h2
            id="member-heading"
            className="text-center font-[family-name:var(--font-display)] text-3xl text-[var(--ink)] sm:text-4xl"
          >
            Become a member
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-[var(--muted)]">
            Share your details and we will get in touch with you.
          </p>
          <div className="mt-10">
            <MembershipForm />
          </div>
        </div>
      </section>
    </>
  );
}

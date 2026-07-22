import { MembershipForm } from "@/components/MembershipForm";
import {
  firstCommittee,
  firstCommitteeOther,
  foundingAdvisors,
  foundingMembers,
} from "@/lib/site-content";

export const metadata = {
  title: "Founding Members | Drishti Baadhit Karimik Sangh",
};

function Initials({ name }: { name: string }) {
  const parts = name.replace(/Late\.?\s*/i, "").trim().split(/\s+/);
  const letters = (parts[0]?.[0] || "") + (parts[1]?.[0] || "");
  return (
    <span
      aria-hidden
      className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[var(--brand)]/15 font-[family-name:var(--font-display)] text-lg text-[var(--brand)]"
    >
      {letters.toUpperCase()}
    </span>
  );
}

export default function FoundingMembersPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <h1 className="font-[family-name:var(--font-display)] text-4xl text-[var(--ink)] sm:text-5xl">
        Founding Members
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-[var(--muted)]">
        The people who conceived and shaped Drishti Baadhit Karimik Sangh.
      </p>

      <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {foundingMembers.map((m) => (
          <li key={m.name} className="flex gap-4">
            <Initials name={m.name} />
            <div>
              <p className="font-medium text-[var(--ink)]">{m.name}</p>
              <p className="mt-1 text-sm text-[var(--muted)]">{m.title}</p>
            </div>
          </li>
        ))}
      </ul>

      <section className="mt-20" aria-labelledby="first-committee-heading">
        <h2
          id="first-committee-heading"
          className="font-[family-name:var(--font-display)] text-3xl text-[var(--ink)]"
        >
          1st Committee Members{" "}
          <span className="text-xl text-[var(--muted)]">(September 2017)</span>
        </h2>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {firstCommittee.map((m) => (
            <li key={m.name + m.role} className="border-t border-[var(--brand)]/25 pt-3">
              <p className="font-medium text-[var(--ink)]">{m.name}</p>
              <p className="text-sm text-[var(--muted)]">{m.role}</p>
            </li>
          ))}
        </ul>

        <h3 className="mt-12 text-xl font-medium text-[var(--ink)]">
          Other Members
        </h3>
        <ul className="mt-3 space-y-1 text-[var(--body)]">
          {firstCommitteeOther.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>

        <h3 className="mt-12 text-xl font-medium text-[var(--ink)]">
          Advisor Committee
        </h3>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {foundingAdvisors.map((m) => (
            <li key={m.name}>
              <p className="font-medium text-[var(--ink)]">{m.name}</p>
              <p className="text-sm text-[var(--muted)]">{m.role}</p>
            </li>
          ))}
        </ul>
      </section>

      <section
        id="become-member"
        className="mt-20 border-t border-[var(--ink)]/10 pt-16"
        aria-labelledby="member-heading"
      >
        <h2
          id="member-heading"
          className="text-center font-[family-name:var(--font-display)] text-3xl text-[var(--ink)]"
        >
          Become a member
        </h2>
        <div className="mt-8">
          <MembershipForm />
        </div>
      </section>
    </div>
  );
}

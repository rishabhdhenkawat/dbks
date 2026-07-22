import { MembershipForm } from "@/components/MembershipForm";
import { pressReleases } from "@/lib/site-content";

export const metadata = {
  title: "Press Release | Drishti Baadhit Karimik Sangh",
};

export default function PressReleasePage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="font-[family-name:var(--font-display)] text-4xl text-[var(--ink)] sm:text-5xl">
        Press Release
      </h1>
      <p className="mt-4 text-lg text-[var(--muted)]">
        Official announcements and media updates from the organization.
      </p>

      <ul className="mt-12 space-y-10">
        {pressReleases.map((item) => (
          <li key={item.title} className="border-l-2 border-[var(--accent)] pl-5">
            <p className="text-sm font-medium text-[var(--brand)]">{item.date}</p>
            <h2 className="mt-2 text-xl font-medium text-[var(--ink)]">
              {item.title}
            </h2>
            <p className="mt-2 text-[var(--body)]">{item.body}</p>
          </li>
        ))}
      </ul>

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

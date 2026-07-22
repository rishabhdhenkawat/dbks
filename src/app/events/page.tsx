import { MembershipForm } from "@/components/MembershipForm";
import { events } from "@/lib/site-content";

export const metadata = {
  title: "Events | Drishti Baadhit Karimik Sangh",
};

export default function EventsPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="font-[family-name:var(--font-display)] text-4xl text-[var(--ink)] sm:text-5xl">
        Events
      </h1>
      <p className="mt-4 text-lg text-[var(--muted)]">
        General assemblies, elections, and community programs across Rajasthan.
      </p>

      <ol className="mt-12 space-y-10">
        {events.map((event) => (
          <li
            key={event.date + event.title.slice(0, 20)}
            className="border-l-2 border-[var(--brand)] pl-5"
          >
            <p className="text-sm font-medium tracking-wide text-[var(--brand)]">
              {event.date}
            </p>
            <p className="mt-2 text-base leading-relaxed text-[var(--body)] sm:text-lg">
              {event.title}
            </p>
          </li>
        ))}
      </ol>

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

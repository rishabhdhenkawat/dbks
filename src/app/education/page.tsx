import Link from "next/link";
import { MembershipForm } from "@/components/MembershipForm";
import { educationContent } from "@/lib/site-content";

export const metadata = {
  title: "Education Department | Drishti Baadhit Karimik Sangh",
};

export default function EducationPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="font-[family-name:var(--font-display)] text-4xl text-[var(--ink)] sm:text-5xl">
        Education Department
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-[var(--body)]">
        {educationContent.intro}
      </p>

      <ul className="mt-10 list-disc space-y-4 pl-5 text-base text-[var(--body)] sm:text-lg">
        {educationContent.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>

      <p className="mt-10">
        <Link
          href="/documents"
          className="font-medium text-[var(--brand)] underline-offset-4 hover:underline"
        >
          Open Documents Portal
        </Link>{" "}
        to view shared circulars and files after signing in with Google.
      </p>

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

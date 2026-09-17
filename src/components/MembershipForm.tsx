"use client";

import { FormEvent, useState } from "react";
import { site } from "@/lib/site-content";

export function MembershipForm() {
  const [status, setStatus] = useState<"idle" | "ok">("idle");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const firstName = String(data.get("firstName") || "").trim();
    const lastName = String(data.get("lastName") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    const subject = encodeURIComponent(
      `Membership enquiry from ${firstName} ${lastName}`,
    );
    const body = encodeURIComponent(
      `Name: ${firstName} ${lastName}\nEmail: ${email}\n\n${message}`,
    );
    window.location.href = `mailto:${site.contactEmail}?subject=${subject}&body=${body}`;
    form.reset();
    setStatus("ok");
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto grid max-w-xl gap-4"
      aria-label="Become a member"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm text-[var(--muted)]">
          First Name
          <input
            name="firstName"
            required
            className="mt-1.5 w-full rounded-lg border border-[var(--ink)]/15 bg-white px-3 py-2.5 text-[var(--ink)] outline-none focus:border-[var(--brand)]"
          />
        </label>
        <label className="block text-sm text-[var(--muted)]">
          Last Name
          <input
            name="lastName"
            required
            className="mt-1.5 w-full rounded-lg border border-[var(--ink)]/15 bg-white px-3 py-2.5 text-[var(--ink)] outline-none focus:border-[var(--brand)]"
          />
        </label>
      </div>
      <label className="block text-sm text-[var(--muted)]">
        Email
        <input
          name="email"
          type="email"
          required
          className="mt-1.5 w-full rounded-lg border border-[var(--ink)]/15 bg-white px-3 py-2.5 text-[var(--ink)] outline-none focus:border-[var(--brand)]"
        />
      </label>
      <label className="block text-sm text-[var(--muted)]">
        Write a message
        <textarea
          name="message"
          required
          rows={4}
          className="mt-1.5 w-full rounded-lg border border-[var(--ink)]/15 bg-white px-3 py-2.5 text-[var(--ink)] outline-none focus:border-[var(--brand)]"
        />
      </label>
      <button
        type="submit"
        className="rounded-lg bg-[var(--brand)] px-5 py-3 text-sm font-medium text-white transition hover:bg-[var(--brand-deep)]"
      >
        Submit
      </button>
      {status === "ok" && (
        <p role="status" className="text-sm text-[var(--brand)]">
          Your email app should open with the membership message. If it does
          not, write to {site.contactEmail}.
        </p>
      )}
    </form>
  );
}

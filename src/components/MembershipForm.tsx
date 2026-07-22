"use client";

import { FormEvent, useState } from "react";

export function MembershipForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/membership", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Could not submit");
      }
      form.reset();
      setStatus("ok");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Could not submit");
    }
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
        disabled={status === "sending"}
        className="rounded-lg bg-[var(--brand)] px-5 py-3 text-sm font-medium text-white transition hover:bg-[var(--brand-deep)] disabled:opacity-60"
      >
        {status === "sending" ? "Submitting…" : "Submit"}
      </button>
      {status === "ok" && (
        <p role="status" className="text-sm text-[var(--brand)]">
          Thank you. Your membership enquiry has been received.
        </p>
      )}
      {status === "error" && error && (
        <p role="alert" className="text-sm text-[#8b2e2e]">
          {error}
        </p>
      )}
    </form>
  );
}

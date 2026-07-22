"use client";

import { useCallback, useEffect, useState } from "react";
import { formatBytes, formatDate, type ResourceItem } from "@/lib/format";

export function LibraryBrowser({ userName }: { userName: string }) {
  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/resources");
      if (!res.ok) throw new Error("Failed to load resources");
      const data = (await res.json()) as ResourceItem[];
      setResources(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <header className="mb-10 border-b border-[#3d4a5c]/25 pb-6">
        <p className="text-sm tracking-wide text-[#7a8799]">Library</p>
        <h1 className="mt-1 font-[family-name:var(--font-display)] text-3xl text-[#1a2332]">
          Shared Resources
        </h1>
        <p className="mt-2 text-[#4a5668]">
          Welcome, {userName}. Browse and open files shared with you.
        </p>
      </header>

      {error && (
        <p className="mb-4 rounded-lg bg-[#fde8e8] px-3 py-2 text-sm text-[#8b2e2e]">
          {error}
        </p>
      )}

      {loading ? (
        <p className="text-sm text-[#7a8799]">Loading…</p>
      ) : resources.length === 0 ? (
        <p className="text-sm text-[#7a8799]">
          No resources available yet. Check back later.
        </p>
      ) : (
        <ul className="divide-y divide-[#3d4a5c]/15">
          {resources.map((r) => (
            <li
              key={r.id}
              className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium text-[#1a2332]">{r.title}</p>
                <p className="text-sm text-[#7a8799]">
                  {r.filename} · {formatBytes(r.size)} · {formatDate(r.createdAt)}
                </p>
              </div>
              <div className="flex gap-2">
                <a
                  href={`/api/resources/${r.id}/file`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md bg-[#243447] px-3 py-1.5 text-sm text-[#f0f3f7] hover:bg-[#2f4258]"
                >
                  View
                </a>
                <a
                  href={`/api/resources/${r.id}/file?download=1`}
                  className="rounded-md border border-[#3d4a5c]/30 px-3 py-1.5 text-sm text-[#243447] hover:bg-[#eef1f5]"
                >
                  Download
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

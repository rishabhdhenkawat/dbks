"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { formatBytes, formatDate, type ResourceItem } from "@/lib/format";

export function AdminDashboard({ userName }: { userName: string }) {
  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);

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

  async function onUpload(e: FormEvent) {
    e.preventDefault();
    if (!file) {
      setError("Choose a file to upload");
      return;
    }
    setUploading(true);
    setError(null);
    try {
      const body = new FormData();
      body.append("file", file);
      if (title.trim()) body.append("title", title.trim());
      const res = await fetch("/api/resources", { method: "POST", body });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Upload failed");
      }
      setTitle("");
      setFile(null);
      const input = document.getElementById("file-input") as HTMLInputElement | null;
      if (input) input.value = "";
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function onDelete(id: string) {
    if (!confirm("Delete this resource?")) return;
    setError(null);
    const res = await fetch(`/api/resources/${id}`, { method: "DELETE" });
    if (!res.ok) {
      setError("Could not delete resource");
      return;
    }
    setResources((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <header className="mb-10 border-b border-[#2a4a3e]/30 pb-6">
        <p className="text-sm tracking-wide text-[#6b8f7e]">Admin portal</p>
        <h1 className="mt-1 font-[family-name:var(--font-display)] text-3xl text-[#0f241c]">
          Resource Manager
        </h1>
        <p className="mt-2 text-[#3d5c4e]">
          Signed in as {userName}. Upload files for library users.
        </p>
      </header>

      <section className="mb-12">
        <h2 className="mb-4 text-lg font-medium text-[#0f241c]">Upload resource</h2>
        <form
          onSubmit={onUpload}
          className="flex flex-col gap-4 rounded-xl bg-[#e8f0eb] p-5"
        >
          <label className="block text-sm text-[#3d5c4e]">
            Title (optional)
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Defaults to filename"
              className="mt-1.5 w-full rounded-lg border border-[#2a4a3e]/20 bg-white px-3 py-2 text-[#0f241c] outline-none focus:border-[#1a3a2f]"
            />
          </label>
          <label className="block text-sm text-[#3d5c4e]">
            File (PDF or any type)
            <input
              id="file-input"
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="mt-1.5 block w-full text-sm text-[#3d5c4e] file:mr-3 file:rounded-md file:border-0 file:bg-[#1a3a2f] file:px-3 file:py-2 file:text-sm file:text-[#f4f7f5]"
            />
          </label>
          <button
            type="submit"
            disabled={uploading}
            className="rounded-lg bg-[#1a3a2f] px-4 py-2.5 text-sm font-medium text-[#f4f7f5] transition hover:bg-[#244a3d] disabled:opacity-60"
          >
            {uploading ? "Uploading…" : "Upload"}
          </button>
        </form>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-medium text-[#0f241c]">
          Uploaded resources
        </h2>
        {error && (
          <p className="mb-4 rounded-lg bg-[#fde8e8] px-3 py-2 text-sm text-[#8b2e2e]">
            {error}
          </p>
        )}
        {loading ? (
          <p className="text-sm text-[#6b8f7e]">Loading…</p>
        ) : resources.length === 0 ? (
          <p className="text-sm text-[#6b8f7e]">No resources yet. Upload the first file.</p>
        ) : (
          <ul className="divide-y divide-[#2a4a3e]/15">
            {resources.map((r) => (
              <li
                key={r.id}
                className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium text-[#0f241c]">{r.title}</p>
                  <p className="text-sm text-[#6b8f7e]">
                    {r.filename} · {formatBytes(r.size)} · {formatDate(r.createdAt)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <a
                    href={`/api/resources/${r.id}/file`}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-md border border-[#2a4a3e]/25 px-3 py-1.5 text-sm text-[#1a3a2f] hover:bg-[#e8f0eb]"
                  >
                    Open
                  </a>
                  <button
                    type="button"
                    onClick={() => void onDelete(r.id)}
                    className="rounded-md border border-[#8b2e2e]/30 px-3 py-1.5 text-sm text-[#8b2e2e] hover:bg-[#fde8e8]"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

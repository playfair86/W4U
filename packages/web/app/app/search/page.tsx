"use client";
import { useState } from "react";
import { ScreenHeader } from "@/components/ScreenHeader";
import { JobCard } from "@/components/JobCard";
import { JOBS, SERVICE_CATEGORIES } from "@/lib/mock-data";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const filtered = JOBS.filter((j) => {
    const matchQ = query
      ? (j.title + j.description).toLowerCase().includes(query.toLowerCase())
      : true;
    const matchC = category ? j.category === category : true;
    return matchQ && matchC;
  });

  return (
    <div>
      <ScreenHeader title="Search jobs" backHref="/app" />
      <div className="px-5 pt-4">
        <div className="flex items-center gap-2 rounded-xl border border-ink-300 bg-white px-3 py-2.5 focus-within:border-brand-600">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search painting, gardening, cleaning…"
            className="flex-1 bg-transparent text-sm outline-none"
          />
        </div>

        <div className="-mx-5 mt-4 overflow-x-auto px-5 phone-scroll">
          <div className="flex gap-2 pb-1">
            <button
              onClick={() => setCategory(null)}
              className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium ${
                category === null ? "border-brand-600 bg-brand-50 text-brand-700" : "border-ink-100 bg-white text-ink-700"
              }`}
            >
              All
            </button>
            {SERVICE_CATEGORIES.map((c) => (
              <button
                key={c.name}
                onClick={() => setCategory(c.name)}
                className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium ${
                  category === c.name
                    ? "border-brand-600 bg-brand-50 text-brand-700"
                    : "border-ink-100 bg-white text-ink-700"
                }`}
              >
                {c.icon} {c.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="mt-5 px-5 pb-6">
        <p className="mb-3 text-xs text-ink-500">
          {filtered.length} result{filtered.length === 1 ? "" : "s"}
        </p>
        <div className="space-y-3">
          {filtered.map((j) => (
            <JobCard key={j.id} job={j} />
          ))}
          {filtered.length === 0 && (
            <div className="py-10 text-center text-sm text-ink-500">
              No jobs match your filters
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ScreenHeader } from "@/components/ScreenHeader";
import { SERVICE_CATEGORIES } from "@/lib/mock-data";

export default function PostJobPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(SERVICE_CATEGORIES[0].name);
  const [sub, setSub] = useState(SERVICE_CATEGORIES[0].subs[0]);
  const [description, setDescription] = useState("");
  const [budgetMin, setBudgetMin] = useState("500");
  const [budgetMax, setBudgetMax] = useState("1000");
  const [submitted, setSubmitted] = useState(false);

  const activeSubs =
    SERVICE_CATEGORIES.find((c) => c.name === category)?.subs ?? [];

  if (submitted) {
    return (
      <div className="flex flex-col min-h-full">
        <ScreenHeader title="Post a Job" backHref="/app" />
        <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-50 text-4xl">
            ✅
          </div>
          <h2 className="mt-6 text-xl font-bold text-ink-900">Job posted!</h2>
          <p className="mt-2 text-sm text-ink-500">
            Verified workers nearby will start applying within minutes.
          </p>
          <button
            onClick={() => router.push("/app")}
            className="mt-8 rounded-xl bg-brand-600 px-8 py-3 text-sm font-semibold text-white"
          >
            Back to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full">
      <ScreenHeader title="Post a Job" backHref="/app" />
      <form
        className="flex-1 px-5 pt-4 pb-6 space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
      >
        <Field label="Job title">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Paint my lounge"
            className="w-full rounded-xl border border-ink-300 bg-white px-4 py-3 text-sm outline-none focus:border-brand-600"
          />
        </Field>

        <Field label="Category">
          <div className="-mx-5 overflow-x-auto px-5 phone-scroll">
            <div className="flex gap-2 pb-1">
              {SERVICE_CATEGORIES.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => {
                    setCategory(c.name);
                    setSub(c.subs[0]);
                  }}
                  className={`shrink-0 rounded-full border px-3.5 py-2 text-xs font-medium transition ${
                    category === c.name
                      ? "border-brand-600 bg-brand-50 text-brand-700"
                      : "border-ink-100 bg-white text-ink-700"
                  }`}
                >
                  <span className="mr-1">{c.icon}</span>
                  {c.name}
                </button>
              ))}
            </div>
          </div>
        </Field>

        <Field label="Subcategory">
          <select
            value={sub}
            onChange={(e) => setSub(e.target.value)}
            className="w-full rounded-xl border border-ink-300 bg-white px-4 py-3 text-sm outline-none focus:border-brand-600"
          >
            {activeSubs.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </Field>

        <Field label="Description">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="Describe the work, timing, materials provided, etc."
            className="w-full resize-none rounded-xl border border-ink-300 bg-white px-4 py-3 text-sm outline-none focus:border-brand-600"
          />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Budget min (R)">
            <input
              value={budgetMin}
              onChange={(e) => setBudgetMin(e.target.value.replace(/\D/g, ""))}
              inputMode="numeric"
              className="w-full rounded-xl border border-ink-300 bg-white px-4 py-3 text-sm outline-none focus:border-brand-600"
            />
          </Field>
          <Field label="Budget max (R)">
            <input
              value={budgetMax}
              onChange={(e) => setBudgetMax(e.target.value.replace(/\D/g, ""))}
              inputMode="numeric"
              className="w-full rounded-xl border border-ink-300 bg-white px-4 py-3 text-sm outline-none focus:border-brand-600"
            />
          </Field>
        </div>

        <button
          type="submit"
          disabled={!title.trim() || !description.trim()}
          className="w-full rounded-xl bg-brand-600 py-3.5 text-sm font-semibold text-white disabled:bg-ink-300"
        >
          Post job
        </button>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-ink-700">
        {label}
      </label>
      {children}
    </div>
  );
}

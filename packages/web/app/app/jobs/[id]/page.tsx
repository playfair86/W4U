import { JOBS, formatZAR } from "@/lib/mock-data";
import { ScreenHeader } from "@/components/ScreenHeader";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return JOBS.map((j) => ({ id: j.id }));
}

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const job = JOBS.find((j) => j.id === params.id);
  if (!job) notFound();

  return (
    <div className="flex flex-col min-h-full">
      <ScreenHeader title="Job Details" backHref="/app" />

      <div className="flex-1 px-5 pt-4 pb-6">
        <span className="inline-block rounded-full bg-brand-50 px-3 py-1 text-[11px] font-semibold uppercase text-brand-700">
          {job.category} · {job.subcategory}
        </span>
        <h1 className="mt-3 text-xl font-bold text-ink-900 leading-tight">
          {job.title}
        </h1>
        <p className="mt-1 text-sm text-ink-500">
          Posted by {job.postedBy} · {job.postedAt}
        </p>

        <div className="mt-5 rounded-2xl bg-brand-50 p-4">
          <p className="text-xs font-semibold uppercase text-brand-700">Budget</p>
          <p className="mt-1 text-2xl font-bold text-ink-900">
            {formatZAR(job.budgetMin)} – {formatZAR(job.budgetMax)}
          </p>
          <p className="text-xs text-ink-500">Paid into your wallet on completion</p>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2 text-center">
          <Stat label="Distance" value={`${job.distanceKm} km`} />
          <Stat label="Applicants" value={`${job.applicants}`} />
          <Stat label="Status" value={job.status} />
        </div>

        <h2 className="mt-6 text-sm font-semibold text-ink-900">Description</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-700">{job.description}</p>

        <h2 className="mt-6 text-sm font-semibold text-ink-900">Location</h2>
        <div className="mt-2 flex items-center gap-2 rounded-xl border border-ink-100 bg-white p-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50">
            📍
          </div>
          <div>
            <p className="text-sm font-medium text-ink-900">{job.location}</p>
            <p className="text-[11px] text-ink-500">Exact address shared after acceptance</p>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-3">
          <p className="text-[11px] font-semibold uppercase text-amber-800">Safe payment</p>
          <p className="text-xs text-amber-900 mt-0.5">
            Funds held in escrow. Released to you when the client confirms the job is done.
          </p>
        </div>
      </div>

      <div className="sticky bottom-0 border-t border-ink-100 bg-white p-4">
        <button className="w-full rounded-xl bg-brand-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/20">
          Apply for this job
        </button>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-ink-100 bg-white p-2.5">
      <p className="text-[10px] uppercase text-ink-500">{label}</p>
      <p className="mt-0.5 text-sm font-bold text-ink-900">{value}</p>
    </div>
  );
}

import Link from "next/link";
import { Job, formatZAR } from "@/lib/mock-data";

export function JobCard({ job }: { job: Job }) {
  return (
    <Link
      href={`/app/jobs/${job.id}`}
      className="block rounded-2xl border border-ink-100 bg-white p-4 shadow-sm active:scale-[0.99] transition"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-600">
            {job.category} · {job.subcategory}
          </p>
          <h3 className="mt-1 font-semibold text-ink-900 leading-snug">
            {job.title}
          </h3>
          <p className="mt-1 text-xs text-ink-500 line-clamp-2">
            {job.description}
          </p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-sm font-bold text-ink-900">
            {formatZAR(job.budgetMin)}
          </p>
          <p className="text-[10px] text-ink-500">
            to {formatZAR(job.budgetMax)}
          </p>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-3 text-[11px] text-ink-500">
        <span className="inline-flex items-center gap-1">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 21s-7-6-7-12a7 7 0 0114 0c0 6-7 12-7 12z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
          {job.distanceKm} km
        </span>
        <span>·</span>
        <span>{job.postedAt}</span>
        <span>·</span>
        <span>{job.applicants} applied</span>
      </div>
    </Link>
  );
}

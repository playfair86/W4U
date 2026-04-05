import { CURRENT_USER, JOBS, SERVICE_CATEGORIES, WALLET_BALANCE, formatZAR } from "@/lib/mock-data";
import { JobCard } from "@/components/JobCard";
import { TrustBadge } from "@/components/TrustBadge";
import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      {/* Hero header */}
      <header className="bg-gradient-to-br from-brand-700 to-brand-500 px-5 pt-8 pb-20 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs opacity-80">Good morning,</p>
            <h1 className="text-xl font-bold">{CURRENT_USER.name} 👋</h1>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-lg font-bold">
            {CURRENT_USER.avatarInitial}
          </div>
        </div>
        <div className="mt-3">
          <TrustBadge tier={CURRENT_USER.trustTier} />
        </div>
      </header>

      {/* Balance card - overlaps header */}
      <div className="-mt-14 px-5">
        <Link
          href="/app/wallet"
          className="block rounded-2xl bg-white p-5 shadow-lg border border-ink-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase text-ink-500">
                Wallet balance
              </p>
              <p className="mt-1 text-3xl font-bold text-ink-900">
                {formatZAR(WALLET_BALANCE)}
              </p>
              <p className="mt-0.5 text-xs text-brand-600 font-medium">
                +R828.75 today
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1B7A3D" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </div>
          </div>
        </Link>
      </div>

      {/* Categories */}
      <section className="mt-6 px-5">
        <h2 className="mb-3 text-sm font-semibold text-ink-900">Categories</h2>
        <div className="-mx-5 overflow-x-auto px-5 phone-scroll">
          <div className="flex gap-2 pb-1">
            {SERVICE_CATEGORIES.map((c) => (
              <button
                key={c.name}
                className="shrink-0 rounded-full border border-ink-100 bg-white px-3.5 py-2 text-xs font-medium text-ink-700 shadow-sm"
              >
                <span className="mr-1">{c.icon}</span>
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Jobs near you */}
      <section className="mt-6 px-5 pb-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-ink-900">Jobs near you</h2>
          <button className="text-xs font-semibold text-brand-600">See all</button>
        </div>
        <div className="space-y-3">
          {JOBS.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </section>
    </div>
  );
}

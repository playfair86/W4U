import Link from "next/link";
import { Logo } from "@/components/Logo";
import { TrustBadge } from "@/components/TrustBadge";
import { JobCard } from "@/components/JobCard";
import {
  ACTIVITY_FEED,
  CURRENT_USER,
  JOBS,
  PROVIDERS,
  SERVICE_CATEGORIES,
  WALLET_BALANCE,
  formatZAR,
} from "@/lib/mock-data";

export default function HomePage() {
  const topRated = PROVIDERS.filter((p) => p.id !== CURRENT_USER.id).slice(0, 4);

  return (
    <div className="pb-4">
      {/* Header */}
      <header className="flex items-center justify-between px-5 pt-6 pb-4 bg-white">
        <Logo size="sm" />
        <div className="flex items-center gap-3">
          <Link
            href="/app/notifications"
            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-ink-100 text-ink-700 hover:bg-ink-100"
            aria-label="Notifications"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 8a6 6 0 0112 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 003.4 0" />
            </svg>
            <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-gold-500 px-1 text-[9px] font-bold text-white">
              2
            </span>
          </Link>
          <Link href="/app/profile" className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
            {CURRENT_USER.avatarInitial}
          </Link>
        </div>
      </header>

      {/* Greeting */}
      <div className="px-5 pb-4">
        <p className="text-xs text-ink-500">Sawubona,</p>
        <h1 className="text-2xl font-bold text-ink-900">
          {CURRENT_USER.name.split(" ")[0]} 👋
        </h1>
        <div className="mt-2">
          <TrustBadge tier={CURRENT_USER.trustTier} />
        </div>
      </div>

      {/* Wallet gradient card */}
      <div className="px-5">
        <div className="rounded-2xl bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 p-5 text-white shadow-lg shadow-brand-900/20">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider opacity-70">
                Wallet balance
              </p>
              <p className="mt-1 text-4xl font-bold tracking-tight">
                {formatZAR(WALLET_BALANCE)}
              </p>
              <p className="mt-1 text-[11px] text-gold-100 opacity-90">
                + R828.75 earned today
              </p>
            </div>
            <Link
              href="/app/wallet"
              className="rounded-full bg-white/15 p-2 hover:bg-white/25"
              aria-label="Open wallet"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </Link>
          </div>
          <div className="mt-4 flex gap-2">
            <QuickAction href="/app/wallet" label="Withdraw" />
            <QuickAction href="/app/wallet" label="Fund" />
            <QuickAction href="/app/wallet" label="History" />
          </div>
        </div>
      </div>

      {/* QR card */}
      <div className="mt-4 px-5">
        <Link
          href="/app/qr"
          className="flex items-center gap-3 rounded-2xl border border-ink-100 bg-white p-4 shadow-sm"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-50">
            <QrIcon />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-ink-900">My QR Code</p>
            <p className="text-[11px] text-ink-500">
              Share or print for easy tipping & payments
            </p>
          </div>
          <span className="text-xs font-semibold text-brand-600">View ›</span>
        </Link>
      </div>

      {/* Stats strip */}
      <div className="mt-4 grid grid-cols-3 gap-2 px-5">
        <StatBlock value="R3 420" label="This week" />
        <StatBlock value={`${CURRENT_USER.averageRating} ★`} label="Rating" />
        <StatBlock value="142" label="Profile views" />
      </div>

      {/* Categories */}
      <section className="mt-6 px-5">
        <h2 className="mb-3 text-sm font-semibold text-ink-900">Browse services</h2>
        <div className="-mx-5 overflow-x-auto px-5 phone-scroll">
          <div className="flex gap-2 pb-1">
            {SERVICE_CATEGORIES.map((c) => (
              <Link
                key={c.name}
                href="/app/search"
                className="flex shrink-0 flex-col items-center gap-1 rounded-2xl border border-ink-100 bg-white px-4 py-3 shadow-sm hover:bg-brand-50"
              >
                <span className="text-2xl">{c.icon}</span>
                <span className="text-[11px] font-medium text-ink-700">{c.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Top rated providers */}
      <section className="mt-6 px-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-ink-900">Top rated near you</h2>
          <button className="text-xs font-semibold text-brand-600">See all</button>
        </div>
        <div className="-mx-5 overflow-x-auto px-5 phone-scroll">
          <div className="flex gap-3 pb-1">
            {topRated.map((p) => (
              <Link
                key={p.id}
                href={`/app/providers/${p.id}`}
                className="flex w-[160px] shrink-0 flex-col rounded-2xl border border-ink-100 bg-white p-3 shadow-sm"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-sm font-bold text-white">
                  {p.avatarInitial}
                </div>
                <p className="mt-2 text-sm font-semibold text-ink-900 line-clamp-1">
                  {p.name}
                </p>
                <p className="text-[11px] text-ink-500 line-clamp-1">
                  {p.categories[0]}
                </p>
                <div className="mt-1.5 flex items-center gap-1 text-[11px]">
                  <span className="text-gold-500">★</span>
                  <span className="font-semibold text-ink-900">
                    {p.averageRating}
                  </span>
                  <span className="text-ink-500">({p.reviewCount})</span>
                </div>
                <div className="mt-2">
                  <TrustBadge tier={p.trustTier} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Activity feed */}
      <section className="mt-6 px-5">
        <h2 className="mb-3 text-sm font-semibold text-ink-900">Recent activity</h2>
        <div className="rounded-2xl border border-ink-100 bg-white divide-y divide-ink-100 overflow-hidden">
          {ACTIVITY_FEED.slice(0, 4).map((a) => (
            <div key={a.id} className="flex items-center gap-3 px-4 py-3">
              <span className="text-lg">{a.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-ink-900 truncate">
                  {a.text}
                </p>
                <p className="text-[10px] text-ink-500">{a.time}</p>
              </div>
              {a.amount !== undefined && (
                <p className="text-sm font-bold text-brand-600">
                  +{formatZAR(a.amount)}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Jobs near you */}
      <section className="mt-6 px-5 pb-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-ink-900">Jobs near you</h2>
          <Link href="/app/search" className="text-xs font-semibold text-brand-600">
            See all
          </Link>
        </div>
        <div className="space-y-3">
          {JOBS.slice(0, 3).map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </section>
    </div>
  );
}

function QuickAction({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="rounded-full bg-white/20 px-3.5 py-1.5 text-[11px] font-semibold text-white backdrop-blur hover:bg-white/30"
    >
      {label}
    </Link>
  );
}

function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl bg-brand-50 p-3 text-center">
      <p className="text-base font-bold text-ink-900">{value}</p>
      <p className="text-[10px] text-ink-500">{label}</p>
    </div>
  );
}

function QrIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#1B7A4E" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <path d="M14 14h3v3h-3zM19 14h2M14 19h2v2h-2zM19 19v2" strokeLinecap="round" />
    </svg>
  );
}

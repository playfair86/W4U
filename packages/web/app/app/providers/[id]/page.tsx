import { ScreenHeader } from "@/components/ScreenHeader";
import { TrustBadge } from "@/components/TrustBadge";
import {
  PORTFOLIO_COLORS,
  PROVIDERS,
  REVIEWS_OF_CURRENT_USER,
} from "@/lib/mock-data";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return PROVIDERS.map((p) => ({ id: p.id }));
}

export default function ProviderProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const p = PROVIDERS.find((x) => x.id === params.id);
  if (!p) notFound();

  return (
    <div className="flex min-h-full flex-col">
      <ScreenHeader title="Profile" backHref="/app" />

      {/* Cover + avatar */}
      <div className="relative h-28 bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800">
        <div className="absolute inset-x-0 -bottom-10 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-brand-500 to-brand-700 text-2xl font-bold text-white shadow-lg">
            {p.avatarInitial}
          </div>
        </div>
      </div>

      <div className="px-5 pt-12 text-center">
        <h1 className="text-xl font-bold text-ink-900">{p.name}</h1>
        <p className="text-xs text-ink-500">{p.headline}</p>
        <p className="mt-0.5 text-[11px] text-ink-500">{p.location}</p>
        <div className="mt-2 flex items-center justify-center gap-1 text-sm">
          <span className="text-gold-500">★</span>
          <span className="font-bold text-ink-900">{p.averageRating}</span>
          <span className="text-ink-500">({p.reviewCount} reviews)</span>
        </div>
      </div>

      {/* Trust badges row */}
      <div className="mt-4 flex flex-wrap justify-center gap-1.5 px-5">
        <TrustBadge tier={p.trustTier} />
        <span className="inline-flex items-center gap-1 rounded-full border border-gold-300 bg-gold-50 px-2 py-0.5 text-[10px] font-semibold text-gold-700">
          ★ Skills Verified
        </span>
        <span className="inline-flex items-center gap-1 rounded-full border border-brand-200 bg-brand-50 px-2 py-0.5 text-[10px] font-semibold text-brand-700">
          ☺ 8 Vouches
        </span>
      </div>

      {/* Stats row */}
      <div className="mt-5 grid grid-cols-3 gap-2 px-5">
        <StatBox value={`${p.completedJobs}`} label="Jobs done" />
        <StatBox value={`${p.reviewCount}`} label="Reviews" />
        <StatBox value={`${p.trustScore}`} label="Trust score" />
      </div>

      {/* About */}
      <section className="mt-6 px-5">
        <h2 className="mb-2 text-sm font-semibold text-ink-900">About</h2>
        <p className="text-xs leading-relaxed text-ink-700">
          Professional {p.categories[0].toLowerCase()} with{" "}
          {Math.max(5, Math.floor(p.completedJobs / 10))} years experience.
          I specialise in interior and exterior work, colour consultation, and
          finishing. References available on request. Licensed, insured, and
          committed to high-quality work.
        </p>
      </section>

      {/* Portfolio */}
      <section className="mt-6 px-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-ink-900">Portfolio</h2>
          <span className="text-[11px] text-ink-500">6 photos</span>
        </div>
        <div className="mt-2 grid grid-cols-3 gap-1.5">
          {PORTFOLIO_COLORS.map((c, i) => (
            <div
              key={i}
              className={`aspect-square rounded-lg bg-gradient-to-br ${c} border border-white/50`}
            />
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mt-6 px-5">
        <h2 className="mb-2 text-sm font-semibold text-ink-900">Skills</h2>
        <div className="flex flex-wrap gap-1.5">
          {p.categories.map((c) => (
            <span
              key={c}
              className="rounded-full bg-brand-50 px-3 py-1 text-[11px] font-medium text-brand-700"
            >
              {c}
            </span>
          ))}
          {p.languages.map((l) => (
            <span
              key={l}
              className="rounded-full bg-ink-100 px-3 py-1 text-[11px] font-medium text-ink-700"
            >
              {l}
            </span>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="mt-6 px-5 pb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-ink-900">Reviews</h2>
          <button className="text-[11px] font-semibold text-brand-600">
            See all
          </button>
        </div>
        <div className="mt-2 space-y-3">
          {REVIEWS_OF_CURRENT_USER.slice(0, 3).map((r) => (
            <div
              key={r.id}
              className="rounded-2xl border border-ink-100 bg-white p-3.5"
            >
              <div className="flex items-start gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-ink-300 to-ink-500 text-xs font-bold text-white">
                  {r.reviewerInitial}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-ink-900">
                      {r.reviewer}
                    </p>
                    <span className="text-[10px] text-ink-500">{r.date}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px]">
                    <span className="text-gold-500">
                      {"★".repeat(r.rating)}
                      {"☆".repeat(5 - r.rating)}
                    </span>
                    <span className="text-ink-500">· {r.job}</span>
                  </div>
                  <p className="mt-1 text-[11px] leading-relaxed text-ink-700">
                    {r.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sticky action bar */}
      <div className="sticky bottom-0 flex gap-2 border-t border-ink-100 bg-white p-3">
        <button className="flex-1 rounded-full border border-brand-600 bg-white py-2.5 text-xs font-bold text-brand-600">
          Message
        </button>
        <button className="flex-1 rounded-full border border-gold-500 bg-gold-50 py-2.5 text-xs font-bold text-gold-700">
          Tip
        </button>
        <button className="flex-1 rounded-full bg-brand-600 py-2.5 text-xs font-bold text-white">
          Hire
        </button>
      </div>
    </div>
  );
}

function StatBox({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl bg-brand-50 p-3 text-center">
      <p className="text-base font-bold text-ink-900">{value}</p>
      <p className="text-[10px] text-ink-500">{label}</p>
    </div>
  );
}

import Link from "next/link";
import { ScreenHeader } from "@/components/ScreenHeader";
import { TrustBadge } from "@/components/TrustBadge";
import { CURRENT_USER, TRUST_TIER_RANK } from "@/lib/mock-data";

export default function ProfilePage() {
  const rank = TRUST_TIER_RANK[CURRENT_USER.trustTier];
  const progress = (rank / 5) * 100;

  return (
    <div>
      <ScreenHeader title="Profile" backHref="/app" />

      <section className="px-5 pt-6 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-brand-400 text-3xl font-bold text-white shadow-lg">
          {CURRENT_USER.avatarInitial}
        </div>
        <h1 className="mt-3 text-xl font-bold text-ink-900">{CURRENT_USER.name}</h1>
        <p className="text-sm text-ink-500">{CURRENT_USER.headline}</p>
        <div className="mt-2 flex justify-center">
          <TrustBadge tier={CURRENT_USER.trustTier} size="md" />
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3">
          <Stat value={CURRENT_USER.completedJobs.toString()} label="Jobs done" />
          <Stat value={`${CURRENT_USER.averageRating} ★`} label={`${CURRENT_USER.reviewCount} reviews`} />
          <Stat value={`${CURRENT_USER.trustScore}`} label="Trust score" />
        </div>
      </section>

      <section className="mt-6 px-5">
        <div className="rounded-2xl border border-ink-100 bg-white p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-ink-900">Trust progress</h3>
            <span className="text-xs text-ink-500">Tier {rank} of 5</span>
          </div>
          <div className="mt-3 h-2 rounded-full bg-ink-100 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand-400 to-brand-600"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-3 text-xs text-ink-500">
            Complete 5 more jobs with a 4.8★+ rating to reach{" "}
            <span className="font-semibold text-brand-600">Community Vouched</span>.
          </p>
        </div>
      </section>

      <section className="mt-5 px-5">
        <h3 className="mb-2 text-sm font-semibold text-ink-900">Skills & categories</h3>
        <div className="flex flex-wrap gap-2">
          {CURRENT_USER.categories.map((c) => (
            <span
              key={c}
              className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700"
            >
              {c}
            </span>
          ))}
        </div>
        <h3 className="mt-4 mb-2 text-sm font-semibold text-ink-900">Languages</h3>
        <div className="flex flex-wrap gap-2">
          {CURRENT_USER.languages.map((l) => (
            <span
              key={l}
              className="rounded-full bg-ink-100 px-3 py-1 text-xs font-medium text-ink-700"
            >
              {l}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-6 px-5 pb-6">
        <div className="divide-y divide-ink-100 rounded-2xl border border-ink-100 bg-white overflow-hidden">
          <MenuRow icon="🆔" label="Verification & documents" />
          <MenuRow icon="🔔" label="Notifications" />
          <MenuRow icon="🌍" label="Language" value="English" />
          <MenuRow icon="🛡️" label="Privacy & safety" />
          <MenuRow icon="❓" label="Help & support" />
        </div>
        <Link
          href="/"
          className="mt-4 block text-center text-sm font-semibold text-ink-500"
        >
          Sign out
        </Link>
      </section>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-ink-100 bg-white p-3">
      <p className="text-lg font-bold text-ink-900">{value}</p>
      <p className="text-[10px] text-ink-500">{label}</p>
    </div>
  );
}

function MenuRow({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value?: string;
}) {
  return (
    <button className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left hover:bg-ink-100/50">
      <div className="flex items-center gap-3">
        <span className="text-lg">{icon}</span>
        <span className="text-sm font-medium text-ink-900">{label}</span>
      </div>
      <div className="flex items-center gap-1 text-xs text-ink-500">
        {value}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 6l6 6-6 6" />
        </svg>
      </div>
    </button>
  );
}

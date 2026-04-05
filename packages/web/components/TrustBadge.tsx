import { TRUST_TIER_LABEL, TRUST_TIER_RANK, TrustTier } from "@/lib/mock-data";

const TIER_STYLES: Record<TrustTier, string> = {
  UNVERIFIED: "bg-ink-100 text-ink-500 border-ink-300",
  ID_VERIFIED: "bg-blue-50 text-blue-700 border-blue-200",
  SKILLS_VERIFIED: "bg-brand-50 text-brand-700 border-brand-200",
  COMMUNITY_VOUCHED: "bg-amber-50 text-amber-800 border-amber-200",
  FULLY_VETTED: "bg-gradient-to-r from-brand-600 to-brand-500 text-white border-brand-700",
};

export function TrustBadge({
  tier,
  size = "sm",
}: {
  tier: TrustTier;
  size?: "sm" | "md";
}) {
  const rank = TRUST_TIER_RANK[tier];
  const dots = "●".repeat(rank) + "○".repeat(5 - rank);
  const padding = size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border font-medium ${TIER_STYLES[tier]} ${padding}`}
    >
      <span className="tracking-tighter">{dots}</span>
      {TRUST_TIER_LABEL[tier]}
    </span>
  );
}

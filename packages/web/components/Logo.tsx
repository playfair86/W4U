type Size = "sm" | "md" | "lg" | "xl";

const SIZES: Record<
  Size,
  { wordmark: string; tagline: string; gap: string }
> = {
  sm: { wordmark: "text-xl", tagline: "text-[7px] tracking-[0.3em]", gap: "-mt-0.5" },
  md: { wordmark: "text-3xl", tagline: "text-[9px] tracking-[0.35em]", gap: "-mt-0.5" },
  lg: { wordmark: "text-5xl", tagline: "text-[11px] tracking-[0.4em]", gap: "mt-0" },
  xl: { wordmark: "text-6xl", tagline: "text-xs tracking-[0.45em]", gap: "mt-1" },
};

export function Logo({
  size = "md",
  showTagline = false,
  className = "",
}: {
  size?: Size;
  showTagline?: boolean;
  className?: string;
}) {
  const s = SIZES[size];
  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      <div className={`font-black leading-none ${s.wordmark}`}>
        <span className="text-brand-600">W</span>
        <span className="text-gold-500">4</span>
        <span className="text-brand-600">U</span>
      </div>
      {showTagline && (
        <div className={`font-semibold text-ink-500 ${s.tagline} ${s.gap}`}>
          WORK FOR YOU
        </div>
      )}
    </div>
  );
}

export function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <div
      className="flex items-center justify-center rounded-xl bg-white shadow-sm border border-brand-100"
      style={{ width: size, height: size }}
    >
      <span className="font-black leading-none" style={{ fontSize: size * 0.5 }}>
        <span className="text-brand-600">W</span>
        <span className="text-gold-500">4</span>
        <span className="text-brand-600">U</span>
      </span>
    </div>
  );
}

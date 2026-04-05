import { ScreenHeader } from "@/components/ScreenHeader";
import { CURRENT_USER } from "@/lib/mock-data";
import { TrustBadge } from "@/components/TrustBadge";
import { Logo } from "@/components/Logo";

// Decorative QR pattern - pure CSS grid of squares matching visual appearance
function QrPattern() {
  // Fixed pattern so rendering is deterministic
  const pattern = [
    "1111111011101111111",
    "1000001011001000001",
    "1011101010101011101",
    "1011101001101011101",
    "1011101010001011101",
    "1000001011101000001",
    "1111111010101111111",
    "0000000011100000000",
    "1011110110011011010",
    "0110001001101100101",
    "1010110110100010110",
    "0101011001011101001",
    "1101100110010011010",
    "0000000110101101011",
    "1111111001101010110",
    "1000001011100101001",
    "1011101010011011010",
    "1011101101001101100",
    "1111111010110100101",
  ];

  return (
    <div
      className="grid rounded-xl bg-white p-3"
      style={{
        gridTemplateColumns: `repeat(${pattern[0].length}, 1fr)`,
        width: 240,
        height: 240,
      }}
    >
      {pattern.flatMap((row, y) =>
        row.split("").map((cell, x) => (
          <div
            key={`${x}-${y}`}
            className={cell === "1" ? "bg-ink-900" : "bg-white"}
          />
        ))
      )}
    </div>
  );
}

export default function MyQrPage() {
  return (
    <div className="flex min-h-full flex-col bg-gradient-to-b from-brand-50 to-white">
      <ScreenHeader title="My QR Code" backHref="/app" />

      <div className="flex flex-1 flex-col items-center px-6 pt-6 pb-6">
        {/* QR card */}
        <div className="relative w-full max-w-xs rounded-3xl bg-white p-6 shadow-xl shadow-brand-900/10 border border-ink-100">
          <div className="flex items-center justify-center">
            <Logo size="sm" />
          </div>
          <p className="mt-1 text-center text-[9px] font-semibold uppercase tracking-[0.3em] text-ink-500">
            Work For You
          </p>

          <div className="mt-4 flex justify-center">
            <QrPattern />
          </div>

          <div className="mt-4 text-center">
            <p className="text-base font-bold text-ink-900">{CURRENT_USER.name}</p>
            <p className="text-xs text-ink-500">{CURRENT_USER.headline}</p>
            <div className="mt-2 flex justify-center">
              <TrustBadge tier={CURRENT_USER.trustTier} />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-1 text-[11px]">
            <span className="text-gold-500">★</span>
            <span className="font-bold text-ink-900">
              {CURRENT_USER.averageRating}
            </span>
            <span className="text-ink-500">· {CURRENT_USER.reviewCount} reviews</span>
          </div>
        </div>

        <p className="mt-5 max-w-xs text-center text-xs text-ink-500">
          Share this QR so anyone can send you a tip or pay you — even without the W4U app.
        </p>

        <div className="mt-6 flex w-full max-w-xs gap-2">
          <button className="flex-1 rounded-full bg-brand-600 py-3 text-sm font-bold text-white">
            Share
          </button>
          <button className="flex-1 rounded-full border border-brand-600 bg-white py-3 text-sm font-bold text-brand-600">
            Download
          </button>
        </div>
        <button className="mt-3 text-xs font-semibold text-ink-500">
          Print poster for shop/vehicle
        </button>
      </div>
    </div>
  );
}

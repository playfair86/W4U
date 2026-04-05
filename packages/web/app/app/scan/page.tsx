"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ScreenHeader } from "@/components/ScreenHeader";
import { PROVIDERS, formatZAR } from "@/lib/mock-data";

const AMOUNTS = [5, 10, 20, 50, 100];

export default function ScanPage() {
  const router = useRouter();
  const provider = PROVIDERS.find((p) => p.id === "u_thabo")!;
  const [amount, setAmount] = useState(10);
  const [rating, setRating] = useState(5);
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="flex min-h-full flex-col">
        <ScreenHeader title="Tip sent" backHref="/app" />
        <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-brand-50 text-5xl">
            💚
          </div>
          <h2 className="mt-6 text-2xl font-bold text-ink-900">Tip sent!</h2>
          <p className="mt-2 text-sm text-ink-500">
            {formatZAR(amount)} sent to {provider.name}
          </p>
          <p className="mt-1 text-xs text-ink-500">
            Their wallet balance will update instantly
          </p>
          <button
            onClick={() => router.push("/app")}
            className="mt-8 rounded-full bg-brand-600 px-8 py-3 text-sm font-bold text-white"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-col">
      <ScreenHeader title="Scan & Tip" backHref="/app" />

      {/* Camera viewfinder */}
      <div className="relative flex h-60 items-center justify-center bg-ink-900">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-900/50 via-transparent to-ink-900" />
        <div className="relative flex h-40 w-40 items-center justify-center rounded-2xl border-2 border-white/60">
          {/* Corner brackets */}
          <span className="absolute -top-0.5 -left-0.5 h-5 w-5 border-t-4 border-l-4 border-gold-500 rounded-tl-xl" />
          <span className="absolute -top-0.5 -right-0.5 h-5 w-5 border-t-4 border-r-4 border-gold-500 rounded-tr-xl" />
          <span className="absolute -bottom-0.5 -left-0.5 h-5 w-5 border-b-4 border-l-4 border-gold-500 rounded-bl-xl" />
          <span className="absolute -bottom-0.5 -right-0.5 h-5 w-5 border-b-4 border-r-4 border-gold-500 rounded-br-xl" />
          <p className="text-[11px] text-white/60">Scanning…</p>
        </div>
        <p className="absolute bottom-3 text-[10px] text-white/60">
          Point camera at W4U QR code
        </p>
      </div>

      <div className="flex-1 px-5 pt-4 pb-6">
        {/* Detected provider */}
        <div className="flex items-center gap-3 rounded-2xl border border-ink-100 bg-white p-3.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-base font-bold text-white">
            {provider.avatarInitial}
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-ink-900">
              {provider.name}
            </p>
            <p className="text-[11px] text-ink-500">{provider.headline}</p>
            <div className="mt-0.5 flex items-center gap-1 text-[11px]">
              <span className="text-gold-500">★★★★</span>
              <span className="font-semibold">{provider.averageRating}</span>
              <span className="text-ink-500">({provider.reviewCount})</span>
            </div>
          </div>
          <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[9px] font-bold text-brand-700">
            VERIFIED
          </span>
        </div>

        {/* Tip amounts */}
        <p className="mt-6 text-xs font-semibold text-ink-900">Tip amount</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {AMOUNTS.map((a) => (
            <button
              key={a}
              onClick={() => setAmount(a)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                amount === a
                  ? "border-brand-600 bg-brand-50 text-brand-700"
                  : "border-ink-100 bg-white text-ink-700"
              }`}
            >
              R{a}
            </button>
          ))}
          <button className="rounded-full border border-ink-100 bg-white px-4 py-2 text-sm font-semibold text-ink-500">
            Custom
          </button>
        </div>

        {/* Quick rate */}
        <p className="mt-6 text-xs font-semibold text-ink-900">
          Quick rate (optional)
        </p>
        <div className="mt-2 flex gap-1.5">
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} onClick={() => setRating(n)} className="text-3xl">
              <span className={n <= rating ? "text-gold-500" : "text-ink-300"}>
                ★
              </span>
            </button>
          ))}
        </div>

        {/* Fee disclosure */}
        <div className="mt-5 rounded-xl bg-ink-100/70 p-3 text-[11px] text-ink-500">
          <div className="flex justify-between">
            <span>Tip amount</span>
            <span className="font-semibold text-ink-900">{formatZAR(amount)}</span>
          </div>
          <div className="mt-0.5 flex justify-between">
            <span>W4U fee (1.5%)</span>
            <span>{formatZAR(amount * 0.015)}</span>
          </div>
          <div className="mt-1 border-t border-ink-300 pt-1 flex justify-between font-semibold text-ink-900">
            <span>{provider.name.split(" ")[0]} receives</span>
            <span className="text-brand-600">
              {formatZAR(amount * 0.985)}
            </span>
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 border-t border-ink-100 bg-white p-4">
        <button
          onClick={() => setSent(true)}
          className="w-full rounded-xl bg-brand-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-600/20"
        >
          Send {formatZAR(amount)} tip
        </button>
      </div>
    </div>
  );
}

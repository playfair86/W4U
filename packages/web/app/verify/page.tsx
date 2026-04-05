"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";

function VerifyInner() {
  const router = useRouter();
  const params = useSearchParams();
  const phone = params.get("phone") ?? "";
  const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
  const [seconds, setSeconds] = useState(45);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  const code = digits.join("");

  useEffect(() => {
    if (code.length === 6) {
      setTimeout(() => router.push("/app"), 350);
    }
  }, [code, router]);

  const setAt = (i: number, v: string) => {
    const next = [...digits];
    next[i] = v.slice(-1);
    setDigits(next);
    if (v && i < 5) inputs.current[i + 1]?.focus();
  };

  return (
    <PhoneFrame>
      <div className="flex flex-col px-6 pt-10 pb-6">
        <button onClick={() => router.back()} className="text-ink-500 text-sm mb-8 self-start">
          ← Back
        </button>
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-2xl">
          📱
        </div>
        <h1 className="mt-6 text-2xl font-bold text-ink-900">Enter the 6-digit code</h1>
        <p className="mt-2 text-sm text-ink-500">
          We sent a code to <span className="font-semibold text-ink-900">+27 {phone}</span>
        </p>

        <div className="mt-8 flex justify-between gap-2">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => {
                inputs.current[i] = el;
              }}
              value={d}
              onChange={(e) => setAt(i, e.target.value.replace(/\D/g, ""))}
              onKeyDown={(e) => {
                if (e.key === "Backspace" && !digits[i] && i > 0) {
                  inputs.current[i - 1]?.focus();
                }
              }}
              inputMode="numeric"
              maxLength={1}
              className="h-14 w-12 rounded-xl border-2 border-ink-300 bg-white text-center text-xl font-bold outline-none focus:border-brand-600"
            />
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-ink-500">
          {seconds > 0 ? (
            <>Resend code in {seconds}s</>
          ) : (
            <button className="font-semibold text-brand-600">Resend code</button>
          )}
        </p>

        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-3 text-center">
          <p className="text-[11px] font-semibold uppercase text-amber-800">Demo mode</p>
          <p className="text-xs text-amber-900">
            Type any 6 digits to continue to the app
          </p>
        </div>
      </div>
    </PhoneFrame>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<PhoneFrame><div /></PhoneFrame>}>
      <VerifyInner />
    </Suspense>
  );
}

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PhoneFrame } from "@/components/PhoneFrame";
import { ScreenHeader } from "@/components/ScreenHeader";

export default function VerifyIdPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  return (
    <PhoneFrame>
      <ScreenHeader title="Verify your identity" />
      <div className="flex-1 px-6 pt-6 pb-6 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-600">
          Step {step === 3 ? 2 : step} of 2
        </p>
        <h1 className="mt-1 text-xl font-bold text-ink-900">
          {step === 1 && "Scan your SA ID"}
          {step === 2 && "Take a selfie"}
          {step === 3 && "You're verified! 🎉"}
        </h1>
        <p className="mt-1 text-xs text-ink-500">
          {step === 1 && "This takes less than 2 minutes"}
          {step === 2 && "We'll match your face to your ID photo"}
          {step === 3 && "Your ID Verified badge is active"}
        </p>

        {step !== 3 ? (
          <div className="relative mt-6 flex h-56 items-center justify-center rounded-2xl bg-ink-900">
            <div className="flex h-36 w-56 items-center justify-center rounded-xl border-2 border-dashed border-white/40">
              <p className="text-[11px] text-white/60">
                {step === 1
                  ? "Position your ID card here"
                  : "Position your face in the frame"}
              </p>
            </div>
            <div className="absolute top-3 right-3 rounded-full bg-brand-600 px-2 py-0.5 text-[9px] font-bold uppercase text-white">
              {step === 1 ? "ID" : "Selfie"}
            </div>
          </div>
        ) : (
          <div className="mt-6 flex h-56 items-center justify-center">
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-brand-50">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-brand-600 text-5xl text-white">
                ✓
              </div>
            </div>
          </div>
        )}

        {step !== 3 && (
          <p className="mt-4 text-[11px] text-ink-500">
            Hold steady in good lighting. We'll extract your details automatically.
          </p>
        )}

        <button
          onClick={() => {
            if (step === 1) setStep(2);
            else if (step === 2) setStep(3);
            else router.push("/app");
          }}
          className="mt-6 w-full rounded-full bg-brand-600 py-3.5 text-sm font-bold text-white"
        >
          {step === 1 && "Take Photo"}
          {step === 2 && "Take Selfie"}
          {step === 3 && "Continue to app"}
        </button>

        {step !== 3 && (
          <div className="mt-6 rounded-2xl bg-brand-50 p-4 text-left">
            <p className="text-xs font-semibold text-brand-700">
              After verification you'll unlock:
            </p>
            <ul className="mt-2 space-y-1 text-[11px] text-ink-700">
              <li>✓ ID Verified badge</li>
              <li>✓ Receive tips & payments</li>
              <li>✓ Appear in search results</li>
              <li>✓ Build your reputation</li>
            </ul>
          </div>
        )}
      </div>
    </PhoneFrame>
  );
}

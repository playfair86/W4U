"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Logo } from "@/components/Logo";
import { LANGUAGES } from "@/lib/mock-data";

export default function OnboardPage() {
  const router = useRouter();
  const [lang, setLang] = useState("en");

  return (
    <PhoneFrame>
      <div className="flex flex-1 flex-col bg-gradient-to-b from-brand-50 via-white to-white px-6 pt-14 pb-8">
        <div className="flex-1 flex flex-col items-center">
          <Logo size="xl" showTagline />

          <p className="mt-12 text-center text-sm font-semibold text-ink-700">
            Choose your language
          </p>
          <p className="mt-1 text-center text-[11px] text-ink-500">
            Khetha ulimi · Kies jou taal · Kgetha puo ya hao
          </p>

          <div className="mt-6 grid w-full grid-cols-2 gap-2">
            {LANGUAGES.slice(0, 6).map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`rounded-xl border px-3 py-2.5 text-xs font-semibold transition ${
                  lang === l.code
                    ? "border-brand-600 bg-brand-50 text-brand-700"
                    : "border-ink-100 bg-white text-ink-700"
                }`}
              >
                {l.name}
              </button>
            ))}
          </div>
          <button className="mt-2 text-[11px] font-semibold text-brand-600">
            + Show all 11 languages
          </button>
        </div>

        <button
          onClick={() => router.push("/register")}
          className="mt-6 w-full rounded-full bg-brand-600 py-4 text-sm font-bold text-white shadow-lg shadow-brand-600/30"
        >
          Get Started
        </button>
        <p className="mt-3 text-center text-[11px] text-ink-500">
          Already have an account?{" "}
          <button className="font-semibold text-brand-600">Sign in</button>
        </p>
      </div>
    </PhoneFrame>
  );
}

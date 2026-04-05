"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Logo } from "@/components/Logo";

type UserType = "PROVIDER" | "CONSUMER" | "BOTH";

const TYPES: { key: UserType; icon: string; title: string; desc: string }[] = [
  { key: "PROVIDER", icon: "🛠️", title: "I Offer Services", desc: "I want to get found, rated, and paid" },
  { key: "CONSUMER", icon: "🔍", title: "I Need Services", desc: "I want to find, hire, and tip" },
  { key: "BOTH", icon: "⇄", title: "Both", desc: "I offer and need services" },
];

export default function RegisterPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [userType, setUserType] = useState<UserType>("PROVIDER");
  const [name, setName] = useState("");

  const canContinue = phone.length >= 9 && name.trim().length >= 2;

  return (
    <PhoneFrame>
      <div className="flex flex-col px-6 pt-8 pb-6">
        <Link href="/onboard" className="text-ink-500 text-sm mb-4 self-start">
          ← Back
        </Link>

        <Logo size="md" />
        <h1 className="mt-6 text-2xl font-bold text-ink-900">Create your account</h1>
        <p className="mt-1 text-sm text-ink-500">
          Enter your mobile number to get started
        </p>

        <form
          className="mt-6 space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            if (canContinue) router.push(`/verify?phone=${encodeURIComponent(phone)}&name=${encodeURIComponent(name)}&type=${userType}`);
          }}
        >
          <div>
            <label className="block text-xs font-semibold text-ink-700 mb-1.5">
              I am...
            </label>
            <div className="space-y-2">
              {TYPES.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setUserType(t.key)}
                  className={`flex w-full items-center gap-3 rounded-xl border-2 p-3.5 text-left transition ${
                    userType === t.key
                      ? "border-brand-600 bg-brand-50"
                      : "border-ink-100 bg-white"
                  }`}
                >
                  <span className="text-2xl">{t.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-ink-900">{t.title}</p>
                    <p className="text-[11px] text-ink-500">{t.desc}</p>
                  </div>
                  {userType === t.key && (
                    <span className="ml-auto text-brand-600 text-lg">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink-700 mb-1.5">
              Full name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Sipho Ndlovu"
              className="w-full rounded-xl border border-ink-300 bg-white px-4 py-3 text-sm outline-none focus:border-brand-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink-700 mb-1.5">
              Mobile number
            </label>
            <div className="flex items-center rounded-xl border border-ink-300 bg-white focus-within:border-brand-600">
              <span className="pl-4 text-sm text-ink-500">🇿🇦 +27</span>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 9))}
                placeholder="82 123 4567"
                inputMode="numeric"
                className="flex-1 bg-transparent px-3 py-3 text-sm outline-none"
              />
            </div>
            <p className="mt-1.5 text-[11px] text-ink-500">
              Standard SMS rates apply. We'll never share your number.
            </p>
          </div>

          <button
            type="submit"
            disabled={!canContinue}
            className="w-full rounded-xl bg-brand-600 py-3.5 text-sm font-semibold text-white disabled:bg-ink-300"
          >
            Send verification code
          </button>

          <p className="text-center text-[11px] text-ink-500">
            By continuing you agree to our{" "}
            <span className="underline">Terms</span> and{" "}
            <span className="underline">Privacy Policy</span>
          </p>
        </form>
      </div>
    </PhoneFrame>
  );
}

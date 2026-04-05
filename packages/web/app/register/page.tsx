"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";

export default function RegisterPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [userType, setUserType] = useState<"PROVIDER" | "CONSUMER">("PROVIDER");
  const [name, setName] = useState("");

  const canContinue = phone.length >= 9 && name.trim().length >= 2;

  return (
    <PhoneFrame>
      <div className="flex flex-col px-6 pt-10 pb-6">
        <Link href="/" className="text-ink-500 text-sm mb-8">
          ← Back
        </Link>

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 text-2xl font-bold text-white">
          W
        </div>
        <h1 className="mt-6 text-2xl font-bold text-ink-900">Create your account</h1>
        <p className="mt-2 text-sm text-ink-500">
          Join W4U in under 2 minutes. We'll send a code to your phone to verify.
        </p>

        <form
          className="mt-8 space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            if (canContinue) router.push(`/verify?phone=${encodeURIComponent(phone)}&name=${encodeURIComponent(name)}&type=${userType}`);
          }}
        >
          <div>
            <label className="block text-xs font-semibold text-ink-700 mb-1.5">
              I want to
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setUserType("PROVIDER")}
                className={`rounded-xl border-2 p-3 text-left transition ${
                  userType === "PROVIDER"
                    ? "border-brand-600 bg-brand-50"
                    : "border-ink-100 bg-white"
                }`}
              >
                <div className="text-xl">💪</div>
                <p className="mt-1 text-sm font-semibold text-ink-900">Find work</p>
                <p className="text-[11px] text-ink-500">Offer my skills</p>
              </button>
              <button
                type="button"
                onClick={() => setUserType("CONSUMER")}
                className={`rounded-xl border-2 p-3 text-left transition ${
                  userType === "CONSUMER"
                    ? "border-brand-600 bg-brand-50"
                    : "border-ink-100 bg-white"
                }`}
              >
                <div className="text-xl">📋</div>
                <p className="mt-1 text-sm font-semibold text-ink-900">Hire someone</p>
                <p className="text-[11px] text-ink-500">Post a job</p>
              </button>
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

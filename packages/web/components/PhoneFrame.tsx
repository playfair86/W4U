"use client";
import { ReactNode } from "react";

/**
 * Wraps in-app screens in a phone-shaped viewport on desktop.
 * On small screens, fills the entire viewport naturally.
 */
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-ink-900 via-brand-800 to-ink-900 md:py-10">
      <div className="mx-auto w-full md:w-[390px] md:h-[820px] md:rounded-[44px] md:shadow-phone bg-white md:overflow-hidden relative flex flex-col min-h-screen md:min-h-0">
        {/* Fake status bar - desktop only */}
        <div className="hidden md:flex items-center justify-between px-8 pt-3 pb-1 text-[11px] font-semibold text-ink-900">
          <span>9:41</span>
          <div className="flex items-center gap-1">
            <span>●●●</span>
            <span>􀙇</span>
            <span>􀋨</span>
          </div>
        </div>
        <div className="flex-1 flex flex-col phone-scroll overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

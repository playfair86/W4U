"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function ScreenHeader({
  title,
  backHref,
  right,
}: {
  title: string;
  backHref?: string;
  right?: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between gap-2 border-b border-ink-100 bg-white/95 px-4 py-3 backdrop-blur">
      {backHref ? (
        <Link href={backHref} className="text-ink-700 -ml-1 p-1">
          <BackArrow />
        </Link>
      ) : (
        <button onClick={() => router.back()} className="text-ink-700 -ml-1 p-1">
          <BackArrow />
        </button>
      )}
      <h1 className="flex-1 text-center text-base font-semibold text-ink-900 truncate">
        {title}
      </h1>
      <div className="w-7 flex justify-end">{right}</div>
    </header>
  );
}

function BackArrow() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

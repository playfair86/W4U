import Link from "next/link";
import { ScreenHeader } from "@/components/ScreenHeader";
import { CONVERSATIONS } from "@/lib/mock-data";

export default function MessagesPage() {
  return (
    <div>
      <ScreenHeader title="Messages" backHref="/app" />

      <div className="px-5 pt-4">
        <div className="flex items-center gap-2 rounded-xl border border-ink-300 bg-white px-3 py-2.5 focus-within:border-brand-600">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5A6B5E" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
          <input
            placeholder="Search messages"
            className="flex-1 bg-transparent text-sm outline-none"
          />
        </div>
      </div>

      <div className="mt-3 divide-y divide-ink-100">
        {CONVERSATIONS.map((c) => (
          <Link
            key={c.id}
            href={`/app/messages/${c.id}`}
            className="flex items-center gap-3 px-5 py-3 hover:bg-brand-50"
          >
            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-base font-bold text-white">
                {c.avatarInitial}
              </div>
              {c.online && (
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-brand-500" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-ink-900 truncate">
                  {c.from}
                </p>
                <span className="text-[10px] text-ink-500 shrink-0">{c.time}</span>
              </div>
              <div className="flex items-center justify-between gap-2 mt-0.5">
                <p
                  className={`text-xs truncate ${
                    c.unread > 0 ? "font-semibold text-ink-900" : "text-ink-500"
                  }`}
                >
                  {c.preview}
                </p>
                {c.unread > 0 && (
                  <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-brand-600 px-1.5 text-[10px] font-bold text-white">
                    {c.unread}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

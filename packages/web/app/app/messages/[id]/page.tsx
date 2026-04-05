import { ScreenHeader } from "@/components/ScreenHeader";
import { CHAT_THREAD, CONVERSATIONS } from "@/lib/mock-data";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return CONVERSATIONS.map((c) => ({ id: c.id }));
}

export default function ChatThreadPage({ params }: { params: { id: string } }) {
  const convo = CONVERSATIONS.find((c) => c.id === params.id);
  if (!convo) notFound();

  return (
    <div className="flex min-h-full flex-col bg-ink-100/50">
      <ScreenHeader title={convo.from} backHref="/app/messages" />

      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        <div className="text-center text-[10px] font-semibold uppercase tracking-wider text-ink-500">
          Today
        </div>
        {CHAT_THREAD.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.fromMe ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[78%] rounded-2xl px-4 py-2.5 ${
                m.fromMe
                  ? "bg-brand-600 text-white rounded-br-sm"
                  : "bg-white border border-ink-100 text-ink-900 rounded-bl-sm"
              }`}
            >
              <p className="text-[13px] leading-snug">{m.text}</p>
              <p
                className={`mt-1 text-[9px] ${
                  m.fromMe ? "text-white/70" : "text-ink-500"
                }`}
              >
                {m.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="sticky bottom-0 border-t border-ink-100 bg-white p-3">
        <div className="flex items-center gap-2">
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-100 text-ink-700">
            +
          </button>
          <input
            placeholder="Type a message…"
            className="flex-1 rounded-full border border-ink-100 bg-ink-100/50 px-4 py-2.5 text-sm outline-none focus:border-brand-600 focus:bg-white"
          />
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-white">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2L11 13" />
              <path d="M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

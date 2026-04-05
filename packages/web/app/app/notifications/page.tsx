import { ScreenHeader } from "@/components/ScreenHeader";
import { NOTIFICATIONS } from "@/lib/mock-data";

export default function NotificationsPage() {
  const unread = NOTIFICATIONS.filter((n) => !n.read);
  const earlier = NOTIFICATIONS.filter((n) => n.read);

  return (
    <div>
      <ScreenHeader title="Notifications" backHref="/app" />

      {unread.length > 0 && (
        <section className="px-5 pt-4">
          <h2 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-ink-500">
            New
          </h2>
          <div className="space-y-2">
            {unread.map((n) => (
              <NotifRow key={n.id} n={n} unread />
            ))}
          </div>
        </section>
      )}

      <section className="px-5 pt-5 pb-6">
        <h2 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-ink-500">
          Earlier
        </h2>
        <div className="space-y-2">
          {earlier.map((n) => (
            <NotifRow key={n.id} n={n} />
          ))}
        </div>
      </section>
    </div>
  );
}

function NotifRow({
  n,
  unread,
}: {
  n: (typeof import("@/lib/mock-data").NOTIFICATIONS)[number];
  unread?: boolean;
}) {
  return (
    <div
      className={`flex items-start gap-3 rounded-2xl border p-3.5 ${
        unread ? "border-brand-100 bg-brand-50/50" : "border-ink-100 bg-white"
      }`}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-lg shadow-sm">
        {n.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-ink-900 truncate">{n.title}</p>
          {unread && <span className="h-2 w-2 rounded-full bg-gold-500" />}
        </div>
        <p className="mt-0.5 text-xs text-ink-700 line-clamp-2">{n.body}</p>
        <p className="mt-1 text-[10px] text-ink-500">{n.time}</p>
      </div>
    </div>
  );
}

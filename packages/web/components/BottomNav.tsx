"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/app", label: "Home", icon: "home" },
  { href: "/app/search", label: "Search", icon: "search" },
  { href: "/app/post", label: "Post", icon: "plus" },
  { href: "/app/wallet", label: "Wallet", icon: "wallet" },
  { href: "/app/profile", label: "Profile", icon: "user" },
] as const;

function Icon({ name, active }: { name: string; active: boolean }) {
  const stroke = active ? "#1B7A3D" : "#64748B";
  const common = { width: 22, height: 22, fill: "none", stroke, strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "home":
      return (
        <svg {...common} viewBox="0 0 24 24"><path d="M3 11l9-8 9 8v10a2 2 0 01-2 2h-4v-7H9v7H5a2 2 0 01-2-2z" /></svg>
      );
    case "search":
      return (
        <svg {...common} viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
      );
    case "plus":
      return (
        <svg viewBox="0 0 24 24" width={44} height={44}>
          <circle cx="12" cy="12" r="11" fill={active ? "#1B7A3D" : "#1B7A3D"} />
          <path d="M12 7v10M7 12h10" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case "wallet":
      return (
        <svg {...common} viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="13" rx="2" /><path d="M16 12h3" /><path d="M3 10h18" /></svg>
      );
    case "user":
      return (
        <svg {...common} viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-7 8-7s8 3 8 7" /></svg>
      );
    default:
      return null;
  }
}

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="sticky bottom-0 z-10 border-t border-ink-100 bg-white/95 backdrop-blur px-2 pt-2 pb-[max(env(safe-area-inset-bottom),8px)]">
      <ul className="grid grid-cols-5 gap-1">
        {items.map((item) => {
          const active =
            item.href === "/app"
              ? pathname === "/app"
              : pathname.startsWith(item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex flex-col items-center justify-center gap-0.5 py-1"
              >
                <Icon name={item.icon} active={active} />
                {item.icon !== "plus" && (
                  <span
                    className={`text-[10px] font-medium ${
                      active ? "text-brand-600" : "text-ink-500"
                    }`}
                  >
                    {item.label}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

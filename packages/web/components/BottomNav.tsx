"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/app", label: "Home", icon: "home" },
  { href: "/app/search", label: "Search", icon: "search" },
  { href: "/app/scan", label: "Scan", icon: "qr" },
  { href: "/app/messages", label: "Messages", icon: "chat" },
  { href: "/app/profile", label: "Profile", icon: "user" },
] as const;

function Icon({ name, active }: { name: string; active: boolean }) {
  const stroke = active ? "#1B7A4E" : "#5A6B5E";
  const common = {
    width: 22,
    height: 22,
    fill: "none",
    stroke,
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "home":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M3 11l9-8 9 8v10a2 2 0 01-2 2h-4v-7H9v7H5a2 2 0 01-2-2z" />
        </svg>
      );
    case "search":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
      );
    case "qr":
      return (
        <svg viewBox="0 0 24 24" width={52} height={52}>
          <circle cx="12" cy="12" r="11" fill="#1B7A4E" />
          <circle cx="12" cy="12" r="11" fill="none" stroke="#D4A017" strokeWidth="1.5" />
          <rect x="7" y="7" width="4" height="4" rx="0.5" fill="white" />
          <rect x="13" y="7" width="4" height="4" rx="0.5" fill="white" />
          <rect x="7" y="13" width="4" height="4" rx="0.5" fill="white" />
          <rect x="14" y="14" width="1.5" height="1.5" fill="white" />
          <rect x="16" y="14" width="1" height="1" fill="white" />
          <rect x="14" y="16" width="1" height="1" fill="white" />
          <rect x="16" y="16" width="1.5" height="1.5" fill="white" />
        </svg>
      );
    case "chat":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
      );
    case "user":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c0-4 4-7 8-7s8 3 8 7" />
        </svg>
      );
    default:
      return null;
  }
}

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="sticky bottom-0 z-10 border-t border-ink-100 bg-white/95 backdrop-blur px-2 pt-2 pb-[max(env(safe-area-inset-bottom),8px)]">
      <ul className="grid grid-cols-5 gap-1 items-end">
        {items.map((item) => {
          const active =
            item.href === "/app"
              ? pathname === "/app"
              : pathname.startsWith(item.href);
          const isCenter = item.icon === "qr";
          return (
            <li key={item.href} className={isCenter ? "-mt-6" : ""}>
              <Link
                href={item.href}
                className="flex flex-col items-center justify-center gap-0.5 py-1"
              >
                <Icon name={item.icon} active={active} />
                {!isCenter && (
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

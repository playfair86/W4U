import { BottomNav } from "@/components/BottomNav";
import { PhoneFrame } from "@/components/PhoneFrame";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <PhoneFrame>
      <div className="flex flex-1 flex-col">
        <div className="flex-1">{children}</div>
        <BottomNav />
      </div>
    </PhoneFrame>
  );
}

import { ScreenHeader } from "@/components/ScreenHeader";
import {
  PENDING_BALANCE,
  TRANSACTIONS,
  Transaction,
  WALLET_BALANCE,
  formatZAR,
} from "@/lib/mock-data";

export default function WalletPage() {
  return (
    <div>
      <ScreenHeader title="Wallet" backHref="/app" />

      <section className="bg-gradient-to-br from-brand-700 to-brand-500 px-5 pt-6 pb-8 text-white">
        <p className="text-xs font-semibold uppercase opacity-80">Available balance</p>
        <p className="mt-1 text-4xl font-bold">{formatZAR(WALLET_BALANCE)}</p>
        <p className="mt-1 text-xs opacity-80">
          + {formatZAR(PENDING_BALANCE)} pending release
        </p>

        <div className="mt-6 grid grid-cols-3 gap-2">
          <ActionButton icon="↓" label="Deposit" />
          <ActionButton icon="↑" label="Withdraw" />
          <ActionButton icon="⇄" label="Send" />
        </div>
      </section>

      <section className="px-5 pt-6 pb-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-ink-900">Recent transactions</h2>
          <button className="text-xs font-semibold text-brand-600">Filter</button>
        </div>
        <div className="space-y-2">
          {TRANSACTIONS.map((t) => (
            <TxRow key={t.id} tx={t} />
          ))}
        </div>
      </section>
    </div>
  );
}

function ActionButton({ icon, label }: { icon: string; label: string }) {
  return (
    <button className="flex flex-col items-center gap-1 rounded-xl bg-white/15 py-3 text-white backdrop-blur hover:bg-white/25">
      <span className="text-xl font-bold">{icon}</span>
      <span className="text-[11px] font-medium">{label}</span>
    </button>
  );
}

function TxRow({ tx }: { tx: Transaction }) {
  const sign = tx.direction === "IN" ? "+" : "-";
  const color = tx.direction === "IN" ? "text-brand-600" : "text-ink-900";
  return (
    <div className="flex items-center gap-3 rounded-xl border border-ink-100 bg-white p-3">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-full text-lg ${
          tx.direction === "IN" ? "bg-brand-50" : "bg-ink-100"
        }`}
      >
        {tx.direction === "IN" ? "↓" : "↑"}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-ink-900 truncate">
          {tx.counterparty}
        </p>
        <p className="text-[11px] text-ink-500 truncate">
          {tx.reference} · {tx.timestamp}
        </p>
      </div>
      <div className="text-right">
        <p className={`text-sm font-bold ${color}`}>
          {sign}
          {formatZAR(tx.amount)}
        </p>
        {tx.fee > 0 && (
          <p className="text-[10px] text-ink-500">Fee {formatZAR(tx.fee)}</p>
        )}
      </div>
    </div>
  );
}

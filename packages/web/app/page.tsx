import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2">
          <Logo />
          <span className="text-lg font-bold tracking-tight text-ink-900">W4U</span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/app"
            className="hidden sm:inline-block text-sm font-medium text-ink-700 hover:text-brand-600"
          >
            Live demo
          </Link>
          <Link
            href="/register"
            className="rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-700"
          >
            Get started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-50 via-white to-amber-50" />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              Built for South Africa's informal economy
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-ink-900 md:text-5xl lg:text-6xl">
              Work for yourself.
              <br />
              <span className="text-brand-600">Get paid instantly.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-ink-700">
              W4U connects verified workers with local jobs and pays them
              directly — no middlemen, no cash-in-hand risk. Build a reputation
              that travels with you.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/register"
                className="rounded-full bg-brand-600 px-6 py-3 font-semibold text-white shadow-lg shadow-brand-600/20 hover:bg-brand-700"
              >
                Join W4U — it's free
              </Link>
              <Link
                href="/app"
                className="rounded-full border border-ink-300 bg-white px-6 py-3 font-semibold text-ink-900 hover:bg-ink-100"
              >
                See the app →
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-ink-500">
              <Stat number="12k+" label="Verified workers" />
              <div className="h-8 w-px bg-ink-300" />
              <Stat number="R4.2m" label="Paid out" />
              <div className="h-8 w-px bg-ink-300" />
              <Stat number="4.8★" label="Avg rating" />
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="relative h-[560px] w-[280px] rounded-[40px] border-[10px] border-ink-900 bg-white shadow-2xl shadow-ink-900/30">
              <div className="h-full w-full overflow-hidden rounded-[28px] bg-gradient-to-b from-brand-50 to-white">
                <div className="flex items-center justify-between bg-brand-600 px-4 py-4 text-white">
                  <div>
                    <p className="text-[10px] opacity-80">Good morning,</p>
                    <p className="text-sm font-semibold">Sipho 👋</p>
                  </div>
                  <div className="rounded-full bg-white/20 px-2 py-1 text-[10px] font-bold">
                    ●●●○○ Skills Verified
                  </div>
                </div>
                <div className="space-y-3 p-3">
                  <MiniJob
                    cat="Home & Property"
                    title="Paint 3-bedroom house"
                    price="R2 500 – R3 500"
                    km="2.4 km"
                  />
                  <MiniJob
                    cat="Garden & Outdoor"
                    title="Weekly garden maintenance"
                    price="R400 – R600"
                    km="12.1 km"
                  />
                  <MiniJob
                    cat="Skilled Trades"
                    title="Tile small bathroom floor"
                    price="R1 200 – R1 800"
                    km="6.3 km"
                  />
                  <div className="mt-4 rounded-xl bg-brand-600 p-3 text-white">
                    <p className="text-[10px] uppercase opacity-70">
                      Wallet balance
                    </p>
                    <p className="mt-1 text-2xl font-bold">R2 740.50</p>
                    <p className="text-[10px] opacity-80">
                      +R828.75 paid today
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust system */}
      <section className="border-t border-ink-100 bg-ink-100/60 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
              The trust problem, solved
            </p>
            <h2 className="mt-2 text-3xl font-bold text-ink-900 md:text-4xl">
              5 tiers. Real verification. Earned reputation.
            </h2>
            <p className="mt-4 text-ink-700">
              Every W4U worker moves through a progressive trust system. The
              higher your tier, the more jobs you unlock — and the more you
              earn.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-5">
            {TIERS.map((tier, i) => (
              <div
                key={tier.name}
                className="rounded-2xl border border-ink-100 bg-white p-5"
              >
                <div className="text-xs font-bold tracking-wider text-brand-600">
                  TIER {i + 1}
                </div>
                <h3 className="mt-1 font-semibold text-ink-900">{tier.name}</h3>
                <p className="mt-2 text-xs text-ink-500">{tier.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 md:grid-cols-3">
            <Feature
              icon="🆔"
              title="Real identity verification"
              body="SA ID document scan, facial match, and community vouching. No fake profiles."
            />
            <Feature
              icon="⚡"
              title="Instant ZAR payments"
              body="Get paid the moment a job is done. Direct to your W4U wallet, cash out to any bank."
            />
            <Feature
              icon="⭐"
              title="Portable reputation"
              body="Your ratings, reviews and completed jobs build a reputation that travels with you."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-brand-600 py-16 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Ready to work for yourself?
          </h2>
          <p className="mt-3 text-brand-50">
            Join thousands of verified workers earning on W4U every day.
          </p>
          <Link
            href="/register"
            className="mt-8 inline-block rounded-full bg-white px-8 py-3 font-semibold text-brand-700 shadow-lg hover:bg-brand-50"
          >
            Create your free account
          </Link>
        </div>
      </section>

      <footer className="border-t border-ink-100 bg-white py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-sm text-ink-500 md:flex-row">
          <div className="flex items-center gap-2">
            <Logo />
            <span className="font-semibold text-ink-700">W4U</span>
            <span>· Work For You</span>
          </div>
          <p>© 2026 W4U · Made in South Africa 🇿🇦</p>
        </div>
      </footer>
    </main>
  );
}

const TIERS = [
  { name: "Unverified", desc: "New account. Can browse but not apply to jobs." },
  { name: "ID Verified", desc: "SA ID scan + facial match. Can apply to jobs." },
  { name: "Skills Verified", desc: "Proven skills via test jobs and certifications." },
  { name: "Community Vouched", desc: "Endorsed by 3+ verified community members." },
  { name: "Fully Vetted", desc: "Background check, insurance, top tier rating." },
];

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <p className="text-xl font-bold text-ink-900">{number}</p>
      <p className="text-xs">{label}</p>
    </div>
  );
}

function Feature({ icon, title, body }: { icon: string; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-sm">
      <div className="text-3xl">{icon}</div>
      <h3 className="mt-4 text-lg font-semibold text-ink-900">{title}</h3>
      <p className="mt-2 text-sm text-ink-700">{body}</p>
    </div>
  );
}

function MiniJob({ cat, title, price, km }: { cat: string; title: string; price: string; km: string }) {
  return (
    <div className="rounded-xl border border-ink-100 bg-white p-3 shadow-sm">
      <p className="text-[9px] font-semibold uppercase text-brand-600">{cat}</p>
      <p className="mt-0.5 text-[13px] font-semibold text-ink-900 leading-tight">
        {title}
      </p>
      <div className="mt-1 flex items-center justify-between text-[10px] text-ink-500">
        <span>{km}</span>
        <span className="font-semibold text-ink-900">{price}</span>
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white font-bold">
      W
    </div>
  );
}

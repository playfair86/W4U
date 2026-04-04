import { useState } from "react";

const W4UWireframes = () => {
  const [screen, setScreen] = useState("splash");
  const c = { green: "#1B7A4E", gold: "#D4A017", dark: "#1A2B1E", muted: "#5A6B5E", pale: "#E8F5EE", bg: "#F5F6F5", white: "#FFFFFF", border: "#E0E0E0" };

  const Phone = ({ children, title }) => (
    <div style={{ width: 320, minHeight: 580, background: c.white, borderRadius: 32, border: `2px solid ${c.border}`, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", display: "flex", flexDirection: "column" }}>
      <div style={{ height: 28, background: c.dark, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 60, height: 6, borderRadius: 3, background: "rgba(255,255,255,0.3)" }} />
      </div>
      {title && <div style={{ padding: "10px 16px", borderBottom: `1px solid ${c.border}`, fontSize: 11, color: c.muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>{title}</div>}
      <div style={{ flex: 1, overflow: "auto" }}>{children}</div>
      <div style={{ height: 52, borderTop: `1px solid ${c.border}`, display: "flex", alignItems: "center", justifyContent: "space-around", padding: "0 8px" }}>
        {["\u2302 Home", "\u2315 Search", "\u25A3 QR", "\u2709 Chat", "\u263A Profile"].map(t => (
          <div key={t} style={{ fontSize: 9, color: c.muted, textAlign: "center", padding: "4px 6px" }}>{t}</div>
        ))}
      </div>
    </div>
  );

  const Badge = ({ text, color = c.green }) => (
    <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: 10, background: color, color: c.white, fontSize: 9, fontWeight: 600, marginLeft: 6 }}>{text}</span>
  );

  const Stars = ({ n = 5, filled = 4 }) => (
    <span style={{ color: c.gold, fontSize: 12, letterSpacing: 1 }}>
      {Array.from({ length: n }, (_, i) => i < filled ? "\u2605" : "\u2606").join("")}
    </span>
  );

  const Button = ({ text, primary, small, full }) => (
    <div style={{ display: full ? "block" : "inline-block", textAlign: "center", padding: small ? "6px 14px" : "10px 20px", borderRadius: 20, background: primary ? c.green : "transparent", color: primary ? c.white : c.green, border: primary ? "none" : `1.5px solid ${c.green}`, fontSize: small ? 11 : 13, fontWeight: 600, cursor: "pointer", margin: "4px" }}>{text}</div>
  );

  const screens = {
    splash: {
      title: null,
      render: () => (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", background: `linear-gradient(160deg, ${c.pale} 0%, ${c.white} 100%)`, padding: 32 }}>
          <div style={{ fontSize: 52, fontWeight: 700, marginBottom: 4 }}>
            <span style={{ color: c.green }}>W</span><span style={{ color: c.gold }}>4</span><span style={{ color: c.green }}>U</span>
          </div>
          <div style={{ fontSize: 10, color: c.muted, letterSpacing: 4, marginBottom: 40 }}>WORK FOR YOU</div>
          <div style={{ fontSize: 13, color: c.muted, marginBottom: 30, textAlign: "center", lineHeight: 1.6 }}>Choose your language</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, width: "100%", marginBottom: 30 }}>
            {["English", "isiZulu", "Afrikaans", "Sesotho", "isiXhosa", "Setswana"].map(l => (
              <div key={l} style={{ padding: "8px 12px", border: `1px solid ${c.border}`, borderRadius: 8, textAlign: "center", fontSize: 11, color: c.dark, background: l === "English" ? c.pale : c.white }}>{l}</div>
            ))}
          </div>
          <Button text="Get Started" primary full />
        </div>
      ),
    },
    register: {
      title: "S2: Registration",
      render: () => (
        <div style={{ padding: 20 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: c.dark, marginBottom: 4 }}>Create Account</div>
          <div style={{ fontSize: 12, color: c.muted, marginBottom: 24 }}>Enter your mobile number to get started</div>
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            <div style={{ padding: "10px 12px", border: `1px solid ${c.border}`, borderRadius: 8, fontSize: 13, color: c.muted, width: 60, textAlign: "center" }}>+27</div>
            <div style={{ flex: 1, padding: "10px 12px", border: `1px solid ${c.green}`, borderRadius: 8, fontSize: 13, color: c.dark }}>82 123 4567</div>
          </div>
          <Button text="Send OTP" primary full />
          <div style={{ marginTop: 32, fontSize: 13, fontWeight: 600, color: c.dark, marginBottom: 16 }}>I am...</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { icon: "\uD83D\uDEE0\uFE0F", title: "I Offer Services", desc: "I want to get found, rated, and paid" },
              { icon: "\uD83D\uDD0D", title: "I Need Services", desc: "I want to find, hire, and tip" },
              { icon: "\u21C4", title: "Both", desc: "I offer and need services" },
            ].map(o => (
              <div key={o.title} style={{ padding: 14, border: `1.5px solid ${o.title === "I Offer Services" ? c.green : c.border}`, borderRadius: 12, display: "flex", alignItems: "center", gap: 12, background: o.title === "I Offer Services" ? c.pale : c.white }}>
                <div style={{ fontSize: 24 }}>{o.icon}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: c.dark }}>{o.title}</div>
                  <div style={{ fontSize: 10, color: c.muted }}>{o.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    verify: {
      title: "S3: ID Verification",
      render: () => (
        <div style={{ padding: 20, textAlign: "center" }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: c.dark, marginBottom: 4 }}>Verify Your Identity</div>
          <div style={{ fontSize: 12, color: c.muted, marginBottom: 20 }}>This takes less than 2 minutes</div>
          <div style={{ width: "100%", height: 200, background: c.dark, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, position: "relative" }}>
            <div style={{ width: "70%", height: "80%", border: "2px dashed rgba(255,255,255,0.4)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>Position your ID card here</div>
            </div>
            <div style={{ position: "absolute", top: 8, right: 8, background: c.green, color: c.white, fontSize: 9, padding: "3px 8px", borderRadius: 10 }}>STEP 1 of 2</div>
          </div>
          <div style={{ fontSize: 11, color: c.muted, marginBottom: 20, lineHeight: 1.6 }}>Hold your SA ID card steady in good lighting. We\u2019ll extract your details automatically.</div>
          <Button text="Take Photo" primary full />
          <div style={{ marginTop: 24, padding: 16, background: c.pale, borderRadius: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: c.green, marginBottom: 8 }}>After verification you\u2019ll unlock:</div>
            <div style={{ fontSize: 11, color: c.dark, lineHeight: 1.8 }}>
              \u2713 ID Verified badge<br />
              \u2713 Ability to receive tips & payments<br />
              \u2713 Appear in search results<br />
              \u2713 Build your reputation
            </div>
          </div>
        </div>
      ),
    },
    providerHome: {
      title: "S5: Provider Home",
      render: () => (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ fontSize: 16, fontWeight: 700 }}><span style={{ color: c.green }}>W</span><span style={{ color: c.gold }}>4</span><span style={{ color: c.green }}>U</span></div>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div style={{ fontSize: 16 }}>\uD83D\uDD14</div>
              <div style={{ width: 28, height: 28, borderRadius: 14, background: c.green, display: "flex", alignItems: "center", justifyContent: "center", color: c.white, fontSize: 11, fontWeight: 700 }}>S</div>
            </div>
          </div>
          {/* Wallet Card */}
          <div style={{ background: `linear-gradient(135deg, ${c.green} 0%, ${c.dark} 100%)`, borderRadius: 14, padding: 16, color: c.white, marginBottom: 14 }}>
            <div style={{ fontSize: 10, opacity: 0.7, marginBottom: 4 }}>Wallet Balance</div>
            <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>R 1,247.50</div>
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ padding: "5px 14px", background: "rgba(255,255,255,0.2)", borderRadius: 14, fontSize: 10, fontWeight: 600 }}>Withdraw</div>
              <div style={{ padding: "5px 14px", background: "rgba(255,255,255,0.2)", borderRadius: 14, fontSize: 10, fontWeight: 600 }}>History</div>
            </div>
          </div>
          {/* QR Card */}
          <div style={{ border: `1px solid ${c.border}`, borderRadius: 14, padding: 14, display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
            <div style={{ width: 56, height: 56, background: c.pale, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>\u25A3</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: c.dark }}>My QR Code</div>
              <div style={{ fontSize: 10, color: c.muted }}>Share or print for easy tipping</div>
            </div>
            <div style={{ fontSize: 10, color: c.green, fontWeight: 600 }}>View \u203A</div>
          </div>
          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
            {[{ n: "R 3,420", l: "This week" }, { n: "4.7", l: "Rating" }, { n: "142", l: "Profile views" }].map(s => (
              <div key={s.l} style={{ background: c.pale, borderRadius: 10, padding: "10px 8px", textAlign: "center" }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: c.dark }}>{s.n}</div>
                <div style={{ fontSize: 9, color: c.muted }}>{s.l}</div>
              </div>
            ))}
          </div>
          {/* Activity */}
          <div style={{ fontSize: 12, fontWeight: 600, color: c.dark, marginBottom: 8 }}>Recent Activity</div>
          {[
            { icon: "\uD83D\uDCB0", text: "R20 tip from Sarah M.", time: "2 min ago" },
            { icon: "\u2B50", text: "5-star review from James K.", time: "1 hour ago" },
            { icon: "\uD83D\uDCE9", text: "New enquiry about painting", time: "3 hours ago" },
          ].map(a => (
            <div key={a.text} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: `1px solid ${c.border}` }}>
              <div style={{ fontSize: 18 }}>{a.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: c.dark }}>{a.text}</div>
                <div style={{ fontSize: 9, color: c.muted }}>{a.time}</div>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    consumerHome: {
      title: "S6: Consumer Home",
      render: () => (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 16, fontWeight: 700 }}><span style={{ color: c.green }}>W</span><span style={{ color: c.gold }}>4</span><span style={{ color: c.green }}>U</span></div>
            <div style={{ width: 28, height: 28, borderRadius: 14, background: c.green, display: "flex", alignItems: "center", justifyContent: "center", color: c.white, fontSize: 11, fontWeight: 700 }}>S</div>
          </div>
          <div style={{ background: c.pale, borderRadius: 12, padding: "12px 16px", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 14 }}>\uD83D\uDD0D</span>
            <span style={{ fontSize: 13, color: c.muted }}>What do you need help with?</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 20 }}>
            {[
              { e: "\uD83C\uDFA8", l: "Painter" }, { e: "\uD83E\uDDF9", l: "Cleaner" },
              { e: "\uD83C\uDF3F", l: "Garden" }, { e: "\uD83D\uDE97", l: "Car Guard" },
              { e: "\uD83D\uDD27", l: "Plumber" }, { e: "\uD83D\uDC76", l: "Nanny" },
              { e: "\u26A1", l: "Electric" }, { e: "\u2022\u2022\u2022", l: "More" },
            ].map(cat => (
              <div key={cat.l} style={{ textAlign: "center", padding: "8px 4px" }}>
                <div style={{ fontSize: 22, marginBottom: 4 }}>{cat.e}</div>
                <div style={{ fontSize: 9, color: c.dark }}>{cat.l}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12, fontWeight: 600, color: c.dark, marginBottom: 10 }}>Top rated near you</div>
          <div style={{ display: "flex", gap: 10, overflowX: "auto", marginBottom: 16, paddingBottom: 4 }}>
            {[
              { name: "Sipho M.", skill: "Painter", rating: 4.7, badge: "Verified" },
              { name: "Lindiwe K.", skill: "Cleaner", rating: 4.9, badge: "Vouched" },
              { name: "Thabo N.", skill: "Car Guard", rating: 4.5, badge: "Verified" },
            ].map(p => (
              <div key={p.name} style={{ minWidth: 140, border: `1px solid ${c.border}`, borderRadius: 12, padding: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 20, background: c.pale, marginBottom: 8 }} />
                <div style={{ fontSize: 12, fontWeight: 600, color: c.dark }}>{p.name}</div>
                <div style={{ fontSize: 10, color: c.muted }}>{p.skill}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4 }}>
                  <Stars filled={Math.round(p.rating)} />
                  <span style={{ fontSize: 10, color: c.muted }}>{p.rating}</span>
                </div>
                <Badge text={p.badge} />
              </div>
            ))}
          </div>
        </div>
      ),
    },
    profile: {
      title: "S8: Provider Profile",
      render: () => (
        <div>
          <div style={{ background: `linear-gradient(180deg, ${c.pale} 0%, ${c.white} 100%)`, padding: "20px 16px", textAlign: "center" }}>
            <div style={{ width: 72, height: 72, borderRadius: 36, background: c.green, margin: "0 auto 10px", display: "flex", alignItems: "center", justifyContent: "center", color: c.white, fontSize: 28, fontWeight: 700 }}>S</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: c.dark }}>Sipho Mkhize <Badge text="ID Verified" /></div>
            <div style={{ fontSize: 12, color: c.muted, marginTop: 4 }}>Painter \u2022 Johannesburg</div>
            <div style={{ marginTop: 6 }}><Stars filled={5} /> <span style={{ fontSize: 11, color: c.muted }}>4.7 (23 reviews)</span></div>
          </div>
          <div style={{ padding: 16 }}>
            <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
              <Badge text="\u2713 ID Verified" />
              <Badge text="\u2605 Skills Verified" color={c.gold} />
              <Badge text="\u263B 8 Vouches" color={c.muted} />
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, color: c.dark, marginBottom: 6 }}>About</div>
            <div style={{ fontSize: 11, color: "555", lineHeight: 1.6, marginBottom: 14 }}>Professional painter with 14 years experience. I specialise in interior and exterior painting, colour consultation, and wallpaper. References available.</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: c.dark, marginBottom: 6 }}>Portfolio</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 4, marginBottom: 14 }}>
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} style={{ height: 70, background: i % 2 ? "#D4E8D9" : "#E8DFD4", borderRadius: 6 }} />
              ))}
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, color: c.dark, marginBottom: 6 }}>Reviews</div>
            {[
              { name: "Sarah M.", rating: 5, text: "Excellent work on our lounge. Very professional and clean." },
              { name: "James K.", rating: 4, text: "Good painter. Took a bit longer than expected but quality was great." },
            ].map(r => (
              <div key={r.name} style={{ padding: "10px 0", borderBottom: `1px solid ${c.border}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: c.dark }}>{r.name}</span>
                  <Stars filled={r.rating} />
                </div>
                <div style={{ fontSize: 10, color: "555", marginTop: 4, lineHeight: 1.5 }}>{r.text}</div>
              </div>
            ))}
          </div>
          <div style={{ padding: "12px 16px", borderTop: `1px solid ${c.border}`, display: "flex", gap: 8, background: c.white }}>
            <Button text="Contact" primary small />
            <Button text="Tip" small />
            <Button text="Hire" small />
          </div>
        </div>
      ),
    },
    qrTip: {
      title: "S9: QR Scan & Tip",
      render: () => (
        <div style={{ textAlign: "center" }}>
          <div style={{ background: c.dark, padding: 20, height: 220, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <div style={{ width: 160, height: 160, border: "2px solid rgba(255,255,255,0.5)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>Scanning...</div>
            </div>
            <div style={{ position: "absolute", bottom: 10, color: "rgba(255,255,255,0.5)", fontSize: 10 }}>Point camera at W4U QR code</div>
          </div>
          <div style={{ padding: 16 }}>
            <div style={{ border: `1px solid ${c.border}`, borderRadius: 14, padding: 14, display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 44, height: 44, borderRadius: 22, background: c.green, display: "flex", alignItems: "center", justifyContent: "center", color: c.white, fontSize: 16, fontWeight: 700 }}>T</div>
              <div style={{ flex: 1, textAlign: "left" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: c.dark }}>Thabo Ndlovu <Badge text="Verified" /></div>
                <div style={{ fontSize: 10, color: c.muted }}>Car Guard \u2022 Sandton City</div>
                <Stars filled={4} />
              </div>
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, color: c.dark, marginBottom: 10 }}>Tip Amount</div>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 16 }}>
              {["R5", "R10", "R20", "R50"].map(a => (
                <div key={a} style={{ padding: "10px 16px", borderRadius: 20, border: a === "R10" ? `2px solid ${c.green}` : `1px solid ${c.border}`, background: a === "R10" ? c.pale : c.white, fontSize: 14, fontWeight: 600, color: a === "R10" ? c.green : c.dark, cursor: "pointer" }}>{a}</div>
              ))}
            </div>
            <div style={{ fontSize: 11, color: c.muted, marginBottom: 12 }}>Quick rate (optional)</div>
            <div style={{ marginBottom: 16 }}><Stars filled={5} /></div>
            <Button text="Send R10 Tip" primary full />
          </div>
        </div>
      ),
    },
    wallet: {
      title: "S10: Wallet",
      render: () => (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <div style={{ fontSize: 10, color: c.muted }}>Available Balance</div>
            <div style={{ fontSize: 36, fontWeight: 700, color: c.dark }}>R 1,247<span style={{ fontSize: 20 }}>.50</span></div>
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: 20, justifyContent: "center" }}>
            <Button text="Fund" primary small />
            <Button text="Withdraw" small />
            <Button text="Send" small />
          </div>
          <div style={{ fontSize: 12, fontWeight: 600, color: c.dark, marginBottom: 10 }}>Transactions</div>
          {[
            { type: "Tip received", from: "Sarah M.", amount: "+R20", time: "2 min ago", color: c.green },
            { type: "Service payment", from: "James K.", amount: "+R2,450", time: "Yesterday", color: c.green },
            { type: "Withdrawal", from: "To FNB ****4523", amount: "-R1,000", time: "2 days ago", color: "#CC3333" },
            { type: "Tip received", from: "David V.", amount: "+R50", time: "3 days ago", color: c.green },
            { type: "Tip received", from: "Unknown", amount: "+R10", time: "4 days ago", color: c.green },
          ].map((t, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${c.border}` }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: c.dark }}>{t.type}</div>
                <div style={{ fontSize: 10, color: c.muted }}>{t.from} \u2022 {t.time}</div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: t.color }}>{t.amount}</div>
            </div>
          ))}
          <div style={{ textAlign: "center", marginTop: 14 }}>
            <span style={{ fontSize: 11, color: c.green, fontWeight: 600, cursor: "pointer" }}>Export Statement (PDF) \u2193</span>
          </div>
        </div>
      ),
    },
  };

  const screenList = Object.entries(screens);

  return (
    <div style={{ minHeight: "100vh", background: "#F0F2F0", padding: 32, fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif" }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: c.dark, margin: 0 }}>W4U Wireframes</h1>
        <p style={{ fontSize: 14, color: c.muted, marginTop: 6 }}>Interactive screen mockups \u2014 companion to the Product Specification</p>
      </div>
      <div style={{ display: "flex", gap: 6, marginBottom: 28, flexWrap: "wrap" }}>
        {screenList.map(([key, val]) => (
          <button key={key} onClick={() => setScreen(key)} style={{
            padding: "6px 16px", borderRadius: 18,
            border: screen === key ? `2px solid ${c.green}` : `1px solid #D0D0D0`,
            background: screen === key ? c.green : c.white,
            color: screen === key ? c.white : c.dark,
            fontWeight: screen === key ? 600 : 400, fontSize: 12, cursor: "pointer",
          }}>{val.title || "S1: Splash"}</button>
        ))}
      </div>
      <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
        <Phone title={screens[screen].title}>{screens[screen].render()}</Phone>
        <div style={{ flex: 1, minWidth: 280 }}>
          <div style={{ background: c.white, borderRadius: 14, padding: 20, border: `1px solid ${c.border}` }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: c.dark, marginBottom: 8 }}>Screen Notes</div>
            <div style={{ fontSize: 12, color: c.muted, lineHeight: 1.7 }}>
              {screen === "splash" && "First-time experience. Language selection is critical \u2014 it determines the entire app UI language and AI translation target. The 6 most common languages are shown; 'More' expands to all 11."}
              {screen === "register" && "Progressive onboarding: phone number first (minimal friction), then user type. OTP auto-reads from SMS on Android. The three user type cards set context for all subsequent flows."}
              {screen === "verify" && "Camera-based ID verification. The overlay guide helps users position their document correctly. Step indicator shows this is a 2-step process (ID photo + selfie). Success unlocks core platform functionality."}
              {screen === "providerHome" && "The provider dashboard prioritises: wallet balance (what they\u2019ve earned), QR code (their earning tool), stats (motivation), and activity feed (recent engagement). Everything above the fold is actionable."}
              {screen === "consumerHome" && "Consumer home is search-driven. The prominent search bar and category grid enable fast discovery. 'Top rated near you' provides immediate social proof and gets users exploring profiles."}
              {screen === "profile" && "The public profile is the core trust artifact. Verification badges at top, then social proof (reviews, vouches), then portfolio (visual proof of work). Action buttons are sticky at bottom for easy access."}
              {screen === "qrTip" && "The QR tipping flow must be completable in under 10 seconds. Scan \u2192 see who you\u2019re tipping \u2192 select amount \u2192 optional quick-rate \u2192 confirm. Preset amounts reduce friction. Works for non-app users via web fallback."}
              {screen === "wallet" && "Clean financial view. Balance prominent. Three primary actions (Fund, Withdraw, Send). Transaction history with colour-coded amounts (+green, -red). PDF export enables financial record-keeping for micro-entrepreneurs."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default W4UWireframes;
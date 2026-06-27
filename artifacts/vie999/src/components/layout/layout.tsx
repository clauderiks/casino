import { useState } from "react";
import { Link, useLocation } from "wouter";
import { AnimatePresence, motion } from "framer-motion";

const LOGO = "https://xgamecdn.com/kp/202604/CVYR-kTgaqOgA_xM.png";
const VN_FLAG = "https://vie999.com/img/language/vi.png";

const NAV_BASE = "https://vie999.com/img/colors/skin1/chivas_regal_blue";

const offerItems = [
  { img: `${NAV_BASE}/nav_event.png`, label: "Sự kiện" },
  { img: `${NAV_BASE}/nav_mission.png`, label: "Nhiệm vụ" },
  { img: `${NAV_BASE}/nav_rebate.png`, label: "Hoàn trả" },
  { img: `${NAV_BASE}/nav_advise.png`, label: "Nhận thưởng" },
  { img: `${NAV_BASE}/nav_statement.png`, label: "Lịch sử" },
  { img: `${NAV_BASE}/nav_help.png`, label: "Lãi suất" },
  { img: `${NAV_BASE}/nav_perfil.png`, label: "VIP" },
  { img: `${NAV_BASE}/nav_pending.png`, label: "Quỹ" },
];

const gameTabs = [
  { id: "hot", icon: "https://vie999.com/img/default/hot_active.png", label: "Hot" },
  { id: "slots", icon: "https://vie999.com/img/default/digital_active.png", label: "Slots" },
  { id: "recent", label: "⏱", isEmoji: true, labelText: "Recent" },
  { id: "favorite", label: "★", isEmoji: true, labelText: "Favorite" },
];

interface LayoutProps {
  children: React.ReactNode;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export function Layout({ children, activeTab, onTabChange }: LayoutProps) {
  const [location] = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div style={{ display: "flex", justifyContent: "center", minHeight: "100dvh", background: "#004d61" }}>
      <div style={{ width: "100%", maxWidth: 480, background: "#00A3C6", minHeight: "100dvh", position: "relative", display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* ===== HEADER ===== */}
        <header style={{
          position: "sticky", top: 0, zIndex: 40,
          background: "#0090AF",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 12px", height: 46,
          flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button
              onClick={() => setDrawerOpen(true)}
              data-testid="button-menu"
              style={{ background: "none", border: "none", cursor: "pointer", color: "#C5FAFF", padding: "4px", display: "flex" }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
            <Link href="/">
              <img src={LOGO} alt="VIE999" style={{ height: 28, objectFit: "contain" }} />
            </Link>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Link href="/login">
              <button data-testid="button-login" style={{
                background: "none", border: "1px solid #FFF0BB", borderRadius: 4,
                color: "#FFF0BB", fontSize: 12, fontWeight: 600, padding: "4px 10px",
                cursor: "pointer", whiteSpace: "nowrap",
              }}>Đăng nhập</button>
            </Link>
            <Link href="/register">
              <button data-testid="button-register" style={{
                background: "#FFF0BB", border: "none", borderRadius: 4,
                color: "#0090AF", fontSize: 12, fontWeight: 700, padding: "4px 10px",
                cursor: "pointer", whiteSpace: "nowrap",
              }}>Đăng ký</button>
            </Link>
            <button data-testid="button-search" style={{ background: "none", border: "none", cursor: "pointer", color: "#C5FAFF", display: "flex", padding: 2 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </button>
            <img src={VN_FLAG} alt="VI" style={{ width: 22, height: 22, borderRadius: "50%", objectFit: "cover" }} />
          </div>
        </header>

        {/* ===== LEFT DRAWER ===== */}
        <AnimatePresence>
          {drawerOpen && (
            <>
              <motion.div
                key="overlay"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 49 }}
                onClick={() => setDrawerOpen(false)}
              />
              <motion.div
                key="drawer"
                initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
                transition={{ type: "tween", duration: 0.25 }}
                style={{
                  position: "fixed", top: 0, bottom: 0, left: 0,
                  width: "78%", maxWidth: 300,
                  background: "#0090AF",
                  zIndex: 50, overflowY: "auto", display: "flex", flexDirection: "column",
                }}
              >
                {/* Drawer Header */}
                <div style={{ background: "#007a93", padding: "14px 14px 10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#00A3C6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#C5FAFF"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
                    </div>
                    <div>
                      <div style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>Khách</div>
                      <div style={{ color: "#FFF0BB", fontSize: 11, cursor: "pointer" }} onClick={() => setDrawerOpen(false)}>
                        <Link href="/login">Đăng nhập/Đăng ký &gt;</Link>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => setDrawerOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#C5FAFF" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </button>
                </div>

                {/* Game Category Tabs */}
                <div style={{ background: "#007a93", padding: "8px 10px", display: "flex", gap: 6, borderBottom: "1px solid rgba(255,255,255,0.15)" }}>
                  {gameTabs.map(t => (
                    <button key={t.id} onClick={() => { onTabChange?.(t.id); setDrawerOpen(false); }}
                      style={{
                        flex: 1, background: activeTab === t.id ? "rgba(255,240,187,0.2)" : "rgba(0,0,0,0.15)",
                        border: "none", borderRadius: 6, padding: "6px 2px", cursor: "pointer",
                        display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
                      }}
                    >
                      {t.isEmoji ? (
                        <span style={{ fontSize: 16, color: activeTab === t.id ? "#FFF0BB" : "#C5FAFF" }}>{t.label}</span>
                      ) : (
                        <img src={t.icon} alt={t.label} style={{ width: 20, height: 20, objectFit: "contain" }} />
                      )}
                      <span style={{ fontSize: 10, color: activeTab === t.id ? "#FFF0BB" : "#C5FAFF", fontWeight: activeTab === t.id ? 700 : 400 }}>
                        {t.isEmoji ? t.labelText : t.label}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Bet Records & Agent */}
                <div style={{ padding: "10px 12px", borderBottom: "1px solid rgba(255,255,255,0.15)" }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button style={{ flex: 1, background: "rgba(0,0,0,0.15)", border: "none", borderRadius: 8, padding: "10px 6px", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, color: "#fff" }}>
                      <img src={`${NAV_BASE}/nav_betRecords.png`} alt="" style={{ width: 24, height: 24, objectFit: "contain" }} />
                      <span style={{ fontSize: 12 }}>Lịch sử cược</span>
                    </button>
                    <button style={{ flex: 1, background: "rgba(0,0,0,0.15)", border: "none", borderRadius: 8, padding: "10px 6px", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, color: "#fff" }}>
                      <img src={`${NAV_BASE}/nav_reports.png`} alt="" style={{ width: 24, height: 24, objectFit: "contain" }} />
                      <span style={{ fontSize: 12 }}>Đại lý</span>
                    </button>
                  </div>
                </div>

                {/* Offer Center */}
                <div style={{ padding: "10px 12px", borderBottom: "1px solid rgba(255,255,255,0.15)" }}>
                  <div style={{ fontSize: 12, color: "#C5FAFF", fontWeight: 600, marginBottom: 8 }}>Trung tâm ưu đãi</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    {offerItems.map((item, i) => (
                      <button key={i} style={{
                        background: "rgba(0,0,0,0.2)", border: "none", borderRadius: 8,
                        padding: "8px 6px", cursor: "pointer",
                        display: "flex", alignItems: "center", gap: 8, color: "#fff",
                      }}>
                        <img src={item.img} alt={item.label} style={{ width: 28, height: 28, objectFit: "contain" }} />
                        <span style={{ fontSize: 11 }}>{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bottom Links */}
                <div style={{ marginTop: "auto", padding: "10px 12px 20px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", background: "rgba(0,0,0,0.15)", borderRadius: 8, marginBottom: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <img src={VN_FLAG} alt="VI" style={{ width: 22, height: 22, borderRadius: "50%" }} />
                      <span style={{ color: "#fff", fontSize: 13 }}>Tiếng Việt</span>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C5FAFF" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-around" }}>
                    {[
                      { img: `${NAV_BASE}/nav_support.png`, label: "CSKH" },
                      { img: `${NAV_BASE}/nav_help.png`, label: "FAQ" },
                      { img: `${NAV_BASE}/nav_perfil.png`, label: "Giới thiệu" },
                    ].map((item, i) => (
                      <button key={i} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                        <img src={item.img} alt={item.label} style={{ width: 26, height: 26, objectFit: "contain" }} />
                        <span style={{ fontSize: 10, color: "#9DE0E6" }}>{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* ===== MAIN ===== */}
        <main style={{ flex: 1, overflowY: "auto", overflowX: "hidden", paddingBottom: 60 }} className="no-scrollbar">
          {children}
        </main>

        {/* ===== BOTTOM NAV ===== */}
        <nav style={{
          position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
          width: "100%", maxWidth: 480,
          background: "#0090AF",
          borderTop: "1px solid #0BB5D9",
          zIndex: 40, display: "flex", alignItems: "center",
        }}>
          <Link href="/" style={{ flex: 1 }}>
            <div data-testid="nav-home" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "7px 0", cursor: "pointer" }}>
              <img src={`${NAV_BASE}/nav_support.png`} alt="" style={{ width: 22, height: 22, objectFit: "contain", opacity: location === "/" ? 1 : 0.5 }} />
              <span style={{ fontSize: 10, color: location === "/" ? "#FFF0BB" : "#9DE0E6", marginTop: 2 }}>Trang chủ</span>
            </div>
          </Link>
          <Link href="/promotions" style={{ flex: 1 }}>
            <div data-testid="nav-promotions" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "7px 0", cursor: "pointer" }}>
              <img src={`${NAV_BASE}/nav_event.png`} alt="" style={{ width: 22, height: 22, objectFit: "contain", opacity: location === "/promotions" ? 1 : 0.5 }} />
              <span style={{ fontSize: 10, color: location === "/promotions" ? "#FFF0BB" : "#9DE0E6", marginTop: 2 }}>Khuyến mãi</span>
            </div>
          </Link>
          {/* Center Deposit button */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
            <Link href="/deposit">
              <div data-testid="nav-deposit" style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer", marginTop: -16 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: "50%",
                  background: "linear-gradient(135deg, #FFF0BB, #D4AF37)",
                  border: "3px solid #0090AF",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 2px 10px rgba(255,240,187,0.4)",
                }}>
                  <img src={`${NAV_BASE}/nav_recharge.png`} alt="" style={{ width: 24, height: 24, objectFit: "contain" }} />
                </div>
                <span style={{ fontSize: 10, color: "#9DE0E6", marginTop: 2 }}>Nạp tiền</span>
              </div>
            </Link>
          </div>
          <Link href="/history" style={{ flex: 1 }}>
            <div data-testid="nav-history" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "7px 0", cursor: "pointer" }}>
              <img src={`${NAV_BASE}/nav_statement.png`} alt="" style={{ width: 22, height: 22, objectFit: "contain", opacity: location === "/history" ? 1 : 0.5 }} />
              <span style={{ fontSize: 10, color: location === "/history" ? "#FFF0BB" : "#9DE0E6", marginTop: 2 }}>Lịch sử</span>
            </div>
          </Link>
          <Link href="/login" style={{ flex: 1 }}>
            <div data-testid="nav-me" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "7px 0", cursor: "pointer" }}>
              <img src={`${NAV_BASE}/nav_perfil.png`} alt="" style={{ width: 22, height: 22, objectFit: "contain", opacity: location === "/login" ? 1 : 0.5 }} />
              <span style={{ fontSize: 10, color: location === "/login" ? "#FFF0BB" : "#9DE0E6", marginTop: 2 }}>Tôi</span>
            </div>
          </Link>
        </nav>
      </div>
    </div>
  );
}

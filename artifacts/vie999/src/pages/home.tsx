import { useEffect, useRef, useState } from "react";
import { Layout } from "@/components/layout/layout";
import useEmblaCarousel from "embla-carousel-react";

const CDN = "https://xgamecdn.com";

const banners = [
  `${CDN}/kp/202604/TENL9HFvJ1JW77vO.png`,
  `${CDN}/kp/202604/vo7Iww95-46d-_XC.png`,
  `${CDN}/kp/202604/i2tX9HzTKt61pL5h.png`,
  `${CDN}/kp/202604/2Q0EpeG-e8_uO1mG.png`,
];

const hotGames = [
  { id: 1, name: "Ways of the Qilin",       provider: "PG",  img: `${CDN}/game/OM/g/PGC/3/31047/0.png`,        fav: true  },
  { id: 2, name: "Rise of Apollo",           provider: "PG",  img: `${CDN}/game/OM/g/PGC/3/31048/0.png`,        fav: false },
  { id: 3, name: "Ganesha Fortune",          provider: "PG",  img: `${CDN}/game/OM/g/PGC/3/31042/0.png`,        fav: true  },
  { id: 4, name: "Egypt's Book of Mystery",  provider: "PG",  img: `${CDN}/game/OM/g/PGC/3/31040/0.png`,        fav: false },
  { id: 5, name: "Double Happiness",         provider: "PG",  img: `${CDN}/game/OM/g/PGC/3/31033/0.png`,        fav: false },
  { id: 6, name: "Phoenix Rises",            provider: "PG",  img: `${CDN}/game/OM/g/PGC/3/31031/0.png`,        fav: true  },
  { id: 7, name: "Mahjong Ways",             provider: "PG",  img: `${CDN}/game/OM/g/PGC/3/31030/0.png`,        fav: true  },
  { id: 8, name: "Lucky Neko",               provider: "PG",  img: `${CDN}/game/OM/g/PGC/3/31026/0.png`,        fav: false },
  { id: 9, name: "Medusa 2",                 provider: "PG",  img: `${CDN}/game/OM/g/PG/3/1508783/0.png`,       fav: false },
];

const slotsGames = [
  { id: 10, name: "Battleground Royale",     provider: "PG",  img: `${CDN}/game/OM/g/PG/3/1804577/0.png`,       fav: false },
  { id: 11, name: "Jungle Delight",          provider: "JL",  img: `${CDN}/game/OM/g/JL/3/463/0.png`,           fav: false },
  { id: 12, name: "Caishen Wins",            provider: "NJL", img: `${CDN}/game/OM/g/NJL/3/31226/0.png`,        fav: true  },
  { id: 13, name: "JL Treasure",             provider: "JL",  img: `${CDN}/game/OM/g/JL/3/263/0.png`,           fav: false },
  { id: 14, name: "Money Cat",               provider: "NJL", img: `${CDN}/game/OM/g/NJL/3/31262/0.png`,        fav: false },
  { id: 15, name: "Lucky Tiger",             provider: "PP",  img: `${CDN}/game/OM/g/PP/3/vs5luckytig/0.png`,   fav: false },
  { id: 16, name: "Fortune Dragon",          provider: "PG",  img: `${CDN}/game/OM/g/PG/3/1879752/0.png`,       fav: true  },
  { id: 17, name: "Zeus vs Hades",           provider: "PP",  img: `${CDN}/game/OM/g/PP/3/vs15godsofwar/0.png`, fav: false },
  { id: 18, name: "Rainbow Gold",            provider: "PP",  img: `${CDN}/game/OM/g/PP/3/vs20rainbowrsh/0.png`,fav: false },
  { id: 19, name: "Sic Bo",                  provider: "TD",  img: `${CDN}/game/OM/g/TD/3/87/0.png`,            fav: false },
  { id: 20, name: "Dragon Gold",             provider: "NJL", img: `${CDN}/game/OM/g/NJL/3/31219/0.png`,        fav: false },
  { id: 21, name: "Wild Bandits",            provider: "PP",  img: `${CDN}/game/OM/g/PP/3/vs25wildies/0.png`,   fav: false },
  { id: 22, name: "Mahjong Wins Bonus",      provider: "PP",  img: `${CDN}/game/OM/g/PP/3/vs1024mjwinbns/0.png`,fav: true  },
  { id: 23, name: "JDB Treasure",            provider: "JDB", img: `${CDN}/game/OM/g/JDB/3/1404500/0.png`,      fav: false },
  { id: 24, name: "Fortune Ox",             provider: "WG",  img: `${CDN}/game/OM/g/WG/3/41015/0.png`,         fav: false },
];

/* SVG icons for tabs — no external images needed */
const TabIcons: Record<string, (active: boolean) => React.ReactNode> = {
  hot: (a) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={a ? "#FFF0BB" : "#9DE0E6"}>
      <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/>
    </svg>
  ),
  slots: (a) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={a ? "#FFF0BB" : "#9DE0E6"}>
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/>
    </svg>
  ),
  recent: (a) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={a ? "#FFF0BB" : "#9DE0E6"}>
      <path d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
    </svg>
  ),
  favorite: (a) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={a ? "#FFF0BB" : "#9DE0E6"}>
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
    </svg>
  ),
};

const tabs = [
  { id: "hot",      label: "Hot"      },
  { id: "slots",    label: "Slots"    },
  { id: "recent",   label: "Recent"   },
  { id: "favorite", label: "Favorite" },
];

const JACKPOT_BG = `${CDN}/kp/202604/Od2BpfvOItlrtyuv.png`;

export default function Home() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, dragFree: false });
  const [activeIdx, setActiveIdx] = useState(0);
  const [activeTab, setActiveTab] = useState("hot");
  const [jackpot, setJackpot] = useState(621100219);
  const [favorites, setFavorites] = useState<Set<number>>(new Set([1, 3, 6, 7, 12, 16, 22]));
  const tickerRef = useRef<HTMLDivElement>(null);

  /* Auto-slide banner */
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setActiveIdx(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    const iv = setInterval(() => emblaApi.scrollNext(), 3000);
    return () => { clearInterval(iv); emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  /* Jackpot counter */
  useEffect(() => {
    const iv = setInterval(() => {
      setJackpot(p => p + Math.floor(Math.random() * 300 + 50));
    }, 1500);
    return () => clearInterval(iv);
  }, []);

  const toggleFav = (id: number) => {
    setFavorites(prev => {
      const s = new Set(prev);
      s.has(id) ? s.delete(id) : s.add(id);
      return s;
    });
  };

  const displayGames = activeTab === "hot" ? hotGames
    : activeTab === "slots" ? slotsGames
    : activeTab === "favorite" ? [...hotGames, ...slotsGames].filter(g => favorites.has(g.id))
    : hotGames.slice(0, 6);

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>

      {/* ═══ BANNER CAROUSEL ═══ */}
      <div style={{ overflow: "hidden", position: "relative" }} ref={emblaRef}>
        <div style={{ display: "flex" }}>
          {banners.map((src, i) => (
            <div key={i} style={{ flex: "0 0 100%", minWidth: 0 }}>
              <img
                src={src} alt={`Banner ${i + 1}`}
                style={{ width: "100%", aspectRatio: "21/9", objectFit: "cover", display: "block" }}
                loading={i === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Banner dots */}
      <div className="swiper-dots" style={{ paddingBottom: 4 }}>
        {banners.map((_, i) => (
          <div key={i} className={`swiper-dot ${i === activeIdx ? "active" : ""}`} />
        ))}
      </div>

      {/* ═══ ANNOUNCEMENT TICKER ═══ */}
      <div style={{ display: "flex", alignItems: "center", background: "rgba(0,0,0,0.15)", padding: "5px 10px", gap: 6, overflow: "hidden" }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#FFF0BB" style={{ flexShrink: 0 }}><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
        <div style={{ flex: 1, overflow: "hidden" }} className="ticker-wrap">
          <span className="ticker-content" style={{ fontSize: 12, color: "#C5FAFF" }}>
            Chúc mừng bạn đã đến với HUYNH THUONG! Nạp lần đầu nhận 150% thưởng lên đến 5,000,000 VNĐ. Mừng ngày khai trương sòng bài Venetian và nhận ngay ưu đãi đặc biệt. Chúc các bạn chơi game vui vẻ và may mắn!
          </span>
        </div>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#9DE0E6" style={{ flexShrink: 0 }}><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
      </div>

      {/* ═══ GAME CATEGORY TABS ═══ */}
      <div style={{
        position: "sticky", top: 0, zIndex: 30,
        background: "#0090AF",
        display: "flex", borderBottom: "2px solid rgba(255,255,255,0.1)",
      }}>
        {tabs.map(t => (
          <button
            key={t.id}
            data-testid={`tab-${t.id}`}
            onClick={() => setActiveTab(t.id)}
            style={{
              flex: 1, background: "none", border: "none", cursor: "pointer",
              padding: "8px 4px 6px",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
              borderBottom: activeTab === t.id ? "2px solid #FFF0BB" : "2px solid transparent",
              marginBottom: -2,
            }}
          >
            {TabIcons[t.id]?.(activeTab === t.id)}
            <span style={{ fontSize: 11, color: activeTab === t.id ? "#FFF0BB" : "#9DE0E6", fontWeight: activeTab === t.id ? 700 : 400 }}>
              {t.label}
            </span>
          </button>
        ))}
      </div>

      {/* ═══ HOT label ═══ */}
      <div style={{ padding: "8px 12px 4px", display: "flex", alignItems: "center", gap: 6 }}>
        {TabIcons[activeTab]?.(true)}
        <span style={{ color: "#FFF0BB", fontWeight: 700, fontSize: 14 }}>
          {tabs.find(t => t.id === activeTab)?.label}
        </span>
      </div>

      {/* ═══ JACKPOT BANNER ═══ */}
      <div style={{ padding: "0 10px 8px" }}>
        <div style={{
          position: "relative", borderRadius: 10, overflow: "hidden",
          background: `url(${JACKPOT_BG}) center/cover no-repeat`,
          minHeight: 70,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        }}>
          {/* fallback gradient if image fails */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(90deg, #1a3a4a, #0f2535, #1a3a4a)",
            zIndex: 0,
          }} />
          <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "10px 0" }}>
            <div style={{ fontSize: 10, color: "#C5FAFF", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 2 }}>
              JACKPOTS
            </div>
            <div className="jackpot-num" style={{ fontSize: 30 }}>
              {jackpot.toLocaleString("vi-VN")}
            </div>
          </div>
        </div>
      </div>

      {/* ═══ GAME GRID ═══ */}
      <div style={{ padding: "0 8px 80px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
        {displayGames.map(game => (
          <div key={game.id} className="game-card" data-testid={`game-card-${game.id}`}>
            <img
              src={game.img}
              alt={game.name}
              loading="lazy"
              onError={e => {
                (e.currentTarget as HTMLImageElement).src = `https://via.placeholder.com/200x267/005f78/C5FAFF?text=${encodeURIComponent(game.name)}`;
              }}
            />
            <div className="provider-badge">{game.provider}</div>
            <button
              className={`fav-icon ${favorites.has(game.id) ? "active" : ""}`}
              onClick={e => { e.stopPropagation(); toggleFav(game.id); }}
              data-testid={`fav-${game.id}`}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >★</button>
            <div className="game-name">{game.name}</div>
          </div>
        ))}

        {displayGames.length === 0 && (
          <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px 0", color: "#9DE0E6", fontSize: 13 }}>
            Chưa có game nào trong danh sách này
          </div>
        )}
      </div>
    </Layout>
  );
}

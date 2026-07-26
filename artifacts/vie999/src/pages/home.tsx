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

/* ── GAME DATA by hall ─────────────────────────────────────── */

const jiliGames = [
  { id: 101, name: "Fortune Gems",      provider: "JILI", img: `${CDN}/game/OM/g/JL/3/200/0.png` },
  { id: 102, name: "Super Ace",         provider: "JILI", img: `${CDN}/game/OM/g/JL/3/204/0.png` },
  { id: 103, name: "Boxing King",       provider: "JILI", img: `${CDN}/game/OM/g/JL/3/208/0.png` },
  { id: 104, name: "Mega Ace",          provider: "JILI", img: `${CDN}/game/OM/g/JL/3/209/0.png` },
  { id: 105, name: "Lucky Coming",      provider: "JILI", img: `${CDN}/game/OM/g/JL/3/214/0.png` },
  { id: 106, name: "Samba",             provider: "JILI", img: `${CDN}/game/OM/g/JL/3/216/0.png` },
  { id: 107, name: "Dragon Treasure",   provider: "JILI", img: `${CDN}/game/OM/g/JL/3/217/0.png` },
  { id: 108, name: "Golden Empire",     provider: "JILI", img: `${CDN}/game/OM/g/JL/3/223/0.png` },
  { id: 109, name: "Crazy FaFaFa",      provider: "JILI", img: `${CDN}/game/OM/g/JL/3/224/0.png` },
  { id: 110, name: "Money Coming",      provider: "JILI", img: `${CDN}/game/OM/g/JL/3/225/0.png` },
  { id: 111, name: "Wild Ace",          provider: "JILI", img: `${CDN}/game/OM/g/JL/3/226/0.png` },
  { id: 112, name: "Charge Buffalo",    provider: "JILI", img: `${CDN}/game/OM/g/JL/3/228/0.png` },
  { id: 113, name: "RomaX",             provider: "JILI", img: `${CDN}/game/OM/g/JL/3/229/0.png` },
  { id: 114, name: "Jungle King",       provider: "JILI", img: `${CDN}/game/OM/g/JL/3/230/0.png` },
  { id: 115, name: "Fortune Tree",      provider: "JILI", img: `${CDN}/game/OM/g/JL/3/232/0.png` },
];

const pgGames = [
  { id: 201, name: "Ways of the Qilin",      provider: "PG", img: `${CDN}/game/OM/g/PGC/3/31047/0.png` },
  { id: 202, name: "Rise of Apollo",         provider: "PG", img: `${CDN}/game/OM/g/PGC/3/31048/0.png` },
  { id: 203, name: "Ganesha Fortune",        provider: "PG", img: `${CDN}/game/OM/g/PGC/3/31042/0.png` },
  { id: 204, name: "Egypt's Book of Mystery",provider: "PG", img: `${CDN}/game/OM/g/PGC/3/31040/0.png` },
  { id: 205, name: "Double Happiness",       provider: "PG", img: `${CDN}/game/OM/g/PGC/3/31033/0.png` },
  { id: 206, name: "Phoenix Rises",          provider: "PG", img: `${CDN}/game/OM/g/PGC/3/31031/0.png` },
  { id: 207, name: "Mahjong Ways",           provider: "PG", img: `${CDN}/game/OM/g/PGC/3/31030/0.png` },
  { id: 208, name: "Lucky Neko",             provider: "PG", img: `${CDN}/game/OM/g/PGC/3/31026/0.png` },
  { id: 209, name: "Treasures of Aztec",     provider: "PG", img: `${CDN}/game/OM/g/PGC/3/31007/0.png` },
  { id: 210, name: "Candy Burst",            provider: "PG", img: `${CDN}/game/OM/g/PGC/3/31009/0.png` },
  { id: 211, name: "Dragon Tiger Luck",      provider: "PG", img: `${CDN}/game/OM/g/PGC/3/31010/0.png` },
  { id: 212, name: "Prosperity Fortune Tree",provider: "PG", img: `${CDN}/game/OM/g/PGC/3/31011/0.png` },
  { id: 213, name: "Gem Saviour Sword",      provider: "PG", img: `${CDN}/game/OM/g/PGC/3/31012/0.png` },
  { id: 214, name: "Shaolin Soccer",         provider: "PG", img: `${CDN}/game/OM/g/PGC/3/31013/0.png` },
  { id: 215, name: "Hood vs Wolf",           provider: "PG", img: `${CDN}/game/OM/g/PGC/3/31014/0.png` },
];

const wgGames = [
  { id: 301, name: "Fortune Ox",       provider: "WG", img: `${CDN}/game/OM/g/WG/3/41015/0.png` },
  { id: 302, name: "Dragon Hatch",     provider: "WG", img: `${CDN}/game/OM/g/WG/3/41003/0.png` },
  { id: 303, name: "Queen of Bounty",  provider: "WG", img: `${CDN}/game/OM/g/WG/3/41004/0.png` },
  { id: 304, name: "Galactic Gems",    provider: "WG", img: `${CDN}/game/OM/g/WG/3/41005/0.png` },
  { id: 305, name: "Piggy Gold",       provider: "WG", img: `${CDN}/game/OM/g/WG/3/41007/0.png` },
  { id: 306, name: "Leprechaun Riches",provider: "WG", img: `${CDN}/game/OM/g/WG/3/41010/0.png` },
  { id: 307, name: "Wild Fireworks",   provider: "WG", img: `${CDN}/game/OM/g/WG/3/41012/0.png` },
  { id: 308, name: "Buffalo Win",      provider: "WG", img: `${CDN}/game/OM/g/WG/3/41016/0.png` },
  { id: 309, name: "Golden Dragon",    provider: "WG", img: `${CDN}/game/OM/g/WG/3/41020/0.png` },
  { id: 310, name: "Jungle Delight",   provider: "WG", img: `${CDN}/game/OM/g/WG/3/41023/0.png` },
  { id: 311, name: "Aztec Temple",     provider: "WG", img: `${CDN}/game/OM/g/WG/3/41025/0.png` },
  { id: 312, name: "Ocean Riches",     provider: "WG", img: `${CDN}/game/OM/g/WG/3/41034/0.png` },
  { id: 313, name: "Lucky Zodiac",     provider: "WG", img: `${CDN}/game/OM/g/WG/3/41035/0.png` },
  { id: 314, name: "Panda's Fortune",  provider: "WG", img: `${CDN}/game/OM/g/WG/3/41037/0.png` },
  { id: 315, name: "Gem Queen",        provider: "WG", img: `${CDN}/game/OM/g/WG/3/41038/0.png` },
];

const fcGames = [
  { id: 401, name: "Caishen Wins",     provider: "FC",  img: `${CDN}/game/OM/g/NJL/3/31226/0.png` },
  { id: 402, name: "Dragon Gold",      provider: "FC",  img: `${CDN}/game/OM/g/NJL/3/31219/0.png` },
  { id: 403, name: "Money Cat",        provider: "FC",  img: `${CDN}/game/OM/g/NJL/3/31262/0.png` },
  { id: 404, name: "JL Treasure",      provider: "FC",  img: `${CDN}/game/OM/g/JL/3/263/0.png` },
  { id: 405, name: "Happy Fishing",    provider: "FC",  img: `${CDN}/game/OM/g/JL/3/403/0.png` },
  { id: 406, name: "Fortune Gems 2",   provider: "FC",  img: `${CDN}/game/OM/g/JL/3/460/0.png` },
  { id: 407, name: "Dragon Fortune",   provider: "FC",  img: `${CDN}/game/OM/g/JL/3/461/0.png` },
  { id: 408, name: "Wild Bandits",     provider: "FC",  img: `${CDN}/game/OM/g/JL/3/324/0.png` },
  { id: 409, name: "Panda Panda",      provider: "FC",  img: `${CDN}/game/OM/g/JL/3/307/0.png` },
  { id: 410, name: "Jungle Fishing",   provider: "FC",  img: `${CDN}/game/OM/g/JL/3/300/0.png` },
  { id: 411, name: "King of Slots",    provider: "FC",  img: `${CDN}/game/OM/g/JL/3/301/0.png` },
  { id: 412, name: "Lucky Strike",     provider: "FC",  img: `${CDN}/game/OM/g/JL/3/302/0.png` },
  { id: 413, name: "Golden Toad",      provider: "FC",  img: `${CDN}/game/OM/g/JL/3/303/0.png` },
  { id: 414, name: "Neko Party",       provider: "FC",  img: `${CDN}/game/OM/g/JL/3/297/0.png` },
  { id: 415, name: "Spade Hunter",     provider: "FC",  img: `${CDN}/game/OM/g/JL/3/299/0.png` },
];

const jdbGames = [
  { id: 501, name: "Monkey King",      provider: "JDB", img: `${CDN}/game/OM/g/JDB/3/1404100/0.png` },
  { id: 502, name: "Sea Emperor",      provider: "JDB", img: `${CDN}/game/OM/g/JDB/3/1404200/0.png` },
  { id: 503, name: "Lucky 777",        provider: "JDB", img: `${CDN}/game/OM/g/JDB/3/1404300/0.png` },
  { id: 504, name: "Fishing Master",   provider: "JDB", img: `${CDN}/game/OM/g/JDB/3/1404400/0.png` },
  { id: 505, name: "JDB Treasure",     provider: "JDB", img: `${CDN}/game/OM/g/JDB/3/1404500/0.png` },
  { id: 506, name: "Golden Dragon",    provider: "JDB", img: `${CDN}/game/OM/g/JDB/3/1404600/0.png` },
  { id: 507, name: "Magic Lamp",       provider: "JDB", img: `${CDN}/game/OM/g/JDB/3/1404700/0.png` },
  { id: 508, name: "Fortune God",      provider: "JDB", img: `${CDN}/game/OM/g/JDB/3/1404800/0.png` },
  { id: 509, name: "Dragon Palace",    provider: "JDB", img: `${CDN}/game/OM/g/JDB/3/1405000/0.png` },
  { id: 510, name: "Wild Safari",      provider: "JDB", img: `${CDN}/game/OM/g/JDB/3/1405100/0.png` },
  { id: 511, name: "Rooster Warrior",  provider: "JDB", img: `${CDN}/game/OM/g/JDB/3/1405200/0.png` },
  { id: 512, name: "Happy Rich Year",  provider: "JDB", img: `${CDN}/game/OM/g/JDB/3/1403300/0.png` },
  { id: 513, name: "Dragon Ball",      provider: "JDB", img: `${CDN}/game/OM/g/JDB/3/1403400/0.png` },
  { id: 514, name: "Tiger Warrior",    provider: "JDB", img: `${CDN}/game/OM/g/JDB/3/1403500/0.png` },
  { id: 515, name: "Treasure Hunt",    provider: "JDB", img: `${CDN}/game/OM/g/JDB/3/1403600/0.png` },
];

const ppGames = [
  { id: 601, name: "Gates of Olympus", provider: "PP", img: `${CDN}/game/OM/g/PP/3/vs20pbonanza/0.png` },
  { id: 602, name: "Starlight Princess",provider: "PP", img: `${CDN}/game/OM/g/PP/3/vs20starlightx/0.png` },
  { id: 603, name: "Sweet Bonanza",     provider: "PP", img: `${CDN}/game/OM/g/PP/3/vs20pbonanza/0.png` },
  { id: 604, name: "Big Bass Bonanza",  provider: "PP", img: `${CDN}/game/OM/g/PP/3/vs10txbigbass/0.png` },
  { id: 605, name: "Dog House Megaways",provider: "PP", img: `${CDN}/game/OM/g/PP/3/vs20doghouse/0.png` },
  { id: 606, name: "Fruit Party",       provider: "PP", img: `${CDN}/game/OM/g/PP/3/vs20fruitparty/0.png` },
  { id: 607, name: "Zeus vs Hades",     provider: "PP", img: `${CDN}/game/OM/g/PP/3/vs15godsofwar/0.png` },
  { id: 608, name: "Lucky Tiger",       provider: "PP", img: `${CDN}/game/OM/g/PP/3/vs5luckytig/0.png` },
  { id: 609, name: "Pyramid Bonanza",   provider: "PP", img: `${CDN}/game/OM/g/PP/3/vs25pyramid/0.png` },
  { id: 610, name: "Cleopatra's Gold",  provider: "PP", img: `${CDN}/game/OM/g/PP/3/vs40cleoeye/0.png` },
  { id: 611, name: "Wild Bandito",      provider: "PP", img: `${CDN}/game/OM/g/PP/3/vs25wildies/0.png` },
  { id: 612, name: "Mahjong Wins Bonus",provider: "PP", img: `${CDN}/game/OM/g/PP/3/vs1024mjwinbns/0.png` },
  { id: 613, name: "Rainbow Gold",      provider: "PP", img: `${CDN}/game/OM/g/PP/3/vs20rainbowrsh/0.png` },
  { id: 614, name: "Gold Fish",         provider: "PP", img: `${CDN}/game/OM/g/PP/3/vs10goldfish/0.png` },
  { id: 615, name: "Sugar Rush",        provider: "PP", img: `${CDN}/game/OM/g/PP/3/vs20sugarrush/0.png` },
];

/* ── HALL TABS ─────────────────────────────────────────────── */
const halls = [
  { id: "jili", label: "JILI",   games: jiliGames, color: "#E8B84B" },
  { id: "pg",   label: "PG",     games: pgGames,   color: "#E8B84B" },
  { id: "wg",   label: "WG",     games: wgGames,   color: "#E8B84B" },
  { id: "fc",   label: "FC",     games: fcGames,   color: "#E8B84B" },
  { id: "jdb",  label: "JDB",    games: jdbGames,  color: "#E8B84B" },
  { id: "pp",   label: "PP",     games: ppGames,   color: "#E8B84B" },
];

const JACKPOT_BG = `${CDN}/kp/202604/Od2BpfvOItlrtyuv.png`;

export default function Home() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, dragFree: false });
  const [activeIdx, setActiveIdx] = useState(0);
  const [activeHall, setActiveHall] = useState("jili");
  const [jackpot, setJackpot] = useState(621100219);
  const [favorites, setFavorites] = useState<Set<number>>(new Set([101, 203, 301, 501, 601]));
  const [gameTab, setGameTab] = useState<"all" | "fav">("all");

  /* Auto-slide banner */
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setActiveIdx(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    const iv = setInterval(() => emblaApi.scrollNext(), 3200);
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

  const currentHall = halls.find(h => h.id === activeHall)!;
  const displayGames = gameTab === "fav"
    ? halls.flatMap(h => h.games).filter(g => favorites.has(g.id))
    : currentHall.games;

  return (
    <Layout>
      {/* ═══ BANNER ═══ */}
      <div style={{ overflow: "hidden", position: "relative" }} ref={emblaRef}>
        <div style={{ display: "flex" }}>
          {banners.map((src, i) => (
            <div key={i} style={{ flex: "0 0 100%", minWidth: 0 }}>
              <img src={src} alt={`Banner ${i + 1}`}
                style={{ width: "100%", aspectRatio: "21/9", objectFit: "cover", display: "block" }}
                loading={i === 0 ? "eager" : "lazy"} />
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
      <div style={{ display: "flex", alignItems: "center", background: "rgba(201,168,76,0.08)", padding: "5px 10px", gap: 6, overflow: "hidden", borderTop: "1px solid rgba(201,168,76,0.15)", borderBottom: "1px solid rgba(201,168,76,0.15)" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#C9A84C" style={{ flexShrink: 0 }}><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
        <div style={{ flex: 1, overflow: "hidden" }} className="ticker-wrap">
          <span className="ticker-content" style={{ fontSize: 12, color: "#e0c97a" }}>
            Chuc mung ban da den voi HUYNH THUONG! Nap lan dau nhan 150% thuong len den 5,000,000 VND. Mung ngay khai truong song bai va nhan ngay uu dai dac biet. Chuc cac ban choi game vui ve va may man!
          </span>
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#C9A84C" style={{ flexShrink: 0 }}><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
      </div>

      {/* ═══ JACKPOT ═══ */}
      <div style={{ padding: "10px 10px 0" }}>
        <div style={{
          position: "relative", borderRadius: 10, overflow: "hidden",
          background: `url(${JACKPOT_BG}) center/cover no-repeat`,
          minHeight: 68,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, #0D0D1A, #1A1A2E, #0D0D1A)", zIndex: 0 }} />
          <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "8px 0" }}>
            <div style={{ fontSize: 10, color: "#C9A84C", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 2 }}>
              JACKPOT POOL
            </div>
            <div className="jackpot-num" style={{ fontSize: 32 }}>
              {jackpot.toLocaleString("vi-VN")}
            </div>
          </div>
        </div>
      </div>

      {/* ═══ HALL TABS ═══ */}
      <div style={{
        position: "sticky", top: 0, zIndex: 30,
        background: "#0D0D1A",
        display: "flex",
        borderBottom: "1px solid rgba(201,168,76,0.2)",
        overflowX: "auto",
        scrollbarWidth: "none",
        marginTop: 10,
      }}>
        {halls.map(h => {
          const active = activeHall === h.id;
          return (
            <button
              key={h.id}
              onClick={() => { setActiveHall(h.id); setGameTab("all"); }}
              style={{
                flex: "0 0 auto",
                minWidth: 60,
                background: "none", border: "none", cursor: "pointer",
                padding: "10px 14px 8px",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
                borderBottom: active ? "2px solid #C9A84C" : "2px solid transparent",
                marginBottom: -1,
              }}
            >
              {/* Provider logo text */}
              <span style={{
                fontSize: 13, fontWeight: 800,
                fontFamily: "'Oswald', sans-serif",
                color: active ? "#C9A84C" : "rgba(255,255,255,0.4)",
                letterSpacing: "0.05em",
                lineHeight: 1,
              }}>
                {h.label}
              </span>
              <span style={{ fontSize: 9, color: active ? "rgba(201,168,76,0.7)" : "rgba(255,255,255,0.25)", fontWeight: 400 }}>
                SLOT
              </span>
            </button>
          );
        })}

        {/* Favorites tab */}
        <button
          onClick={() => setGameTab(gameTab === "fav" ? "all" : "fav")}
          style={{
            flex: "0 0 auto", minWidth: 50,
            background: "none", border: "none", cursor: "pointer",
            padding: "10px 10px 8px",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
            borderBottom: gameTab === "fav" ? "2px solid #C9A84C" : "2px solid transparent",
            marginBottom: -1, marginLeft: "auto",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={gameTab === "fav" ? "#C9A84C" : "rgba(255,255,255,0.35)"}>
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
          </svg>
          <span style={{ fontSize: 9, color: gameTab === "fav" ? "rgba(201,168,76,0.7)" : "rgba(255,255,255,0.25)" }}>YEU THICH</span>
        </button>
      </div>

      {/* Hall label */}
      <div style={{ padding: "8px 12px 4px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 3, height: 16, background: "linear-gradient(#C9A84C, #F5D787)", borderRadius: 2 }} />
          <span style={{ fontFamily: "'Oswald', sans-serif", color: "#C9A84C", fontWeight: 700, fontSize: 15, letterSpacing: "0.05em" }}>
            {gameTab === "fav" ? "YEU THICH" : `${currentHall.label} SLOT`}
          </span>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginLeft: 4 }}>
            {displayGames.length} tro choi
          </span>
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
                (e.currentTarget as HTMLImageElement).src =
                  `https://placehold.co/200x267/1A1A2E/C9A84C?text=${encodeURIComponent(game.name)}&font=oswald`;
              }}
            />
            <div className="provider-badge">{game.provider}</div>
            <button
              className={`fav-icon ${favorites.has(game.id) ? "active" : ""}`}
              onClick={e => { e.stopPropagation(); toggleFav(game.id); }}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill={favorites.has(game.id) ? "#C9A84C" : "rgba(255,255,255,0.5)"}>
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
            </button>
            <div className="game-name">{game.name}</div>

            {/* Play overlay */}
            <div className="game-play-overlay">
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                background: "rgba(201,168,76,0.9)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#0D0D1A">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          </div>
        ))}

        {displayGames.length === 0 && (
          <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "48px 0", color: "rgba(201,168,76,0.5)", fontSize: 13 }}>
            Chua co game nao trong danh sach yeu thich
          </div>
        )}
      </div>
    </Layout>
  );
}

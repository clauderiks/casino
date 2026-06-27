import React, { useEffect, useState } from "react";
import { Layout } from "@/components/layout/layout";
import useEmblaCarousel from "embla-carousel-react";
import { Volume2, Star, Play } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "react-day-picker";

const games = [
  { id: 1, name: "Ways of the Qilin", provider: "PG", img: "/images/slot-qilin.png", hot: true },
  { id: 2, name: "Rise of Apollo", provider: "PG", img: "/images/slot-apollo.png" },
  { id: 3, name: "Ganesha Fortune", provider: "PG", img: "/images/slot-ganesha.png", hot: true },
  { id: 4, name: "Egypt's Book of Mystery", provider: "PG", img: "/images/slot-egypt.png" },
  { id: 5, name: "Double Happiness", provider: "JL", img: "/images/slot-happiness.png" },
  { id: 6, name: "Phoenix Rises", provider: "PG", img: "/images/slot-phoenix.png", hot: true },
  { id: 7, name: "Mahjong Ways", provider: "PG", img: "/images/slot-mahjong.png", hot: true },
  { id: 8, name: "Lucky Neko", provider: "PG", img: "/images/slot-neko.png" },
  { id: 9, name: "Medusa 2", provider: "PG", img: "/images/slot-medusa.png" },
];

const categories = [
  { id: 'hot', label: 'Hot', icon: '🔥' },
  { id: 'slots', label: 'Slots', icon: '🎰' },
  { id: 'recent', label: 'Recent', icon: '⏱' },
  { id: 'favorite', label: 'Favorite', icon: '⭐' },
];

export default function Home() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [activeTab, setActiveTab] = useState('hot');
  const [jackpot, setJackpot] = useState(621100219);

  // Auto-slide carousel
  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  // Jackpot counter animation
  useEffect(() => {
    const interval = setInterval(() => {
      setJackpot(prev => prev + Math.floor(Math.random() * 500) + 100);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      {/* Banner Carousel */}
      <div className="overflow-hidden bg-card" ref={emblaRef}>
        <div className="flex">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex-[0_0_100%] min-w-0 p-2">
              <div className={`rounded-xl aspect-[21/9] flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-r ${i === 1 ? 'from-purple-900 to-indigo-800' : i === 2 ? 'from-blue-900 to-cyan-900' : 'from-red-900 to-orange-900'}`}>
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10 text-center">
                  <h2 className="text-2xl font-black text-white drop-shadow-md tracking-tight uppercase mb-1">
                    NẠP LẦN ĐẦU <span className="text-secondary">150%</span>
                  </h2>
                  <p className="text-sm text-white/90 font-medium">Thưởng lên đến 5,000,000 VNĐ</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Announcement Ticker */}
      <div className="flex items-center px-3 py-2 bg-primary/10 border-y border-primary/20">
        <Volume2 className="w-4 h-4 text-primary mr-2 shrink-0" />
        <div className="overflow-hidden flex-1 relative h-5">
          <motion.div 
            animate={{ x: [0, -500] }}
            transition={{ ease: "linear", duration: 15, repeat: Infinity }}
            className="whitespace-nowrap text-xs text-primary font-medium absolute whitespace-nowrap"
          >
            Chào mừng đến với VIE999! Nạp lần đầu nhận 150% thưởng lên đến 5,000,000 VNĐ. Chúc các bạn chơi game vui vẻ!
          </motion.div>
        </div>
      </div>

      {/* Categories */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur px-2 py-3 flex gap-2 overflow-x-auto no-scrollbar border-b border-border/50">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg whitespace-nowrap transition-colors relative ${activeTab === cat.id ? 'bg-primary/10 text-primary font-bold' : 'text-muted-foreground'}`}
            data-testid={`tab-${cat.id}`}
          >
            <span className="text-lg">{cat.icon}</span>
            <span className="text-xs">{cat.label}</span>
            {activeTab === cat.id && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      {/* Jackpot Banner */}
      <div className="px-3 py-4">
        <div className="relative rounded-xl overflow-hidden border border-secondary/30 bg-gradient-to-b from-card to-background p-4 flex flex-col items-center justify-center shadow-[0_0_15px_rgba(255,215,0,0.1)]">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          
          <div className="text-secondary font-bold text-xs uppercase tracking-[0.2em] mb-1">Grand Jackpot</div>
          
          <div className="flex items-center justify-center gap-1 font-mono text-3xl font-black jackpot-gradient drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]">
            <span className="text-secondary/70 text-xl font-sans">₫</span>
            {jackpot.toLocaleString('en-US')}
          </div>
        </div>
      </div>

      {/* Games Grid */}
      <div className="px-3 grid grid-cols-3 gap-3 pb-6">
        {games.map((game, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            key={game.id} 
            className="group cursor-pointer relative"
            data-testid={`game-card-${game.id}`}
          >
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-card border border-border/50 group-hover:border-primary/50 group-hover:shadow-[0_0_10px_rgba(0,200,255,0.2)] transition-all">
              <img src={game.img} alt={game.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" loading="lazy" />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
              
              {/* Badges */}
              <div className="absolute top-1 left-1 bg-black/60 backdrop-blur rounded px-1.5 py-0.5 text-[9px] font-bold text-white border border-white/10">
                {game.provider}
              </div>
              <div className="absolute top-1 right-1">
                <Star className={`w-3.5 h-3.5 ${game.hot ? 'text-secondary fill-secondary drop-shadow-[0_0_2px_rgba(255,215,0,0.8)]' : 'text-white/50'}`} />
              </div>
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-black">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </div>
              </div>
              
              <div className="absolute bottom-1 w-full px-1.5">
                <h3 className="text-[10px] font-medium text-white truncate text-center drop-shadow-md">{game.name}</h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="px-3 pb-8 flex justify-center">
        <Button variant="outline" className="w-full bg-card/50 border-border text-muted-foreground text-xs h-8">
          Tải thêm trò chơi
        </Button>
      </div>
    </Layout>
  );
}

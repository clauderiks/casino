import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, Search, Home, Gift, Wallet, ClipboardList, User, X, ChevronRight, History, Users, Ticket, Award, Calendar, DollarSign, Crown, HelpCircle, Info, HeadphonesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  return (
    <div className="flex justify-center min-h-[100dvh] bg-black">
      <div className="w-full max-w-[480px] bg-background relative flex flex-col min-h-[100dvh] shadow-2xl overflow-hidden shadow-primary/10">
        {/* Header */}
        <header className="sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-background/95 backdrop-blur border-b border-border/50">
          <div className="flex items-center gap-3">
            <button onClick={toggleDrawer} className="p-1" data-testid="button-menu">
              <Menu className="w-6 h-6 text-foreground" />
            </button>
            <Link href="/" className="flex items-center gap-1 font-bold text-xl tracking-tight">
              <span className="text-primary text-2xl">🔥</span>
              <span className="text-gradient font-black">VIE999</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="outline" size="sm" className="h-8 text-xs border-primary/50 text-primary hover:bg-primary/10" data-testid="button-login-header">Đăng nhập</Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="h-8 text-xs bg-primary text-primary-foreground hover:bg-primary/90 font-bold" data-testid="button-register-header">Đăng ký</Button>
            </Link>
            <button className="p-1 ml-1" data-testid="button-search">
              <Search className="w-5 h-5 text-muted-foreground" />
            </button>
            <div className="w-6 h-6 rounded-full overflow-hidden bg-red-500 border border-border flex items-center justify-center text-[10px]">
              🇻🇳
            </div>
          </div>
        </header>

        {/* Drawer */}
        <AnimatePresence>
          {isDrawerOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm max-w-[480px] mx-auto"
                onClick={toggleDrawer}
              />
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 bottom-0 left-0 z-50 w-[80%] max-w-[320px] bg-[#0f1c2e] border-r border-border overflow-y-auto flex flex-col"
              >
                <div className="p-4 border-b border-border flex justify-between items-center bg-card">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-bold">Khách</div>
                      <div className="text-xs text-primary cursor-pointer">Đăng nhập/Đăng ký &gt;</div>
                    </div>
                  </div>
                  <button onClick={toggleDrawer} className="p-2 bg-black/20 rounded-full" data-testid="button-close-drawer">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-4 flex gap-2 overflow-x-auto no-scrollbar border-b border-border/50">
                  <Button variant="secondary" size="sm" className="bg-primary/10 text-primary hover:bg-primary/20 shrink-0">Hot 🔥</Button>
                  <Button variant="ghost" size="sm" className="shrink-0">Slots 🎰</Button>
                  <Button variant="ghost" size="sm" className="shrink-0">Recent ⏱</Button>
                  <Button variant="ghost" size="sm" className="shrink-0">Favorite ⭐</Button>
                </div>

                <div className="p-4 flex gap-4 border-b border-border/50">
                  <div className="flex-1 bg-card rounded-lg p-3 flex flex-col items-center justify-center gap-2 border border-border/50">
                    <History className="w-6 h-6 text-primary" />
                    <span className="text-xs font-medium">Lịch sử cược</span>
                  </div>
                  <div className="flex-1 bg-card rounded-lg p-3 flex flex-col items-center justify-center gap-2 border border-border/50">
                    <Users className="w-6 h-6 text-secondary" />
                    <span className="text-xs font-medium">Đại lý</span>
                  </div>
                </div>

                <div className="p-4 border-b border-border/50">
                  <h3 className="text-sm font-bold text-muted-foreground mb-3 flex items-center gap-2">
                    <Gift className="w-4 h-4" /> Trung tâm ưu đãi
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-card/50 p-2 rounded flex items-center gap-2 text-sm"><Calendar className="w-4 h-4 text-blue-400"/> Sự kiện</div>
                    <div className="bg-card/50 p-2 rounded flex items-center gap-2 text-sm"><Award className="w-4 h-4 text-purple-400"/> Nhiệm vụ</div>
                    <div className="bg-card/50 p-2 rounded flex items-center gap-2 text-sm"><DollarSign className="w-4 h-4 text-green-400"/> Hoàn trả</div>
                    <div className="bg-card/50 p-2 rounded flex items-center gap-2 text-sm"><Gift className="w-4 h-4 text-red-400"/> Nhận thưởng</div>
                    <div className="bg-card/50 p-2 rounded flex items-center gap-2 text-sm"><History className="w-4 h-4 text-orange-400"/> Lịch sử</div>
                    <div className="bg-card/50 p-2 rounded flex items-center gap-2 text-sm"><Ticket className="w-4 h-4 text-yellow-400"/> Lãi suất</div>
                    <div className="bg-card/50 p-2 rounded flex items-center gap-2 text-sm"><Crown className="w-4 h-4 text-secondary"/> VIP</div>
                    <div className="bg-card/50 p-2 rounded flex items-center gap-2 text-sm"><Wallet className="w-4 h-4 text-cyan-400"/> Quỹ</div>
                  </div>
                </div>

                <div className="mt-auto p-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between p-3 bg-card rounded-lg border border-border/50">
                    <div className="flex items-center gap-3">
                      <div className="text-xl">🇻🇳</div>
                      <span className="text-sm">Tiếng Việt</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    <div className="flex flex-col items-center gap-1 text-muted-foreground">
                      <HeadphonesIcon className="w-5 h-5" />
                      <span className="text-[10px]">CSKH</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 text-muted-foreground">
                      <HelpCircle className="w-5 h-5" />
                      <span className="text-[10px]">FAQ</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 text-muted-foreground">
                      <Info className="w-5 h-5" />
                      <span className="text-[10px]">Giới thiệu</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto pb-20 no-scrollbar">
          {children}
        </main>

        {/* Bottom Nav */}
        <nav className="fixed bottom-0 w-full max-w-[480px] bg-background/95 backdrop-blur border-t border-border z-40 pb-safe">
          <div className="flex justify-between items-center px-2 py-2">
            <Link href="/" className={`flex flex-col items-center flex-1 py-1 ${location === "/" ? "nav-active" : "text-muted-foreground"}`}>
              <Home className="w-6 h-6 mb-1" />
              <span className="text-[10px] font-medium">Trang chủ</span>
            </Link>
            <Link href="/promotions" className={`flex flex-col items-center flex-1 py-1 ${location === "/promotions" ? "nav-active" : "text-muted-foreground"}`}>
              <Gift className="w-6 h-6 mb-1" />
              <span className="text-[10px] font-medium">Khuyến mãi</span>
            </Link>
            <Link href="/deposit" className="flex flex-col items-center flex-1 py-1 text-muted-foreground relative -top-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-blue-600 flex items-center justify-center border-4 border-background shadow-lg shadow-primary/20 text-white">
                <Wallet className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-medium mt-1">Nạp tiền</span>
            </Link>
            <Link href="/history" className={`flex flex-col items-center flex-1 py-1 ${location === "/history" ? "nav-active" : "text-muted-foreground"}`}>
              <ClipboardList className="w-6 h-6 mb-1" />
              <span className="text-[10px] font-medium">Lịch sử</span>
            </Link>
            <Link href="/login" className={`flex flex-col items-center flex-1 py-1 ${location === "/login" ? "nav-active" : "text-muted-foreground"}`}>
              <User className="w-6 h-6 mb-1" />
              <span className="text-[10px] font-medium">Tôi</span>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}

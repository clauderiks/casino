import React from "react";
import { Layout } from "@/components/layout/layout";
import { Gift, Calendar, Award, ChevronRight } from "lucide-react";

const promotions = [
  {
    id: 1,
    title: "Thưởng nạp lần đầu 150%",
    desc: "Nạp lần đầu nhận ngay 150% thưởng lên đến 5,000,000 VNĐ",
    type: "new",
    color: "from-blue-600 to-cyan-500",
    date: "Lâu dài",
    icon: <Gift className="w-5 h-5 text-white" />
  },
  {
    id: 2,
    title: "Hoàn trả hàng ngày 1.5%",
    desc: "Hoàn trả không giới hạn lên đến 1.5% mỗi ngày",
    type: "daily",
    color: "from-purple-600 to-pink-500",
    date: "Hàng ngày",
    icon: <Award className="w-5 h-5 text-white" />
  },
  {
    id: 3,
    title: "Thưởng nạp lại chủ nhật",
    desc: "Nạp tiền chủ nhật nhận ngay 20% thưởng lên đến 2,000,000 VNĐ",
    type: "weekly",
    color: "from-orange-500 to-red-500",
    date: "Chủ nhật hàng tuần",
    icon: <Calendar className="w-5 h-5 text-white" />
  }
];

export default function Promotions() {
  return (
    <Layout>
      <div className="p-4 bg-card border-b border-border">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <Gift className="w-6 h-6 text-primary" />
          Khuyến Mãi
        </h1>
        <p className="text-xs text-muted-foreground mt-1">Nhiều phần thưởng hấp dẫn đang chờ đón bạn</p>
      </div>
      
      <div className="p-4 space-y-4">
        {promotions.map((promo) => (
          <div key={promo.id} className="bg-card rounded-xl overflow-hidden border border-border/50" data-testid={`promo-card-${promo.id}`}>
            <div className={`h-24 bg-gradient-to-r ${promo.color} p-4 flex items-center justify-center relative overflow-hidden`}>
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
              <div className="relative z-10 flex flex-col items-center">
                {promo.icon}
                <h3 className="text-white font-bold mt-1 text-center leading-tight drop-shadow-md">{promo.title}</h3>
              </div>
            </div>
            
            <div className="p-3">
              <p className="text-sm text-muted-foreground mb-3">{promo.desc}</p>
              
              <div className="flex items-center justify-between mt-2 pt-3 border-t border-border/50">
                <span className="text-[10px] text-muted-foreground bg-background px-2 py-1 rounded">
                  Thời gian: {promo.date}
                </span>
                
                <button className="text-xs font-medium text-primary flex items-center hover:text-primary/80 transition-colors">
                  Chi tiết <ChevronRight className="w-3 h-3 ml-1" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

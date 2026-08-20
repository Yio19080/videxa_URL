"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import PaymentModal from "@/components/PaymentModal";
import { fetchPexelsVideos } from "@/lib/pexels";
import { UserRole, VideoItem } from "@/types";

export default function HomePage() {
  const [isPayOpen, setIsPayOpen] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>("FREE");
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [videos, setVideos] = useState<VideoItem[]>([]);

  useEffect(() => {
    async function loadApiVideos() {
      const pexelsData = await fetchPexelsVideos("cinematic 4k");
      if (pexelsData.length > 0) {
        setVideos(pexelsData);
      } else {
        setVideos([
          { id: "1", title: "المحارب السينمائي", category: "سينما", duration: "15s", badge: "4K AI", poster: "", videoUrl: "" },
          { id: "2", title: "عالم السايبربنك", category: "ترند", duration: "20s", badge: "TRENDING", poster: "", videoUrl: "" },
          { id: "3", title: "إعلان تجاري", category: "بزنس", duration: "30s", badge: "PRO", poster: "", videoUrl: "" },
        ] as any);
      }
    }
    loadApiVideos();
  }, []);

  const handleVipProtection = (actionName: string) => {
    if (userRole === "FREE") {
      setIsPayOpen(true);
    } else {
      alert(`تم تنفيذ ${actionName} بنجاح!`);
    }
  };

  const categories = ["الكل", "ترند", "سينما", "بزنس", "تعليم"];
  const filtered = activeCategory === "الكل" ? videos : videos.filter(t => t.category === activeCategory);

  return (
    <main className="min-h-screen bg-[#07090e] text-white dir-rtl font-sans pb-10">
      <div className="max-w-5xl mx-auto px-3 pt-3 space-y-4">
        
        <div className="bg-gradient-to-r from-purple-900/60 to-pink-900/60 border border-purple-500/30 rounded-xl p-2 flex justify-between items-center text-[11px]">
          <div>
            <span className="font-bold text-pink-400">حالة الحساب: </span>
            <span className={userRole === "VIP" ? "text-green-400 font-bold" : "text-yellow-400 font-bold"}>
              {userRole === "VIP" ? "مشترك VIP ✨" : "مجاني (FREE)"}
            </span>
          </div>
          <button 
            onClick={() => setUserRole(userRole === "FREE" ? "VIP" : "FREE")}
            className="text-[9px] bg-white/10 px-2 py-0.5 rounded border border-white/20"
          >
            تجربة تبديل الحساب
          </button>
        </div>

        <header className="flex justify-between items-center py-1">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">
              VIDEXA AI
            </h1>
            <Link href="/shorts" className="text-[10px] bg-pink-600/30 border border-pink-500/50 px-2.5 py-1 rounded-full font-bold">
              🎬 الشورتس
            </Link>
          </div>

          <button
            onClick={() => setIsPayOpen(true)}
            className="px-3 py-1 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-[10px]"
          >
            {userRole === "VIP" ? "عضوية VIP" : "ترقية Pro ✨"}
          </button>
        </header>

        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black p-4">
           <div className="relative z-10 space-y-2">
              <span className="text-[8px] bg-white/10 px-2 py-0.5 rounded text-cyan-300 font-bold">مجاني 100% لفترة محدودة</span>
              <h2 className="text-base font-black text-white">أطلق العنان لإبداعك مع Videxa – فيديوهات سينمائية 4K!</h2>
              <button onClick={() => setIsPayOpen(true)} className="px-4 py-1.5 rounded-lg bg-cyan-500 text-black font-bold text-[11px]">
                👉 ابدأ المشاهدة الآن
              </button>
           </div>
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-3 py-1 rounded-lg text-[10px] font-bold ${activeCategory === cat ? "bg-blue-600 text-white" : "bg-white/5 text-slate-400"}`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2">
          {filtered.map((item) => (
            <div key={item.id} className="bg-white/5 border border-white/10 rounded-lg overflow-hidden flex flex-col justify-between">
              <div className="relative aspect-[16/10] bg-black">
                {item.videoUrl ? <video src={item.videoUrl} poster={item.poster} controls className="w-full h-full object-cover" /> : null}
                <span className="absolute top-1 right-1 text-[7px] bg-black/70 text-white px-1 rounded font-bold">{item.badge}</span>
              </div>

              <div className="p-1.5 bg-black/70 space-y-1">
                <h4 className="font-bold text-[9px] text-white truncate">{item.title}</h4>
                
                <div className="flex gap-1">
                  <button 
                    onClick={() => handleVipProtection("استخدام القالب")}
                    className="w-1/2 bg-purple-600/80 text-white text-[7px] font-bold py-0.5 rounded truncate"
                  >
                    {userRole === "FREE" ? "🔒 قالب" : "قالب"}
                  </button>

                  <button 
                    onClick={() => handleVipProtection("تحميل الفيديو")}
                    className="w-1/2 bg-cyan-500 text-black text-[7px] font-bold py-0.5 rounded truncate"
                  >
                    {userRole === "FREE" ? "🔒 تحميل" : "تحميل"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      <PaymentModal isOpen={isPayOpen} onClose={() => setIsPayOpen(false)} />
    </main>
  );
}

"use client";

import React, { useState } from "react";
import PaymentModal from "@/components/PaymentModal";

export default function HomePage() {
  const [isPayOpen, setIsPayOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("الكل");

  const templates = [
    { id: 1, title: "المحارب السينمائي", category: "سينما", duration: "15s", badge: "4K AI", gradient: "from-purple-600 to-indigo-900" },
    { id: 2, title: "عالم السايبربنك", category: "ترند", duration: "20s", badge: "TRENDING", gradient: "from-pink-600 to-purple-900" },
    { id: 3, title: "إعلان تجاري فاخر", category: "بزنس", duration: "30s", badge: "PRO", gradient: "from-blue-600 to-slate-900" },
    { id: 4, title: "المستقبل الذكي", category: "تعليم", duration: "15s", badge: "4K AI", gradient: "from-cyan-600 to-blue-900" },
    { id: 5, title: "أساطير الفضاء", category: "سينما", duration: "25s", badge: "HOT", gradient: "from-violet-600 to-fuchsia-900" },
    { id: 6, title: "نيون سيتي", category: "ترند", duration: "10s", badge: "4K AI", gradient: "from-rose-600 to-purple-900" },
  ];

  const categories = ["الكل", "ترند", "سينما", "بزنس", "تعليم"];

  const filtered = activeCategory === "الكل" ? templates : templates.filter(t => t.category === activeCategory);

  return (
    <main className="min-h-screen bg-[#07090e] text-white dir-rtl font-sans pb-10">
      <div className="max-w-5xl mx-auto px-4 pt-6 space-y-6">
        
        {/* Header */}
        <header className="flex justify-between items-center py-2">
          <h1 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 tracking-wider">
            VIDEXA AI
          </h1>
          <button
            onClick={() => setIsPayOpen(true)}
            className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-[11px] shadow-[0_0_10px_rgba(219,39,119,0.3)]"
          >
            ترقية Pro ✨
          </button>
        </header>

        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-black p-5">
           <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-black/90 z-0" />
           <div className="relative z-10 space-y-2">
              <span className="text-[9px] bg-white/10 px-2 py-0.5 rounded text-cyan-300 font-bold uppercase tracking-widest">
                العرض السينمائي
              </span>
              <h2 className="text-xl font-black leading-tight text-white">
                عالم الذكاء الاصطناعي الفائق 4K
              </h2>
              <p className="text-slate-400 text-[10px] leading-relaxed max-w-xs">
                أنشئ مقاطع فيديو مذهلة بدقة وسرعة بدعم من أحدث نماذج توليد الميديا.
              </p>
           </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all ${
                activeCategory === cat ? "bg-blue-600 text-white" : "bg-white/5 text-slate-500"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setIsPayOpen(true)}
              className="bg-white/5 border border-white/5 rounded-xl overflow-hidden"
            >
              <div className={`aspect-[2/3] bg-gradient-to-br ${item.gradient} p-3 flex flex-col justify-between`}>
                <span className="text-[9px] bg-black/50 text-white px-1.5 py-0.5 rounded w-fit">{item.badge}</span>
                <div className="bg-black/60 p-2 rounded-lg backdrop-blur-sm">
                  <h4 className="font-bold text-[11px] text-white truncate">{item.title}</h4>
                  <p className="text-[9px] text-slate-400">{item.category}</p>
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

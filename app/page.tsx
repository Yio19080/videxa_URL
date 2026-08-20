"use client";

import React, { useState } from "react";
import PaymentModal from "@/components/PaymentModal";

export default function HomePage() {
  const [isPayOpen, setIsPayOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("الكل");

  // نماذج كروت الفيديوهات السينمائية (مثل بوسترات الأفلام)
  const templates = [
    { id: 1, title: "المحارب السينمائي", category: "سينما", duration: "15s", badge: "4K AI", gradient: "from-purple-600 to-indigo-900" },
    { id: 2, title: "عالم السايبربنك", category: "ترند", duration: "20s", badge: "TRENDING", gradient: "from-pink-600 to-purple-900" },
    { id: 3, title: "إعلان تجاري فاخر", category: "بزنس", duration: "30s", badge: "PRO", gradient: "from-blue-600 to-slate-900" },
    { id: 4, title: "المستقبل الذكي", category: "تعليم", duration: "15s", badge: "4K AI", gradient: "from-cyan-600 to-blue-900" },
    { id: 5, title: "أساطير الفضاء", category: "سينما", duration: "25s", badge: "HOT", gradient: "from-violet-600 to-fuchsia-900" },
    { id: 6, title: "نيون سيتي", category: "ترند", duration: "10s", badge: "4K AI", gradient: "from-rose-600 to-purple-900" },
  ];

  const categories = ["الكل", "ترند", "سينما", "بزنس", "تعليم"];

  const filtered = activeCategory === "الكل" 
    ? templates 
    : templates.filter(t => t.category === activeCategory);

  return (
    <main className="min-h-screen bg-[#07090e] text-white dir-rtl relative overflow-hidden pb-12 font-sans">
      {/* خلفية الإضاءة والنيون المستقبلية */}
      <div className="absolute top-[-100px] right-[-100px] w-[450px] h-[450px] bg-purple-600/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[40%] left-[-150px] w-[500px] h-[500px] bg-cyan-600/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 pt-6 space-y-8 relative z-10">
        
        {/* الهيدر العلوي */}
        <header className="flex justify-between items-center py-2 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee]"></span>
            <h1 className="text-2xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500">
              VIDEXA AI
            </h1>
          </div>
          <button
            onClick={() => setIsPayOpen(true)}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs shadow-[0_0_20px_rgba(219,39,119,0.4)] hover:scale-105 transition duration-300"
          >
            ترقية Pro ✨
          </button>
        </header>

        {/* مشغل الفيديو الرئيسي المميز (Featured Player like App) */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-slate-900/90 to-purple-950/40 backdrop-blur-xl p-1 shadow-2xl">
          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden bg-slate-950 flex flex-col justify-end p-6 group">
            {/* إضاءة خلفية داخل الميديا */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-black/40 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-cyan-900/30 animate-pulse" />
            
            {/* علامة تشغيل سينمائية وسط الفيديو */}
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <button 
                onClick={() => setIsPayOpen(true)}
                className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center text-white text-2xl group-hover:scale-110 shadow-[0_0_30px_rgba(168,85,247,0.5)] transition duration-300"
              >
                ▶
              </button>
            </div>

            {/* تفاصيل القالب المميز */}
            <div className="relative z-20 space-y-2">
              <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider">
                العرض السينمائي الرئيسي
              </span>
              <h2 className="text-2xl md:text-3xl font-black">عالم الذكاء الاصطناعي الفائق 4K</h2>
              <p className="text-slate-300 text-xs max-w-md line-clamp-2">أنشئ مقاطع فيديو مذهلة بدقة وسرعة بدعم من أحدث نماذج توليد الصور والميديا.</p>
            </div>
          </div>
        </div>

        {/* تصنيفات الفيديوهات (Categories Tabs) */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold tracking-wide text-slate-200">مكتبة القوالب السينمائية</h3>
            <span className="text-xs text-slate-400">{filtered.length} قالب متوفر</span>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                    : "bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* شبكة البوسترات والفيديوهات (Movie Posters Grid like the Image) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setIsPayOpen(true)}
              className="group relative bg-slate-900/60 border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 cursor-pointer hover:-translate-y-1 shadow-lg"
            >
              {/* صورة/بوستر الفيديو بنسبة طولية سينمائية */}
              <div className={`aspect-[2/3] bg-gradient-to-br ${item.gradient} p-4 flex flex-col justify-between relative overflow-hidden`}>
                <div className="flex justify-between items-start z-10">
                  <span className="bg-black/60 backdrop-blur-md border border-white/20 text-cyan-300 text-[10px] font-bold px-2 py-0.5 rounded-md">
                    {item.badge}
                  </span>
                  <span className="text-[10px] text-slate-300 bg-black/40 px-2 py-0.5 rounded-md">
                    {item.duration}
                  </span>
                </div>

                {/* أيقونة تشغيل عند التمرير */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 backdrop-blur-xs transition duration-300 z-10">
                  <span className="w-10 h-10 rounded-full bg-cyan-500 text-black flex items-center justify-center text-sm font-bold shadow-lg">
                    ▶
                  </span>
                </div>

                {/* عنوان القالب بالأسفل */}
                <div className="z-10 bg-gradient-to-t from-black/90 via-black/50 to-transparent -mx-4 -mb-4 p-3 pt-6">
                  <h4 className="font-bold text-sm text-white group-hover:text-cyan-300 transition">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-slate-400">{item.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* نافذة الدفع */}
      <PaymentModal isOpen={isPayOpen} onClose={() => setIsPayOpen(false)} />
    </main>
  );
}

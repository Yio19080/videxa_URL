"use client";

import React, { useState } from "react";
import PaymentModal from "@/components/PaymentModal";

export default function HomePage() {
  const [isPayOpen, setIsPayOpen] = useState(false);

  return (
    <main className="min-h-screen bg-slate-950 text-white dir-rtl p-4 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <header className="flex justify-between items-center py-4 border-b border-slate-800">
        <h1 className="text-2xl font-black text-yellow-400 tracking-wider">VIDEXA AI</h1>
        <div className="flex gap-2">
          <a href="/discover" className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-800">
            Discover
          </a>
          <a href="/ads" className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-800">
            الإعلانات
          </a>
          <button
            onClick={() => setIsPayOpen(true)}
            className="bg-yellow-500 text-black font-black px-4 py-2 rounded-xl text-xs hover:bg-yellow-400 transition"
          >
            ترقية لـ Pro
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center space-y-3 py-6">
        <h2 className="text-3xl font-black leading-tight text-white">أنشئ فيديوهات سينمائية بالذكاء الاصطناعي</h2>
        <p className="text-slate-400 text-sm">أكثر من 150 قالب احترافي بدقة 4K جاهزة للإنشاء والنشر المباشر.</p>
      </section>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-slate-800 text-xs">
        <button className="bg-yellow-500 text-black font-bold px-4 py-2 rounded-xl whitespace-nowrap">الكل</button>
        <button className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-slate-300 whitespace-nowrap">ترند</button>
        <button className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-slate-300 whitespace-nowrap">بزنس</button>
        <button className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-slate-300 whitespace-nowrap">تعليم</button>
        <button className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-slate-300 whitespace-nowrap">سينما</button>
      </div>

      {/* Sample Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden p-4 space-y-3">
        <div className="aspect-video bg-black rounded-xl relative flex items-center justify-center">
          <span className="absolute top-2 right-2 bg-yellow-500 text-black text-[10px] font-black px-2 py-0.5 rounded">4K</span>
          <p className="text-xs text-slate-500">معاينة الفيديو السينمائي</p>
        </div>
        <div className="flex justify-between items-center text-xs">
          <div>
            <h3 className="font-bold text-white text-sm">ترند الذكاء الاصطناعي</h3>
            <p className="text-slate-400 text-[11px]">القسم: ترند | المدة: 15 ثانية</p>
          </div>
          <button 
            onClick={() => setIsPayOpen(true)}
            className="bg-yellow-500 text-black font-bold px-3 py-1.5 rounded-lg text-xs"
          >
            استخدام القالب
          </button>
        </div>
      </div>

      {/* Modal */}
      <PaymentModal isOpen={isPayOpen} onClose={() => setIsPayOpen(false)} />
    </main>
  );
}

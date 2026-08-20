"use client";

import React, { useState } from "react";
import PaymentModal from "@/components/PaymentModal";

interface Template {
  id: string;
  title: string;
  category: string;
  duration: number;
  is4K: boolean;
  previewUrl: string;
}

const mockTemplates: Template[] = [
  { id: "1", title: "ترند الذكاء الاصطناعي", category: "ترند", duration: 15, is4K: true, previewUrl: "https://assets.mixkit.co/videos/preview/mixkit-futuristic-robotic-arm-40896-large.mp4" },
  { id: "2", title: "إعلان منتج سينمائي", category: "بزنس", duration: 30, is4K: true, previewUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smartphone-41434-large.mp4" },
  { id: "3", title: "شرح تعليمي سريع", category: "تعليم", duration: 60, is4K: false, previewUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-typing-on-a-laptop-keyboard-41584-large.mp4" },
  { id: "4", title: "مقدمة بروموشن احترافي", category: "سينمائي 4K", duration: 20, is4K: true, previewUrl: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-41440-large.mp4" },
  { id: "5", title: "تهنئة مناسبات وسوشيال", category: "مناسبات", duration: 15, is4K: false, previewUrl: "https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-background-1610-large.mp4" },
];

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [isPayOpen, setIsPayOpen] = useState(false);

  const categories = ["الكل", "ترند", "بزنس", "تعليم", "سينمائي 4K", "مناسبات"];

  const filteredTemplates = selectedCategory === "الكل" 
    ? mockTemplates 
    : mockTemplates.filter(t => t.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-950 text-white dir-rtl">
      {/* Navbar */}
      <header className="border-b border-slate-800 p-4 flex justify-between items-center max-w-7xl mx-auto">
        <h1 className="text-2xl font-black text-yellow-500 tracking-wider">VIDEXA AI</h1>
        <div className="flex gap-3">
          <a href="/discover" className="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-xl text-sm font-bold transition">Discover</a>
          <a href="/ads" className="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-xl text-sm font-bold transition">الإعلانات</a>
          <button onClick={() => setIsPayOpen(true)} className="bg-yellow-500 text-black hover:bg-yellow-400 px-4 py-2 rounded-xl text-sm font-bold transition">
            ترقية للـ Pro
          </button>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="text-center py-12 px-4 bg-gradient-to-b from-slate-900 to-slate-950">
        <h2 className="text-3xl md:text-5xl font-black mb-4">أنشئ فيديوهات سينمائية بالذكاء الاصطناعي</h2>
        <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base mb-6">
          أكثر من 150 قالب احترافي بدقة 4K جاهزة للإنشـاء والنشر المباشر.
        </p>
      </section>

      {/* Filter Categories */}
      <div className="max-w-7xl mx-auto px-4 mb-8 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition ${
              selectedCategory === cat ? "bg-yellow-500 text-black" : "bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <main className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-16">
        {filteredTemplates.map((item) => (
          <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition flex flex-col justify-between">
            <div className="relative aspect-video bg-black">
              <video src={item.previewUrl} autoPlay loop muted playsInline className="w-full h-full object-cover" />
              {item.is4K && (
                <span className="absolute top-2 right-2 bg-yellow-500 text-black font-black text-xs px-2 py-0.5 rounded">
                  4K
                </span>
              )}
            </div>
            <div className="p-4 space-y-3">
              <h3 className="font-bold text-base text-slate-100">{item.title}</h3>
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span>القسم: {item.category}</span>
                <span>المدة: {item.duration} ثانية</span>
              </div>
              <button 
                onClick={() => setIsPayOpen(true)}
                className="w-full bg-slate-800 hover:bg-yellow-500 hover:text-black py-2.5 rounded-xl font-bold transition text-sm text-slate-200"
              >
                استخدم القالب
              </button>
            </div>
          </div>
        ))}
      </main>

      {/* Payment Modal */}
      <PaymentModal isOpen={isPayOpen} onClose={() => setIsPayOpen(false)} />
    </div>
  );
}


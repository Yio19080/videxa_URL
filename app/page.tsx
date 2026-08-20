"use client";

import React, { useState } from "react";

// قوالب الذكاء الاصطناعي الجاهزة
const AI_TEMPLATES = [
  { id: "t1", title: "إعلان منتج سينمائي", category: "إعلانات", icon: "💎", prompt: "A sleek 3D cinematic commercial showcase of a luxury product, studio lighting, 8k resolution, photorealistic." },
  { id: "t2", title: "أنمي ياباني احترافي", category: "أنمي", icon: "⚔️", prompt: "An epic anime battle scene with glowing neon magic effects, Makoto Shinkai style, vibrant colors, highly detailed." },
  { id: "t3", title: "قصة رعب وتشويق", category: "سينمائي", icon: "👻", prompt: "A dark mystery cinematic scene in a foggy ancient forest, volumetric light, dramatic shadows, movie trailer style." },
  { id: "t4", title: "مدينة المستقبل 2099", category: "خيال علمي", icon: "🚀", prompt: "A futuristic cyberpunk city with flying cars and holographic ads at night, Unreal Engine 5 render, hyper-detailed." },
];

// فيديوهات المشاهد والرائجة
const INITIAL_VIDEOS = [
  { id: "1", title: "مشهد سينمائي: الأعماق", poster: "https://images.pexels.com/photos/33041/antelope-canyon-lower-canyon-arizona.jpg?auto=compress&cs=tinysrgb&w=800", videoUrl: "https://vjs.zencdn.net/v/oceans.mp4" },
  { id: "2", title: "مدينة المستقبل 4K", poster: "https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg?auto=compress&cs=tinysrgb&w=800", videoUrl: "https://media.w3.org/2010/05/sintel/trailer.mp4" },
  { id: "3", title: "محارب الأسطورة سينمائي", poster: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=800", videoUrl: "https://interaction-design.org/videos/sample.mp4" },
  { id: "4", title: "طبيعة ساحرة وخيال", poster: "https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800", videoUrl: "https://vjs.zencdn.net/v/oceans.mp4" },
];

export default function Page() {
  const [userPlan, setUserPlan] = useState<"FREE" | "VIP">("FREE");
  const [activeTab, setActiveTab] = useState<"home" | "templates" | "create" | "profile">("home");
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [isPayOpen, setIsPayOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [promptText, setPromptText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // حقول الدفع
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");

  const handleApplyTemplate = (prompt: string) => {
    setPromptText(prompt);
    setIsCreateOpen(true);
  };

  const handleGenerateAI = () => {
    if (!promptText) return alert("الرجاء كتابة وصف المشهد أولاً!");
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setIsCreateOpen(false);
      setSelectedVideo("https://vjs.zencdn.net/v/oceans.mp4");
      alert("تم توليد المشهد السينمائي بنجاح! 🎉");
    }, 3000);
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber || !cardExpiry || !cardCvc) {
      alert("يرجى إكمال تفاصيل البطاقة بشكل صحيح!");
      return;
    }
    setUserPlan("VIP");
    setIsPayOpen(false);
    alert("تم تفعيل اشتراك VIP بنجاح! استمتع بتحميل غير محدود ودقة 4K 🔥");
  };

  return (
    <main className="min-h-screen bg-[#090713] text-white dir-rtl font-sans pb-24 relative selection:bg-purple-500">
      
      {/* 1. الهيدر العلوي */}
      <header className="sticky top-0 z-40 bg-[#090713]/80 backdrop-blur-md px-4 py-3 flex justify-between items-center border-b border-purple-900/20">
        <div className="flex items-center gap-3">
          <span className="font-black text-lg bg-gradient-to-r from-purple-400 via-fuchsia-300 to-pink-500 bg-clip-text text-transparent">
            VIDEXA AI
          </span>
        </div>

        <button
          onClick={() => setIsPayOpen(true)}
          className={`flex items-center gap-1 border px-3 py-1 rounded-full text-[10px] font-bold shadow-lg transition-all ${
            userPlan === "VIP"
              ? "bg-gradient-to-r from-amber-500 to-purple-600 border-amber-400/50 text-white"
              : "bg-gradient-to-r from-purple-800 to-pink-600 border-purple-400/30 text-white"
          }`}
        >
          <span>👑</span>
          <span>{userPlan === "VIP" ? "عضوية VIP مفعلة" : "ترقية إلى VIP"}</span>
        </button>
      </header>

      <div className="max-w-md mx-auto px-4 space-y-6 pt-3">
        
        {/* 2. البانر الرئيسي */}
        <div className="relative rounded-2xl overflow-hidden border border-purple-500/30 bg-gradient-to-b from-purple-900/40 to-black p-5 shadow-2xl">
          <div className="relative z-10 space-y-3">
            <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-fuchsia-300">
              صانع الفيديوهات بالذكاء الاصطناعي
            </h2>
            <p className="text-[10px] text-purple-200/70 max-w-[220px]">
              اختر قالبك المفضل أو اكتب نصاً، ودع الذكاء الاصطناعي يبني مشهدك خلال ثوانٍ.
            </p>

            <button
              onClick={() => setIsCreateOpen(true)}
              className="bg-gradient-to-r from-fuchsia-600 via-purple-600 to-pink-600 px-5 py-2 rounded-xl text-xs font-black shadow-lg shadow-purple-600/30 flex items-center gap-2"
            >
              <span>+ إنشاء فيديو جديد</span>
              <span>✨</span>
            </button>
          </div>
        </div>

        {/* 3. قسم القوالب الجاهزة (Templates) */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-black text-purple-100">🎬 القوالب السينمائية الجاهزة</h3>
            <span className="text-[10px] text-purple-400">اختر واستخدم فوراً</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {AI_TEMPLATES.map((tmpl) => (
              <div
                key={tmpl.id}
                onClick={() => handleApplyTemplate(tmpl.prompt)}
                className="bg-purple-950/20 border border-purple-800/30 p-3 rounded-xl hover:border-purple-500/80 cursor-pointer transition-all space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl">{tmpl.icon}</span>
                  <span className="text-[8px] bg-purple-900/60 px-2 py-0.5 rounded text-purple-300">
                    {tmpl.category}
                  </span>
                </div>
                <h4 className="text-[11px] font-bold text-purple-100">{tmpl.title}</h4>
                <p className="text-[8px] text-zinc-400 line-clamp-2">{tmpl.prompt}</p>
                <button className="w-full text-center bg-purple-600/30 text-purple-200 text-[8px] py-1 rounded border border-purple-500/20 font-bold">
                  تطبيق القالب⚡
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 4. كروت المشاهد والفيديوهات */}
        <div className="space-y-3">
          <h3 className="text-sm font-black text-purple-100">🔥 الفيديوهات والمشاهد الشائعة</h3>

          <div className="grid grid-cols-2 gap-3">
            {INITIAL_VIDEOS.map((vid) => (
              <div key={vid.id} className="bg-zinc-950 border border-purple-900/30 rounded-2xl overflow-hidden relative shadow-lg flex flex-col justify-between">
                <div 
                  onClick={() => setSelectedVideo(vid.videoUrl)}
                  className="relative aspect-[9/14] bg-cover bg-center cursor-pointer group"
                  style={{ backgroundImage: `url(${vid.poster})` }}
                >
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-purple-600/80 backdrop-blur-md border border-purple-400 flex items-center justify-center text-white text-sm shadow-xl">
                      ▶
                    </div>
                  </div>
                </div>

                <div className="p-2 space-y-1 bg-zinc-950">
                  <p className="text-[9px] font-bold text-purple-100 truncate">{vid.title}</p>
                  <button
                    onClick={() => setSelectedVideo(vid.videoUrl)}
                    className="w-full text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[8px] font-black py-1.5 rounded-lg shadow"
                  >
                    تشغيل المشهد 🎬
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 5. مشغل الفيديو المنبثق */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <div className="relative w-full max-w-sm rounded-2xl overflow-hidden border border-purple-500/50 bg-black p-2">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-20 bg-purple-600 text-white w-8 h-8 rounded-full border border-purple-400 flex items-center justify-center text-xs font-bold"
            >
              ✕
            </button>
            <video src={selectedVideo} controls autoPlay playsInline className="w-full h-auto max-h-[70vh] rounded-xl" />
          </div>
        </div>
      )}

      {/* 6. نافذة إنشاء وتوليد الفيديو */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0f0a1c] border border-purple-500/40 p-5 rounded-2xl max-w-xs w-full space-y-4">
            <h3 className="text-base font-black text-purple-200 text-center">صناعة مشهد سينمائي ✨</h3>
            <textarea
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              placeholder="اكتب وصف المشهد باللغة العربية أو الإنجليزية..."
              className="w-full h-28 bg-black/60 border border-purple-500/30 rounded-xl p-3 text-xs text-white outline-none resize-none"
            />
            <button
              onClick={handleGenerateAI}
              disabled={isGenerating}
              className="w-full py-2.5 bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-xl font-bold text-xs text-white shadow-lg flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <span>جاري معالجة الفيديو والذكاء الاصطناعي... ⏳</span>
              ) : (
                <span>توليد الفيديو الآن 🚀</span>
              )}
            </button>
            <button onClick={() => setIsCreateOpen(false)} className="w-full text-center text-[10px] text-zinc-500">إلغاء</button>
          </div>
        </div>
      )}

      {/* 7. نافذة نموذج الدفع بالبطاقات البنكية (Payment Gateway) */}
      {isPayOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0f0a1c] border-2 border-purple-500/50 p-6 rounded-2xl max-w-xs w-full space-y-4">
            <div className="text-center space-y-1">
              <h3 className="text-lg font-black text-amber-400">اشتراك VIP السينمائي 👑</h3>
              <p className="text-[10px] text-purple-200/80">توليد غير محدود • دقة 4K • بدون علامة مائية</p>
              <div className="text-2xl font-black text-white pt-1">$9.99 <span className="text-xs text-zinc-400">/ شهرياً</span></div>
            </div>

            <form onSubmit={handlePayment} className="space-y-3">
              <div>
                <label className="text-[9px] text-zinc-400 block mb-1">رقم البطاقة (Visa / Mastercard)</label>
                <input
                  type="text"
                  placeholder="4000 0000 0000 0000"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full bg-black/60 border border-purple-500/30 rounded-lg p-2 text-xs text-white outline-none"
                  required
                />
              </div>

              <div className="flex gap-2">
                <div className="w-1/2">
                  <label className="text-[9px] text-zinc-400 block mb-1">تاريخ الانتهاء</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className="w-full bg-black/60 border border-purple-500/30 rounded-lg p-2 text-xs text-white outline-none"
                    required
                  />
                </div>
                <div className="w-1/2">
                  <label className="text-[9px] text-zinc-400 block mb-1">رمز الأمان (CVC)</label>
                  <input
                    type="text"
                    placeholder="123"
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value)}
                    className="w-full bg-black/60 border border-purple-500/30 rounded-lg p-2 text-xs text-white outline-none"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-amber-500 via-purple-600 to-pink-600 rounded-xl font-black text-xs text-white shadow-lg mt-2"
              >
                تأكيد وبدء الاشتراك الآمن 💳
              </button>
            </form>

            <button onClick={() => setIsPayOpen(false)} className="block w-full text-center text-[10px] text-zinc-500">إلغاء</button>
          </div>
        </div>
      )}

      {/* 8. شريط التنقل السفلي */}
      <nav className="fixed bottom-0 inset-x-0 bg-[#090713]/90 backdrop-blur-lg border-t border-purple-900/30 py-2 px-6 z-40 max-w-md mx-auto">
        <div className="flex justify-between items-center relative">
          <button onClick={() => setActiveTab("home")} className={`flex flex-col items-center ${activeTab === "home" ? "text-fuchsia-400" : "text-zinc-500"}`}>
            <span className="text-base">🏠</span>
            <span className="text-[8px] font-bold">الرئيسية</span>
          </button>

          <button onClick={() => setIsCreateOpen(true)} className="flex flex-col items-center text-zinc-500">
            <span className="text-base">🎬</span>
            <span className="text-[8px] font-bold">توليد</span>
          </button>

          <div className="-mt-7">
            <button onClick={() => setIsCreateOpen(true)} className="w-12 h-12 rounded-full bg-gradient-to-tr from-fuchsia-600 via-purple-600 to-pink-500 p-0.5 shadow-lg flex items-center justify-center">
              <div className="w-full h-full bg-[#090713] rounded-full flex items-center justify-center">
                <span className="text-xl font-black text-fuchsia-400">+</span>
              </div>
            </button>
          </div>

          <button onClick={() => setIsPayOpen(true)} className="flex flex-col items-center text-zinc-500">
            <span className="text-base">💳</span>
            <span className="text-[8px] font-bold">الاشتراك</span>
          </button>

          <button onClick={() => setActiveTab("profile")} className={`flex flex-col items-center ${activeTab === "profile" ? "text-fuchsia-400" : "text-zinc-500"}`}>
            <span className="text-base">👤</span>
            <span className="text-[8px] font-bold">حسابي</span>
          </button>
        </div>
      </nav>

    </main>
  );
}

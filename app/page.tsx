"use client";

import React, { useState, useEffect } from "react";
import { UserPlan, getPermissions, VIP_PAYMENT_URL } from "@/lib/subscription";

export default function Page() {
  const [userPlan, setUserPlan] = useState<UserPlan>("FREE");
  const permissions = getPermissions(userPlan);

  const [activeTab, setActiveTab] = useState<"home" | "shorts" | "upload" | "profile">("home");
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [isPayOpen, setIsPayOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("cinematic fantasy");
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // التفاعلات
  const [likes, setLikes] = useState<{ [key: string]: number }>({});
  const [userLiked, setUserLiked] = useState<{ [key: string]: boolean }>({});

  const PEXELS_API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY || "";

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.pexels.com/videos/search?query=${encodeURIComponent(searchQuery)}&per_page=12&orientation=portrait`,
          {
            headers: { Authorization: PEXELS_API_KEY },
          }
        );
        const data = await res.json();
        if (data && data.videos) {
          setVideos(
            data.videos.map((v: any, index: number) => ({
              id: v.id.toString(),
              title: v.user?.name ? `مشهد بواسطة ${v.user.name}` : `مشهد سينمائي #${index + 1}`,
              poster: v.image,
              videoUrl: v.video_files?.[0]?.link || "",
              duration: "02:15",
              views: `${(Math.random() * 20 + 5).toFixed(1)}K`,
              likesCount: `${(Math.random() * 3 + 1).toFixed(1)}K`,
            }))
          );
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, [searchQuery, PEXELS_API_KEY]);

  const categories = [
    { name: "الكل", icon: "★" },
    { name: "سينمائي", icon: "🎬" },
    { name: "رائج", icon: "🔥" },
    { name: "خيال", icon: "🪐" },
    { name: "طبيعة", icon: "🏔️" },
  ];

  return (
    <main className="min-h-screen bg-[#090713] text-white dir-rtl font-sans pb-24 relative selection:bg-purple-500">
      
      {/* 1. الهيدر العلوي */}
      <header className="sticky top-0 z-40 bg-[#090713]/80 backdrop-blur-md px-4 py-3 flex justify-between items-center border-b border-purple-900/20">
        <div className="flex items-center gap-3">
          <button className="text-xl text-purple-200">☰</button>
          <div className="flex flex-col">
            <span className="font-black text-lg tracking-wider bg-gradient-to-r from-purple-400 via-fuchsia-300 to-pink-500 bg-clip-text text-transparent">
              VIDEXA AI
            </span>
            <span className="text-[7px] text-purple-400 tracking-widest -mt-1 font-semibold uppercase">
              AI Cinema Studio
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setUserPlan(userPlan === "FREE" ? "VIP" : "FREE")}
            className="flex items-center gap-1 bg-gradient-to-r from-purple-800 to-pink-600 border border-purple-400/30 px-3 py-1 rounded-full text-[10px] font-bold shadow-lg shadow-purple-900/40"
          >
            <span>✨</span>
            <span>{userPlan === "VIP" ? "VIP" : "Standard"}</span>
          </button>
          <button className="p-2 bg-purple-950/40 rounded-full border border-purple-800/30 text-purple-200 text-xs">
            🔍
          </button>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 space-y-6 pt-3">

        {/* 2. البانر الرئيسي (Hero Section) */}
        <div className="relative rounded-2xl overflow-hidden border border-purple-500/30 bg-gradient-to-b from-purple-900/30 to-black p-5 shadow-2xl">
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/33041/antelope-canyon-lower-canyon-arizona.jpg')] bg-cover bg-center opacity-25 mix-blend-overlay" />
          <div className="relative z-10 space-y-3">
            <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-fuchsia-300">
              حَوِّل فكرتك إلى <br /> مشهد سينمائي
            </h2>
            <p className="text-[10px] text-purple-200/70 max-w-[200px] leading-relaxed">
              اكتب قصتك، اختر الأسلوب، ودع Videxa AI يصنع السحر.
            </p>

            <button
              onClick={() => setIsCreateOpen(true)}
              className="bg-gradient-to-r from-fuchsia-600 via-purple-600 to-pink-600 hover:opacity-90 px-5 py-2 rounded-xl text-xs font-black shadow-lg shadow-purple-600/30 flex items-center gap-2"
            >
              <span>إنشاء فيديو</span>
              <span>✨</span>
            </button>

            {/* الكبسولات التوضيحية */}
            <div className="flex gap-2 pt-2">
              <div className="bg-black/60 border border-purple-500/20 px-3 py-1 rounded-lg text-center">
                <p className="text-[9px] font-black text-purple-300">4K</p>
                <p className="text-[6px] text-zinc-400">ULTRA HD</p>
              </div>
              <div className="bg-black/60 border border-purple-500/20 px-3 py-1 rounded-lg text-center">
                <p className="text-[9px] font-black text-purple-300">24</p>
                <p className="text-[6px] text-zinc-400">FPS</p>
              </div>
              <div className="bg-black/60 border border-purple-500/20 px-3 py-1 rounded-lg text-center">
                <p className="text-[9px] font-black text-purple-300">AI</p>
                <p className="text-[6px] text-zinc-400">POWERED</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. شريط التصنيفات */}
        <div className="flex justify-between items-center overflow-x-auto gap-2 scrollbar-none py-1">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => {
                setActiveCategory(cat.name);
                if (cat.name === "سينمائي") setSearchQuery("cinematic movie");
                else if (cat.name === "خيال") setSearchQuery("cyberpunk sci-fi");
                else if (cat.name === "طبيعة") setSearchQuery("nature landscape");
                else setSearchQuery("cinematic fantasy");
              }}
              className={`flex flex-col items-center gap-1 min-w-[55px] py-2 rounded-xl text-xs transition-all ${
                activeCategory === cat.name
                  ? "bg-purple-600/30 text-purple-300 border border-purple-500/50"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <span className="text-base">{cat.icon}</span>
              <span className="text-[9px] font-bold">{cat.name}</span>
            </button>
          ))}
        </div>

        {/* 4. قسم الفيديوهات الرائجة */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-black text-purple-100">الفيديوهات الرائجة</h3>
            <button className="text-[10px] text-purple-400 bg-purple-950/40 border border-purple-800/30 px-2.5 py-1 rounded-lg">
              عرض الكل ←
            </button>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x">
            {loading
              ? Array(3).fill(0).map((_, i) => (
                  <div key={i} className="min-w-[140px] h-52 bg-purple-950/20 rounded-2xl animate-pulse border border-purple-900/20" />
                ))
              : videos.map((vid) => (
                  <div
                    key={vid.id}
                    className="min-w-[140px] w-[140px] bg-zinc-950 border border-purple-900/30 rounded-2xl overflow-hidden relative group snap-start shadow-lg"
                  >
                    <div className="relative aspect-[9/14]">
                      <video src={vid.videoUrl} poster={vid.poster} controls className="w-full h-full object-cover" />
                      <span className="absolute top-2 right-2 bg-purple-600 text-white text-[7px] font-black px-1.5 py-0.5 rounded">
                        4K
                      </span>
                      <span className="absolute bottom-2 left-2 bg-black/70 text-zinc-300 text-[7px] px-1 py-0.5 rounded">
                        {vid.duration}
                      </span>
                    </div>

                    <div className="p-2 space-y-1">
                      <p className="text-[10px] font-bold text-purple-100 truncate">{vid.title}</p>
                      <div className="flex justify-between items-center text-[8px] text-zinc-400 pt-1 border-t border-purple-950">
                        <span>👁 {vid.views}</span>
                        <span>❤️ {vid.likesCount}</span>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>

        {/* 5. بانر الترقية لـ VIP */}
        <div className="bg-gradient-to-r from-purple-950 via-fuchsia-950 to-purple-950 border border-purple-500/40 p-4 rounded-2xl flex justify-between items-center shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-purple-600 flex items-center justify-center text-lg shadow-md">
              👑
            </div>
            <div>
              <h4 className="text-xs font-black text-amber-300">ترقية إلى VIP</h4>
              <p className="text-[8px] text-purple-300/80">تحميل غير محدود • جودة 4K • بدون إعلانات</p>
            </div>
          </div>
          <button
            onClick={() => setIsPayOpen(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white text-[10px] font-black px-3.5 py-2 rounded-xl shadow-md"
          >
            ترقية الآن
          </button>
        </div>

        {/* 6. قسم أحدث الإضافات */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-black text-purple-100">أحدث الإضافات</h3>
            <button className="text-[10px] text-purple-400 bg-purple-950/40 border border-purple-800/30 px-2.5 py-1 rounded-lg">
              عرض الكل ←
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {videos.slice(0, 4).map((vid) => (
              <div key={vid.id} className="bg-zinc-950 border border-purple-900/30 rounded-2xl overflow-hidden relative">
                <div className="relative aspect-[9/14]">
                  <video src={vid.videoUrl} poster={vid.poster} controls className="w-full h-full object-cover" />
                  <span className="absolute top-2 right-2 bg-purple-600 text-white text-[7px] font-black px-1.5 py-0.5 rounded">
                    4K
                  </span>
                </div>
                <div className="p-2 space-y-1">
                  <p className="text-[9px] font-bold text-purple-100 truncate">{vid.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 7. شريط التنقل السفلي (Bottom Navigation) */}
      <nav className="fixed bottom-0 inset-x-0 bg-[#090713]/90 backdrop-blur-lg border-t border-purple-900/30 py-2 px-6 z-40 max-w-md mx-auto">
        <div className="flex justify-between items-center relative">
          
          <button
            onClick={() => setActiveTab("home")}
            className={`flex flex-col items-center gap-0.5 ${activeTab === "home" ? "text-fuchsia-400" : "text-zinc-500"}`}
          >
            <span className="text-base">🏠</span>
            <span className="text-[8px] font-bold">الرئيسية</span>
          </button>

          <button
            onClick={() => setActiveTab("shorts")}
            className={`flex flex-col items-center gap-0.5 ${activeTab === "shorts" ? "text-fuchsia-400" : "text-zinc-500"}`}
          >
            <span className="text-base">🎬</span>
            <span className="text-[8px] font-bold">Shorts</span>
          </button>

          {/* الزر المضيء في المنتصف */}
          <div className="-mt-7">
            <button
              onClick={() => setIsCreateOpen(true)}
              className="w-12 h-12 rounded-full bg-gradient-to-tr from-fuchsia-600 via-purple-600 to-pink-500 p-0.5 shadow-lg shadow-purple-600/50 flex items-center justify-center transform active:scale-95 transition-transform"
            >
              <div className="w-full h-full bg-[#090713] rounded-full flex items-center justify-center">
                <span className="text-xl font-black bg-gradient-to-tr from-fuchsia-400 to-pink-400 bg-clip-text text-transparent">+</span>
              </div>
            </button>
          </div>

          <button
            onClick={() => setIsCreateOpen(true)}
            className="flex flex-col items-center gap-0.5 text-zinc-500 hover:text-white"
          >
            <span className="text-base">☁️</span>
            <span className="text-[8px] font-bold">رفع</span>
          </button>

          <button
            onClick={() => setActiveTab("profile")}
            className={`flex flex-col items-center gap-0.5 ${activeTab === "profile" ? "text-fuchsia-400" : "text-zinc-500"}`}
          >
            <span className="text-base">👤</span>
            <span className="text-[8px] font-bold">حسابي</span>
          </button>

        </div>
      </nav>

      {/* شاشة الشورتس (/shorts) */}
      {activeTab === "shorts" && (
        <div className="fixed inset-0 bg-black z-50 overflow-y-scroll snap-y snap-mandatory scrollbar-none">
          <button
            onClick={() => setActiveTab("home")}
            className="fixed top-4 right-4 z-50 bg-black/60 border border-purple-500/40 text-white px-3 py-1 rounded-full text-xs font-bold"
          >
            ✕ خروج
          </button>

          {videos.map((vid) => (
            <div key={vid.id} className="w-full h-screen snap-start relative flex items-center justify-center bg-black">
              <video src={vid.videoUrl} poster={vid.poster} autoPlay loop muted playsInline className="h-full w-full object-cover" />
              <div className="absolute right-4 bottom-24 flex flex-col gap-4 z-20">
                <button className="p-3 rounded-full bg-black/50 border border-white/20 text-white">❤️</button>
                <button className="p-3 rounded-full bg-black/50 border border-white/20 text-white">💬</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* نافذة التوليد / إنشاء فيديو */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0f0a1c] border border-purple-500/40 p-5 rounded-2xl max-w-xs w-full space-y-4 text-center">
            <h3 className="text-base font-black text-purple-200">صناعة مشهد بالذكاء الاصطناعي ✨</h3>
            <textarea
              placeholder="اكتب وصف المشهد السينمائي هنا..."
              className="w-full h-24 bg-black/60 border border-purple-500/30 rounded-xl p-3 text-xs text-white outline-none resize-none"
            />
            <button
              onClick={() => {
                alert("جاري إنشاء المشهد عبر أداء AI...");
                setIsCreateOpen(false);
              }}
              className="w-full py-2.5 bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-xl font-bold text-xs text-white shadow-lg shadow-purple-600/30"
            >
              توليد المشهد الأن ✨
            </button>
            <button onClick={() => setIsCreateOpen(false)} className="text-[10px] text-zinc-500">إلغاء</button>
          </div>
        </div>
      )}

      {/* نافذة الدفع */}
      {isPayOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0f0a1c] border-2 border-purple-500/50 p-6 rounded-2xl max-w-xs w-full text-center space-y-3">
            <h3 className="text-lg font-black text-amber-400">ترقية VIP Pro ✨</h3>
            <p className="text-[10px] text-purple-200/80">تحميل غير محدود + توليد مشاهد 4K فورية!</p>
            <div className="text-xl font-black text-white">$9.99 / شهرياً</div>
            <a href={VIP_PAYMENT_URL} target="_blank" rel="noopener noreferrer" className="block w-full py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-xs text-white shadow-lg">
              الدفع المباشر 💳
            </a>
            <button onClick={() => setIsPayOpen(false)} className="text-[10px] text-zinc-500">إلغاء</button>
          </div>
        </div>
      )}

    </main>
  );
}


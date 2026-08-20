"use client";

import React, { useState, useEffect } from "react";

// مقاطع فيديو احتياطية لضمان عمل الواجهة دائماً حتى لو فشل الـ API
const FALLBACK_VIDEOS = [
  {
    id: "1",
    title: "مشهد سينمائي: الفضاء الرقمي",
    poster: "https://images.pexels.com/photos/33041/antelope-canyon-lower-canyon-arizona.jpg",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-1610-large.mp4",
    duration: "02:15",
    views: "18.4K",
    likesCount: "2.1K",
  },
  {
    id: "2",
    title: "مدينة المستقبل 4K",
    poster: "https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-lights-background-40742-large.mp4",
    duration: "01:45",
    views: "25.9K",
    likesCount: "3.8K",
  },
  {
    id: "3",
    title: "طبيعة ساحرة وخيال",
    poster: "https://images.pexels.com/photos/15286/pexels-photo.jpg",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4",
    duration: "03:10",
    views: "12.1K",
    likesCount: "1.5K",
  },
  {
    id: "4",
    title: "محارب الأسطورة سينمائي",
    poster: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-setting-fire-to-a-torch-41526-large.mp4",
    duration: "02:00",
    views: "30.2K",
    likesCount: "4.9K",
  },
];

export default function Page() {
  const [userPlan, setUserPlan] = useState<"FREE" | "VIP">("FREE");
  const [activeTab, setActiveTab] = useState<"home" | "shorts" | "upload" | "profile">("home");
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [isPayOpen, setIsPayOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("cinematic");
  const [videos, setVideos] = useState<any[]>(FALLBACK_VIDEOS);
  const [loading, setLoading] = useState(false);

  const PEXELS_API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY || "563492ad6f91700001000001b96d3f23a4b0451db68235e1286c99c3";

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.pexels.com/videos/search?query=${encodeURIComponent(searchQuery)}&per_page=10&orientation=portrait`,
          { headers: { Authorization: PEXELS_API_KEY } }
        );
        const data = await res.json();
        if (data && data.videos && data.videos.length > 0) {
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
        } else {
          setVideos(FALLBACK_VIDEOS);
        }
      } catch (e) {
        console.error("Fetch Error:", e);
        setVideos(FALLBACK_VIDEOS);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, [searchQuery, PEXELS_API_KEY]);

  const categories = [
    { name: "الكل", icon: "★", query: "cinematic" },
    { name: "سينمائي", icon: "🎬", query: "movie" },
    { name: "رائج", icon: "🔥", query: "action" },
    { name: "خيال", icon: "🪐", query: "sci-fi" },
    { name: "طبيعة", icon: "🏔️", query: "nature" },
  ];

  return (
    <main className="min-h-screen bg-[#090713] text-white dir-rtl font-sans pb-24 relative">
      {/* 1. الهيدر */}
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

        <button
          onClick={() => setIsPayOpen(true)}
          className="flex items-center gap-1 bg-gradient-to-r from-purple-800 to-pink-600 border border-purple-400/30 px-3 py-1 rounded-full text-[10px] font-bold shadow-lg"
        >
          <span>✨</span>
          <span>{userPlan === "VIP" ? "VIP ACTIVE" : "VIP"}</span>
        </button>
      </header>

      <div className="max-w-md mx-auto px-4 space-y-6 pt-3">
        {/* 2. البانر الرئيسي */}
        <div className="relative rounded-2xl overflow-hidden border border-purple-500/30 bg-gradient-to-b from-purple-900/40 to-black p-5 shadow-2xl">
          <div className="relative z-10 space-y-3">
            <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-fuchsia-300">
              حَوِّل فكرتك إلى <br /> مشهد سينمائي
            </h2>
            <p className="text-[10px] text-purple-200/70 max-w-[200px] leading-relaxed">
              اكتب قصتك، اختر الأسلوب، ودع Videxa AI يصنع السحر.
            </p>

            <button
              onClick={() => setIsCreateOpen(true)}
              className="bg-gradient-to-r from-fuchsia-600 via-purple-600 to-pink-600 px-5 py-2 rounded-xl text-xs font-black shadow-lg shadow-purple-600/30 flex items-center gap-2"
            >
              <span>إنشاء فيديو</span>
              <span>✨</span>
            </button>

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

        {/* 3. التصنيفات */}
        <div className="flex justify-between items-center overflow-x-auto gap-2 scrollbar-none py-1">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => {
                setActiveCategory(cat.name);
                setSearchQuery(cat.query);
              }}
              className={`flex flex-col items-center gap-1 min-w-[60px] py-2 rounded-xl text-xs transition-all ${
                activeCategory === cat.name
                  ? "bg-purple-600/40 text-purple-200 border border-purple-500/60 shadow-lg"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <span className="text-base">{cat.icon}</span>
              <span className="text-[9px] font-bold">{cat.name}</span>
            </button>
          ))}
        </div>

        {/* 4. شبكة الفيديوهات */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-black text-purple-100">الفيديوهات والقوالب الرائجة</h3>
            <span className="text-[10px] text-purple-400">متجدد تلقائياً 🔄</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {loading ? (
              Array(4).fill(0).map((_, i) => (
                <div key={i} className="aspect-[9/14] bg-purple-950/20 rounded-2xl animate-pulse border border-purple-900/20" />
              ))
            ) : (
              videos.map((vid) => (
                <div key={vid.id} className="bg-zinc-950 border border-purple-900/30 rounded-2xl overflow-hidden relative shadow-lg">
                  <div className="relative aspect-[9/14] bg-black">
                    <video src={vid.videoUrl} poster={vid.poster} controls className="w-full h-full object-cover" />
                    <span className="absolute top-2 right-2 bg-purple-600 text-white text-[7px] font-black px-1.5 py-0.5 rounded">
                      4K
                    </span>
                  </div>
                  <div className="p-2 space-y-1">
                    <p className="text-[9px] font-bold text-purple-100 truncate">{vid.title}</p>
                    <a
                      href={vid.videoUrl}
                      download
                      target="_blank"
                      rel="noreferrer"
                      className="block text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[8px] font-black py-1 rounded-lg"
                    >
                      تحميل المشهد 📥
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 5. بانر الترقية */}
        <div className="bg-gradient-to-r from-purple-950 via-fuchsia-950 to-purple-950 border border-purple-500/40 p-4 rounded-2xl flex justify-between items-center shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-purple-600 flex items-center justify-center text-lg">
              👑
            </div>
            <div>
              <h4 className="text-xs font-black text-amber-300">ترقية إلى VIP</h4>
              <p className="text-[8px] text-purple-300/80">تحميل غير محدود • جودة 4K</p>
            </div>
          </div>
          <button
            onClick={() => setIsPayOpen(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[10px] font-black px-3.5 py-2 rounded-xl shadow-md"
          >
            ترقية الآن
          </button>
        </div>
      </div>

      {/* 6. شريط التنقل السفلي */}
      <nav className="fixed bottom-0 inset-x-0 bg-[#090713]/90 backdrop-blur-lg border-t border-purple-900/30 py-2 px-6 z-40 max-w-md mx-auto">
        <div className="flex justify-between items-center relative">
          <button onClick={() => setActiveTab("home")} className={`flex flex-col items-center gap-0.5 ${activeTab === "home" ? "text-fuchsia-400" : "text-zinc-500"}`}>
            <span className="text-base">🏠</span>
            <span className="text-[8px] font-bold">الرئيسية</span>
          </button>

          <button onClick={() => setActiveTab("shorts")} className={`flex flex-col items-center gap-0.5 ${activeTab === "shorts" ? "text-fuchsia-400" : "text-zinc-500"}`}>
            <span className="text-base">🎬</span>
            <span className="text-[8px] font-bold">Shorts</span>
          </button>

          <div className="-mt-7">
            <button onClick={() => setIsCreateOpen(true)} className="w-12 h-12 rounded-full bg-gradient-to-tr from-fuchsia-600 via-purple-600 to-pink-500 p-0.5 shadow-lg flex items-center justify-center">
              <div className="w-full h-full bg-[#090713] rounded-full flex items-center justify-center">
                <span className="text-xl font-black text-fuchsia-400">+</span>
              </div>
            </button>
          </div>

          <button onClick={() => setIsCreateOpen(true)} className="flex flex-col items-center gap-0.5 text-zinc-500">
            <span className="text-base">☁️</span>
            <span className="text-[8px] font-bold">رفع</span>
          </button>

          <button onClick={() => setActiveTab("profile")} className={`flex flex-col items-center gap-0.5 ${activeTab === "profile" ? "text-fuchsia-400" : "text-zinc-500"}`}>
            <span className="text-base">👤</span>
            <span className="text-[8px] font-bold">حسابي</span>
          </button>
        </div>
      </nav>

      {/* نافذة الترقية والدفع */}
      {isPayOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0f0a1c] border-2 border-purple-500/50 p-6 rounded-2xl max-w-xs w-full text-center space-y-4">
            <h3 className="text-lg font-black text-amber-400">اشتراك VIDEXA VIP 👑</h3>
            <p className="text-[10px] text-purple-200/80">استمتع بتوليد سينمائي غير محدود وبدون إعلانات!</p>
            <div className="text-2xl font-black text-white">$9.99 <span className="text-xs text-zinc-400">/ شهرياً</span></div>
            <button
              onClick={() => {
                setUserPlan("VIP");
                alert("تم تفعيل اشتراك VIP بنجاح! ✨");
                setIsPayOpen(false);
              }}
              className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-xs text-white shadow-lg"
            >
              تأكيد الاشتراك السريع 💳
            </button>
            <button onClick={() => setIsPayOpen(false)} className="block w-full text-[10px] text-zinc-500 pt-1">
              إلغاء
            </button>
          </div>
        </div>
      )}

      {/* نافذة الإنشاء */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0f0a1c] border border-purple-500/40 p-5 rounded-2xl max-w-xs w-full space-y-4 text-center">
            <h3 className="text-base font-black text-purple-200">صناعة مشهد بالذكاء الاصطناعي ✨</h3>
            <textarea placeholder="اكتب وصف المشهد..." className="w-full h-24 bg-black/60 border border-purple-500/30 rounded-xl p-3 text-xs text-white outline-none resize-none" />
            <button onClick={() => setIsCreateOpen(false)} className="w-full py-2.5 bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-xl font-bold text-xs text-white shadow-lg">
              توليد المشهد الآن ✨
            </button>
            <button onClick={() => setIsCreateOpen(false)} className="text-[10px] text-zinc-500">إلغاء</button>
          </div>
        </div>
      )}
    </main>
  );
}

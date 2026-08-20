"use client";

import React, { useState, useEffect } from "react";

export type UserRole = "FREE" | "VIP";

export default function HomePage() {
  const [userRole, setUserRole] = useState<UserRole>("FREE");
  const [activeTab, setActiveTab] = useState<"home" | "shorts">("home");
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [isPayOpen, setIsPayOpen] = useState(false);
  const [videos, setVideos] = useState<any[]>([]);

  // جلب فيديوهات 4K تلقائياً من Pexels API مع fallback محلي
  useEffect(() => {
    async function loadVideos() {
      try {
        const apiKey = process.env.NEXT_PUBLIC_PEXELS_API_KEY || "";
        if (apiKey) {
          const res = await fetch("https://api.pexels.com/videos/search?query=cinematic+4k&per_page=12&orientation=portrait", {
            headers: { Authorization: apiKey }
          });
          const data = await res.json();
          if (data.videos && data.videos.length > 0) {
            const mapped = data.videos.map((vid: any) => ({
              id: `pexels-${vid.id}`,
              title: vid.user?.name ? `${vid.user.name} Visual` : "مشهد سينمائي 4K",
              category: "ترند",
              badge: "4K PEXELS",
              gradient: "from-purple-900 to-black",
              videoUrl: vid.video_files.find((f: any) => f.quality === "hd")?.link || vid.video_files[0]?.link
            }));
            setVideos(mapped);
            return;
          }
        }
      } catch (err) {
        console.error("Pexels fetch error:", err);
      }

      // القائمة الافتراضية في حال عدم توفر API Key
      setVideos([
        { id: "1", title: "المحارب السينمائي", category: "سينما", badge: "4K AI", gradient: "from-purple-900 to-indigo-950", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
        { id: "2", title: "عالم السايبربنك", category: "ترند", badge: "TRENDING", gradient: "from-pink-900 to-purple-950", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
        { id: "3", title: "إعلان تجاري", category: "بزنس", badge: "PRO", gradient: "from-blue-900 to-slate-950", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" },
        { id: "4", title: "المستقبل الذكي", category: "تعليم", badge: "4K AI", gradient: "from-cyan-900 to-blue-950", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
        { id: "5", title: "أساطير الفضاء", category: "سينما", badge: "HOT", gradient: "from-violet-900 to-fuchsia-950", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
        { id: "6", title: "نيون سيتي", category: "ترند", badge: "4K AI", gradient: "from-rose-900 to-purple-950", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" },
      ]);
    }
    loadVideos();
  }, []);

  // قائمة فيديوهات الشورتس (تيك توك)
  const shorts = [
    { id: "s1", user: "@cyber_ai", caption: "عالم السايبربنك والذكاء الاصطناعي 🚀 #Videxa #Shorts", likes: "1.4K", comments: "95", shares: "30", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", isAd: false },
    { id: "s2", user: "@cinema_pro", caption: "مشاهد سينمائية احترافية #Cinema #Videxa", likes: "2.8K", comments: "110", shares: "60", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", isAd: false },
    { id: "s3", user: "إعلان Videxa PRO 🚀", caption: "اشترك الآن في VIP وافتح التحميل المباشر والقوالب بدون إعلانات!", likes: "5.4K", comments: "20", shares: "100", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", isAd: true },
  ];

  // نظام حماية الصلاحيات (يمنع المجاني من التنزيل والقوالب)
  const handleVipAction = (actionName: string) => {
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
      
      {/* 🎬 قسم الشورتس (تيك توك) */}
      {activeTab === "shorts" && (
        <div className="fixed inset-0 z-50 bg-black flex justify-center items-center">
          <button 
            onClick={() => setActiveTab("home")}
            className="absolute top-4 right-4 z-50 bg-black/60 border border-white/20 text-white px-3 py-1 rounded-full text-xs font-bold hover:bg-white/20 transition"
          >
            ✕ خروج للرئيسية
          </button>

          <div className="h-full w-full max-w-md snap-y snap-mandatory overflow-y-scroll scrollbar-none">
            {shorts.map((item) => (
              <div key={item.id} className="h-full w-full snap-start relative flex items-center justify-center bg-zinc-950">
                <video src={item.videoUrl} loop autoPlay muted playsInline className="w-full h-full object-cover" />

                {item.isAd && (
                  <span className="absolute top-4 left-4 bg-yellow-500 text-black font-black text-[10px] px-2 py-0.5 rounded shadow">
                    إعلان SPONSORED
                  </span>
                )}

                {/* أزرار التفاعل */}
                <div className="absolute left-3 bottom-20 flex flex-col items-center gap-4 z-20">
                  <button className="flex flex-col items-center">
                    <span className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-sm backdrop-blur">❤️</span>
                    <span className="text-[10px] font-bold mt-1">{item.likes}</span>
                  </button>
                  <button className="flex flex-col items-center">
                    <span className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-sm backdrop-blur">💬</span>
                    <span className="text-[10px] font-bold mt-1">{item.comments}</span>
                  </button>
                  <button className="flex flex-col items-center">
                    <span className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-sm backdrop-blur">🔗</span>
                    <span className="text-[10px] font-bold mt-1">{item.shares}</span>
                  </button>
                </div>

                <div className="absolute bottom-6 right-3 left-16 z-20 text-right dir-rtl">
                  <h3 className="font-bold text-xs text-cyan-400">{item.user}</h3>
                  <p className="text-[11px] text-slate-200 line-clamp-2 mt-0.5">{item.caption}</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 🏠 الواجهة الرئيسية */}
      <div className="max-w-5xl mx-auto px-3 pt-3 space-y-4">
        
        {/* شريط حالة العضوية للتجربة */}
        <div className="bg-gradient-to-r from-purple-900/60 to-pink-900/60 border border-purple-500/30 rounded-xl p-2 flex justify-between items-center text-[11px]">
          <div>
            <span className="font-bold text-pink-400">حالة الحساب: </span>
            <span className={userRole === "VIP" ? "text-green-400 font-bold" : "text-yellow-400 font-bold"}>
              {userRole === "VIP" ? "مشترك VIP ✨" : "مجاني (FREE)"}
            </span>
          </div>
          <button 
            onClick={() => setUserRole(userRole === "FREE" ? "VIP" : "FREE")}
            className="text-[9px] bg-white/10 px-2 py-0.5 rounded border border-white/20 hover:bg-white/20 transition"
          >
            تبديل الحساب للتجربة
          </button>
        </div>

        {/* الهيدر العلوي */}
        <header className="flex justify-between items-center py-1">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">
              VIDEXA AI
            </h1>
            <button 
              onClick={() => setActiveTab("shorts")}
              className="text-[10px] bg-pink-600/30 border border-pink-500/50 px-2.5 py-1 rounded-full font-bold text-pink-300 hover:bg-pink-600/50 transition"
            >
              🎬 الشورتس
            </button>
          </div>

          <button
            onClick={() => setIsPayOpen(true)}
            className="px-3 py-1 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-[10px] shadow-lg shadow-purple-900/40"
          >
            {userRole === "VIP" ? "عضوية VIP" : "ترقية Pro ✨"}
          </button>
        </header>

        {/* البانر الترويجي الرئيسي */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black p-4">
           <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-black/90 z-0" />
           <div className="relative z-10 space-y-2">
              <span className="text-[8px] bg-white/10 px-2 py-0.5 rounded text-cyan-300 font-bold uppercase">
                مجاني 100% لفترة محدودة
              </span>
              <h2 className="text-base font-black text-white leading-tight">
                أطلق العنان لإبداعك مع Videxa – فيديوهات سينمائية 4K!
              </h2>
              <p className="text-slate-300 text-[10px] max-w-md">
                شاهد واستخدم أحدث الفيديوهات والقوالب المصممة بالذكاء الاصطناعي.
              </p>
              <button 
                onClick={() => setIsPayOpen(true)} 
                className="mt-1 px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-[11px] transition"
              >
                👉 ابدأ المشاهدة الآن
              </button>
           </div>
        </div>

        {/* أزرار التصنيفات */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button 
              key={cat} 
              onClick={() => setActiveCategory(cat)} 
              className={`px-3 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap transition ${
                activeCategory === cat ? "bg-blue-600 text-white" : "bg-white/5 text-slate-400 hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 📐 شبكة الكروت المصغرة (3 كروت بالسطر) مع الحماية */}
        <div className="grid grid-cols-3 gap-2">
          {filtered.map((item) => (
            <div key={item.id} className="bg-white/5 border border-white/10 rounded-lg overflow-hidden flex flex-col justify-between">
              
              {/* شاشة عرض الفيديو بخصائص 16/10 مصغرة */}
              <div className={`relative aspect-[16/10] bg-gradient-to-br ${item.gradient || 'from-purple-900 to-black'} overflow-hidden`}>
                <video src={item.videoUrl} controls className="w-full h-full object-cover" />
                <span className="absolute top-1 right-1 text-[7px] bg-black/70 text-white px-1 rounded font-bold z-10">
                  {item.badge}
                </span>
              </div>

              {/* التفاصيل والأزرار المحمية */}
              <div className="p-1.5 bg-black/70 space-y-1">
                <h4 className="font-bold text-[9px] text-white truncate">{item.title}</h4>
                
                <div className="flex gap-1">
                  <button 
                    onClick={() => handleVipAction("استخدام القالب")}
                    className="w-1/2 bg-purple-600/80 hover:bg-purple-600 text-white text-[7px] font-bold py-0.5 rounded truncate transition"
                  >
                    {userRole === "FREE" ? "🔒 قالب" : "قالب"}
                  </button>

                  <button 
                    onClick={() => handleVipAction("تحميل الفيديو")}
                    className="w-1/2 bg-cyan-500 hover:bg-cyan-400 text-black text-[7px] font-bold py-0.5 rounded truncate transition"
                  >
                    {userRole === "FREE" ? "🔒 تحميل" : "تحميل"}
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* 💳 نافذة الاشتراك والتصريح للترقية (Stripe / PayPal) */}
      {isPayOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-center items-center p-4 dir-rtl">
          <div className="bg-slate-900 border border-purple-500/40 p-5 rounded-2xl max-w-xs w-full text-center space-y-3 shadow-2xl">
            <div className="w-10 h-10 rounded-full bg-purple-600/20 border border-purple-500 flex items-center justify-center mx-auto text-lg">
              ✨
            </div>
            <h3 className="text-base font-bold text-white">اشترك في Videxa VIP</h3>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              احصل على صلاحية تنزيل الفيديوهات بدقة 4K واستخدام كافة القوالب بدون حدود وبدون إعلانات!
            </p>
            <div className="text-xl font-black text-pink-500">$9.99 / شهرياً</div>
            
            <button 
              onClick={() => { 
                setUserRole("VIP"); 
                setIsPayOpen(false); 
                alert("تهانينا! تم تفعيل عضوية VIP بنجاح."); 
              }}
              className="w-full py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs shadow-lg hover:opacity-90 transition"
            >
              الدفع عبر Stripe / PayPal
            </button>
            
            <button 
              onClick={() => setIsPayOpen(false)} 
              className="text-[10px] text-slate-400 block mx-auto hover:text-white transition"
            >
              إلغاء
            </button>
          </div>
        </div>
      )}

    </main>
  );
}

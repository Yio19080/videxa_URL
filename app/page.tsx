"use client";

import React, { useState, useEffect } from "react";

export type UserRole = "FREE" | "VIP";

export default function HomePage() {
  const [userRole, setUserRole] = useState<UserRole>("FREE");
  const [activeTab, setActiveTab] = useState<"home" | "shorts">("home");
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [isPayOpen, setIsPayOpen] = useState(false);
  const [videos, setVideos] = useState<any[]>([]);

  useEffect(() => {
    async function loadVideos() {
      try {
        const apiKey = process.env.NEXT_PUBLIC_PEXELS_API_KEY || "";
        if (apiKey) {
          const res = await fetch("https://api.pexels.com/videos/search?query=cinematic+space&per_page=9&orientation=portrait", {
            headers: { Authorization: apiKey }
          });
          const data = await res.json();
          if (data.videos && data.videos.length > 0) {
            const mapped = data.videos.map((vid: any) => ({
              id: `pexels-${vid.id}`,
              title: vid.user?.name ? `${vid.user.name}` : "مشهد سينمائي",
              category: "ترند",
              videoUrl: vid.video_files.find((f: any) => f.quality === "hd")?.link || vid.video_files[0]?.link
            }));
            setVideos(mapped);
            return;
          }
        }
      } catch (err) {
        console.error("Pexels fetch error:", err);
      }

      setVideos([
        { id: "1", title: "الشخصية الفضائية", category: "سينما", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
        { id: "2", title: "شعاع النيون", category: "ترند", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
        { id: "3", title: "البعد الثالث", category: "بزنس", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" },
        { id: "4", title: "الطاقة الكونية", category: "تعليم", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
        { id: "5", title: "أساطير الفضاء", category: "سينما", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
        { id: "6", title: "البوابة الزمنية", category: "ترند", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" },
        { id: "7", title: "السديم البنفسجي", category: "سينما", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
        { id: "8", title: "الانفجار الذهبي", category: "ترند", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
        { id: "9", title: "رؤية المستقبليات", category: "بزنس", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" },
      ]);
    }
    loadVideos();
  }, []);

  const shorts = [
    { id: "s1", user: "@cyber_ai", caption: "عالم السايبربنك والذكاء الاصطناعي 🚀 #Videxa #Shorts", likes: "1.4K", comments: "95", shares: "30", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", isAd: false },
    { id: "s2", user: "@cinema_pro", caption: "مشاهد سينمائية احترافية #Cinema #Videxa", likes: "2.8K", comments: "110", shares: "60", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", isAd: false },
    { id: "s3", user: "إعلان Videxa PRO 🚀", caption: "اشترك الآن في VIP وافتح التحميل المباشر والقوالب بدون إعلانات!", likes: "5.4K", comments: "20", shares: "100", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", isAd: true },
  ];

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
    <main className="min-h-screen bg-[#030207] text-white dir-rtl font-sans relative overflow-x-hidden pb-12">
      
      {/* خلفية الفضاء والبرق السحرية */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900 via-purple-950 to-black" />
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20 bg-[radial-gradient(circle_at_bottom_amber,_var(--tw-gradient-stops))] from-amber-600 via-transparent to-transparent" />

      {/* 🎬 شاشة الشورتس */}
      {activeTab === "shorts" && (
        <div className="fixed inset-0 z-50 bg-black flex justify-center items-center">
          <button 
            onClick={() => setActiveTab("home")}
            className="absolute top-4 right-4 z-50 bg-black/60 border border-amber-500/40 text-amber-300 px-4 py-1.5 rounded-full text-xs font-bold backdrop-blur"
          >
            ✕ خروج للرئيسية
          </button>

          <div className="h-full w-full max-w-md snap-y snap-mandatory overflow-y-scroll scrollbar-none">
            {shorts.map((item) => (
              <div key={item.id} className="h-full w-full snap-start relative flex items-center justify-center bg-zinc-950">
                <video src={item.videoUrl} loop autoPlay muted playsInline className="w-full h-full object-cover" />

                {item.isAd && (
                  <span className="absolute top-4 left-4 bg-amber-400 text-black font-black text-[10px] px-2 py-0.5 rounded shadow-md">
                    إعلان SPONSORED
                  </span>
                )}

                <div className="absolute left-3 bottom-20 flex flex-col items-center gap-4 z-20">
                  <button className="flex flex-col items-center">
                    <span className="w-9 h-9 rounded-full bg-black/40 border border-amber-500/30 flex items-center justify-center text-sm backdrop-blur">❤️</span>
                    <span className="text-[10px] font-bold mt-1 text-amber-200">{item.likes}</span>
                  </button>
                  <button className="flex flex-col items-center">
                    <span className="w-9 h-9 rounded-full bg-black/40 border border-amber-500/30 flex items-center justify-center text-sm backdrop-blur">💬</span>
                    <span className="text-[10px] font-bold mt-1 text-amber-200">{item.comments}</span>
                  </button>
                  <button className="flex flex-col items-center">
                    <span className="w-9 h-9 rounded-full bg-black/40 border border-amber-500/30 flex items-center justify-center text-sm backdrop-blur">🔗</span>
                    <span className="text-[10px] font-bold mt-1 text-amber-200">{item.shares}</span>
                  </button>
                </div>

                <div className="absolute bottom-6 right-3 left-16 z-20 text-right dir-rtl">
                  <h3 className="font-bold text-xs text-amber-400">{item.user}</h3>
                  <p className="text-[11px] text-slate-200 line-clamp-2 mt-0.5">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="relative z-10 max-w-4xl mx-auto px-4 pt-3 space-y-6">

        {/* الهيدر العلوي بنمط إطارات النيون الذهبية */}
        <header className="flex justify-between items-center py-2">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black tracking-widest text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
              videxa
            </h1>
            <button 
              onClick={() => setActiveTab("shorts")}
              className="text-[10px] bg-amber-500/10 border border-amber-500/40 px-3 py-1 rounded-lg font-bold text-amber-300 hover:bg-amber-500/20 transition backdrop-blur"
            >
              🎬 الشورتس
            </button>
          </div>

          {/* زر Pro الذهبي المشع */}
          <button
            onClick={() => setIsPayOpen(true)}
            className="relative px-5 py-1.5 rounded-xl border-2 border-amber-400 bg-black/40 text-amber-300 font-extrabold text-xs shadow-[0_0_15px_rgba(251,191,36,0.4)] hover:shadow-[0_0_25px_rgba(251,191,36,0.8)] transition duration-300"
          >
            Pro الشابة
          </button>
        </header>

        {/* شريط تبديل العضوية */}
        <div className="flex justify-between items-center bg-black/50 border border-amber-500/20 rounded-lg p-2 text-[10px] backdrop-blur">
          <div className="flex items-center gap-1.5">
            <span className="text-amber-400 font-bold">حالة الحساب:</span>
            <span className={userRole === "VIP" ? "text-emerald-400 font-bold" : "text-amber-200 font-bold"}>
              {userRole === "VIP" ? "مشترك VIP ✨" : "مجاني (FREE)"}
            </span>
          </div>
          <button 
            onClick={() => setUserRole(userRole === "FREE" ? "VIP" : "FREE")}
            className="bg-amber-500/20 border border-amber-400/30 px-2.5 py-0.5 rounded text-amber-300 hover:bg-amber-500/40 transition"
          >
            تبديل الحساب
          </button>
        </div>

        {/* القسم الرئيسي: شعار V الذهبي ثلاثي الأبعاد والعنوان السينمائي */}
        <div className="flex flex-col items-center text-center space-y-3 py-4">
          <div className="relative w-28 h-28 flex items-center justify-center">
            {/* الإضاءة الكونية خلف الشعار */}
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/30 via-purple-600/40 to-cyan-400/30 blur-2xl rounded-full" />
            
            {/* مجسم حرف V الذهبي المصمم بلغة SVG */}
            <svg className="w-24 h-24 relative z-10 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 20L42 80H58L85 20H68L50 62L32 20H15Z" fill="url(#goldGradient)" />
              <path d="M48 20L50 62L68 20H58L50 40L42 20H48Z" fill="#FFF" opacity="0.4" />
              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF1B0" />
                  <stop offset="30%" stopColor="#F59E0B" />
                  <stop offset="70%" stopColor="#B45309" />
                  <stop offset="100%" stopColor="#78350F" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <h2 className="text-2xl font-black text-white tracking-wide drop-shadow-md">
            خل الفُرية
          </h2>
          <p className="text-slate-300 text-xs max-w-xs font-semibold leading-relaxed">
            مت الثت اكهداقورا؟
          </p>
        </div>

        {/* أزرار التصنيفات المصممة بأسلوب شفاف ومذهب */}
        <div className="flex justify-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button 
              key={cat} 
              onClick={() => setActiveCategory(cat)} 
              className={`px-4 py-1 rounded-md text-[11px] font-bold border transition duration-300 ${
                activeCategory === cat 
                  ? "bg-amber-500/20 border-amber-400 text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.3)]" 
                  : "bg-black/40 border-white/10 text-slate-400 hover:border-amber-500/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 📐 شبكة الكروت الكونية 3x3 بإطارات ذهبية مشعة */}
        <div className="grid grid-cols-3 gap-3 pt-2">
          {filtered.map((item) => (
            <div 
              key={item.id} 
              className="group relative bg-black/60 border border-amber-500/40 rounded-xl overflow-hidden shadow-[0_0_12px_rgba(245,158,11,0.15)] hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:border-amber-400 transition-all duration-300 flex flex-col justify-between"
            >
              {/* شاشة عرض الفيديو بالنوافذ المصغرة */}
              <div className="relative aspect-[3/4] bg-zinc-950 overflow-hidden flex items-center justify-center">
                
                {/* تأثير أشعة النيون الخلفية داخل الكرت */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-600/30 via-cyan-600/20 to-transparent opacity-80" />
                
                <video src={item.videoUrl} controls className="w-full h-full object-cover relative z-10" />

                {/* شعار VIDEXA المائي أسفل اليسار */}
                <div className="absolute bottom-1.5 left-1.5 z-20 flex items-center gap-0.5 opacity-80">
                  <span className="text-[7px] font-black text-white tracking-widest uppercase">VIDEXA</span>
                </div>
              </div>

              {/* أزرار الإجراءات السريعة (تحميل / قالب) */}
              <div className="p-1.5 bg-black/80 border-t border-amber-500/20 space-y-1">
                <h4 className="font-bold text-[8px] text-amber-100 truncate text-center">{item.title}</h4>
                
                <div className="flex gap-1">
                  <button 
                    onClick={() => handleVipAction("استخدام القالب")}
                    className="w-1/2 bg-purple-900/60 hover:bg-purple-800 border border-purple-500/40 text-purple-200 text-[6.5px] font-bold py-0.5 rounded truncate transition"
                  >
                    {userRole === "FREE" ? "🔒 قالب" : "قالب"}
                  </button>

                  <button 
                    onClick={() => handleVipAction("تحميل الفيديو")}
                    className="w-1/2 bg-amber-500/80 hover:bg-amber-400 text-black text-[6.5px] font-black py-0.5 rounded truncate transition"
                  >
                    {userRole === "FREE" ? "🔒 تحميل" : "تحميل"}
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* 💳 نافذة الاشتراك الذهبية */}
      {isPayOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex justify-center items-center p-4 dir-rtl">
          <div className="bg-gradient-to-b from-zinc-900 to-black border-2 border-amber-400 p-6 rounded-2xl max-w-xs w-full text-center space-y-4 shadow-[0_0_30px_rgba(245,158,11,0.3)]">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center mx-auto text-xl text-amber-300">
              ✨
            </div>
            <h3 className="text-lg font-black text-amber-300">ترقية عضوية Pro</h3>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              افتح التحميل الفائق بدقة 4K واستخدام جميع القوالب الحصرية بدون أي إعلانات!
            </p>
            <div className="text-2xl font-black text-amber-400">$9.99 / شهرياً</div>
            
            <button 
              onClick={() => { 
                setUserRole("VIP"); 
                setIsPayOpen(false); 
                alert("تهانينا! تم تفعيل عضوية VIP الذهبية بنجاح."); 
              }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-black text-xs shadow-lg transition"
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

"use client";

import React, { useState } from "react";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"home" | "shorts" | "upload">("home");
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [isPayOpen, setIsPayOpen] = useState(false);

  // مكتبة فيديوهات سينمائية حقيقية ومستضافة
  const [videos, setVideos] = useState([
    { 
      id: "1", 
      title: "عالم السايبربنك والذكاء الاصطناعي", 
      category: "سينما", 
      videoUrl: "https://vjs.zencdn.net/v/oceans.mp4" 
    },
    { 
      id: "2", 
      title: "الأبعاد الكونية والنيون", 
      category: "ترند", 
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" 
    },
    { 
      id: "3", 
      title: "المستقبل الذكي والبزنس", 
      category: "بزنس", 
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" 
    },
    { 
      id: "4", 
      title: "الطاقة الضوئية المتقدمة", 
      category: "تعليم", 
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" 
    },
    { 
      id: "5", 
      title: "أساطير المجرات والنجوم", 
      category: "سينما", 
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4" 
    },
    { 
      id: "6", 
      title: "المدينة المستقبلية 2050", 
      category: "ترند", 
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" 
    },
  ]);

  // نموذج رفع الفيديو
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("ترند");
  const [newUrl, setNewUrl] = useState("");

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newUrl) return alert("يرجى إدخال جميع البيانات ورابط الفيديو!");
    
    const newVideo = {
      id: Date.now().toString(),
      title: newTitle,
      category: newCategory,
      videoUrl: newUrl
    };

    setVideos([newVideo, ...videos]);
    setNewTitle("");
    setNewUrl("");
    setActiveTab("home");
    alert("تم نشر الفيديو بنجاح! 🚀");
  };

  const categories = ["الكل", "ترند", "سينما", "بزنس", "تعليم"];
  const filtered = activeCategory === "الكل" ? videos : videos.filter(t => t.category === activeCategory);

  return (
    <main className="min-h-screen bg-[#030207] text-white dir-rtl font-sans relative overflow-x-hidden pb-12">
      
      {/* خلفية الفضاء */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900 via-purple-950 to-black" />

      {/* 📤 صفحة نشر الفيديو */}
      {activeTab === "upload" && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex justify-center items-center p-4">
          <div className="bg-zinc-900 border border-amber-500/40 p-6 rounded-2xl max-w-md w-full space-y-4">
            <div className="flex justify-between items-center border-b border-white/10 pb-2">
              <h3 className="text-base font-bold text-amber-300">نشر فيديو جديد 📤</h3>
              <button onClick={() => setActiveTab("home")} className="text-xs text-slate-400">✕ إغلاق</button>
            </div>

            <form onSubmit={handleUpload} className="space-y-3 text-right">
              <div>
                <label className="text-[10px] text-slate-300 block mb-1">عنوان الفيديو:</label>
                <input 
                  type="text" 
                  value={newTitle} 
                  onChange={(e) => setNewTitle(e.target.value)} 
                  placeholder="أدخل عنواناً مميزاً..."
                  className="w-full bg-black/60 border border-white/20 rounded-lg p-2 text-xs text-white focus:border-amber-400 outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-300 block mb-1">التصنيف:</label>
                <select 
                  value={newCategory} 
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-black/60 border border-white/20 rounded-lg p-2 text-xs text-white focus:border-amber-400 outline-none"
                >
                  {categories.filter(c => c !== "الكل").map(cat => (
                    <option key={cat} value={cat} className="bg-zinc-900">{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] text-slate-300 block mb-1">رابط الفيديو المباشر (MP4):</label>
                <input 
                  type="url" 
                  value={newUrl} 
                  onChange={(e) => setNewUrl(e.target.value)} 
                  placeholder="https://domain.com/video.mp4"
                  className="w-full bg-black/60 border border-white/20 rounded-lg p-2 text-xs text-white focus:border-amber-400 outline-none"
                />
              </div>

              <button 
                type="submit" 
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 font-bold text-black text-xs mt-2"
              >
                تأكيد النشر 🚀
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 🎬 شاشة الشورتس */}
      {activeTab === "shorts" && (
        <div className="fixed inset-0 z-50 bg-black flex justify-center items-center">
          <button 
            onClick={() => setActiveTab("home")}
            className="absolute top-4 right-4 z-50 bg-black/60 border border-amber-500/40 text-amber-300 px-4 py-1.5 rounded-full text-xs font-bold"
          >
            ✕ خروج للرئيسية
          </button>
          <div className="h-full w-full max-w-md flex items-center justify-center">
            <video src={videos[0]?.videoUrl} loop autoPlay controls className="w-full h-full object-cover" />
          </div>
        </div>
      )}

      <div className="relative z-10 max-w-4xl mx-auto px-4 pt-3 space-y-6">

        {/* الهيدر العلوي */}
        <header className="flex justify-between items-center py-2">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black tracking-widest text-white">videxa</h1>
            
            <button 
              onClick={() => setActiveTab("shorts")}
              className="text-[10px] bg-amber-500/10 border border-amber-500/40 px-3 py-1 rounded-lg font-bold text-amber-300"
            >
              🎬 الشورتس
            </button>

            <button 
              onClick={() => setActiveTab("upload")}
              className="text-[10px] bg-purple-600/30 border border-purple-500/50 px-3 py-1 rounded-lg font-bold text-purple-300"
            >
              📤 نشر فيديو
            </button>
          </div>

          {/* زر الاشتراك تم تعديله ليكون Pro فقط */}
          <button
            onClick={() => setIsPayOpen(true)}
            className="px-6 py-1.5 rounded-xl border-2 border-amber-400 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-black text-xs shadow-[0_0_15px_rgba(251,191,36,0.6)] hover:scale-105 transition duration-300"
          >
            Pro ✨
          </button>
        </header>

        {/* الشعار والعنوان السينمائي */}
        <div className="flex flex-col items-center text-center space-y-3 py-2">
          <div className="relative w-24 h-24 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/30 to-purple-600/40 blur-2xl rounded-full" />
            <svg className="w-20 h-20 relative z-10" viewBox="0 0 100 100" fill="none">
              <path d="M15 20L42 80H58L85 20H68L50 62L32 20H15Z" fill="url(#goldGradient)" />
              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF1B0" />
                  <stop offset="100%" stopColor="#B45309" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <h2 className="text-2xl font-black text-white">عالم الفيديوهات السينمائية</h2>
          <p className="text-slate-300 text-xs">استكشف وقم بتحميل أفضل القوالب والمشاهد بدقة 4K</p>
        </div>

        {/* أزرار التصنيفات */}
        <div className="flex justify-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button 
              key={cat} 
              onClick={() => setActiveCategory(cat)} 
              className={`px-4 py-1 rounded-md text-[11px] font-bold border ${
                activeCategory === cat ? "bg-amber-500/20 border-amber-400 text-amber-300" : "bg-black/40 border-white/10 text-slate-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 📐 شبكة الفيديوهات الحقيقية */}
        <div className="grid grid-cols-3 gap-3 pt-2">
          {filtered.map((item) => (
            <div key={item.id} className="bg-black/60 border border-amber-500/40 rounded-xl overflow-hidden flex flex-col justify-between shadow-lg">
              
              <div className="relative aspect-[3/4] bg-zinc-950 overflow-hidden">
                <video src={item.videoUrl} controls preload="metadata" className="w-full h-full object-cover" />
                <div className="absolute bottom-1 left-1 opacity-80 pointer-events-none">
                  <span className="text-[7px] font-black text-white tracking-widest">VIDEXA</span>
                </div>
              </div>

              <div className="p-1.5 bg-black/80 border-t border-amber-500/20 space-y-1">
                <h4 className="font-bold text-[8px] text-amber-100 truncate text-center">{item.title}</h4>
                
                <div className="flex gap-1">
                  <button onClick={() => setIsPayOpen(true)} className="w-1/2 bg-purple-900/60 border border-purple-500/40 text-purple-200 text-[6.5px] font-bold py-1 rounded">
                    قالب
                  </button>

                  <a 
                    href={item.videoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    download 
                    className="w-1/2 bg-amber-500 hover:bg-amber-400 text-black text-[6.5px] font-black py-1 rounded text-center block transition"
                  >
                    تحميل
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* 💳 نافذة الاشتراك Pro */}
      {isPayOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex justify-center items-center p-4">
          <div className="bg-zinc-900 border-2 border-amber-400 p-6 rounded-2xl max-w-xs w-full text-center space-y-4 shadow-[0_0_25px_rgba(245,158,11,0.3)]">
            <h3 className="text-xl font-black text-amber-300">Videxa Pro ✨</h3>
            <p className="text-[11px] text-slate-300 leading-relaxed">احصل على صلاحية التنزيل المباشر ودقة 4K وتعديل القوالب بدون حدود!</p>
            <div className="text-2xl font-black text-amber-400">$9.99 / شهرياً</div>
            <button onClick={() => { setIsPayOpen(false); alert("تم الاشتراك في Videxa Pro بنجاح!"); }} className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-black text-xs shadow-md">
              اشترك الآن
            </button>
            <button onClick={() => setIsPayOpen(false)} className="text-[10px] text-slate-400 block mx-auto hover:text-white">إلغاء</button>
          </div>
        </div>
      )}

    </main>
  );
}

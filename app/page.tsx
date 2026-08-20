"use client";

import React, { useState } from "react";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"home" | "shorts" | "upload">("home");
  const [activeCategory, setActiveCategory] = useState("الكل | All");
  const [isPayOpen, setIsPayOpen] = useState(false);

  const [videos, setVideos] = useState([
    { 
      id: "1", 
      title: "عالم المستقبل | Cyberpunk World", 
      category: "سينما | Cinema", 
      poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop",
      videoUrl: "https://vjs.zencdn.net/v/oceans.mp4" 
    },
    { 
      id: "2", 
      title: "أضواء النيون | Neon Lights", 
      category: "ترند | Trending", 
      poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format&fit=crop",
      videoUrl: "https://vjs.zencdn.net/v/oceans.mp4" 
    },
    { 
      id: "3", 
      title: "الذكاء الاصطناعي | AI Tech", 
      category: "بزنس | Business", 
      poster: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop",
      videoUrl: "https://vjs.zencdn.net/v/oceans.mp4" 
    },
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("ترند | Trending");
  const [newUrl, setNewUrl] = useState("");

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newUrl) return alert("يرجى إدخال جميع البيانات | Please fill all fields");
    
    const newVideo = {
      id: Date.now().toString(),
      title: newTitle,
      category: newCategory,
      poster: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop",
      videoUrl: newUrl
    };

    setVideos([newVideo, ...videos]);
    setNewTitle("");
    setNewUrl("");
    setActiveTab("home");
    alert("تم النشر بنجاح | Uploaded Successfully! 🚀");
  };

  const categories = ["الكل | All", "ترند | Trending", "سينما | Cinema", "بزنس | Business"];
  const filtered = activeCategory === "الكل | All" ? videos : videos.filter(t => t.category === activeCategory);

  return (
    <main className="min-h-screen bg-[#070510] text-white dir-rtl font-sans relative overflow-x-hidden pb-12">
      
      {/* خلفية نيون ضوئية */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-purple-600/30 rounded-full blur-[100px]" />
        <div className="absolute top-[30%] right-[-10%] w-[350px] h-[350px] bg-amber-500/20 rounded-full blur-[100px]" />
      </div>

      {/* 📤 صفحة النشر */}
      {activeTab === "upload" && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex justify-center items-center p-4">
          <div className="bg-zinc-900 border border-amber-500/50 p-6 rounded-2xl max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-white/10 pb-2">
              <h3 className="text-sm font-bold text-amber-300">نشر فيديو | Upload Video 📤</h3>
              <button onClick={() => setActiveTab("home")} className="text-xs text-slate-400">✕ Close</button>
            </div>

            <form onSubmit={handleUpload} className="space-y-3 text-right">
              <div>
                <label className="text-[10px] text-slate-300 block mb-1">العنوان | Title:</label>
                <input 
                  type="text" 
                  value={newTitle} 
                  onChange={(e) => setNewTitle(e.target.value)} 
                  placeholder="أدخل العنوان..."
                  className="w-full bg-black/80 border border-amber-500/30 rounded-lg p-2.5 text-xs text-white outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-300 block mb-1">التصنيف | Category:</label>
                <select 
                  value={newCategory} 
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-black/80 border border-amber-500/30 rounded-lg p-2.5 text-xs text-white outline-none"
                >
                  {categories.filter(c => c !== "الكل | All").map(cat => (
                    <option key={cat} value={cat} className="bg-zinc-900">{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] text-slate-300 block mb-1">رابط الفيديو | Video URL (MP4):</label>
                <input 
                  type="url" 
                  value={newUrl} 
                  onChange={(e) => setNewUrl(e.target.value)} 
                  placeholder="https://example.com/video.mp4"
                  className="w-full bg-black/80 border border-amber-500/30 rounded-lg p-2.5 text-xs text-white outline-none"
                />
              </div>

              <button 
                type="submit" 
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 font-bold text-black text-xs mt-2"
              >
                تأكيد النشر | Publish 🚀
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 🎬 الشورتس */}
      {activeTab === "shorts" && (
        <div className="fixed inset-0 z-50 bg-black flex justify-center items-center">
          <button 
            onClick={() => setActiveTab("home")}
            className="absolute top-4 right-4 z-50 bg-black/60 border border-amber-500/50 text-amber-300 px-4 py-1 rounded-full text-xs font-bold"
          >
            ✕ خروج | Back
          </button>
          <div className="h-full w-full max-w-md flex items-center justify-center">
            <video src={videos[0]?.videoUrl} poster={videos[0]?.poster} loop autoPlay controls className="w-full h-full object-cover" />
          </div>
        </div>
      )}

      <div className="relative z-10 max-w-4xl mx-auto px-4 pt-4 space-y-6">

        {/* الهيدر العلوي */}
        <header className="flex justify-between items-center py-2 border-b border-amber-500/10">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-amber-400 tracking-wider">Videxa</h1>
            
            <button 
              onClick={() => setActiveTab("shorts")}
              className="text-[10px] bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-lg font-bold text-amber-300"
            >
              🎬 الشورتس | Shorts
            </button>

            <button 
              onClick={() => setActiveTab("upload")}
              className="text-[10px] bg-purple-600/20 border border-purple-500/40 px-2.5 py-1 rounded-lg font-bold text-purple-300"
            >
              📤 نشر | Upload
            </button>
          </div>

          <button
            onClick={() => setIsPayOpen(true)}
            className="px-5 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-black font-black text-xs shadow-lg"
          >
            Pro ✨
          </button>
        </header>

        {/* العنوان الرئيسي والشعار */}
        <div className="flex flex-col items-center text-center space-y-2 py-4">
          <h2 className="text-2xl font-black text-white">
            مكتبة الفيديوهات | Video Gallery
          </h2>
          <p className="text-slate-400 text-xs font-medium">استكشف وحمّل القوالب بدقة عالية | Explore & Download HD Templates</p>
        </div>

        {/* أزرار التصنيفات */}
        <div className="flex justify-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button 
              key={cat} 
              onClick={() => setActiveCategory(cat)} 
              className={`px-3 py-1 rounded-lg text-xs font-bold border transition ${
                activeCategory === cat 
                  ? "bg-amber-500/20 border-amber-400 text-amber-300" 
                  : "bg-black/40 border-white/10 text-slate-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 📐 شبكة الفيديوهات */}
        <div className="grid grid-cols-3 gap-3 pt-2">
          {filtered.map((item) => (
            <div key={item.id} className="bg-black/80 border border-amber-500/30 rounded-xl overflow-hidden flex flex-col justify-between shadow-lg">
              
              <div className="relative aspect-[3/4] bg-zinc-950 overflow-hidden">
                <video 
                  src={item.videoUrl} 
                  poster={item.poster}
                  controls 
                  preload="metadata" 
                  className="w-full h-full object-cover" 
                />
              </div>

              <div className="p-2 bg-zinc-950 border-t border-amber-500/20 space-y-1.5">
                <h4 className="font-bold text-[8px] text-amber-100 truncate text-center">{item.title}</h4>
                
                <div className="flex gap-1">
                  <button 
                    onClick={() => setIsPayOpen(true)} 
                    className="w-1/2 bg-purple-900/60 border border-purple-500/40 text-purple-200 text-[7px] font-bold py-1 rounded"
                  >
                    قالب | Template
                  </button>

                  <a 
                    href={item.videoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    download 
                    className="w-1/2 bg-amber-500 hover:bg-amber-400 text-black text-[7px] font-black py-1 rounded text-center block"
                  >
                    تحميل | Get
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* 💳 نافذة الاشتراك Pro */}
      {isPayOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-center items-center p-4">
          <div className="bg-zinc-900 border-2 border-amber-400 p-6 rounded-2xl max-w-xs w-full text-center space-y-4">
            <h3 className="text-xl font-black text-amber-300">Videxa Pro ✨</h3>
            <p className="text-[11px] text-slate-300">فتح كافة المميزات والتحميل غير المحدود | Unlock All Features & Unlimited Downloads</p>
            <div className="text-2xl font-black text-amber-400">$9.99 / Month</div>
            <button 
              onClick={() => { setIsPayOpen(false); alert("تم الاشتراك | Subscribed!"); }} 
              className="w-full py-2.5 rounded-xl bg-amber-500 text-black font-black text-xs"
            >
              اشترك الآن | Subscribe
            </button>
            <button onClick={() => setIsPayOpen(false)} className="text-[10px] text-slate-400 block mx-auto">إلغاء | Cancel</button>
          </div>
        </div>
      )}

    </main>
  );
}

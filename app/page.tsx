"use client";
import React, { useState, useEffect, useRef } from "react";

// توليد 30 قالب متنوع
const generateTemplates = () => {
  const categories = [
    { name: "سينمائي", icon: "🎬", count: 8 },
    { name: "أنمي", icon: "⚔️", count: 8 },
    { name: "إعلانات", icon: "💎", count: 4 },
    { name: "خيال علمي", icon: "🚀", count: 4 },
    { name: "رعب", icon: "👻", count: 3 },
    { name: "طبيعة", icon: "🏞️", count: 3 },
  ];

  let templates: any[] = [];
  let id = 0;
  categories.forEach(cat => {
    for (let i = 1; i <= cat.count; i++) {
      templates.push({
        id: `t${id++}`,
        title: `${cat.name} ${i}`,
        category: cat.name,
        icon: cat.icon,
        prompt: `${cat.name} scene ${i}, 8k, photorealistic, cinematic lighting`
      });
    }
  });
  return templates;
};

const AI_TEMPLATES = generateTemplates();

export default function Page() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [promptText, setPromptText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filter, setFilter] = useState("الكل");

  const observerRef = useRef<HTMLDivElement | null>(null);

  // دالة لجلب الفيديوهات مع دعم الصفحات للتحميل الكسول
  const fetchVideos = async (pageNumber: number) => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.pexels.com/videos/search?query=cinematic&per_page=15&page=${pageNumber}`,
        { headers: { Authorization: process.env.NEXT_PUBLIC_PEXELS_KEY || "ضع_مفتاح_pexels_هنا" } }
      );
      const data = await res.json();
      
      const formatted = data.videos?.map((v: any) => ({
        id: `${v.id}-${pageNumber}`,
        title: `مشهد سينمائي ${v.id}`,
        poster: v.image,
        videoUrl: v.video_files.find((f: any) => f.quality === 'hd')?.link || v.video_files[0].link
      })) || [];

      if (formatted.length === 0 || pageNumber >= 5) {
        setHasMore(false);
      }

      setVideos(prev => [...prev, ...formatted]);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  // جلب الدفعة الأولى عند فتح الصفحة
  useEffect(() => {
    fetchVideos(1);
  }, []);

  // إعداد Intersection Observer للتحميل الكسول عند التمرير
  useEffect(() => {
    const currentObserver = observerRef.current;
    if (!currentObserver) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          setPage(prevPage => {
            const nextPage = prevPage + 1;
            fetchVideos(nextPage);
            return nextPage;
          });
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(currentObserver);
    return () => {
      if (currentObserver) observer.unobserve(currentObserver);
    };
  }, [loading, hasMore]);

  const filteredTemplates = filter === "الكل" ? AI_TEMPLATES : AI_TEMPLATES.filter(t => t.category === filter);

  const handleApplyTemplate = (prompt: string) => {
    setPromptText(prompt);
    setIsCreateOpen(true);
  };

  const handleGenerateAI = () => {
    if (!promptText) return alert("اكتب وصف المشهد أولاً!");
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setIsCreateOpen(false);
      setSelectedVideo(videos[Math.floor(Math.random() * videos.length)]?.videoUrl || "https://vjs.zencdn.net/v/oceans.mp4");
      alert("تم توليد المشهد بنجاح! 🎉");
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-[#090713] text-white dir-rtl pb-24 font-sans selection:bg-purple-500">
      <header className="sticky top-0 z-40 bg-[#090713]/80 backdrop-blur-md px-4 py-3 text-center border-b border-purple-900/20">
        <span className="font-black text-lg bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          VIDEXA AI - 30 قالب + تحميل كسول
        </span>
      </header>

      <div className="max-w-md mx-auto px-4 space-y-6 pt-3">
        <div className="rounded-2xl bg-gradient-to-b from-purple-900/40 to-black p-4 border border-purple-500/20 shadow-xl">
          <h2 className="text-xl font-black">أدوات الذكاء الاصطناعي السريعة</h2>
          <p className="text-[10px] text-purple-200/70">تصفح 30 قالباً ومكتبة فيديوهات بتمرير غير محدود</p>
          <button 
            onClick={() => setIsCreateOpen(true)} 
            className="bg-gradient-to-r from-fuchsia-600 to-pink-600 px-5 py-2.5 rounded-xl text-xs font-black mt-3 w-full shadow-lg shadow-purple-600/30"
          >
            + إنشاء فيديو جديد ✨
          </button>
        </div>

        {/* فلتر الفئات */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {["الكل", "سينمائي", "أنمي", "إعلانات", "خيال علمي", "رعب", "طبيعة"].map(f => (
            <button 
              key={f} 
              onClick={() => setFilter(f)} 
              className={`px-3 py-1.5 rounded-full text-[10px] font-bold whitespace-nowrap transition-all ${filter === f ? 'bg-purple-600 text-white shadow-md' : 'bg-zinc-800 text-zinc-300'}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* عرض القوالب (30 قالب) */}
        <div className="space-y-3">
          <h3 className="text-sm font-black text-purple-100">🎬 القوالب المتاحة ({filteredTemplates.length})</h3>
          <div className="grid grid-cols-2 gap-2 max-h-[350px] overflow-y-auto pr-1">
            {filteredTemplates.map((tmpl) => (
              <div 
                key={tmpl.id} 
                onClick={() => handleApplyTemplate(tmpl.prompt)} 
                className="bg-purple-950/20 border border-purple-900/30 p-2.5 rounded-xl cursor-pointer hover:border-purple-500/50 transition-all flex flex-col justify-between"
              >
                <div className="flex justify-between items-center">
                  <span className="text-lg">{tmpl.icon}</span>
                  <span className="text-[7px] bg-purple-900/60 px-1.5 py-0.5 rounded text-purple-200">{tmpl.category}</span>
                </div>
                <h4 className="text-[10px] font-bold mt-1.5 text-purple-100 truncate">{tmpl.title}</h4>
                <button className="w-full bg-purple-600/30 text-[8px] py-1 rounded mt-2 font-bold text-purple-200 border border-purple-500/20">
                  تطبيق القالب ⚡
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* عرض الفيديوهات مع التحميل الكسول */}
        <div className="space-y-3">
          <h3 className="text-sm font-black text-purple-100">🔥 فيديوهات العرض ({videos.length})</h3>
          
          <div className="grid grid-cols-2 gap-3">
            {videos.map((vid) => (
              <div key={vid.id} className="bg-zinc-950 border border-purple-900/30 rounded-2xl overflow-hidden shadow-md flex flex-col justify-between">
                <div 
                  onClick={() => setSelectedVideo(vid.videoUrl)} 
                  className="relative aspect-[9/14] bg-cover bg-center cursor-pointer" 
                  style={{ backgroundImage: `url(${vid.poster})` }}
                >
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-9 h-9 rounded-full bg-purple-600/80 backdrop-blur-md flex items-center justify-center text-white text-xs shadow-lg">▶</div>
                  </div>
                </div>
                <div className="p-2 space-y-1.5 bg-zinc-950">
                  <p className="text-[9px] font-bold truncate text-purple-100">{vid.title}</p>
                  <button 
                    onClick={() => setSelectedVideo(vid.videoUrl)} 
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[8px] font-black py-1.5 rounded-lg shadow"
                  >
                    تشغيل المشهد 🎬
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* عنصر المراقبة للتحميل الكسول */}
          <div ref={observerRef} className="py-6 text-center">
            {loading && <p className="text-xs text-purple-300 animate-pulse">جاري تحميل المزيد من المشاهد... ⏳</p>}
            {!hasMore && <p className="text-[10px] text-zinc-500">تم عرض جميع الفيديوهات المتاحة ✨</p>}
          </div>
        </div>
      </div>

      {/* نافذة الإنشاء المنبثقة */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0f0a1c] border border-purple-500/40 p-5 rounded-2xl max-w-xs w-full space-y-4 shadow-2xl">
            <h3 className="text-base font-black text-purple-200 text-center">صناعة مشهد بالذكاء الاصطناعي ✨</h3>
            <textarea 
              value={promptText} 
              onChange={(e) => setPromptText(e.target.value)} 
              placeholder="اكتب وصف المشهد الذي تريد توليده..." 
              className="w-full h-24 bg-black/60 border border-purple-500/30 rounded-xl p-3 text-xs text-white outline-none resize-none focus:border-purple-400" 
            />
            <button 
              onClick={handleGenerateAI} 
              disabled={isGenerating} 
              className="w-full py-2.5 bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-xl font-bold text-xs text-white shadow-lg"
            >
              {isGenerating ? "جاري معالجة الفيديو... ⏳" : "توليد الفيديو الآن 🚀"}
            </button>
            <button 
              onClick={() => setIsCreateOpen(false)} 
              className="w-full text-center text-[10px] text-zinc-500 hover:text-zinc-300"
            >
              إلغاء
            </button>
          </div>
        </div>
      )}

      {/* مشغل الفيديو المنبثق */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <div className="relative w-full max-w-sm rounded-2xl overflow-hidden border border-purple-500/50 bg-black p-2">
            <button 
              onClick={() => setSelectedVideo(null)} 
              className="absolute top-4 right-4 z-20 bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-md"
            >
              ✕
            </button>
            <video src={selectedVideo} controls autoPlay playsInline className="w-full h-auto max-h-[70vh] rounded-xl" />
          </div>
        </div>
      )}
    </main>
  );
}

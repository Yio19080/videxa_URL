"use client";
import React, { useState, useEffect, useRef } from "react";

const generateTemplates = () => {
  const categories = [
    { name: "سينمائي", icon: "🎬", count: 8 },
    { name: "أنمي", icon: "⚔️", count: 8 },
    { name: "إعلانات", icon: "💎", count: 4 },
    { name: "خيال علمي", icon: "🚀", count: 4 },
    { name: "رعب", icon: "👻", count: 3 },
    { name: "طبيعة", icon: "🏞️", count: 3 },
  ];
  let templates: any[] = []; let id = 0;
  categories.forEach(cat => { for (let i = 1; i <= cat.count; i++) {
    templates.push({ id: `t${id++}`, title: `${cat.name} ${i}`, category: cat.name, icon: cat.icon, prompt: `${cat.name} cinematic scene ${i}, 4k ultra` });
  }}); return templates;
};
const AI_TEMPLATES = generateTemplates();

export default function Page() {
  const [activeTab, setActiveTab] = useState("الرئيسية");
  const [isPayOpen, setIsPayOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [promptText, setPromptText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filter, setFilter] = useState("الكل");
  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchVideos = async (pageNumber: number) => {
    if (loading ||!hasMore) return; setLoading(true);
    try {
      const res = await fetch(`https://api.pexels.com/videos/search?query=cinematic&per_page=15&page=${pageNumber}`,
        { headers: { Authorization: process.env.NEXT_PUBLIC_PEXELS_KEY || "ضع_مفتاح_pexels_هنا" } });
      const data = await res.json();
      const formatted = data.videos?.map((v: any) => ({
        id: `${v.id}-${pageNumber}`, title: ["رحلة في الغابة","مدينة المستقبل","أسطورة المحارب","شروق جبلي","ليلة نيون"][Math.floor(Math.random()*5)],
        poster: v.image, videoUrl: v.video_files.find((f: any) => f.quality === 'hd')?.link, views: `${(Math.random()*20+10).toFixed(1)}K`, likes: `${(Math.random()*2+0.5).toFixed(1)}K`, duration: `0${Math.floor(Math.random()*4)+1}:${Math.floor(Math.random()*60).toString().padStart(2,'0')}`
      })) || [];
      if (pageNumber >= 2) setHasMore(false); setVideos(prev => [...prev,...formatted]);
    } catch (e) { console.log(e) } setLoading(false);
  };
  useEffect(() => { fetchVideos(1) }, []);
  useEffect(() => {
    const obs = new IntersectionObserver((e) => { if (e[0].isIntersecting &&!loading && hasMore) { setPage(p => { const n = p+1; fetchVideos(n); return n }) } }, {threshold: 1});
    if(observerRef.current) obs.observe(observerRef.current);
    return () => { if(observerRef.current) obs.unobserve(observerRef.current) }
  }, [loading, hasMore]);

  const filteredTemplates = filter === "الكل"? AI_TEMPLATES : AI_TEMPLATES.filter(t => t.category === filter);

  const handleGenerateAI = () => {
    if (!promptText) return alert("اكتب وصف المشهد!");
    setIsGenerating(true); setTimeout(() => {
      setIsGenerating(false); setIsCreateOpen(false);
      setSelectedVideo(videos[Math.floor(Math.random() * videos.length)]?.videoUrl);
      alert(`تم توليد الفيديو 4K 🎉`);
    }, 2500);
  };

  const handleUploadReceipt = (e: React.FormEvent) => {
    e.preventDefault(); if (!paymentMethod ||!receiptFile) return alert("ارفع الاشعار");
    alert("تم استلام الاشعار ✅ التفعيل خلال 10 دقائق"); setIsPayOpen(false);
  };

  return (
    <main className="min-h-screen bg-black text-white dir-rtl pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl px-4 py-3 flex justify-between items-center">
        <button className="text-2xl">☰</button>
        <div className="text-center">
          <h1 className="text-xl font-black">VIDEXA <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">AI</span></h1>
          <p className="text-[8px] text-zinc-400">AI CINEMA STUDIO</p>
        </div>
        <div className="flex gap-2">
          <button onClick={()=>setIsPayOpen(true)} className="bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1">✨ Standard</button>
          <button className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">🔍</button>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 space-y-5 pt-2">
        {/* Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden h-48 bg-cover bg-center" style={{backgroundImage: "url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070)"}}>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent p-4 flex flex-col justify-end">
            <h2 className="text-2xl font-black">حوّل فكرتك إلى <br/><span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">مشهد سينمائي</span></h2>
            <p className="text-[10px] text-zinc-300 mt-1">اكتب قصتك، اختر الأسلوب، ودع Videxa AI يصنع السحر</p>
            <button onClick={()=>setIsCreateOpen(true)} className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 rounded-xl text-xs font-bold w-fit mt-2 flex items-center gap-1">✨ إنشاء فيديو</button>
            <div className="flex gap-2 mt-3">
              <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg"><p className="text-xs font-bold">4K</p><p className="text-[7px] text-zinc-400">ULTRA HD</p></div>
              <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg"><p className="text-xs font-bold">24</p><p className="text-[7px] text-zinc-400">FPS</p></div>
              <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg"><p className="text-xs font-bold">AI</p><p className="text-[7px] text-zinc-400">POWERED</p></div>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-around text-[10px]">
          {[{icon:"⭐",name:"الكل"},{icon:"🎬",name:"سينمائي"},{icon:"🔥",name:"رائج"},{icon:"🪐",name:"خيال"},{icon:"⛰️",name:"طبيعة"}].map(t=>(
            <button key={t.name} onClick={()=>setFilter(t.name)} className={`flex flex-col items-center ${filter===t.name?'text-purple-400 border-b-2 border-purple-400 pb-1':'text-zinc-500'}`}>
              <span className="text-lg">{t.icon}</span><span>{t.name}</span>
            </button>
          ))}
        </div>

        {/* Trending Videos */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <button className="text-[10px] bg-zinc-900 px-3 py-1 rounded-full">← عرض الكل</button>
            <h3 className="text-sm font-bold">الفيديوهات الرائجة</h3>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {videos.slice(0,6).map(v=>(
              <div key={v.id} onClick={()=>setSelectedVideo(v.videoUrl)} className="relative min-w-[140px] rounded-2xl overflow-hidden cursor-pointer">
                <img src={v.poster} className="h-48 w-full object-cover"/>
                <div className="absolute top-2 left-2 bg-purple-600 text-[8px] font-bold px-2 py-0.5 rounded">4K</div>
                <div className="absolute bottom-2 right-2 text-[9px] bg-black/60 px-1.5 rounded">{v.duration}</div>
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black p-2">
                  <p className="text-[10px] font-bold">{v.title}</p>
                  <div className="flex gap-2 text-[8px] text-zinc-400 mt-1"><span>👁️ {v.views}</span><span>❤️ {v.likes}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* VIP Card */}
        <div className="bg-gradient-to-r from-purple-900/60 to-pink-900/60 rounded-2xl p-4 flex justify-between items-center border border-purple-500/30">
          <div className="flex gap-3 items-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center text-2xl">👑</div>
            <div>
              <h4 className="font-black">ترقية إلى VIP</h4>
              <p className="text-[9px] text-zinc-300">تحميل غير محدود • جودة 4K • بدون إعلانات</p>
            </div>
          </div>
          <button onClick={()=>setIsPayOpen(true)} className="bg-pink-600 px-4 py-2 rounded-xl text-[10px] font-bold">ترقية الآن</button>
        </div>

        {/* Latest */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <button className="text-[10px] bg-zinc-900 px-3 py-1 rounded-full">← عرض الكل</button>
            <h3 className="text-sm font-bold">أحدث الإضافات</h3>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {videos.slice(6,9).map(v=>(
              <div key={v.id} onClick={()=>setSelectedVideo(v.videoUrl)} className="relative rounded-xl overflow-hidden">
                <img src={v.poster} className="h-32 w-full object-cover"/>
                <div className="absolute top-1 left-1 bg-purple-600 text-[7px] font-bold px-1.5 rounded">4K</div>
              </div>
            ))}
          </div>
        </div>
        <div ref={observerRef}></div>
      </div>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 inset-x-0 bg-black/90 backdrop-blur-xl border-t border-zinc-800 py-2 px-6 z-40 max-w-md mx-auto">
        <div className="flex justify-between items-center">
          {[{icon:"👤",name:"حسابي"},{icon:"☁️",name:"رفع"},{icon:"🎬",name:"Shorts"},{icon:"🏠",name:"الرئيسية"}].map(t=>(
            <button key={t.name} onClick={()=>setActiveTab(t.name)} className={`flex flex-col items-center ${activeTab===t.name?'text-purple-400':'text-zinc-500'}`}>
              <span className="text-xl">{t.icon}</span><span className="text-[8px]">{t.name}</span>
            </button>
          ))}
          <button onClick={()=>setIsCreateOpen(true)} className="absolute left-1/2 -translate-x-1/2 -top-5 w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-600/50">
            <span className="text-2xl">+</span>
          </button>
        </div>
      </nav>

      {/* Video Player */}
      {selectedVideo && <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"><div className="relative w-full max-w-sm"><button onClick={()=>setSelectedVideo(null)} className="absolute top-4 right-4 bg-red-600 w-8 h-8 rounded-full">✕</button><video src={selectedVideo} controls autoPlay className="w-full rounded-2xl"/></div></div>}

      {/* Create Modal */}
      {isCreateOpen && <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"><div className="bg-zinc-900 border-purple-500/40 p-5 rounded-2xl max-w-sm w-full space-y-3">
        <h3 className="text-base font-black text-center">إنشاء فيديو AI ✨</h3>
        <textarea value={promptText} onChange={(e)=>setPromptText(e.target.value)} placeholder="اكتب وصف المشهد..." className="w-full h-24 bg-black border-zinc-700 rounded-xl p-3 text-xs"/>
        <button onClick={handleGenerateAI} disabled={isGenerating} className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold">{isGenerating?'جاري التوليد...':'توليد 4K 🚀'}</button>
        <button onClick={()=>setIsCreateOpen(false)} className="w-full text-center text-xs">إلغاء</button>
      </div></div>}

      {/* Payment Modal */}
      {isPayOpen && <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"><div className="bg-zinc-900 border-2 border-amber-500/50 p-5 rounded-2xl max-w-sm w-full space-y-3">
        <h3 className="text-lg font-black text-amber-400 text-center">ترقية VIP 👑</h3>
        <div className="text-center text-2xl font-black">35,000 <span className="text-sm">جنيه</span></div>
        <div className="bg-black/40 p-3 rounded-xl text-[10px] space-y-1">
          <p className="font-bold text-green-400">بنكك</p>
          <p>الاسم: يوسف إبراهيم الطيب عبدالقادر</p><p>رقم الحساب: 9412190</p>
          <p className="text-amber-400">المبلغ: 35,000 جنيه</p>
        </div>
        <div className="bg-black/40 p-3 rounded-xl text-[10px] space-y-1">
          <p className="font-bold text-yellow-400">بينانس USDT - TRC20</p>
          <p className="break-all text-green-300">TGaAcY8fQ3xwY4JsEJtSfon5efz4bPhJg2</p>
          <p>المبلغ: 9.99 USDT</p>
        </div>
        <form onSubmit={handleUploadReceipt} className="space-y-2">
          <select value={paymentMethod} onChange={(e)=>setPaymentMethod(e.target.value)} className="w-full bg-black border-zinc-700 rounded-lg p-2 text-xs" required>
            <option value="">اختر طريقة الدفع</option><option value="bankak">بنكك 35,000 ج</option><option value="binance">بينانس 9.99 USDT</option>
          </select>
          <input type="file" onChange={(e)=>setReceiptFile(e.target.files?.[0]||null)} className="w-full bg-black border-zinc-700 rounded-lg p-2 text-xs" required/>
          <button type="submit" className="w-full py-3 bg-gradient-to-r from-amber-500 to-pink-600 rounded-xl font-bold">ارسال للمراجعة</button>
        </form>
        <button onClick={()=>setIsPayOpen(false)} className="w-full text-center text-xs">إلغاء</button>
      </div></div>}
    </main>
  );
                         }

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
    templates.push({ id: `t${id++}`, title: `${cat.name} ${i}`, category: cat.name, icon: cat.icon, prompt: `${cat.name} cinematic scene ${i}, 4k ultra realistic`, vip: i > 6 });
  }}); return templates;
};
const AI_TEMPLATES = generateTemplates();

export default function Page() {
  const [isVip, setIsVip] = useState(false);
  const [aiCredits, setAiCredits] = useState(3);
  const [videos, setVideos] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isPayOpen, setIsPayOpen] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<any>(null);
  const [promptText, setPromptText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [likedVideos, setLikedVideos] = useState<number[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastVideoRef = useRef<HTMLDivElement | null>(null);

  const loadVideos = async () => {
    if (loading) return;
    setLoading(true);
    const res = await fetch(`/api/videos?page=${page}`);
    const data = await res.json();
    setVideos(prev => [...prev,...data.videos]);
    setPage(prev => prev + 1);
    setLoading(false);
  };

  useEffect(() => { loadVideos(); }, []);

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) loadVideos();
    });
    if (lastVideoRef.current) observerRef.current.observe(lastVideoRef.current);
  }, [videos]);

  const handleLike = (id: number) => {
    if (likedVideos.includes(id)) {
      setLikedVideos(likedVideos.filter(vid => vid!== id));
      setVideos(videos.map(v => v.id === id? {...v, likes: v.likes - 1} : v));
    } else {
      setLikedVideos([...likedVideos, id]);
      setVideos(videos.map(v => v.id === id? {...v, likes: v.likes + 1} : v));
    }
  };

  const handleShare = (video: any) => {
    navigator.clipboard.writeText(video.videoUrl);
    alert("تم نسخ الرابط ✅");
  };

  const handleGenerateAI = () => {
    if (!isVip && aiCredits <= 0) return alert("خلصت المحاولات المجانية. اشترك VIP");
    if (!promptText) return alert("اكتب وصف المشهد!");
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false); setIsCreateOpen(false);
      if (!isVip) setAiCredits(prev => prev - 1);
      alert(`تم توليد الفيديو 4K 🎉`);
    }, 2500);
  };

  return (
    <main className="min-h-screen bg-black text-white dir-rtl">
      <header className="fixed top-0 z-50 w-full bg-black/80 backdrop-blur-xl px-4 py-3 flex justify-between items-center border-b border-zinc-900">
        <button className="text-2xl">☰</button>
        <h1 className="text-xl font-black">VIDEXA <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">AI</span></h1>
        {isVip? <span className="bg-amber-500 px-3 py-1 rounded-full text-[10px] font-bold">👑 VIP</span> : <button onClick={()=>setIsPayOpen(true)} className="bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-1 rounded-full text-[10px] font-bold">✨ ترقية</button>}
      </header>

      {/* TikTok Feed */}
      <div className="pt-14 snap-y snap-mandatory h-screen overflow-y-scroll">
        {videos.map((v:any, i:number) => (
          <div key={v.id} ref={i === videos.length - 1? lastVideoRef : null} className="h-screen w-full relative snap-start">
            <video src={v.videoUrl} autoPlay loop muted playsInline className="w-full h-full object-cover"/>

            {/* معلومات الفيديو */}
            <div className="absolute bottom-20 right-4 left-20">
              <p className="text-sm font-bold">@user{v.id}</p>
              <p className="text-xs">{v.title}</p>
              <p className="text-[10px] text-zinc-300">#{v.category} • 4K</p>
            </div>

            {/* ازرار التفاعل - زي TikTok */}
            <div className="absolute bottom-20 left-4 flex flex-col gap-5 text-center">
              {/* لايك */}
              <button onClick={()=>handleLike(v.id)} className="flex flex-col items-center">
                <span className={`text-3xl ${likedVideos.includes(v.id)? 'text-red-500' : ''}`}>{likedVideos.includes(v.id)? '❤️' : '🤍'}</span>
                <p className="text-[10px]">{(v.likes/1000).toFixed(1)}K</p>
              </button>
              {/* تعليقات */}
              <button onClick={()=>{setActiveVideo(v); setIsCommentsOpen(true)}} className="flex flex-col items-center">
                <span className="text-3xl">💬</span>
                <p className="text-[10px]">{(v.comments/1000).toFixed(1)}K</p>
              </button>
              {/* مشاركة */}
              <button onClick={()=>handleShare(v)} className="flex flex-col items-center">
                <span className="text-3xl">↗️</span>
                <p className="text-[10px]">{(v.shares/1000).toFixed(1)}K</p>
              </button>
            </div>
          </div>
        ))}
        {loading && <p className="text-center py-4">جاري التحميل...</p>}
      </div>

      {/* زر انشاء */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 text-center">
        <button onClick={()=>setIsCreateOpen(true)} className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 rounded-full font-bold">✨ إنشاء</button>
        {!isVip && <p className="text-[9px] mt-1">متبقي: {aiCredits} / 3</p>}
      </div>

      {/* نافذة التعليقات */}
      {isCommentsOpen && <div className="fixed inset-0 z-50 bg-black/90 flex-col justify-end"><div className="bg-zinc-900 h-3/4 rounded-t-2xl p-4">
        <div className="flex justify-between mb-3">
          <h3 className="font-bold">التعليقات {activeVideo?.comments}</h3>
          <button onClick={()=>setIsCommentsOpen(false)}>✕</button>
        </div>
        <div className="flex-1 overflow-y-auto space-y-3">
          <p className="text-xs">🔥 فيديو رهيب</p>
          <p className="text-xs">4K خرافي</p>
          <p className="text-xs">عايز اعمل زيو كيف</p>
        </div>
        <input placeholder="اضف تعليق..." className="w-full bg-black border-zinc-700 rounded-xl p-2 text-xs mt-2"/>
      </div></div>}

      {/* نافذة الانشاء */}
      {isCreateOpen && <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"><div className="bg-zinc-900 p-

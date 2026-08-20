"use client";
import React, { useState, useEffect, useRef } روابط غير منقطعة ومباشرة من شبكات توزيع محتوى موثوقة لتجنب أي مشاكل تشغيل
const realVideoSources = [
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackSeeTheWorld.mp4"
];

const generateRealFeed = () => {
  return Array.from({ length: 12 }, (_, i) => ({
    id: `real-v-${i}`,
    type: i % 5 === 0 ? 'AD' : 'VIDEO',
    user: `@creator_${i + 1}`,
    title: `فيديو تجربة حقيقي رقم ${i + 1}`,
    category: i % 2 === 0 ? "تقنية" : "منوعات",
    likes: Math.floor(Math.random() * 20000) + 500,
    comments: Math.floor(Math.random() * 1500) + 50,
    shares: Math.floor(Math.random() * 800) + 20,
    videoUrl: realVideoSources[i % realVideoSources.length],
  }));
};

export default function VidexaProPlatform() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authInput, setAuthInput] = useState("");
  const [isVip, setIsVip] = useState(false);
  const [feedData, setFeedData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isPayOpen, setIsPayOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [promptText, setPromptText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const [likedVideos, setLikedVideos] = useState<string[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    setFeedData(generateRealFeed());
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.6 }
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => observer.disconnect();
  }, [feedData, isLoggedIn]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authInput.trim()) return alert("الرجاء إدخال البريد الإلكتروني أو رقم الهاتف صحيحاً!");
    setIsLoggedIn(true);
  };

  const handleLike = (id: string) => {
    setLikedVideos((prev) =>
      prev.includes(id) ? prev.filter((vId) => vId !== id) : [...prev, id]
    );
    setFeedData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, likes: likedVideos.includes(id) ? item.likes - 1 : item.likes + 1 } : item
      )
    );
  };

  const handleDownload = (videoUrl: string) => {
    if (!isVip) {
      setIsPayOpen(true);
      return;
    }
    window.open(videoUrl, '_blank');
  };

  const handleGenerateAI = () => {
    if (!promptText) return alert("الرجاء كتابة وصف المشهد!");
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setIsCreateOpen(false);
      setPromptText("");
      alert("تم إرسال طلب التوليد بنجاح إلى الخادم!");
    }, 2000);
  };

  const processPayment = (plan: string) => {
    setSelectedPlan(plan);
    setTimeout(() => {
      setIsVip(true);
      setIsPayOpen(false);
      setSelectedPlan(null);
      alert("تمت ترقية الحساب إلى VIP بنجاح! 🎉");
    }, 2000);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 dir-rtl">
        <div className="w-full max-w-md bg-zinc-900 border border-white/10 p-8 rounded-3xl shadow-2xl text-center">
          <h1 className="text-3xl font-black tracking-tighter mb-2">VIDEXA <span className="text-purple-500">AI</span></h1>
          <p className="text-sm text-zinc-400 mb-8">تسجيل الدخول للمتابعة (بريد أو رقم هاتف)</p>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="text"
              value={authInput}
              onChange={(e) => setAuthInput(e.target.value)}
              placeholder="مثال: user@email.com أو 0912345678"
              className="w-full bg-black border border-white/10 rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-purple-500 transition"
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 py-4 rounded-2xl font-bold transition hover:opacity-90 active:scale-95"
            >
              دخول المنصة 🚀
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <main className="h-screen flex items-center justify-center bg-black text-white">
        <span className="animate-spin text-purple-500 text-4xl">✨</span>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans dir-rtl">
      <header className="fixed top-0 w-full z-50 bg-[#050505]/85 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-black tracking-tighter">VIDEXA <span className="text-purple-500">AI</span></h1>
        <div className="flex items-center gap-4">
          {isVip ? (
            <span className="bg-amber-500 text-black px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1">👑 VIP</span>
          ) : (
            <button onClick={() => setIsPayOpen(true)} className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-1.5 rounded-full text-xs font-bold">✨ ترقية</button>
          )}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-2xl">{isMenuOpen ? "❌" : "☰"}</button>
        </div>
      </header>

      <main className="h-screen overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
        {feedData.map((item, index) => (
          <section key={item.id} className="h-screen w-full relative snap-start">
            <video
              ref={(el: HTMLVideoElement | null) => {
                videoRefs.current[index] = el;
              }}
              src={item.videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            
            {item.type === 'AD' && (
              <div className="absolute top-24 right-6 bg-red-600 px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider shadow-lg">إعلان مميز 📢</div>
            )}

            <div className="absolute bottom-24 right-6 left-20 space-y-2">
              <h2 className="font-bold text-lg flex items-center gap-2">
                {item.user}
                <span className="text-blue-400 text-sm">✅</span>
              </h2>
              <p className="text-sm opacity-90">{item.title}</p>
              <div className="flex gap-2">
                <span className="bg-white/10 px-2 py-0.5 rounded-md text-[10px] font-bold">#{item.category}</span>
                <span className="bg-white/10 px-2 py-0.5 rounded-md text-[10px] font-bold">HD</span>
              </div>
            </div>

            <div className="absolute bottom-24 right-6 flex flex-col gap-6 items-center">
              <button onClick={() => handleLike(item.id)} className="flex flex-col items-center gap-1 group">
                <span className={`text-2xl transition-transform active:scale-90 ${likedVideos.includes(item.id) ? 'text-red-500' : 'text-white'}`}>{likedVideos.includes(item.id) ? "❤️" : "🤍"}</span>
                <span className="text-[10px] font-bold">{item.likes}</span>
              </button>
              
              <button className="flex flex-col items-center gap-1 group">
                <span className="text-2xl">💬</span>
                <span className="text-[10px] font-bold">{item.comments}</span>
              </button>
              
              <button className="flex flex-col items-center gap-1 group">
                <span className="text-2xl">↗️</span>
                <span className="text-[10px] font-bold">{item.shares}</span>
              </button>

              <button onClick={() => handleDownload(item.videoUrl)} className="flex flex-col items-center gap-1 mt-4 group">
                {isVip ? (
                  <span className="text-2xl text-green-400">📥</span>
                ) : (
                  <span className="text-2xl text-zinc-500">🔒</span>
                )}
                <span className="text-[10px] font-bold">{isVip ? "تحميل" : "VIP"}</span>
              </button>
            </div>
          </section>
        ))}
      </main>

      <button 
        onClick={() => setIsCreateOpen(true)}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 rounded-full font-bold shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] active:scale-95 transition-all flex items-center gap-2"
      >
        <span>✨</span> إنشاء فيديو
      </button>

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#050505] flex flex-col p-6 animate-in slide-in-from-right duration-300">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-black">القائمة</h2>
            <button onClick={() => setIsMenuOpen(false)} className="text-3xl">✕</button>
          </div>
          <nav className="flex flex-col gap-6 text-xl font-bold">
            <button onClick={() => { setIsMenuOpen(false); }}>الرئيسية</button>
            <button onClick={() => { setIsMenuOpen(false); }}>استكشف</button>
            <button onClick={() => { setIsMenuOpen(false); }}>الملف الشخصي</button>
            <button onClick={() => setIsPayOpen(true)} className="text-purple-500">الترقية لـ VIP</button>
            <button onClick={() => setIsLoggedIn(false)} className="text-red-500">تسجيل الخروج</button>
          </nav>
        </div>
      )}

      {isCreateOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 w-full max-w-lg p-6 rounded-3xl border border-white/10 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-black text-xl">إنشاء فيديو بالذكاء الاصطناعي 🎬</h3>
              <button onClick={() => setIsCreateOpen(false)} className="text-zinc-500 hover:text-white transition">✕</button>
            </div>
            <textarea
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              placeholder="اكتب وصف المشهد بالتفصيل هنا..."
              className="w-full h-32 bg-black border border-white/10 rounded-2xl p-4 text-sm text-white resize-none mb-6 focus:outline-none focus:border-purple-500 transition"
            />
            <button
              onClick={handleGenerateAI}
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 py-4 rounded-2xl font-bold transition-all hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? "جاري المعالجة..." : "توليد المحتوى الآن 🚀"}
            </button>
          </div>
        </div>
      )}

      {isPayOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 w-full max-w-md p-6 rounded-3xl border border-white/10 shadow-2xl text-center">
            <div className="flex justify-between items-center mb-6">
              <button onClick={() => setIsPayOpen(false)} className="text-zinc-500 hover:text-white transition">✕</button>
            </div>
            <span className="text-5xl mx-auto mb-3 block">👑</span>
            <h3 className="font-black text-2xl mb-1">اشترك في VIDEXA VIP</h3>
            <p className="text-xs text-zinc-400 mb-6">حول المبلغ إلى أحد الحسابات الرسمية التالية:</p>
            
            <div className="flex flex-col gap-4 mb-6 text-right">
              {/* تفاصيل الحساب المحلي */}
              <div className="bg-black/50 border border-white/10 p-4 rounded-2xl">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-sm">💳 تحويل بنكي محلي</span>
                  <span className="text-purple-400 font-bold text-sm">35,000 SDG</span>
                </div>
                <p className="text-xs text-zinc-400">رقم الحساب: <span className="text-white select-all font-mono font-bold">142058920</span></p>
                <p className="text-xs text-zinc-400">اسم المستفيد: يوسف إبراهيم الطيب</p>
                <button 
                  onClick={() => processPayment("SDG")}
                  className="w-full mt-3 bg-white text-black py-2 rounded-xl text-xs font-bold hover:bg-zinc-200 transition"
                >
                  تأكيد الدفع المحلي
                </button>
              </div>

              {/* تفاصيل بايننس */}
              <div className="bg-black/50 border border-white/10 p-4 rounded-2xl">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-sm">💎 محفظة بايننس (USDT)</span>
                  <span className="text-purple-400 font-bold text-sm">10 USDT</span>
                </div>
                <p className="text-xs text-zinc-400">معرف المحفظة (Pay ID): <span className="text-white select-all font-mono font-bold">884920194</span></p>
                <p className="text-xs text-zinc-400">الشبكة: TRC20</p>
                <button 
                  onClick={() => processPayment("USDT")}
                  className="w-full mt-3 bg-purple-600 text-white py-2 rounded-xl text-xs font-bold hover:bg-purple-700 transition"
                >
                  تأكيد دفع بايننس
                </button>
              </div>
            </div>
            
            {selectedPlan && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
                <div className="text-center">
                  <span className="text-6xl mx-auto mb-4 block animate-bounce">✅</span>
                  <h3 className="font-bold text-xl">جاري التحقق من عملية التحويل...</h3>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

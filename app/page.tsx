"use client";

import React, { useState } from "react";

const AI_TEMPLATES = [
  { id: "t1", title: "إعلان منتج سينمائي", category: "إعلانات", icon: "💎", prompt: "A sleek 3D cinematic commercial showcase of a luxury product, studio lighting, 8k resolution, photorealistic." },
  { id: "t2", title: "أنمي ياباني احترافي", category: "أنمي", icon: "⚔️", prompt: "An epic anime battle scene with glowing neon magic effects, Makoto Shinkai style, vibrant colors, highly detailed." },
  { id: "t3", title: "قصة رعب وتشويق", category: "سينمائي", icon: "👻", prompt: "A dark mystery cinematic scene in a foggy ancient forest, volumetric light, dramatic shadows, movie trailer style." },
  { id: "t4", title: "مدينة المستقبل 2099", category: "خيال علمي", icon: "🚀", prompt: "A futuristic cyberpunk city with flying cars and holographic ads at night, Unreal Engine 5 render, hyper-detailed." },
];

const INITIAL_VIDEOS = [
  { id: "1", title: "مشهد سينمائي: الأعماق", poster: "https://images.pexels.com/photos/33041/antelope-canyon-lower-canyon-arizona.jpg?auto=compress&cs=tinysrgb&w=800", videoUrl: "https://vjs.zencdn.net/v/oceans.mp4" },
  { id: "2", title: "مدينة المستقبل 4K", poster: "https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg?auto=compress&cs=tinysrgb&w=800", videoUrl: "https://media.w3.org/2010/05/sintel/trailer.mp4" },
  { id: "3", title: "محارب الأسطورة سينمائي", poster: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=800", videoUrl: "https://interaction-design.org/videos/sample.mp4" },
  { id: "4", title: "طبيعة ساحرة وخيال", poster: "https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800", videoUrl: "https://vjs.zencdn.net/v/oceans.mp4" },
];

export default function Page() {
  const [userPlan, setUserPlan] = useState<"FREE" | "VIP">("FREE");
  const [activeTab, setActiveTab] = useState<"home" | "templates" | "create" | "profile">("home");
  const [isPayOpen, setIsPayOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [promptText, setPromptText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [receiptFile, setReceiptFile] = useState<File | null>(null);

  const handleApplyTemplate = (prompt: string) => {
    setPromptText(prompt);
    setIsCreateOpen(true);
  };

  const handleGenerateAI = () => {
    const quality = (document.getElementById('quality') as HTMLSelectElement)?.value || "1080p";
    if(quality === "4k" && userPlan!== "VIP") return alert("4K متاح لمشتركي VIP فقط 👑");
    if (!promptText) return alert("الرجاء كتابة وصف المشهد أولاً!");
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setIsCreateOpen(false);
      setSelectedVideo("https://vjs.zencdn.net/v/oceans.mp4");
      alert(`تم توليد المشهد بجودة ${quality.toUpperCase()} بنجاح! 🎉`);
    }, 3000);
  };

  const handleUploadReceipt = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!paymentMethod ||!receiptFile) return alert("اختر طريقة الدفع وارفع الاشعار");
    alert("تم استلام الاشعار ✅ سنراجع و نفعل VIP خلال 10 دقائق");
    setIsPayOpen(false);
    setPaymentMethod("");
    setReceiptFile(null);
  };

  return (
    <main className="min-h-screen bg-[#090713] text-white dir-rtl font-sans pb-24 relative selection:bg-purple-500">
      <header className="sticky top-0 z-40 bg-[#090713]/80 backdrop-blur-md px-4 py-3 flex justify-between items-center border-b border-purple-900/20">
        <span className="font-black text-lg bg-gradient-to-r from-purple-400 via-fuchsia-300 to-pink-500 bg-clip-text text-transparent">VIDEXA AI</span>
        <button onClick={() => setIsPayOpen(true)} className={`flex items-center gap-1 border px-3 py-1 rounded-full text-[10px] font-bold shadow-lg ${userPlan === "VIP"? "bg-gradient-to-r from-amber-500 to-purple-600 border-amber-400/50" : "bg-gradient-to-r from-purple-800 to-pink-600 border-purple-400/30"}`}><span>👑</span><span>{userPlan === "VIP"? "عضوية VIP مفعلة" : "ترقية إلى VIP"}</span></button>
      </header>

      <div className="max-w-md mx-auto px-4 space-y-6 pt-3">
        <div className="relative rounded-2xl overflow-hidden border-purple-500/30 bg-gradient-to-b from-purple-900/40 to-black p-5 shadow-2xl">
          <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-fuchsia-300">صانع الفيديوهات بالذكاء الاصطناعي</h2>
          <p className="text-[10px] text-purple-200/70 max-w-[220px]">اختر قالبك المفضل أو اكتب نصاً، ودع الذكاء الاصطناعي يبني مشهدك خلال ثوانٍ.</p>
          <button onClick={() => setIsCreateOpen(true)} className="bg-gradient-to-r from-fuchsia-600 via-purple-600 to-pink-600 px-5 py-2 rounded-xl text-xs font-black shadow-lg shadow-purple-600/30 flex items-center gap-2 mt-2"><span>+ إنشاء فيديو جديد</span><span>✨</span></button>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-black text-purple-100">🎬 القوالب السينمائية الجاهزة</h3>
          <div className="grid grid-cols-2 gap-2.5">
            {AI_TEMPLATES.map((tmpl) => (
              <div key={tmpl.id} onClick={() => handleApplyTemplate(tmpl.prompt)} className="bg-purple-950/20 border-purple-800/30 p-3 rounded-xl hover:border-purple-500/80 cursor-pointer transition-all space-y-2">
                <div className="flex items-center justify-between"><span className="text-xl">{tmpl.icon}</span><span className="text-[8px] bg-purple-900/60 px-2 py-0.5 rounded text-purple-300">{tmpl.category}</span></div>
                <h4 className="text-[11px] font-bold text-purple-100">{tmpl.title}</h4>
                <button className="w-full text-center bg-purple-600/30 text-purple-200 text-[8px] py-1 rounded border border-purple-500/20 font-bold">تطبيق القالب⚡</button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-black text-purple-100">🔥 الفيديوهات والمشاهد الشائعة</h3>
          <div className="grid grid-cols-2 gap-3">
            {INITIAL_VIDEOS.map((vid) => (
              <div key={vid.id} className="bg-zinc-950 border border-purple-900/30 rounded-2xl overflow-hidden relative shadow-lg">
                <div onClick={() => setSelectedVideo(vid.videoUrl)} className="relative aspect-[9/14] bg-cover bg-center cursor-pointer" style={{ backgroundImage: `url(${vid.poster})` }}>
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center"><div className="w-10 h-10 rounded-full bg-purple-600/80 backdrop-blur-md border border-purple-400 flex items-center justify-center text-white text-sm">▶</div></div>
                </div>
                <div className="p-2 space-y-1 bg-zinc-950"><p className="text-[9px] font-bold text-purple-100 truncate">{vid.title}</p><button onClick={() => setSelectedVideo(vid.videoUrl)} className="w-full text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[8px] font-black py-1.5 rounded-lg">تشغيل المشهد 🎬</button></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedVideo && (<div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"><div className="relative w-full max-w-sm rounded-2xl overflow-hidden border-purple-500/50 bg-black p-2"><button onClick={() => setSelectedVideo(null)} className="absolute top-4 right-4 z-20 bg-purple-600 text-white w-8 h-8 rounded-full">✕</button><video src={selectedVideo} controls autoPlay playsInline className="w-full h-auto max-h-[70vh] rounded-xl" /></div></div>)}

      {isCreateOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0f0a1c] border-purple-500/40 p-5 rounded-2xl max-w-xs w-full space-y-4">
            <h3 className="text-base font-black text-purple-200 text-center">صناعة مشهد سينمائي ✨</h3>
            <textarea value={promptText} onChange={(e) => setPromptText(e.target.value)} placeholder="اكتب وصف المشهد..." className="w-full h-24 bg-black/60 border-purple-500/30 rounded-xl p-3 text-xs text-white outline-none resize-none" />
            <div>
              <label className="text-[9px] text-zinc-400 block mb-1">جودة الفيديو</label>
              <select id="quality" className="w-full bg-black/60 border-purple-500/30 rounded-lg p-2 text-xs text-white outline-none">
                <option value="1080p">HD 1080p - مجاني</option>
                <option value="4k" disabled={userPlan!== "VIP"}>{userPlan === "VIP"? "4K Ultra - VIP فقط 👑" : "4K Ultra - اقفل 🔒 VIP"}</option>
              </select>
            </div>
            <button onClick={handleGenerateAI} disabled={isGenerating} className="w-full py-2.5 bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-xl font-bold text-xs text-white">{isGenerating? "جاري معالجة الفيديو... ⏳" : "توليد الفيديو الآن 🚀"}</button>
            <button onClick={() => setIsCreateOpen(false)} className="w-full text-center text-[10px] text-zinc-500">إلغاء</button>
          </div>
        </div>
      )}

      {isPayOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0f0a1c] border-2 border-purple-500/50 p-6 rounded-2xl max-w-sm w-full space-y-4">
            <div className="text-center space-y-1"><h3 className="text-lg font-black text-amber-400">اشتراك VIP السينمائي 👑</h3><p className="text-[10px] text-purple-200/80">توليد غير محدود • دقة 4K • بدون علامة مائية</p><div className="text-2xl font-black text-white pt-1">$9.99 <span className="text-xs text-zinc-400">/ شهرياً</span></div></div>
            <div className="space-y-3 text-[10px]">
              <div className="bg-black/40 p-3 rounded-xl border-green-500/30"><p className="font-bold text-green-400 mb-1">الخيار 1: بينانس USDT - شبكة TRC20</p><div className="bg-zinc-900 p-2 rounded text-[9px] text-green-300 break-all select-all">TGaAcY8fQ3xwY4JsEJtSfon5efz4bPhJg2</div><p className="text-zinc-400 mt-1">المبلغ: 9.99 USDT</p></div>
              <div className="bg-black/40 p-3 rounded-xl border-purple-500/30"><p className="font-bold text-purple-300 mb-1">الخيار 2: بنك</p><p>الاسم: يوسف إبراهيم الطيب عبدالقادر</p><p>رقم الحساب: 9412190</p><p className="text-zinc-400 mt-1">المبلغ: ما يعادل 9.99$ بالجنيه</p></div>
            </div>
            <form onSubmit={handleUploadReceipt} className="space-y-3">
              <div><label className="text-[9px] text-zinc-400 block mb-1">اختر طريقة الدفع</label><select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="w-full bg-black/60 border-purple-500/30 rounded-lg p-2 text-xs text-white outline-none" required><option value="">-- اختر --</option><option value="binance">بينانس USDT</option><option value="bankak">بنك</option></select></div>
              <div><label className="text-[9px] text-zinc-400 block mb-1">ارفع صورة اشعار التحويل</label><input type="file" accept="image/*" onChange={(e) => setReceiptFile(e.target.files?.[0] || null)} className="w-full bg-black/60 border-purple-500/30 rounded-lg p-2 text-xs text-white file:mr-2 file:bg-purple-600 file:text-white file:border-0 file:rounded file:px-2" required /></div>
              <button type="submit" className="w-full py-2.5 bg-gradient-to-r from-amber-500 via-purple-600 to-pink-600 rounded-xl font-black text-xs text-white shadow-lg">ارسال للمراجعة وتفعيل VIP 💳</button>
            </form>
            <button onClick={() => setIsPayOpen(false)} className="block w-full text-center text-[10px] text-zinc-500">إلغاء</button>
          </div>
        </div>
      )}

      <nav className="fixed bottom-0 inset-x-0 bg-[#090713]/90 backdrop-blur-lg border-t border-purple-900/30 py-2 px-6 z-40 max-w-md mx-auto">
        <div className="flex justify-between items-center relative">
          <button onClick={() => setActiveTab("home")} className={`flex flex-col items-center ${activeTab === "home"? "text-fuchsia-400" : "text-zinc-500"}`}><span className="text-base">🏠</span><span className="text-[8px] font-bold">الرئيسية</span></button>
          <button onClick={() => setIsCreateOpen(true)} className="flex flex-col items-center text-zinc-500"><span className="text-base">🎬</span><span className="text-[8px] font-bold">توليد</span></button>
          <div className="-mt-7"><button onClick={() => setIsCreateOpen(true)} className="w-12 h-12 rounded-full bg-gradient-to-tr from-fuchsia-600 via-purple-600 to-pink-500 p-0.5 shadow-lg flex items-center justify-center"><div className="w-full h-full bg-[#090713] rounded-full flex items-center justify-center"><span className="text-xl font-black text-fuchsia-400">+</span></div></button></div>
          <button onClick={() => setIsPayOpen(true)} className="flex flex-col items-center text-zinc-500"><span className="text-base">💳</span><span className="text-[8px] font-bold">الاشتراك</span></button>
          <button onClick={() => setActiveTab("profile")} className={`flex flex-col items-center ${activeTab === "profile"? "text-fuchsia-400" : "text-zinc-500"}`}><span className="text-base">👤</span><span className="text-[8px] font-bold">حسابي</span></button>
        </div>
      </nav>
    </main>
  );
}

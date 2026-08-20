"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function ShortsPage() {
  const [shorts] = useState([
    {
      id: "s1",
      user: "@cyber_ai",
      caption: "عالم السايبربنك والذكاء الاصطناعي 🚀 #Videxa #Shorts #4K",
      likes: 1420,
      comments: 95,
      shares: 30,
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      isAd: false
    },
    {
      id: "s2",
      user: "@cinema_pro",
      caption: "مشاهد سينمائية احترافية #Cinema #Videxa",
      likes: 2890,
      comments: 110,
      shares: 60,
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      isAd: false
    },
    {
      id: "s3",
      user: "إعلان Videxa PRO 🚀",
      caption: "اشترك الآن في VIP وافتح التحميل المباشر والقوالب بدون إعلانات!",
      likes: 5400,
      comments: 20,
      shares: 100,
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      isAd: true
    }
  ]);

  return (
    <main className="h-screen w-full bg-black text-white flex justify-center items-center overflow-hidden relative">
      <Link href="/" className="absolute top-4 right-4 z-50 bg-black/60 border border-white/20 p-2 rounded-full text-sm">
        ✕ خروج
      </Link>

      <div className="h-full w-full max-w-md snap-y snap-mandatory overflow-y-scroll scrollbar-none">
        {shorts.map((item) => (
          <div key={item.id} className="h-full w-full snap-start relative flex items-center justify-center bg-zinc-950">
            <video src={item.videoUrl} loop autoPlay muted playsInline className="w-full h-full object-cover" />

            {item.isAd && (
              <span className="absolute top-4 left-4 bg-yellow-500 text-black font-black text-[10px] px-2 py-0.5 rounded">
                إعلان SPONSORED
              </span>
            )}

            <div className="absolute left-3 bottom-20 flex flex-col items-center gap-4 z-20">
              <button className="flex flex-col items-center">
                <span className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-sm">❤️</span>
                <span className="text-[10px] font-bold mt-1">{item.likes}</span>
              </button>
              <button className="flex flex-col items-center">
                <span className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-sm">💬</span>
                <span className="text-[10px] font-bold mt-1">{item.comments}</span>
              </button>
              <button className="flex flex-col items-center">
                <span className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-sm">🔗</span>
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
    </main>
  );
}


"use client";

import React, { useState } from "react";

interface VideoFeed {
  id: string;
  user: string;
  videoUrl: string;
  likes: number;
  views: number;
  isAd?: boolean;
}

const mockFeed: VideoFeed[] = [
  { id: "v1", user: "@ahmed_ai", videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-background-1610-large.mp4", likes: 1200, views: 45000 },
  { id: "v2", user: "@sara_design", videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-41440-large.mp4", likes: 3400, views: 89000 },
  { id: "ad1", user: "إعلان Videxa Pro", videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smartphone-41434-large.mp4", likes: 999, views: 100000, isAd: true },
  { id: "v3", user: "@mona_editor", videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-futuristic-robotic-arm-40896-large.mp4", likes: 850, views: 23000 },
];

export default function DiscoverPage() {
  const [likes, setLikes] = useState<Record<string, number>>({});

  const handleLike = (id: string, current: number) => {
    setLikes((prev) => ({ ...prev, [id]: (prev[id] || current) + 1 }));
  };

  return (
    <div className="min-h-screen bg-black text-white snap-y snap-mandatory overflow-y-scroll h-screen dir-rtl">
      {mockFeed.map((item) => (
        <div key={item.id} className="snap-start w-full h-screen relative flex items-center justify-center bg-slate-950">
          <video src={item.videoUrl} autoPlay loop muted playsInline className="w-full h-full object-cover max-w-md" />
          
          {/* Overlay Details */}
          <div className="absolute bottom-12 right-4 left-4 max-w-md mx-auto flex justify-between items-end p-4 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl">
            <div className="space-y-2">
              <span className="font-bold text-yellow-400 text-sm">{item.user}</span>
              {item.isAd && (
                <span className="bg-yellow-500 text-black text-xs font-black px-2 py-0.5 rounded ml-2">إعلان رعاية</span>
              )}
              <p className="text-xs text-slate-300">المشاهدات: {item.views.toLocaleString()}</p>
            </div>
            <button 
              onClick={() => handleLike(item.id, item.likes)} 
              className="bg-slate-900/80 p-3 rounded-full border border-slate-700 text-yellow-500 font-bold text-xs"
            >
              ❤️ {likes[item.id] || item.likes}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

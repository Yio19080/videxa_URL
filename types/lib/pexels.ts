import { VideoItem } from "@/types";

const PEXELS_API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY || "";

export async function fetchPexelsVideos(query: string = "cinematic 4k"): Promise<VideoItem[]> {
  try {
    const res = await fetch(`https://api.pexels.com/videos/search?query=${query}&per_page=12&orientation=portrait`, {
      headers: { Authorization: PEXELS_API_KEY },
      next: { revalidate: 86400 }
    });
    
    const data = await res.json();
    if (!data.videos) return [];

    return data.videos.map((vid: any) => ({
      id: `pexels-${vid.id}`,
      title: (vid.user?.name || "Videxa") + " Visual",
      category: "ترند",
      duration: `${vid.duration}s`,
      badge: "4K PEXELS",
      poster: vid.image,
      videoUrl: vid.video_files.find((f: any) => f.quality === "hd")?.link || vid.video_files[0]?.link
    }));
  } catch (error) {
    return [];
  }
}

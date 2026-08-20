"use client";

import React, {
  useEffect,
  useRef,
  useState,
} from "react";

type Video = {
  id: string;
  title: string;
  user: string;
  category: string;
  videoUrl: string;
  likes: number;
  comments: number;
  shares: number;
};

const VIDEO_SOURCES: Video[] = [
  {
    id: "v1",
    title: "تجربة فيديو سينمائية",
    user: "@videxa_creator",
    category: "تقنية",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    likes: 12400,
    comments: 324,
    shares: 810,
  },
  {
    id: "v2",
    title: "اكتشف العالم بطريقة مختلفة",
    user: "@travel_creator",
    category: "سفر",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    likes: 18200,
    comments: 540,
    shares: 1200,
  },
  {
    id: "v3",
    title: "لحظات ممتعة بتقنية سينمائية",
    user: "@fun_creator",
    category: "منوعات",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    likes: 9700,
    comments: 210,
    shares: 450,
  },
  {
    id: "v4",
    title: "رحلة جديدة تبدأ الآن",
    user: "@life_creator",
    category: "حياة",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    likes: 22100,
    comments: 690,
    shares: 1600,
  },
  {
    id: "v5",
    title: "تجربة مختلفة تمامًا",
    user: "@creator_pro",
    category: "تجارب",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    likes: 14300,
    comments: 430,
    shares: 930,
  },
  {
    id: "v6",
    title: "See the world",
    user: "@videxa_world",
    category: "Travel",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackSeeTheWorld.mp4",
    likes: 31500,
    comments: 920,
    shares: 2400,
  },
];

const USDT_ADDRESS =
  "TGaAcY8fQ3xwY4JsEJtSfon5efz4bPhJg2";

const BANKAK_NAME =
  "يوسف إبراهيم الطيب عبدالقادر";

const BANKAK_ACCOUNT =
  "9412190";

const USDT_PRICE = 10;
const BANKAK_PRICE = 35000;

export default function Page() {
  const [videos, setVideos] =
    useState<Video[]>(VIDEO_SOURCES);

  const [activeVideo, setActiveVideo] =
    useState(0);

  const [likedVideos, setLikedVideos] =
    useState<string[]>([]);

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [createOpen, setCreateOpen] =
    useState(false);

  const [paymentOpen, setPaymentOpen] =
    useState(false);

  const [paymentMethod, setPaymentMethod] =
    useState<"USDT" | "BANKAK">("USDT");

  const [vip, setVip] =
    useState(false);

  const [prompt, setPrompt] =
    useState("");

  const [generating, setGenerating] =
    useState(false);

  const [copied, setCopied] =
    useState("");

  const [bankakReference, setBankakReference] =
    useState("");

  const videoRefs =
    useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const observer =
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const video =
              entry.target as HTMLVideoElement;

            if (entry.isIntersecting) {
              video.play().catch(() => {});
            } else {
              video.pause();
            }
          });
        },
        {
          threshold: 0.7,
        }
      );

    videoRefs.current.forEach((video) => {
      if (video) {
        observer.observe(video);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const likeVideo = (id: string) => {
    setLikedVideos((current) => {
      if (current.includes(id)) {
        return current.filter(
          (item) => item !== id
        );
      }

      return [...current, id];
    });

    setVideos((current) =>
      current.map((video) => {
        if (video.id !== id) {
          return video;
        }

        const alreadyLiked =
          likedVideos.includes(id);

        return {
          ...video,
          likes: alreadyLiked
            ? Math.max(0, video.likes - 1)
            : video.likes + 1,
        };
      })
    );
  };

  const copyValue = async (
    value: string,
    name: string
  ) => {
    try {
      await navigator.clipboard.writeText(
        value
      );

      setCopied(name);

      setTimeout(() => {
        setCopied("");
      }, 2000);
    } catch {
      alert(
        "تعذر النسخ. انسخ الرقم يدويًا."
      );
    }
  };

  const shareVideo = async (
    video: Video
  ) => {
    const url = video.videoUrl;

    if (
      typeof navigator !== "undefined" &&
      navigator.share
    ) {
      try {
        await navigator.share({
          title: video.title,
          text: video.title,
          url,
        });
      } catch {}
    } else {
      copyValue(url, "share");
    }
  };

  const downloadVideo = (
    video: Video
  ) => {
    if (!vip) {
      setPaymentOpen(true);
      return;
    }

    window.open(
      video.videoUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const generateVideo = async () => {
    if (!prompt.trim()) {
      alert(
        "اكتب وصف الفيديو أولًا."
      );
      return;
    }

    setGenerating(true);

    await new Promise((resolve) =>
      setTimeout(resolve, 1800)
    );

    setGenerating(false);
    setCreateOpen(false);
    setPrompt("");

    alert(
      "تم استلام طلب إنشاء الفيديو. لربط التوليد الحقيقي، اربط هذا الزر لاحقًا بمحرك الفيديو AI الخاص بك."
    );
  };

  const submitBankak = () => {
    if (!bankakReference.trim()) {
      alert(
        "أدخل رقم العملية بعد التحويل."
      );
      return;
    }

    alert(
      "تم تسجيل طلب الدفع للمراجعة. لا يتم تفعيل VIP تلقائيًا بدون التحقق من التحويل."
    );

    setBankakReference("");
  };

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#050505] text-white"
    >
      {/* HEADER */}

      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/70 px-4 py-3 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <button
            onClick={() =>
              setMenuOpen(true)
            }
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xl"
          >
            ☰
          </button>

          <div className="text-center">
            <h1 className="text-2xl font-black tracking-tight">
              VIDEXA{" "}
              <span className="text-purple-500">
                AI
              </span>
            </h1>

            <p className="text-[9px] tracking-[4px] text-zinc-500">
              CREATE • WATCH • SHARE
            </p>
          </div>

          <button
            onClick={() =>
              setPaymentOpen(true)
            }
            className={`rounded-full px-4 py-2 text-xs font-black ${
              vip
                ? "bg-amber-400 text-black"
                : "bg-gradient-to-r from-purple-600 to-pink-600"
            }`}
          >
            {vip
              ? "👑 VIP"
              : "✨ ترقية"}
          </button>
        </div>
      </header>

      {/* CATEGORY BAR */}

      <div className="fixed top-[74px] left-0 right-0 z-40 overflow-x-auto bg-black/50 px-4 py-3 backdrop-blur-lg">
        <div className="flex min-w-max justify-center gap-2">
          {[
            "الرئيسية",
            "تقنية",
            "سفر",
            "رياضة",
            "ترفيه",
            "ذكاء اصطناعي",
          ].map((category, index) => (
            <button
              key={category}
              className={`rounded-full px-4 py-2 text-xs font-bold ${
                index === 0
                  ? "bg-white text-black"
                  : "bg-white/10 text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* VIDEO FEED */}

      <section className="h-screen snap-y snap-mandatory overflow-y-scroll">
        {videos.map(
          (video, index) => (
            <article
              key={video.id}
              className="relative h-screen w-full snap-start snap-always overflow-hidden bg-black"
            >
              <video
                ref={(element) => {
                  videoRefs.current[index] =
                    element;
                }}
                src={video.videoUrl}
                muted
                loop
                playsInline
                autoPlay={index === 0}
                preload={
                  index < 2
                    ? "auto"
                    : "metadata"
                }
                onPlay={() =>
                  setActiveVideo(index)
                }
                className="h-full w-full object-cover"
              />

              {/* GRADIENT */}

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />

              {/* USER INFO */}

              <div className="absolute bottom-28 right-20 left-6">
                <div className="mb-3 inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[10px] font-bold backdrop-blur">
                  #{video.category}
                </div>

                <h2 className="text-xl font-black">
                  {video.user}
                  <span className="mr-2 text-blue-400">
                    ✓
                  </span>
                </h2>

                <p className="mt-2 max-w-md text-sm text-zinc-200">
                  {video.title}
                </p>

                <p className="mt-2 text-[10px] text-zinc-400">
                  VIDEXA AI • HD VIDEO
                </p>
              </div>

              {/* ACTIONS */}

              <div className="absolute bottom-28 right-4 flex flex-col items-center gap-5">
                <button
                  onClick={() =>
                    likeVideo(video.id)
                  }
                  className="flex flex-col items-center"
                >
                  <span
                    className={`text-3xl transition ${
                      likedVideos.includes(
                        video.id
                      )
                        ? "scale-110"
                        : ""
                    }`}
                  >
                    {likedVideos.includes(
                      video.id
                    )
                      ? "❤️"
                      : "🤍"}
                  </span>

                  <span className="mt-1 text-[10px] font-bold">
                    {video.likes.toLocaleString()}
                  </span>
                </button>

                <button className="flex flex-col items-center">
                  <span className="text-3xl">
                    💬
                  </span>

                  <span className="mt-1 text-[10px] font-bold">
                    {video.comments.toLocaleString()}
                  </span>
                </button>

                <button
                  onClick={() =>
                    shareVideo(video)
                  }
                  className="flex flex-col items-center"
                >
                  <span className="text-3xl">
                    ↗️
                  </span>

                  <span className="mt-1 text-[10px] font-bold">
                    {video.shares.toLocaleString()}
                  </span>
                </button>

                <button
                  onClick={() =>
                    downloadVideo(video)
                  }
                  className="mt-2 flex flex-col items-center"
                >
                  <span
                    className={`text-3xl ${
                      vip
                        ? "text-green-400"
                        : "opacity-50"
                    }`}
                  >
                    {vip
                      ? "📥"
                      : "🔒"}
                  </span>

                  <span className="mt-1 text-[10px] font-bold">
                    {vip
                      ? "تحميل"
                      : "VIP"}
                  </span>
                </button>
              </div>

              {/* ACTIVE INDICATOR */}

              {activeVideo === index && (
                <div className="absolute left-4 top-28 rounded-full bg-black/50 px-3 py-1 text-[9px] backdrop-blur">
                  ▶ الآن
                </div>
              )}
            </article>
          )
        )}
      </section>

      {/* CREATE BUTTON */}

      <button
        onClick={() =>
          setCreateOpen(true)
        }
        className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 px-7 py-4 font-black shadow-[0_0_35px_rgba(168,85,247,.45)] transition hover:scale-105 active:scale-95"
      >
        ✨ إنشاء فيديو
      </button>

      {/* SIDE MENU */}

      {menuOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 p-6 backdrop-blur-xl">
          <div className="mx-auto max-w-lg">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black">
                VIDEXA AI
              </h2>

              <button
                onClick={() =>
                  setMenuOpen(false)
                }
                className="text-3xl text-zinc-400"
              >
                ×
              </button>
            </div>

            <div className="mt-12 flex flex-col gap-6 text-xl font-bold">
              <button
                onClick={() =>
                  setMenuOpen(false)
                }
                className="text-right"
              >
                🏠 الرئيسية
              </button>

              <button
                onClick={() =>
                  setMenuOpen(false)
                }
                className="text-right"
              >
                🔎 استكشف
              </button>

              <button
                onClick={() => {
                  setMenuOpen(false);
                  setCreateOpen(true);
                }}
                className="text-right"
              >
                🎬 إنشاء فيديو
              </button>

              <button
                onClick={() => {
                  setMenuOpen(false);
                  setPaymentOpen(true);
                }}
                className="text-right text-purple-400"
              >
                👑 الاشتراك VIP
              </button>

              <a
                href="https://www.pexels.com/"
                target="_blank"
                rel="noreferrer"
                className="text-right"
              >
                🎞️ مصدر الفيديوهات
              </a>
            </div>
          </div>
        </div>
      )}

      {/* CREATE MODAL */}

      {createOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-zinc-900 p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black">
                🎬 إنشاء فيديو AI
              </h2>

              <button
                onClick={() =>
                  setCreateOpen(false)
                }
                className="text-2xl text-zinc-500"
              >
                ×
              </button>
            </div>

            <p className="mt-2 text-xs text-zinc-500">
              اكتب وصف الفيديو الذي تريد
              إنشاءه.
            </p>

            <textarea
              value={prompt}
              onChange={(event) =>
                setPrompt(
                  event.target.value
                )
              }
              placeholder="مثال: مدينة مستقبلية ضخمة فوق السحاب، طائرات تحلق بين الأبراج، إضاءة سينمائية..."
              className="mt-5 h-40 w-full resize-none rounded-2xl border border-white/10 bg-black p-4 text-sm outline-none transition focus:border-purple-500"
            />

            <button
              onClick={generateVideo}
              disabled={generating}
              className="mt-4 w-full rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 py-4 font-black disabled:cursor-not-allowed disabled:opacity-50"
            >
              {generating
                ? "⏳ جاري المعالجة..."
                : "🚀 توليد الفيديو"}
            </button>
          </div>
        </div>
      )}

      {/* PAYMENT MODAL */}

      {paymentOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center overflow-y-auto bg-black/95 p-4 backdrop-blur-md">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-zinc-900 p-6 shadow-2xl">

            <div className="flex items-center justify-between">
              <div>
                <div className="text-4xl">
                  👑
                </div>

                <h2 className="mt-2 text-2xl font-black">
                  VIDEXA VIP
                </h2>

                <p className="text-xs text-zinc-500">
                  افتح ميزات VIP
                </p>
              </div>

              <button
                onClick={() =>
                  setPaymentOpen(false)
                }
                className="text-2xl text-zinc-500"
              >
                ×
              </button>
            </div>

            {/* PLANS */}

            <div className="mt-6 grid grid-cols-2 gap-2">
              <button
                onClick={() =>
                  setPaymentMethod("USDT")
                }
                className={`rounded-xl py-3 text-xs font-black ${
                  paymentMethod === "USDT"
                    ? "bg-purple-600"
                    : "bg-white/5"
                }`}
              >
                💎 USDT TRC20
              </button>

              <button
                onClick={() =>
                  setPaymentMethod("BANKAK")
                }
                className={`rounded-xl py-3 text-xs font-black ${
                  paymentMethod === "BANKAK"
                    ? "bg-purple-600"
                    : "bg-white/5"
                }`}
              >
                🇸🇩 بنكك
              </button>
            </div>

            {paymentMethod ===
              "USDT" && (
              <div className="mt-5 rounded-2xl border border-white/10 bg-black/50 p-5">

                <div className="text-center">
                  <div className="text-2xl font-black text-purple-400">
                    {USDT_PRICE} USDT
                  </div>

                  <div className="mt-1 text-xs text-zinc-500">
                    شبكة TRC20
                  </div>
                </div>

                <div className="mt-5">
                  <label className="text-[10px] text-zinc-500">
                    عنوان المحفظة
                  </label>

                  <div className="mt-2 flex gap-2">
                    <input
                      readOnly
                      value={
                        USDT_ADDRESS
                      }
                      className="min-w-0 flex-1 rounded-xl border border-white/10 bg-zinc-950 p-3 font-mono text-[10px]"
                    />

                    <button
                      onClick={() =>
                        copyValue(
                          USDT_ADDRESS,
                          "usdt"
                        )
                      }
                      className="rounded-xl bg-white px-3 text-[10px] font-black text-black"
                    >
                      {copied ===
                      "usdt"
                        ? "✓"
                        : "نسخ"}
                    </button>
                  </div>
                </div>

                <div className="mt-5 rounded-xl bg-purple-500/10 p-4 text-center">
                  <p className="text-xs leading-6 text-zinc-300">
                    أرسل
                    <strong className="mx-1 text-white">
                      {USDT_PRICE} USDT
                    </strong>
                    إلى العنوان أعلاه باستخدام شبكة
                    <strong className="mx-1 text-purple-400">
                      TRC20
                    </strong>
                    .
                  </p>
                </div>

                <p className="mt-4 text-center text-[10px] leading-5 text-zinc-500">
                  بعد التحويل، احتفظ بـ Transaction
                  Hash لاستخدامه عند إضافة التحقق
                  الخلفي.
                </p>
              </div>
            )}

            {paymentMethod ===
              "BANKAK" && (
              <div className="mt-5 rounded-2xl border border-white/10 bg-black/50 p-5">

                <div className="flex items-center justify-between">
                  <span className="font-bold">
                    بنكك
                  </span>

                  <span className="font-black text-purple-400">
                    {BANKAK_PRICE.toLocaleString()}{" "}
                    SDG
                  </span>
                </div>

                <div className="mt-4 rounded-xl bg-zinc-950 p-4">

                  <p className="text-[10px] text-zinc-500">
                    اسم المستفيد
                  </p>

                  <p className="mt-1 text-sm font-black">
                    {BANKAK_NAME}
                  </p>

                  <p className="mt-4 text-[10px] text-zinc-500">
                    رقم الحساب
                  </p>

                  <div className="mt-1 flex items-center gap-2">
                    <p className="font-mono font-black">
                      {BANKAK_ACCOUNT}
                    </p>

                    <button
                      onClick={() =>
                        copyValue(
                          BANKAK_ACCOUNT,
                          "bankak"
                        )
                      }
                      className="rounded-lg bg-white px-2 py-1 text-[9px] font-black text-black"
                    >
                      {copied ===
                      "bankak"
                        ? "✓"
                        : "نسخ"}
                    </button>
                  </div>
                </div>

                <input
                  value={
                    bankakReference
                  }
                  onChange={(event) =>
                    setBankakReference(
                      event.target.value
                    )
                  }
                  placeholder="رقم العملية بعد التحويل"
                  className="mt-4 w-full rounded-xl border border-white/10 bg-zinc-950 p-3 text-xs outline-none focus:border-purple-500"
                />

                <button
                  onClick={submitBankak}
                  className="mt-3 w-full rounded-xl bg-purple-600 py-3 text-xs font-black"
                >
                  إرسال إثبات الدفع
                </button>

              </div>
            )}

            {/* VIP FEATURES */}

            <div className="mt-5 grid grid-cols-2 gap-2">
              {[
                "📥 تحميل الفيديو",
                "🎬 إنشاء محتوى",
                "⚡ أولوية المعالجة",
                "✨ جودة أعلى",
              ].map((feature) => (
                <div
                  key={feature}
                  className="rounded-xl border border-white/5 bg-white/5 p-3 text-center text-[10px]"
                >
                  {feature}
                </div>
              ))}
            </div>

            <p className="mt-5 text-center text-[9px] leading-5 text-zinc-600">
              VIDEXA AI • جميع المدفوعات يجب
              التحقق منها قبل تفعيل الاشتراك.
            </p>

          </div>
        </div>
      )}
    </main>
  );
              }

"use client";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type VideoItem = {
  id: number;
  title: string;
  creator: string;
  creatorUrl: string;
  sourceUrl: string;
  videoUrl: string;
  poster: string;
  width: number;
  height: number;
  duration: number;
  category: string;
  likes: number;
  comments: number;
  shares: number;
};

const CATEGORIES = [
  {
    name: "الرئيسية",
    icon: "🏠",
  },
  {
    name: "تقنية",
    icon: "💻",
  },
  {
    name: "سفر",
    icon: "✈️",
  },
  {
    name: "رياضة",
    icon: "⚽",
  },
  {
    name: "ترفيه",
    icon: "🎬",
  },
  {
    name: "ذكاء اصطناعي",
    icon: "🤖",
  },
];

const USDT_ADDRESS =
  "TGaAcY8fQ3xwY4JsEJtSfon5efz4bPhJg2";

const BANKAK_NAME =
  "يوسف إبراهيم الطيب عبدالقادر";

const BANKAK_ACCOUNT =
  "9412190";

const BANKAK_PRICE = 35000;
const USDT_PRICE = 10;

export default function Page() {
  const [videos, setVideos] =
    useState<VideoItem[]>([]);

  const [category, setCategory] =
    useState("الرئيسية");

  const [page, setPage] =
    useState(1);

  const [hasMore, setHasMore] =
    useState(true);

  const [loading, setLoading] =
    useState(true);

  const [loadingMore, setLoadingMore] =
    useState(false);

  const [error, setError] =
    useState("");

  const [liked, setLiked] =
    useState<number[]>([]);

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [createOpen, setCreateOpen] =
    useState(false);

  const [paymentOpen, setPaymentOpen] =
    useState(false);

  const [paymentMethod, setPaymentMethod] =
    useState<"USDT" | "BANKAK">(
      "USDT"
    );

  const [vip, setVip] =
    useState(false);

  const [prompt, setPrompt] =
    useState("");

  const [generating, setGenerating] =
    useState(false);

  const [bankakReference, setBankakReference] =
    useState("");

  const [copied, setCopied] =
    useState("");

  const loadingRef =
    useRef(false);

  const seenIds =
    useRef<Set<number>>(
      new Set()
    );

  const videoRefs =
    useRef<
      Record<
        number,
        HTMLVideoElement | null
      >
    >({});

  const loadVideos = useCallback(
    async (
      targetPage: number,
      replace = false
    ) => {
      if (
        loadingRef.current
      ) {
        return;
      }

      if (
        !replace &&
        !hasMore
      ) {
        return;
      }

      loadingRef.current = true;

      if (replace) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      try {
        const response =
          await fetch(
            `/api/videos?category=${encodeURIComponent(
              category
            )}&page=${targetPage}`,
            {
              cache: "no-store",
            }
          );

        if (!response.ok) {
          throw new Error(
            `HTTP ${response.status}`
          );
        }

        const data =
          await response.json();

        const incoming =
          (data.videos || [])
            .filter(
              (video: VideoItem) => {
                if (
                  seenIds.current.has(
                    video.id
                  )
                ) {
                  return false;
                }

                seenIds.current.add(
                  video.id
                );

                return true;
              }
            )
            .map(
              (
                video: VideoItem
              ) => ({
                ...video,
                likes:
                  Math.floor(
                    Math.random() *
                      30000
                  ) + 500,

                comments:
                  Math.floor(
                    Math.random() *
                      1500
                  ) + 30,

                shares:
                  Math.floor(
                    Math.random() *
                      3000
                  ) + 20,
              })
            );

        setVideos((current) =>
          replace
            ? incoming
            : [
                ...current,
                ...incoming,
              ]
        );

        setPage(targetPage);

        setHasMore(
          Boolean(data.hasMore)
        );

        setError("");
      } catch (err) {
        console.error(err);

        setError(
          "تعذر تحميل الفيديوهات. حاول مرة أخرى."
        );
      } finally {
        loadingRef.current = false;
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [category, hasMore]
  );

  useEffect(() => {
    seenIds.current.clear();

    setVideos([]);
    setPage(1);
    setHasMore(true);
    setError("");

    loadVideos(1, true);
  }, [category]);

  useEffect(() => {
    const observer =
      new IntersectionObserver(
        (entries) => {
          entries.forEach(
            (entry) => {
              const video =
                entry.target as HTMLVideoElement;

              if (
                entry.isIntersecting
              ) {
                video
                  .play()
                  .catch(() => {});
              } else {
                video.pause();
              }
            }
          );
        },
        {
          threshold: 0.65,
        }
      );

    Object.values(
      videoRefs.current
    ).forEach((video) => {
      if (video) {
        observer.observe(video);
      }
    });

    return () =>
      observer.disconnect();
  }, [videos]);

  const handleScroll = (
    event: React.UIEvent<HTMLDivElement>
  ) => {
    const element =
      event.currentTarget;

    const distance =
      element.scrollHeight -
      element.scrollTop -
      element.clientHeight;

    if (
      distance <
        element.clientHeight *
          2 &&
      !loadingRef.current &&
      hasMore
    ) {
      loadVideos(page + 1);
    }
  };

  const toggleLike = (
    video: VideoItem
  ) => {
    const isLiked =
      liked.includes(video.id);

    setLiked((current) =>
      isLiked
        ? current.filter(
            (id) =>
              id !== video.id
          )
        : [
            ...current,
            video.id,
          ]
    );

    setVideos((current) =>
      current.map((item) =>
        item.id === video.id
          ? {
              ...item,
              likes:
                item.likes +
                (isLiked
                  ? -1
                  : 1),
            }
          : item
      )
    );
  };

  const shareVideo = async (
    video: VideoItem
  ) => {
    try {
      if (
        navigator.share
      ) {
        await navigator.share(
          {
            title:
              "VIDEXA AI",
            text:
              "شاهد هذا الفيديو على VIDEXA AI",
            url:
              video.sourceUrl,
          }
        );
      } else {
        await navigator.clipboard.writeText(
          video.sourceUrl
        );

        setCopied("share");

        setTimeout(
          () =>
            setCopied(""),
          1500
        );
      }
    } catch {}
  };

  const downloadVideo = (
    video: VideoItem
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

  const copyText = async (
    value: string,
    type: string
  ) => {
    try {
      await navigator.clipboard.writeText(
        value
      );

      setCopied(type);

      setTimeout(
        () => setCopied(""),
        1500
      );
    } catch {}
  };

  const generateVideo = async () => {
    if (!prompt.trim()) {
      alert(
        "اكتب وصف الفيديو أولًا."
      );
      return;
    }

    setGenerating(true);

    await new Promise(
      (resolve) =>
        setTimeout(
          resolve,
          1800
        )
    );

    setGenerating(false);
    setCreateOpen(false);

    alert(
      "تم استلام طلب إنشاء الفيديو. يمكن ربطه بمحرك توليد الفيديو AI لاحقًا."
    );

    setPrompt("");
  };

  const sendBankakPayment = () => {
    if (
      !bankakReference.trim()
    ) {
      alert(
        "أدخل رقم العملية."
      );
      return;
    }

    alert(
      "تم إرسال بيانات العملية للمراجعة."
    );

    setBankakReference("");
  };

  if (loading) {
    return (
      <main
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-black text-white"
      >
        <div className="text-center">
          <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />

          <h1 className="mt-5 text-3xl font-black">
            VIDEXA{" "}
            <span className="text-purple-500">
              AI
            </span>
          </h1>

          <p className="mt-2 text-xs text-zinc-500">
            جاري تحميل الفيديوهات...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-black text-white"
    >
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/80 px-4 py-3 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <button
            onClick={() =>
              setMenuOpen(true)
            }
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-2xl"
          >
            ☰
          </button>

          <div className="text-center">
            <h1 className="text-3xl font-black">
              VIDEXA{" "}
              <span className="text-purple-500">
                AI
              </span>
            </h1>

            <p className="text-[9px] tracking-[5px] text-zinc-500">
              CREATE • WATCH • SHARE
            </p>
          </div>

          <button
            onClick={() =>
              setPaymentOpen(true)
            }
            className={`rounded-full px-5 py-3 text-xs font-black ${
              vip
                ? "bg-amber-400 text-black"
                : "bg-gradient-to-r from-purple-600 to-pink-600"
            }`}
          >
            {vip
              ? "👑 VIP"
              : "ترقية ✨"}
          </button>
        </div>
      </header>

      <div className="fixed left-0 right-0 top-[88px] z-40 overflow-x-auto border-b border-white/5 bg-black/80 px-3 py-4 backdrop-blur-xl">
        <div className="flex min-w-max justify-center gap-2">
          {CATEGORIES.map(
            (item) => (
              <button
                key={item.name}
                onClick={() =>
                  setCategory(
                    item.name
                  )
                }
                className={`rounded-full px-5 py-3 text-xs font-bold ${
                  category ===
                  item.name
                    ? "bg-white text-black"
                    : "bg-white/10"
                }`}
              >
                {item.icon}{" "}
                {item.name}
              </button>
            )
          )}
        </div>
      </div>

      <div
        onScroll={handleScroll}
        className="h-screen snap-y snap-mandatory overflow-y-auto"
      >
        {videos.map(
          (video) => (
            <section
              key={video.id}
              className="relative h-screen w-full snap-start overflow-hidden bg-black"
            >
              <video
                ref={(element) => {
                  videoRefs.current[
                    video.id
                  ] = element;
                }}
                src={video.videoUrl}
                poster={video.poster}
                muted
                loop
                playsInline
                autoPlay
                preload="metadata"
                className="h-full w-full object-cover"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />

              <a
                href={
                  video.sourceUrl
                }
                target="_blank"
                rel="noreferrer"
                className="absolute left-4 top-28 rounded-full bg-black/60 px-4 py-2 text-[9px] text-zinc-300 backdrop-blur"
              >
                فيديو من Pexels ↗
              </a>

              <div className="absolute bottom-28 right-20 left-5">
                <div className="mb-3 inline-block rounded-full bg-white/10 px-4 py-2 text-[10px] font-bold backdrop-blur">
                  #
                  {
                    video.category
                  }
                </div>

                <h2 className="text-xl font-black">
                  {video.creator}

                  <span className="mr-2 text-blue-400">
                    ✓
                  </span>
                </h2>

                <p className="mt-2 text-sm text-zinc-200">
                  {video.title}
                </p>

                <a
                  href={
                    video.creatorUrl
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block text-[10px] text-zinc-500 underline"
                >
                  صاحب الفيديو على
                  Pexels
                </a>
              </div>

              <div className="absolute bottom-28 right-4 flex flex-col items-center gap-5">
                <button
                  onClick={() =>
                    toggleLike(
                      video
                    )
                  }
                  className="flex flex-col items-center"
                >
                  <span className="text-3xl">
                    {liked.includes(
                      video.id
                    )
                      ? "❤️"
                      : "🤍"}
                  </span>

                  <span className="text-[10px] font-bold">
                    {video.likes.toLocaleString()}
                  </span>
                </button>

                <button className="flex flex-col items-center">
                  <span className="text-3xl">
                    💬
                  </span>

                  <span className="text-[10px] font-bold">
                    {video.comments.toLocaleString()}
                  </span>
                </button>

                <button
                  onClick={() =>
                    shareVideo(
                      video
                    )
                  }
                  className="flex flex-col items-center"
                >
                  <span className="text-3xl">
                    ↗️
                  </span>

                  <span className="text-[10px] font-bold">
                    {video.shares.toLocaleString()}
                  </span>
                </button>

                <button
                  onClick={() =>
                    downloadVideo(
                      video
                    )
                  }
                  className="flex flex-col items-center"
                >
                  <span className="text-3xl">
                    {vip
                      ? "📥"
                      : "🔒"}
                  </span>

                  <span className="text-[10px] font-bold">
                    {vip
                      ? "تحميل"
                      : "VIP"}
                  </span>
                </button>
              </div>
            </section>
          )
        )}

        {loadingMore && (
          <div className="flex h-32 items-center justify-center bg-black">
            <div className="h-7 w-7 animate-spin rounded-full border-2 border-purple-500 border-t-transparent" />
          </div>
        )}

        {!hasMore &&
          videos.length > 0 && (
            <div className="flex h-32 items-center justify-center bg-black text-xs text-zinc-600">
              لا توجد نتائج إضافية لهذه
              الفئة حاليًا.
            </div>
          )}
      </div>

      <button
        onClick={() =>
          setCreateOpen(true)
        }
        className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-9 py-4 font-black shadow-[0_0_35px_rgba(168,85,247,.5)]"
      >
        ✨ إنشاء فيديو
      </button>

      {error && (
        <div className="fixed bottom-24 left-4 right-4 z-[100] rounded-2xl border border-red-500/20 bg-red-950/95 p-4 text-center text-xs text-red-200">
          {error}
        </div>
      )}

      {menuOpen && (
        <div className="fixed inset-0 z-[200] bg-black/95 p-6 backdrop-blur-xl">
          <div className="mx-auto max-w-lg">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black">
                VIDEXA AI
              </h2>

              <button
                onClick={() =>
                  setMenuOpen(false)
                }
                className="text-3xl text-zinc-500"
              >
                ×
              </button>
            </div>

            <div className="mt-12 flex flex-col gap-7 text-xl font-bold">
              <button
                onClick={() =>
                  setMenuOpen(false)
                }
                className="text-right"
              >
                🏠 الرئيسية
              </button>

              <button
                onClick={() => {
                  setMenuOpen(false);
                  setCategory(
                    "تقنية"
                  );
                }}
                className="text-right"
              >
                🔎 استكشف
              </button>

              <button
                onClick={() => {
                  setMenuOpen(false);
                  setCreateOpen(
                    true
                  );
                }}
                className="text-right"
              >
                🎬 إنشاء فيديو
              </button>

              <button
                onClick={() => {
                  setMenuOpen(false);
                  setPaymentOpen(
                    true
                  );
                }}
                className="text-right text-purple-400"
              >
                👑 VIP
              </button>

              <a
                href="https://www.pexels.com/"
                target="_blank"
                rel="noreferrer"
                className="text-right text-zinc-400"
              >
                🎞️ Pexels
              </a>
            </div>
          </div>
        </div>
      )}

      {createOpen && (
        <div className="fixed inset-0 z-[210] flex items-center justify-center bg-black/95 p-4">
          <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-zinc-900 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black">
                🎬 إنشاء فيديو AI
              </h2>

              <button
                onClick={() =>
                  setCreateOpen(
                    false
                  )
                }
                className="text-2xl text-zinc-500"
              >
                ×
              </button>
            </div>

            <textarea
              value={prompt}
              onChange={(e) =>
                setPrompt(
                  e.target.value
                )
              }
              placeholder="اكتب وصف الفيديو..."
              className="mt-5 h-40 w-full resize-none rounded-2xl border border-white/10 bg-black p-4 text-sm outline-none focus:border-purple-500"
            />

            <button
              onClick={
                generateVideo
              }
              disabled={generating}
              className="mt-4 w-full rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 py-4 font-black disabled:opacity-50"
            >
              {generating
                ? "⏳ جاري المعالجة..."
                : "🚀 توليد الفيديو"}
            </button>
          </div>
        </div>
      )}

      {paymentOpen && (
        <div className="fixed inset-0 z-[220] flex items-center justify-center overflow-y-auto bg-black/95 p-4">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-zinc-900 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-4xl">
                  👑
                </div>

                <h2 className="mt-2 text-2xl font-black">
                  VIDEXA VIP
                </h2>
              </div>

              <button
                onClick={() =>
                  setPaymentOpen(
                    false
                  )
                }
                className="text-2xl text-zinc-500"
              >
                ×
              </button>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-2">
              <button
                onClick={() =>
                  setPaymentMethod(
                    "USDT"
                  )
                }
                className={`rounded-xl py-3 text-xs font-black ${
                  paymentMethod ===
                  "USDT"
                    ? "bg-purple-600"
                    : "bg-white/5"
                }`}
              >
                💎 USDT
              </button>

              <button
                onClick={() =>
                  setPaymentMethod(
                    "BANKAK"
                  )
                }
                className={`rounded-xl py-3 text-xs font-black ${
                  paymentMethod ===
                  "BANKAK"
                    ? "bg-purple-600"
                    : "bg-white/5"
                }`}
              >
                🇸🇩 بنكك
              </button>
            </div>

            {paymentMethod ===
              "USDT" && (
              <div className="mt-5 rounded-2xl bg-black p-5">
                <p className="text-center text-3xl font-black text-purple-400">
                  {USDT_PRICE} USDT
                </p>

                <p className="mt-1 text-center text-xs text-zinc-500">
                  شبكة TRC20
                </p>

                <div className="mt-5 rounded-xl border border-white/10 bg-zinc-950 p-3">
                  <p className="break-all font-mono text-[10px] text-zinc-300">
                    {USDT_ADDRESS}
                  </p>
                </div>

                <button
                  onClick={() =>
                    copyText(
                      USDT_ADDRESS,
                      "usdt"
                    )
                  }
                  className="mt-3 w-full rounded-xl bg-white py-3 text-xs font-black text-black"
                >
                  {copied ===
                  "usdt"
                    ? "✓ تم النسخ"
                    : "نسخ عنوان USDT"}
                </button>

                <p className="mt-4 text-center text-[10px] leading-5 text-zinc-500">
                  بعد التحويل احتفظ
                  برقم Transaction Hash
                  للتحقق من الدفع.
                </p>
              </div>
            )}

            {paymentMethod ===
              "BANKAK" && (
              <div className="mt-5 rounded-2xl bg-black p-5">
                <div className="flex justify-between">
                  <span className="font-bold">
                    بنكك
                  </span>

                  <span className="font-black text-purple-400">
                    {BANKAK_PRICE.toLocaleString()}{" "}
                    SDG
                  </span>
                </div>

                <div className="mt-5 rounded-xl bg-zinc-950 p-4">
                  <p className="text-[10px] text-zinc-500">
                    اسم المستفيد
                  </p>

                  <p className="mt-1 text-sm font-black">
                    {BANKAK_NAME}
                  </p>

                  <p className="mt-4 text-[10px] text-zinc-500">
                    رقم الحساب
                  </p>

                  <p className="mt-1 font-mono font-black">
                    {BANKAK_ACCOUNT}
                  </p>
                </div>

                <button
                  onClick={() =>
                    copyText(
                      BANKAK_ACCOUNT,
                      "bankak"
                    )
                  }
                  className="mt-3 w-full rounded-xl bg-white py-3 text-xs font-black text-black"
                >
                  {copied ===
                  "bankak"
                    ? "✓ تم النسخ"
                    : "نسخ رقم بنكك"}
                </button>

                <input
                  value={
                    bankakReference
                  }
                  onChange={(e) =>
                    setBankakReference(
                      e.target.value
                    )
                  }
                  placeholder="رقم العملية بعد التحويل"
                  className="mt-3 w-full rounded-xl border border-white/10 bg-zinc-950 p-3 text-xs outline-none focus:border-purple-500"
                />

                <button
                  onClick={
                    sendBankakPayment
                  }
                  className="mt-3 w-full rounded-xl bg-purple-600 py-3 text-xs font-black"
                >
                  إرسال إثبات الدفع
                </button>
              </div>
            )}

            <div className="mt-5 grid grid-cols-2 gap-2">
              <div className="rounded-xl bg-white/5 p-3 text-center text-[10px]">
                📥 تحميل الفيديو
              </div>

              <div className="rounded-xl bg-white/5 p-3 text-center text-[10px]">
                🎬 إنشاء محتوى
              </div>

              <div className="rounded-xl bg-white/5 p-3 text-center text-[10px]">
                ⚡ أولوية
              </div>

              <div className="rounded-xl bg-white/5 p-3 text-center text-[10px]">
                ✨ جودة أعلى
              </div>
            </div>

            <a
              href="https://www.pexels.com/"
              target="_blank"
              rel="noreferrer"
              className="mt-5 block text-center text-[10px] text-zinc-500 underline"
            >
              Videos provided by Pexels
            </a>
          </div>
        </div>
      )}
    </main>
  );
            }

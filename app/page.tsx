import { NextRequest, NextResponse } from "next/server";

const PEXELS_API_URL =
  "https://api.pexels.com/videos/search";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } =
      new URL(request.url);

    const query =
      searchParams.get("query") ||
      "cinematic";

    const page =
      searchParams.get("page") || "1";

    const perPage =
      searchParams.get("per_page") || "18";

    const apiKey =
      process.env.PEXELS_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "PEXELS_API_KEY غير موجود في Environment Variables",
        },
        {
          status: 500,
        }
      );
    }

    const pexelsUrl =
      `${PEXELS_API_URL}?` +
      `query=${encodeURIComponent(query)}` +
      `&page=${encodeURIComponent(page)}` +
      `&per_page=${encodeURIComponent(perPage)}` +
      `orientation=landscape`;

    const response = await fetch(
      pexelsUrl,
      {
        method: "GET",
        headers: {
          Authorization: apiKey,
        },

        // منع تخزين النتيجة القديمة
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorText =
        await response.text();

      console.error(
        "Pexels API Error:",
        errorText
      );

      return NextResponse.json(
        {
          error:
            "تعذر الاتصال بخدمة Pexels",
        },
        {
          status: response.status,
        }
      );
    }

    const data =
      await response.json();

    const videos =
      (data.videos || [])
        .map((video: any) => {
          const files =
            video.video_files || [];

          // نحاول اختيار أعلى جودة متاحة
          const sortedFiles =
            [...files].sort(
              (a: any, b: any) =>
                (b.width || 0) -
                (a.width || 0)
            );

          const selectedFile =
            sortedFiles[0];

          if (!selectedFile?.link) {
            return null;
          }

          return {
            id: String(video.id),

            title:
              video.user?.name ||
              "Videxa Cinematic",

            poster:
              video.image || "",

            videoUrl:
              selectedFile.link,

            duration:
              video.duration || 0,

            tags: [
              "#Videxa",
              "#Cinematic",
              "#4K",
            ],
          };
        })
        .filter(Boolean);

    return NextResponse.json(
      {
        videos,

        pagination: {
          page: data.page || 1,
          perPage:
            data.per_page || Number(perPage),
          totalResults:
            data.total_results || videos.length,
        },
      },
      {
        status: 200,
        headers: {
          "Cache-Control":
            "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    console.error(
      "Videos route error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "حدث خطأ داخلي أثناء جلب الفيديوهات",
      },
      {
        status: 500,
      }
    );
  }
}

import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const text = searchParams.get("text");

  const endpoint = new URL("https://www.googleapis.com/webfonts/v1/webfonts");

  endpoint.searchParams.set("family", "Edu VIC WA NT Beginner");

  if (!process.env.GOOGLE_FONTS_API_KEY) {
    throw new Error("GOOGLE_FONTS_API_KEYがセットされていません");
  }
  endpoint.searchParams.set("key", process.env.GOOGLE_FONTS_API_KEY);

  const fontInfo = await fetch(endpoint).then((res) => res.json());

  // console.log(fontInfo);

  const fontResponse = await fetch(fontInfo.items[0].files["500"]);
  const fontData = await fontResponse.arrayBuffer();

  return new ImageResponse(
    (
      <div tw="flex items-center justify-center w-full font-bold h-full bg-indigo-50 text-[64px] text-indigo-800 rounded-3xl border-2 border-indigo-800">
        {text || "🏄 Looks Good To Me! 🫧"}
      </div>
    ),
    {
      width: 1200,
      height: 720,
      emoji: "twemoji",
      fonts: [
        {
          name: "Edu VIC WA NT Beginner",
          data: fontData,
        },
      ],
    }
  );
}

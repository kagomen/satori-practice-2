import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const text = searchParams.get("text");

  const endpoint = new URL("https://www.googleapis.com/webfonts/v1/webfonts");

  endpoint.searchParams.set("family", "Micro 5 Charted");

  if (!process.env.GOOGLE_FONTS_API_KEY) {
    throw new Error("GOOGLE_FONTS_API_KEYがセットされていません");
  }
  endpoint.searchParams.set("key", process.env.GOOGLE_FONTS_API_KEY);

  const fontInfo = await fetch(endpoint).then((res) => res.json());

  // console.log(fontInfo);

  const fontResponse = await fetch(fontInfo.items[0].files["regular"]);
  const fontData = await fontResponse.arrayBuffer();

  return new ImageResponse(
    (
      <div tw="flex items-center justify-center w-full font-bold h-full bg-white text-[72px] text-green-700 rounded-3xl border-2 border-green-700">
        {text || "❤️ Looks Good To Me! 😻"}
      </div>
    ),
    {
      width: 1200,
      height: 720,
      emoji: "noto",
      fonts: [
        {
          name: "Micro 5 Charted",
          data: fontData,
        },
      ],
    }
  );
}

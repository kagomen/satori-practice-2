import { googleFontsApiKey, googleFontsEndpoint } from "@/lib/constants";
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const text = searchParams.get("text");

  googleFontsEndpoint.searchParams.set("family", "Indie Flower");
  googleFontsEndpoint.searchParams.set("key", googleFontsApiKey);

  const fontInfo = await fetch(googleFontsEndpoint).then((res) => res.json());

  // console.log(fontInfo);

  const fontResponse = await fetch(fontInfo.items[0].files["regular"]);
  const fontData = await fontResponse.arrayBuffer();

  return new ImageResponse(
    (
      <div tw="flex items-center justify-center w-full font-bold h-full bg-yellow-50 text-[72px] text-yellow-600 rounded-3xl border border-yellow-600">
        {text || "🌈 Looks Good To Me! 💫"}
      </div>
    ),
    {
      width: 1200,
      height: 720,
      emoji: "twemoji",
      fonts: [
        {
          name: "Indie Flower",
          data: fontData,
        },
      ],
    }
  );
}

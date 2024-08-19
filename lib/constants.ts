export const googleFontsEndpoint = new URL(
  "https://www.googleapis.com/webfonts/v1/webfonts"
);

export const googleFontsApiKey = (() => {
  if (!process.env.GOOGLE_FONTS_API_KEY) {
    throw new Error("GOOGLE_FONTS_API_KEYがセットされていません");
  } else {
    return process.env.GOOGLE_FONTS_API_KEY;
  }
})();

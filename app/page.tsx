"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { themeList } from "@/lib/themeList";
import { Copy, Download } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [text, setText] = useState<string | null>(null);

  function copy(copyText: string) {
    navigator.clipboard.writeText(copyText);
    alert("Copied!");
  }

  async function save(url: string) {
    const blob = await fetch(url).then((res) => res.blob());
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "LGTM-image.png";
    a.click();
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <main className="min-h-screen p-12 text-gray-700">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setText(inputRef.current?.value ?? "");
        }}
        className="mb-8"
      >
        <label className="block mb-1">👇 input text & enter!</label>
        <input
          type="text"
          ref={inputRef}
          className="w-[300px] p-2 border border-gray-300 rounded"
        />
      </form>
      <div className="flex gap-8 items-center flex-wrap">
        {themeList.map((theme) => {
          const url = `/api/${theme.slug}?text=${encodeURIComponent(
            text ?? ""
          )}`;
          const copyText = `![LGTM-image](https://satori-practice-2.vercel.app${url})`;
          return (
            <Sheet key={theme.slug}>
              <SheetTrigger asChild className="cursor-pointer">
                <Image src={url} alt="LGTM-image" width={300} height={180} />
              </SheetTrigger>
              <SheetContent side="right">
                <div className="space-y-8">
                  <SheetHeader>
                    <SheetTitle className="text-2xl">{theme.title}</SheetTitle>
                    <SheetDescription className="text-base">
                      {theme.description}
                    </SheetDescription>
                  </SheetHeader>
                  <Image src={url} alt="LGTM-image" width={600} height={360} />
                  <div className="space-x-4">
                    <Button
                      onClick={() => copy(copyText)}
                      variant="outline"
                      className="space-x-3"
                    >
                      <Copy />
                      <span>Copy for GitHub</span>
                    </Button>
                    <Button
                      onClick={() => save(url)}
                      variant="outline"
                      className="space-x-3"
                    >
                      <Download />
                      <span>Download .png</span>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          );
        })}
      </div>
    </main>
  );
}

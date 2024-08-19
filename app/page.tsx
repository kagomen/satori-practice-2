"use client";

// import { Copy, Download } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [text, setText] = useState<string | null>(null);

  const themeList = ["purple", "blue", "green"];

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center gap-12 p-12 text-gray-700 bg-gray-100">
      <form
        onSubmit={(e) => {
          e.preventDefault();

          setText(inputRef.current?.value ?? "");
        }}
      >
        <label className="block mb-1">👇 input & enter</label>
        <input
          type="text"
          ref={inputRef}
          // defaultValue={text}
          className="w-[300px] p-2 border border-gray-300 rounded"
        />
      </form>
      {themeList.map((theme) => (
        <button key={theme} onClick={(): void => alert("clicked!")}>
          <Image
            src={`/api/${theme}?text=${encodeURIComponent(text ?? "")}`}
            alt="LGTM-image"
            width={600}
            height={360}
          />
        </button>
      ))}
    </main>
  );
}

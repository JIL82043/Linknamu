"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// 더미 값: 실제 내용은 나중에 교체
const profile = {
  name: "김개발",
  bio: "풀스택 개발자 | 요즘에는 AI 개발에 관심이 많아요",
  photo: "https://placehold.co/150x150/orange/white",
};

const links = [
  { title: "💻 깃허브", url: "https://github.com/JIL82043" },
  { title: "✍️ 블로그", url: "" },
  { title: "📤 이메일", url: "mailto:97.il.jung@gmail.com" },
];

export default function Home() {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    fetch("/api/clicks")
      .then((res) => (res.ok ? res.json() : {}))
      .then(setCounts)
      .catch(() => {});
  }, []);

  const handleClick = (id: string) => {
    setCounts((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
    fetch("/api/clicks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
      keepalive: true,
    }).catch(() => {});
  };

  return (
    <div className="flex flex-1 justify-center font-sans">
      <main className="flex w-full max-w-md flex-col items-center px-8 py-20 sm:py-24">
        <Image
          src={profile.photo}
          alt={`${profile.name} 프로필 사진`}
          width={112}
          height={112}
          priority
          unoptimized
          className="h-28 w-28 rounded-full border-4 border-white/80 object-cover shadow-[0_12px_32px_-8px_rgba(180,100,50,0.45)] ring-1 ring-orange-900/5"
        />

        <h1 className="mt-8 text-2xl font-bold tracking-tight text-stone-800">
          {profile.name}
        </h1>
        <p className="mt-3 text-center text-[15px] leading-relaxed text-stone-600">
          {profile.bio}
        </p>

        <ul className="mt-12 flex w-full flex-col gap-5">
          {links.map((link) => (
            <li key={link.title}>
              <a
                href={link.url || undefined}
                onClick={() => handleClick(link.title)}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex h-14 w-full items-center justify-center rounded-2xl border border-white/70 bg-white/40 text-base font-medium text-stone-800 shadow-[0_8px_24px_-12px_rgba(180,100,50,0.35)] backdrop-blur-md transition duration-200 hover:-translate-y-0.5 hover:bg-white/60"
              >
                {link.title}
                <span className="absolute right-5 text-xs font-normal text-stone-500">
                  {counts[link.title] ?? 0}회
                </span>
              </a>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

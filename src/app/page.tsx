import Image from "next/image";

// 더미 값: 실제 내용은 나중에 교체
const profile = {
  name: "김클로",
  bio: "세계 최강 바이브코더",
  photo: "/profile.svg",
};

const links = [
  { title: "GitHub", url: "https://github.com/example" },
  { title: "LinkedIn", url: "https://www.linkedin.com/in/example" },
  { title: "Blog", url: "https://example.com/blog" },
];

export default function Home() {
  return (
    <div className="flex flex-1 justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-md flex-col items-center px-6 py-16">
        <Image
          src={profile.photo}
          alt={`${profile.name} 프로필 사진`}
          width={112}
          height={112}
          priority
          className="h-28 w-28 rounded-full border-2 border-zinc-900 object-cover dark:border-zinc-100"
        />

        <h1 className="mt-8 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          {profile.name}
        </h1>
        <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400">
          {profile.bio}
        </p>

        <ul className="mt-10 flex w-full flex-col gap-6">
          {links.map((link) => (
            <li key={link.url}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-14 w-full items-center justify-center rounded-xl border-2 border-zinc-900 bg-white text-base font-medium text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-100 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800"
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center tablet:max-w-4xl mx-auto mt-4 text-sm mb-8">
      <div>
        Created by{" "}
        <Link
          href="https://blog.lxythan2lxy.cn/about"
          className="underline text-nord-10"
        >
          Travis
        </Link>
      </div>
      <div>
        <Link
          href="https://github.com/TravisRoad/anime-rss"
          className="underline text-nord-10"
        >
          anime-rss
        </Link>
      </div>
      <div className="sr-only">一直看番一直爽</div>
    </footer>
  );
}

import React from "react";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

const articles = [
  {
    id: 1,
    title: "How to become frontend developer in 2026",
    category: "Web Developer",
    author: "Lokesh Mernstack",
    authorImg: "https://tse3.mm.bing.net/th/id/OIP.UWXRlFwmzbCgIk4QR9nxdwHaFX?rs=1&pid=ImgDetMain&o=7&rm=3",
    image:
      "https://tse3.mm.bing.net/th/id/OIP.UWXRlFwmzbCgIk4QR9nxdwHaFX?rs=1&pid=ImgDetMain&o=7&rm=3",
    date: "12 Feb",
    readTime: 12,
  },
  {
    id: 2,
    title: "Understanding React Hooks",
    category: "React",
    author: "Jane Doe",
    authorImg:
      "https://images.unsplash.com/photo-1603415526960-fbd5a5d2a6b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&q=80",
    image:
      "https://th.bing.com/th/id/R.bc71c1c1c50551a1d65e7b529ea29d08?rik=EU42gCFH4J%2bBZA&riu=http%3a%2f%2fwww.goodworklabs.com%2fwp-content%2fuploads%2f2016%2f10%2freactjs.png&ehk=qvQ5EVoUnJZ7k5L347zsU3f87YTckr1iQBzKdwXJd0w%3d&risl=&pid=ImgRaw&r=0",
    date: "5 Mar",
    readTime: 8,
  },
  {
    id: 3,
    title: "Next.js 14 New Features",
    category: "Next.js",
    author: "John Smith",
    authorImg:
      "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&q=80",
    image:
      "https://th.bing.com/th/id/OIP.eSh2wzsmmiNtGHcBQPOGzwHaEG?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3",
    date: "20 Jan",
    readTime: 10,
  },
];

const TopArticles = () => {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <Card
          key={article.id}
          className={cn(
            "group relative overflow-hidden transition-all hover:scale-[1.02]",
            "border border-gray-200/50 dark:border-white/10",
            "bg-white/50 dark:bg-gray-900/50",
            "backdrop-blur-lg"
          )}
        >
          <div className="p-6">
            <Link href={`/articles/${article.id}`}>
              <div className="relative mb-4 h-48 w-full overflow-hidden rounded-xl">
                <img
                  src={article.image}
                  alt={article.title}
                  className="object-cover"
                />
              </div>
              <div className="flow items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={article.authorImg} />
                  <AvatarFallback>{article.author[0]}</AvatarFallback>
                </Avatar>
                <span>{article.author}</span>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                {article.title}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {article.category}
              </p>
              <div className="mt-4 flex items-center justify-between gap-2 text-sm text-gray-500 dark:text-gray-400">
                <span>{article.date}</span>
                <span>{article.readTime} min to read</span>
              </div>
            </Link>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default TopArticles;

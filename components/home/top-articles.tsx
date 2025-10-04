import React from "react";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { prisma } from "@/lib/prisma";

const TopArticles = async () => {
  // Fetch real articles from database
  const articles = await prisma.articles.findMany({
    take: 3,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      author: {
        select: {
          name: true,
          imageUrl: true,
        },
      },
    },
  });
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
            <Link href={`/articles/${article.id}`} className="cursor-pointer">
              <div className="relative mb-4 h-48 w-full overflow-hidden rounded-xl">
                <img
                  src={article.featuredImage}
                  alt={article.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={article.author.imageUrl || ""} />
                  <AvatarFallback>{article.author.name[0]}</AvatarFallback>
                </Avatar>
                <span>{article.author.name}</span>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                {article.title}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {article.category}
              </p>
              <div className="mt-4 flex items-center justify-between gap-2 text-sm text-gray-500 dark:text-gray-400">
                <span>{article.createdAt.toLocaleDateString()}</span>
                <span>5 min to read</span>
              </div>
            </Link>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default TopArticles;

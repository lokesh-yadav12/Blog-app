import React from "react";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

const TopArticles = () => {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      <Card
        className={cn(
          "group relative overflow-hidden transition-all hover:scale-[1.02]",
          "border border-gray-200/50 dark:border-white/10",
          "bg-white/50 dark:bg-gray-900/50",
          "backdrop-blur-lg"
        )}
      >
        <div className="p-6">
          <Link href={`/articles/${1234}`}>
            <div className="relative mb-4 h-48 w-full overflow-hidden rounded-xl">

              <img
                src="https://tse3.mm.bing.net/th/id/OIP.UWXRlFwmzbCgIk4QR9nxdwHaFX?rs=1&pid=ImgDetMain&o=7&rm=3"
                alt="article"
                className="object-cover"
              />
            </div>
            <div className="flow items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://tse3.mm.bing.net/th/id/OIP.UWXRlFwmzbCgIk4QR9nxdwHaFX?rs=1&pid=ImgDetMain&o=7&rm=3" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span>Lokesh Mernstack</span>
            </div>
            <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
              How to become frontend developer in 2026
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Web developer
            </p>

            <div className="mt-4 flex items-center justify-between gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span>12 feb</span>
              <span>{12} min to read</span>
            </div>
          </Link>
        </div>
      </Card>
    </div>
  );
};
export default TopArticles;

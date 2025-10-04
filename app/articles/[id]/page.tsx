import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ArticleDetailPage } from "@/components/articles/article-detail-page";

type Props = {
  params: { id: string };
};

export default async function ArticlePage({ params }: Props) {
  const article = await prisma.articles.findUnique({
    where: { id: params.id },
    include: {
      author: {
        select: {
          name: true,
          email: true,
          imageUrl: true,
        },
      },
    },
  });

  if (!article) {
    notFound();
  }

  return <ArticleDetailPage article={article} />;
}
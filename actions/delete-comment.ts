"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function deleteComment(commentId: string) {
  const { userId } = await auth();
  
  if (!userId) {
    throw new Error("You must be logged in to delete comments");
  }

  // Find the comment and verify ownership through article author
  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
    include: {
      article: {
        include: {
          author: true,
        },
      },
    },
  });

  if (!comment) {
    throw new Error("Comment not found");
  }

  // Check if the current user is the author of the article
  const user = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user || comment.article.authorId !== user.id) {
    throw new Error("You can only delete comments on your own articles");
  }

  // Delete the comment
  await prisma.comment.delete({
    where: { id: commentId },
  });

  // Revalidate the article page and comments dashboard
  revalidatePath(`/articles/${comment.articleId}`);
  revalidatePath("/dashboard/comments");
}


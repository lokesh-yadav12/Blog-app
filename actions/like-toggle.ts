"use server";

import { prisma } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function toggleLike(articleId: string) {
  const { userId } = await auth(); // Clerk's user ID

  // If not logged in, just skip without throwing server error
  if (!userId) {
    console.warn("Unauthorized like attempt");
    return { success: false, message: "Please log in to like an article." };
  }

  // Check if the user exists in the database
  let user = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });

  // If not found, auto-create the user from Clerk data
  if (!user) {
    const clerkUser = await currentUser();
    user = await prisma.user.create({
      data: {
        clerkUserId: userId,
        name: clerkUser?.firstName || "Unknown User",
        email: clerkUser?.emailAddresses?.[0]?.emailAddress || "",
        imageUrl: clerkUser?.imageUrl || "",
      },
    });
  }

  // Check if the user has already liked the article
  const existingLike = await prisma.like.findFirst({
    where: { articleId, userId: user.id },
  });

  if (existingLike) {
    // Unlike the article
    await prisma.like.delete({
      where: { id: existingLike.id },
    });
  } else {
    // Like the article
    await prisma.like.create({
      data: { articleId, userId: user.id },
    });
  }

  // Revalidate the article page for updated likes
  revalidatePath(`/articles/${articleId}`);

  return { success: true };
}

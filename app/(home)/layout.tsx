import { Navbar } from "@/components/home/header/navbar";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();

  if (user) {
    await prisma.user.upsert({
      where: { clerkUserId: user.id },
      create: {
        clerkUserId: user.id,
        email: user.emailAddresses[0].emailAddress,
        imageUrl: user.imageUrl,
        name: user.firstName || "No Name", // ✅ Provide a string
      },
      update: {
        email: user.emailAddresses[0].emailAddress,
        imageUrl: user.imageUrl,
        name: user.firstName || "No Name", // optional: update name
      },
    });
  }

  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default layout;

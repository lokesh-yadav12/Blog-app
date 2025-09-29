"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const updateArticleSchema = z.object({
	title: z.string().min(3).max(100),
	category: z.string().min(3).max(50),
	content: z.string().min(10),
});

type UpdateArticleFormState = {
	errors: {
		title?: string[];
		category?: string[];
		featuredImage?: string[];
		content?: string[];
		formErrors?: string[];
	};
};

export const updateArticles = async (
	articleId: string,
	prevState: UpdateArticleFormState,
	formData: FormData
): Promise<UpdateArticleFormState> => {
	const result = updateArticleSchema.safeParse({
		title: formData.get("title"),
		category: formData.get("category"),
		content: formData.get("content"),
	});

	if (!result.success) {
		return {
			errors: result.error.flatten().fieldErrors,
		};
	}

	let imageUrl: string | undefined;
	const imageFile = formData.get("featuredImage") as File | null;
	if (imageFile && imageFile.name !== "" && imageFile.name !== "undefined") {
		const arrayBuffer = await imageFile.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);
		// If you later add Cloudinary for edit as well, plug upload here.
		// For now, skip upload and keep existing featuredImage when not supplied.
		// imageUrl = await uploadToCloudinary(buffer)
	}

	try {
		await prisma.articles.update({
			where: { id: articleId },
			data: {
				title: result.data.title,
				category: result.data.category,
				content: result.data.content,
				// Only update featuredImage if new image is provided and uploaded
				...(imageUrl ? { featuredImage: imageUrl } : {}),
			},
		});
	} catch (error: unknown) {
		if (error instanceof Error) {
			return { errors: { formErrors: [error.message] } };
		}
		return { errors: { formErrors: ["Some internal server error occurred."] } };
	}

	revalidatePath("/dashboard");
	return { errors: {} };
};

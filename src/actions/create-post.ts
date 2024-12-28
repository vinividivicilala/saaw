"use server";

import { auth } from "@/auth";
import prisma from "@/DB";
import paths from "@/path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

type formDataType = {
  error: { title?: string[]; content?: string[]; _formErrors?: string[] };
};

const createTitleSchema = z.object({
  title: z
    .string()
    .min(3)
    .regex(/[a-z-]/, {
      message: "name can only contain lowecase letters and -",
    }),
  content: z.string().min(10),
});

export const createPost = async (
  slug: string,
  formState: formDataType,
  formData: FormData
): Promise<formDataType> => {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const res = createTitleSchema.safeParse({ title, content });
  const session = await auth();
  if (!session?.user) {
    return {
      error: { _formErrors: ["Must be logged in to create a post."] },
    };
  }
  if (!res.success) {
    const errors = res.error?.flatten().fieldErrors || {};
    return { error: { ...errors } };
  }
  const userId = session.user.id;
  const { id: topicId } =
    (await prisma.topic.findFirst({ where: { slug } })) || {};
  if (!topicId) {
    return {
      error: { _formErrors: ["Invalid topic slug."] },
    };
  }
  let post;
  try {
    post = await prisma.post.create({
      data: {
        content: res.data.content,
        title: res.data.title,
        userId,
        topicId,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return { error: { _formErrors: [err.message] } };
    }
    return { error: { _formErrors: ["Some unknown error occured!"] } };
  }
  revalidatePath(paths.topicShow(res.data.title));
  // revalidatePath(paths.home());
  redirect(paths.postShow(slug, post.id));
  // revalidate to title show
};

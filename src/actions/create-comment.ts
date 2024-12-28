"use server";

import { auth } from "@/auth";
import prisma from "@/DB";
import paths from "@/path";
import { revalidatePath } from "next/cache";

type formDataType = {
  errors: {
    message?: string;
    _formError?: string;
  };
};

export const createComment = async (
  slug: string,
  postId: string,
  parentId: string | null,
  formState: formDataType,
  formData: FormData
): Promise<formDataType> => {
  const message = formData.get("message") as string;
  const user = await auth().then((session) => session?.user);
  if (!user) return { errors: { _formError: "Must be logged in to replay." } };
  if (message.length < 10)
    return { errors: { message: "comment must be of length 10." } };
  try {
    await prisma.comment.create({
      data: { content: message, parentId, userId: user.id, postId },
    });
  } catch (ex) {
    return { errors: { _formError: "error creating comment." } };
  }
  revalidatePath(paths.postShow(slug, postId));
  return { errors: {} };
  // revalidate to post show page
};

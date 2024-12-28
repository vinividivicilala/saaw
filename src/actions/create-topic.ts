"use server";

import { auth } from "@/auth";
import paths from "@/path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import prisma from "@/DB";

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/[a-z-]/, {
      message: "name can only contain lowecase letters and -",
    }),
  description: z.string().min(10),
});

interface formDataType {
  error: {
    name?: string[] | undefined;
    description?: string[] | undefined;
    _formErrors?: string[] | undefined;
  };
}

export const createTopic = async (
  formState: formDataType,
  formData: FormData
): Promise<formDataType> => {
  const topicName = formData.get("topicName");
  const description = formData.get("description");
  const res = createTopicSchema.safeParse({ name: topicName, description });
  const session = await auth();
  if (!session?.user) {
    return { error: { _formErrors: ["Must be logged in to create topic."] } };
  }
  if (!res.success) {
    const errors = res.error?.flatten().fieldErrors || {};
    return { error: { ...errors } };
  }
  try {
    await prisma.topic.create({
      data: { slug: res.data.name, description: res.data.description },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return { error: { _formErrors: [err.message] } };
    }
    return { error: { _formErrors: ["Some unknown error occured!"] } };
  }
  revalidatePath(paths.home());
  redirect(paths.topicShow(res.data.name));
  // revalidate to Home page
};

import { Post } from "@prisma/client";
import prisma from "..";

export type postWithData = Post & {
  topic: { slug: string };
  user: { name: string | null };
  _count: { comments: number };
};

export const fetchPostWithUserBySlug = async (
  slug: string
): Promise<postWithData[]> => {
  return await prisma.post.findMany({
    where: { topic: { slug } },
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true } },
    },
  });
};

export const fetchTopPosts = async (): Promise<postWithData[]> => {
  return await prisma.post.findMany({
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true } },
    },
    take: 10,
    orderBy: { createdAt: "desc" },
  });
};

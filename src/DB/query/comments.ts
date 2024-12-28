import prisma from "..";
export const commentWithUser = async (
  postId: string,
  parentId: string | null
) => {
  const comments = await prisma.comment.findMany({
    where: { AND: [{ postId }, { parentId }] },
    orderBy: { createdAt: "desc" },
    include: { user: true, _count: { select: { children: true } } },
  });
  return comments;
};

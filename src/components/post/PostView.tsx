import prisma from "@/DB";
import { notFound } from "next/navigation";

export const PostView = async ({ postId }: { postId: string }) => {
  const post = await prisma.post.findFirst({ where: { id: postId } });
  if (!post) return notFound();
  return (
    <div key={post.id} className="flex flex-col gap-4 m-4">
      <h2 className="text-2xl font-semibold">{post.title}</h2>
      <p className="border rounded p-3">{post.content}</p>
    </div>
  );
};

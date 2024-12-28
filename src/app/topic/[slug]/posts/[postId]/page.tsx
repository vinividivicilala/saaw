import prisma from "@/DB";
import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import paths from "@/path";
import { PostView } from "@/components/post/PostView";
import CommentCreateForm from "@/components/comment/CommentCreateForm";
import CommentList from "@/components/comment/CommentList";

type Props = {
  params: {
    postId: string;
    slug: string;
  };
};

const PostShow = async (props: Props) => {
  const { postId, slug } = props.params;
  const post = await prisma.post.findFirst({
    where: { id: postId },
  });
  if (!post) return notFound();
  return (
    <div>
      <Link
        href={paths.topicShow(slug)}
        className="cursor-pointer underline font-semibold"
      >
        {"<"} Back to {slug}
      </Link>
      <PostView postId={postId} />
      <CommentCreateForm postId={postId} slug={slug} parentId={null} showInit />
      <CommentList postId={postId} />
    </div>
  );
};

export default PostShow;

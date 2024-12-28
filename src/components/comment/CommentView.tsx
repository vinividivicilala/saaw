import Image from "next/image";
import React from "react";
import CommentCreateForm from "./CommentCreateForm";
import { commentWithUser } from "@/DB/query/comments";

type Props = {
  postId: string;
  parentId: string | null;
};

const CommentView = async ({ parentId, postId }: Props) => {
  const comments = await commentWithUser(postId, parentId);
  if (!comments) return null;
  return (
    <div className="flex flex-col gap-3">
      {comments.map((comment) => (
        <div key={comment.id} className="border rounded p-2 ">
          <div className="flex gap-3">
            <Image
              alt="user image"
              src={comment.user.image || ""}
              width={40}
              height={40}
              className="rounded-full size-12"
            />
            <div className="">
              <p className="text-gray-500 mb-2">{comment.user.name}</p>
              <p>{comment.content}</p>
            </div>
          </div>
          <div className="ml-6">
            <CommentCreateForm
              parentId={comment.id}
              postId={postId}
              slug={"slug"}
            />
            <CommentView parentId={comment.id} postId={postId} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentView;

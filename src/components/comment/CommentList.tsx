import prisma from "@/DB";
import React from "react";
import CommentView from "./CommentView";

type Props = {
  postId: string;
};

const CommentList = async ({ postId }: Props) => {
  return (
    <div>
      <CommentView parentId={null} postId={postId} />
    </div>
  );
};

export default CommentList;

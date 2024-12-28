import React from "react";
import { postWithData } from "@/DB/query/posts";
import Link from "next/link";
import paths from "@/path";

type Props = {
  fetchData: () => Promise<postWithData[]>;
};

const PostList = async ({ fetchData }: Props) => {
  const posts = await fetchData();
  return (
    <div className="flex flex-col gap-3">
      {posts.map((post) => (
        <Link
          href={paths.postShow(post.topic.slug, post.id)}
          key={post.id}
          className="p-2 border rounded cursor-pointer"
        >
          <h1 className="font-semibold text-xl mb-3">{post.title}</h1>
          <div className="flex gap-4">
            <p className="text-xs text-gray-500">By {post.user.name}</p>
            <p className="text-xs text-gray-500">
              {post._count.comments} Comments
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PostList;

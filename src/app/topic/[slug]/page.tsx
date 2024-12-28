import PostCreateForm from "@/components/post/PostCreateForm";
import PostList from "@/components/post/PostList";
import { fetchPostWithUserBySlug } from "@/DB/query/posts";
import React from "react";

type Props = {
  params: { slug: string };
};

const TopicShow = async (props: Props) => {
  const { slug } = props.params;
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-2xl font-semibold">{slug}</h1>
        <div className="flex flex-col gap-3 p-4">
          <PostList
            fetchData={() => fetchPostWithUserBySlug(slug)}
          />
        </div>
      </div>
      <div>
        <PostCreateForm slug={slug} />
      </div>
    </div>
  );
};
export default TopicShow;

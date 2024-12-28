import PostList from "@/components/post/PostList";
import TopicCreateForm from "@/components/topic/TopicCreateForm";
import TopicList from "@/components/topic/TopicList";
import { fetchTopPosts } from "@/DB/query/posts";

type Props = {};

const Home = async (props: Props) => {
  return (
    <div className="grid grid-cols-4">
      <div className="col-span-3 gap-3 p-3">
        <h1 className="text-2xl m-4 font-semibold">Top Topics</h1>
        <PostList fetchData={fetchTopPosts} />
      </div>
      <div>
        <TopicCreateForm />
        <TopicList />
      </div>
    </div>
  );
};

export default Home;

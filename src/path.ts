// Path Helpers
// insted of using `/${topicSlug}/posts/new` every time
// now we can just use path.postCreate(topicSlug)

const paths = {
  home: () => "/",
  topicShow: (topicSlug: string) => `/topic/${topicSlug}`,
  postCreate: (topicSlug: string) => `/topic/${topicSlug}/posts/new`,
  postShow: (topicSlug: string, postId: string) =>
    `/topic/${topicSlug}/posts/${postId}`,
};
export default paths;

"use server";
import * as auth from "@/auth";
import { createTopic } from "./create-topic";
import { createPost } from "./create-post";
import { createComment } from "./create-comment";

export const signIn = async () => {
  //   will get provider as parameter
  return auth.signIn("github");
};
export const signOut = async () => {
  return auth.signOut();
};

export { createTopic, createComment, createPost };

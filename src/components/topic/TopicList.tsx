import prisma from "@/DB";
import paths from "@/path";
import { Chip, Divider } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

type Props = {};

const TopicList = async (props: Props) => {
  const topics = await prisma.topic.findMany();
  const topicDate = topics.map((topic,ind) => (
    <Link key={ind} href={paths.topicShow(topic.slug)}>
      <Chip color="warning">{topic.slug}</Chip>
    </Link>
  ));
  return (
    <div className="shadow p-3 mt-3 border">
      <h1 className="font-semibold">Topics</h1>
      <Divider className="my-4" />
      <div className="flex gap-3 flex-wrap">{topicDate}</div>
    </div>
  );
};

export default TopicList;

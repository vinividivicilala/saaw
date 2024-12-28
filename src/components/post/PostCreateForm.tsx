"use client";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Input,
  Textarea,
  Button,
} from "@nextui-org/react";
import { createPost } from "@/actions";
import { useFormState } from "react-dom";
import FormButton from "../common/FormButton";

type Props = {
  slug: string;
};

const PostCreateForm = (props: Props) => {
  const [fieldErrors, createPostAction] = useFormState(
    createPost.bind(null, props.slug),
    {
      error: {},
    }
  );
  return (
    <Popover placement="left-start">
      <PopoverTrigger>
        <Button color="primary">Create Post</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form
          action={createPostAction}
          className="p-4 flex flex-col gap-4 w-80"
        >
          <h1 className="font-semibold text-center">Create a Topic</h1>
          <Input
            label="Title"
            name="title"
            labelPlacement="outside"
            placeholder="title of post"
            isInvalid={!!fieldErrors.error?.["title"]?.length}
            errorMessage={fieldErrors.error?.["title"]?.join(", ")}
          />
          <Textarea
            label="Content"
            name="content"
            labelPlacement="outside"
            placeholder="content of topic"
            isInvalid={!!fieldErrors.error?.["content"]?.length}
            errorMessage={fieldErrors.error?.["content"]?.join(", ")}
          />

          {fieldErrors.error?.["_formErrors"]?.map(
            (msg: string, ind: number) => (
              <DisplayError key={ind} msg={msg} />
            )
          )}
          <FormButton>Create</FormButton>
        </form>
      </PopoverContent>
    </Popover>
  );
};

const DisplayError = ({ msg }: { msg: string }) => {
  return <p className="text-red-700 text-sm">{msg}</p>;
};

export default PostCreateForm;

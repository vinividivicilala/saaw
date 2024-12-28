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
import { createTopic } from "@/actions";
import { useFormState } from "react-dom";
import FormButton from "../common/FormButton";

type Props = {};

const TopicCreateForm = (props: Props) => {
  const [fieldErrors, createTopicAction] = useFormState(createTopic, {
    error: {},
  });
  return (
    <Popover placement="left-start">
      <PopoverTrigger>
        <Button color="primary">Create Topic</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form
          action={createTopicAction}
          className="p-4 flex flex-col gap-4 w-80"
        >
          <h1 className="font-semibold text-center">Create a Topic</h1>
          <Input
            label="Name"
            name="topicName"
            labelPlacement="outside"
            placeholder="Name of topic"
            isInvalid={!!fieldErrors.error?.["name"]?.length}
            errorMessage={fieldErrors.error?.["name"]?.join(", ")}
          />
          {/* {fieldErrors.error?.["name"]?.map((msg: string, ind: number) => (
            <DisplayError msg={msg} />
          ))} */}
          <Textarea
            label="Description"
            name="description"
            labelPlacement="outside"
            placeholder="Description of topic"
            isInvalid={!!fieldErrors.error?.["description"]?.length}
            errorMessage={fieldErrors.error?.["description"]?.join(", ")}
          />
          {/* {fieldErrors.error?.["description"]?.map((msg: string, ind: number) => (
            <DisplayError msg={msg} />
          ))} */}

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

export default TopicCreateForm;

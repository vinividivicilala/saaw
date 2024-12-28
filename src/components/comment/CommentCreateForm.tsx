"use client";
import { createComment } from "@/actions";
import React, { useState } from "react";
import { useFormState } from "react-dom";
import FormButton from "../common/FormButton";
import { Textarea } from "@nextui-org/react";

type Props = {
  slug: string;
  postId: string;
  parentId: string | null;
  showInit?: Boolean;
};

const CommentCreateForm = ({ slug, postId, parentId, showInit }: Props) => {
  const [formState, action] = useFormState(
    createComment.bind(null, slug, postId, parentId),
    {
      errors: {},
    }
  );
  const [show, setShow] = useState(!!showInit);
  return (
    <form className="m-4 flex flex-col gap-2" action={action}>
      <h3
        className="px-5 rounded py-1.5 hover:bg-neutral-300 cursor-pointer w-fit text-xs"
        onClick={() => setShow(!show)}
      >
        Reply
      </h3>
      {show && (
        <>
          <Textarea
            name="message"
            label="Reply"
            labelPlacement="inside"
            isInvalid={!!formState?.errors?.message}
            errorMessage={formState?.errors?.message}
            placeholder="Enter your comment Here"
          />
          {formState?.errors._formError && (
            <p className="border rounded bg-red-300 p-2">
              {formState?.errors._formError}
            </p>
          )}

          <FormButton>Create Comment</FormButton>
        </>
      )}
    </form>
  );
};

export default CommentCreateForm;

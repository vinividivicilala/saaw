"use client";
import { Button } from "@nextui-org/react";
import React from "react";
import { useFormStatus } from "react-dom";

type Props = {
  children: React.ReactNode;
  color?:
    | "primary"
    | "default"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
};

const FormButton = ({ children, color }: Props) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      color={color || "default"}
      isLoading={pending}
      className="px-4 w-fit"
    >
      {children}
    </Button>
  );
};

export default FormButton;

// useFormState checks the nearest parent form if it is completed, method used(get/post), data sent

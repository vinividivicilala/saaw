"use client";
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Provider = (props: Props) => {
  return (
    <NextUIProvider>
      <SessionProvider>{props.children}</SessionProvider>
    </NextUIProvider>
  );
};

export default Provider;

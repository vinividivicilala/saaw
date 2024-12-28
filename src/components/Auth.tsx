"use client";
import { useSession } from "next-auth/react";
import React from "react";

type Props = {};

const Auth = (props: Props) => {
  const session = useSession();
  return <div>{JSON.stringify(session)}</div>;
};

export default Auth;

"use client";
// made this extra components as doing this on ssr comp makes us use auth which makes all pages dynamic
import { useSession } from "next-auth/react";
import React, { ReactNode } from "react";
import { signIn, signOut } from "@/actions";
import {
  Avatar,
  Button,
  NavbarItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
type Props = {};

const AuthContent = (props: Props) => {
  const session = useSession();
  const { user } = session.data || {};
  let NavBardata: ReactNode;
  if (user)
    NavBardata = (
      <NavbarItem className="shadow">
        <Popover placement="left">
          <PopoverTrigger>
            <Avatar src={user.image || ""} />
          </PopoverTrigger>
          <PopoverContent>
            <div className="p-2">
              <form action={signOut}>
                <Button type="submit">SignOut</Button>
              </form>
            </div>
          </PopoverContent>
        </Popover>
      </NavbarItem>
    );
  else if (session.status === "loading") NavBardata = <p>Loading...</p>;
  else
    NavBardata = (
      <>
        <NavbarItem>
          <form action={signIn}>
            <Button type="submit" color="primary">
              SignUp
            </Button>
          </form>
        </NavbarItem>

        <NavbarItem>
          <form action={signIn}>
            <Button type="submit" color="secondary">
              SignIn
            </Button>
          </form>
        </NavbarItem>
      </>
    );
  return NavBardata;
};

export default AuthContent;

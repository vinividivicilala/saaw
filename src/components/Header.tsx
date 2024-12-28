import {
  NavbarBrand,
  Navbar,
  NavbarContent,
  NavbarItem,
  Input,
} from "@nextui-org/react";
import AuthContent from "./AuthContent";
import Link from "next/link";
import paths from "@/path";

type Props = {};

const Header = async (props: Props) => {
  return (
    <Navbar className="shadow-md mb-4 ">
      <NavbarBrand className="cursor-pointer">
        <Link href={paths.home()}>Discuss</Link>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem>
          <Input />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <AuthContent />
      </NavbarContent>
    </Navbar>
  );
};

export default Header;

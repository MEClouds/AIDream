import React from "react";
import { Button } from "./ui/button";
import { Menu, icons } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import MobileSidebar from "./mobile-sidebar";

const Navbar = () => {
  return (
    <div className="flex items-center p-4">
      <MobileSidebar />
      <div className="flex w-full justify-end">
        <Button variant={"ghost"} className="mr-2">
          Arabic
        </Button>
        <Button variant={"ghost"} className="mr-2">
          <UserButton afterSignOutUrl="/" />
        </Button>
      </div>
    </div>
  );
};

export default Navbar;

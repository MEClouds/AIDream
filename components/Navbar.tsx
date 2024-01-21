import React from "react";
import { Button } from "./ui/button";
import { Menu, icons } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import MobileSidebar from "./mobile-sidebar";
import { getLimitCount } from "@/lib/use-limit";
import { checkSubscription } from "@/lib/subscription";

const Navbar = async () => {
  const LimitCount = await getLimitCount();
  const isSubscribed = await checkSubscription();
  return (
    <div className="flex items-center p-4">
      <MobileSidebar isSubscribed={isSubscribed} LimitCount={LimitCount} />
      <div className="flex w-full justify-end">
        {/* <Button variant={"ghost"} className="mr-2">
          Arabic
        </Button> */}
        <Button variant={"ghost"} className="mr-2">
          <UserButton afterSignOutUrl="/" />
        </Button>
      </div>
    </div>
  );
};

export default Navbar;

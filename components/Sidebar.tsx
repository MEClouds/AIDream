"use client";
import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import FreeCounter from "./free-counter";
const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

const routes = [
  {
    label: "Dashboard",
    emj: "🎛️",
    href: "/dashboard",
    color: "text-stone-300",
  },
  {
    label: "Conversation",
    emj: "💭",
    href: "/conversation",
    color: "text-violet-500",
  },
  {
    label: "Code Generation",
    emj: "👨‍💻",
    href: "/code",
    color: "text-sky-500",
  },
  {
    label: "Image Generation",
    emj: "🖌️",
    href: "/image",
    color: "text-pink-700",
  },
  {
    label: "Music Generation",
    emj: "🎶",
    href: "/music",
    color: "text-green-500",
  },
  {
    label: "Video Generation",
    emj: "🎞️",
    href: "/video",
    color: "text-orange-600",
  },

  {
    label: "Setting",
    emj: "⚙️",
    href: "/settings",
    // color: "text-white-500",
  },
];

interface SidebarProps {
  limitCount: number;
  isSubscribed: boolean;
}

const Sidebar = ({
  limitCount = 0,
  isSubscribed: isSubscribed = false,
}: SidebarProps) => {
  const pathname = usePathname();
  return (
    <div className=" space-y-4 py-4 flex flex-col h-full bg-slate-800 text-white">
      <div className="px-3 py-2 flex-1 ">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className=" relative w-8 h-8 mr-4 ">
            <Image fill alt="Logo" src="/logo.png" />
          </div>
          <h1 className={cn("text-2xl font-bold", montserrat.className)}>
            AIDream
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname == route.href
                  ? " text-white bg-white/10"
                  : " text-zinc-400"
              )}
              href={route.href}
              key={route.href}
            >
              <div className="flex items-center flex-1">
                <div className={"h-6 w-6 mx-2 text-center text-xl"}>
                  {route.emj}
                </div>
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <FreeCounter isSubscribed={isSubscribed} limitCount={limitCount} />
    </div>
  );
};

export default Sidebar;

'use client'

import Link from "next/link";
import Image from "next/image";
import { cn } from "../utils";
import { LayoutDashboard, HomeIcon, User2Icon } from "lucide-react";
import { usePathname } from "next/navigation";

const routes = [
  {
    label: "Ask a question",
    icon: LayoutDashboard,
    href: "/feed",
    color: "text-neutral-500",
  },
  {
    label: "Home",
    icon: HomeIcon,
    href: "/home",
    color: "text-neutral-500",
  },
  {
    label: "Sign in",
    icon: User2Icon,
    href: "/search",
    color: "text-neutral-500",
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="flex h-full flex-col space-y-4 bg-black py-4 text-white border-r-2 border-neutral-400/10">
      <div className="flex-1 px-3 py-2">
        <Link href="/">
          <div className="mb-14 flex items-center pl-3">
            <div className="relative mr-4 h-8 w-8 shadow-inner">
              <Image fill alt="Logo" src="/help-desk.png" />
            </div>
            <h1 className={cn("text-2xl font-bold")}>HelpDesk</h1>
          </div>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <div
              className={`
                group flex w-full cursor-pointer justify-start rounded-xl p-3 text-sm font-medium transition hover:bg-white/10 hover:text-white
                ${
                  pathname === route.href
                    ? "bg-white/10 text-white"
                    : "text-zinc-400"
                }
              `}
              key={route.href}
            >
              <Link key={route.href} href={route.href}>
                <div className="flex flex-1 items-center">
                  <route.icon className={cn("mr-3 h-5 w-5", route.color)} />
                  {route.label}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

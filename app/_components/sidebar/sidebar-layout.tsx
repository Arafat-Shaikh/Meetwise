"use client";

import { Copy, Menu } from "lucide-react";
import { useState } from "react";
import SmoothScroll from "../smooth-scroll";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { constructNow } from "date-fns";
import { getUser } from "@/action/user";
import useUserData from "@/hooks/use-userData";

interface SidebarLayoutProps {
  children: React.ReactNode;
}

const SidebarLayout = ({ children }: SidebarLayoutProps) => {
  return (
    <>
      <div className="min-h-screen flex bg-[#151a1d] md:px-8">
        <Sidebar />
        <div className="flex-1 w-full flex flex-col">
          <div className="h-14 border-b border-gray-800 flex items-center px-4 lg:hidden">
            <button className="text-gray-400 hover:text-white">
              <Menu className="h-6 w-6" />
            </button>
          </div>
          <main className="flex-1 overflow-hidden">
            <div className="h-full min-h-screen">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
};

export default SidebarLayout;

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const { data, isLoading } = useUserData();

  const currentPage = pathname
    .split("/")
    .filter(Boolean)
    .pop()
    ?.toLocaleLowerCase();

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 flex flex-col border-gray-800 transition-all duration-300 bg-gradient-to-t  ${
        isCollapsed ? "w-20" : "w-64"
      } lg:relative ${"-translate-x-full lg:translate-x-0 "}`}
    >
      <div className="w-64 text-gray-300 h-full flex flex-col my-10 mx-5 bg-transparent rounded-xl">
        <div className="px-4 py-3 text-2xl font-bold">
          <h1 className="">Meetwise</h1>
        </div>
        <div className="py-10 px-3 flex flex-col gap-y-2">
          {["Dashboard", "Appointments", "Availability"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLocaleLowerCase()}`}
              className={`text-lg  transition-all duration-300 cursor-pointer whitespace-nowrap py-2 px-6 rounded-full font-semibold w-fit  ${
                item.toLocaleLowerCase() === currentPage
                  ? "bg-gradient-to-t from-gray-700/10 to-gray-600/20 shadow-lg"
                  : "hover:text-gray-500"
              }`}
            >
              {item}
            </Link>
          ))}
        </div>
        <div className="mt-auto px-3 space-y-4">
          <Link
            className="text-base hover:text-gray-600 bg-transparent transition-all duration-300 cursor-pointer py-2 px-6 font-semibold w-full inline-flex items-start gap-x-3"
            href={`/${data?.username}`}
          >
            Public page <Copy className="h-3 w-3" />
          </Link>
          <Link
            className="text-lg bg-gradient-to-t from-black/10 to-gray-600/10 hover:bg-gray-700/10 transition-all duration-300 cursor-pointer py-2 px-6 rounded-full font-semibold w-full block"
            href={`settings`}
          >
            Settings
          </Link>
        </div>
      </div>
    </div>
  );
};

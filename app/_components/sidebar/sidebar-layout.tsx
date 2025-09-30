"use client";

import { Copy, Menu } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useUserData from "@/hooks/use-userData";

interface SidebarLayoutProps {
  children: React.ReactNode;
}

const SidebarLayout = ({ children }: SidebarLayoutProps) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const username = useUserData().data?.username;
  const pathname = usePathname();

  // disable background scroll when mobile sidebar is open
  if (typeof window !== "undefined") {
    if (mobileSidebarOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }

  return (
    <>
      <div className="min-h-screen flex bg-[#151a1d] md:px-8">
        <Sidebar />
        <div className="flex-1 w-full flex flex-col">
          {/* Mobile top bar with menu button */}
          <div className="h-14 border-b border-gray-800 flex items-center px-4 lg:hidden">
            <button
              className="text-gray-400 hover:text-white"
              onClick={() => setMobileSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
          {/* Mobile sidebar drawer with smooth animation and prettier design */}
          <div
            className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
              mobileSidebarOpen
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
            style={{ backdropFilter: "blur(6px)" }}
            onClick={() => setMobileSidebarOpen(false)}
          >
            <div
              className={`absolute left-0 top-0 h-full w-64 bg-[#181c20] shadow-2xl rounded-r-2xl flex flex-col transform transition-transform duration-300 ${
                mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-4 py-4 text-2xl font-bold border-b border-gray-800 flex items-center justify-between">
                <h1 className="tracking-tight text-white">Meetwise</h1>
                <button
                  className="text-gray-400 hover:text-white text-xl"
                  onClick={() => setMobileSidebarOpen(false)}
                >
                  &times;
                </button>
              </div>
              <div className="py-10 px-3 flex flex-col gap-y-2">
                {["Dashboard", "Appointments", "Availability"].map((item) => (
                  <Link
                    key={item}
                    href={`/${item.toLocaleLowerCase()}`}
                    className={`text-lg transition-all duration-300 cursor-pointer whitespace-nowrap py-2 px-6 rounded-full font-semibold w-fit ${
                      item.toLocaleLowerCase() ===
                      pathname
                        .split("/")
                        .filter(Boolean)
                        .pop()
                        ?.toLocaleLowerCase()
                        ? "bg-gradient-to-t from-gray-700/10 to-gray-600/20 shadow-lg"
                        : "hover:text-gray-500"
                    }`}
                    onClick={() => setMobileSidebarOpen(false)}
                  >
                    {item}
                  </Link>
                ))}
              </div>
              <div className="mt-auto px-3 space-y-4 mb-6">
                <Link
                  className="text-base hover:text-gray-600 bg-transparent transition-all duration-300 cursor-pointer py-2 px-6 font-semibold w-full inline-flex items-start gap-x-3"
                  href={`/${username}`}
                  onClick={() => setMobileSidebarOpen(false)}
                >
                  Public page <Copy className="h-3 w-3" />
                </Link>
                <Link
                  className="text-lg bg-gradient-to-t from-black/10 to-gray-600/10 hover:bg-gray-700/10 transition-all duration-300 cursor-pointer py-2 px-6 rounded-full font-semibold w-full block"
                  href={`settings`}
                  onClick={() => setMobileSidebarOpen(false)}
                >
                  Settings
                </Link>
              </div>
            </div>
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
          <div className="flex items-center gap-x-3 py-2 px-6 w-full">
            <Link
              className="text-base hover:text-gray-600 bg-transparent transition-all duration-300 cursor-pointer font-semibold inline-flex items-center"
              href={`/${data?.username}`}
              style={{ flex: 1 }}
            >
              Public page
            </Link>
            <div className="relative group">
              <button
                type="button"
                className="p-1 rounded transition"
                onClick={(e) => {
                  e.stopPropagation();
                  navigator.clipboard.writeText(
                    `${window.location.origin}/${data?.username}`
                  );
                }}
                aria-label={`${window.location.origin}/${data?.username}`}
              >
                <Copy className="h-4 w-4 text-gray-400 group-hover:text-neutral-500 transition" />
              </button>
              <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 text-xs bg-gray-800 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                Copy link
              </span>
            </div>
          </div>
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

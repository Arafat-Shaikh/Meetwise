"use client";

import { Copy, Menu, User } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useUserData from "@/hooks/use-userData";
import { signOut } from "next-auth/react";
import { baseUrl } from "@/lib/const";

interface SidebarLayoutProps {
  children: React.ReactNode;
}

const SidebarLayout = ({ children }: SidebarLayoutProps) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const data = useUserData().data;
  const pathname = usePathname();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { isLoading } = useUserData();

  // disable background scroll when mobile sidebar is open
  useEffect(() => {
    if (mobileSidebarOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [mobileSidebarOpen]);

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
                <Link href="/" className="tracking-tight text-white">
                  Meetvise
                </Link>
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
                <div className="flex items-center gap-x-3 py-2 px-6 w-full mb-2">
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
                          `${window?.location.origin}/${data?.username}`
                        );
                      }}
                      aria-label={`${baseUrl}/${data?.username}`}
                    >
                      <Copy className="h-4 w-4 text-gray-400 group-hover:text-neutral-500 transition" />
                    </button>
                    <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 text-xs bg-gray-800 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                      Copy link
                    </span>
                  </div>
                </div>
                <div className="relative">
                  <button
                    type="button"
                    className={`text-lg bg-black/20 w-full  text-white hover:bg-gray-700/5 transition-all duration-300 cursor-pointer py-2 px-8 rounded-full font-semibold flex items-center gap-3 justify-start`}
                    onClick={() => setShowProfileMenu((v) => !v)}
                  >
                    <User className="h-5 w-5 -ml-2" />
                    {isLoading
                      ? "Loading..."
                      : data?.name?.split(" ")[0] +
                          " " +
                          data?.name?.split(" ")[1] || "Profile"}
                  </button>
                  {showProfileMenu && (
                    <div className="absolute left-1/2 bottom-full mb-2 -translate-x-1/3 w-40 bg-[#181c20] border border-white/10 rounded-xl shadow-xl py-2 z-50 flex flex-col items-stretch">
                      <Link
                        href="/settings"
                        className="block px-4 py-2 text-white hover:bg-gray-800/60 rounded-lg transition-colors text-left"
                      >
                        Settings
                      </Link>
                      <button
                        type="button"
                        className="block w-full text-left px-4 py-2 text-red-400 hover:bg-gray-800/60 rounded-lg transition-colors"
                        onClick={() => {
                          signOut();
                        }}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
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
  // const [isCollapsed, setIsCollapsed] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const pathname = usePathname();
  const { data, isLoading } = useUserData();

  const currentPage = pathname
    .split("/")
    .filter(Boolean)
    .pop()
    ?.toLocaleLowerCase();

  // removed console.log(showProfileMenu);

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 flex flex-col border-gray-800 transition-all duration-300 bg-gradient-to-t  ${
        false ? "w-20" : "w-64"
      } lg:relative ${"-translate-x-full lg:translate-x-0 "}`}
    >
      <div className="w-60 text-gray-300 h-full flex flex-col my-10 mx-5 bg-transparent rounded-xl">
        <div className="px-4 py-3 text-2xl font-bold">
          <Link href="/" className="">
            Meetvise
          </Link>
        </div>
        <div className="py-10 px-3 flex flex-col gap-y-2">
          {["Dashboard", "Appointments", "Availability"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLocaleLowerCase()}`}
              className={`relative text-lg transition-all rounded-full duration-300 cursor-pointer whitespace-nowrap py-2 px-6 font-semibold w-fit  ${
                item.toLocaleLowerCase() === currentPage
                  ? "bg-gradient-to-t from-gray-700/10 to-gray-600/20 shadow-lg"
                  : "hover:text-gray-500"
              }`}
            >
              {item.toLocaleLowerCase() === currentPage && (
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-950 to-emerald-50 opacity-10 rounded-full" />
              )}
              {item}
            </Link>
          ))}
        </div>

        <div className="mt-auto px-3 space-y-4 mb-6">
          <div className="flex items-center gap-x-3 py-2 px-6 w-full mb-2">
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
                    `${window?.location.origin}/${data?.username}`
                  );
                }}
                aria-label={`${baseUrl}/${data?.username}`}
              >
                <Copy className="h-4 w-4 text-gray-400 group-hover:text-neutral-500 transition" />
              </button>
              <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 text-xs bg-gray-800 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                Copy link
              </span>
            </div>
          </div>
          <div className="relative">
            <button
              type="button"
              className={`text-lg bg-black/20 w-full  text-white hover:bg-gray-700/5 transition-all duration-300 cursor-pointer py-2 px-8 rounded-full font-semibold flex items-center gap-3 justify-start`}
              onClick={() => setShowProfileMenu((v) => !v)}
            >
              <User className="h-5 w-5 -ml-2" />
              {isLoading
                ? "Loading..."
                : data?.name?.split(" ")[0] + " " + data?.name?.split(" ")[1] ||
                  "Profile"}
            </button>
            {showProfileMenu && (
              <div className="absolute left-1/2 bottom-full mb-2 -translate-x-1/3 w-40 bg-[#181c20] border border-white/10 rounded-xl shadow-xl py-2 z-50 flex flex-col items-stretch">
                <Link
                  href="/settings"
                  className="block px-4 py-2 text-white hover:bg-gray-800/60 rounded-lg transition-colors text-left"
                >
                  Settings
                </Link>
                <button
                  type="button"
                  className="block w-full text-left px-4 py-2 text-red-400 hover:bg-gray-800/60 rounded-lg transition-colors"
                  onClick={() => {
                    signOut();
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
        {/* )} */}
      </div>
    </div>
  );
};

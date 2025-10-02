"use client";

import { Button } from "@/components/ui/button";
import { bookings } from "@/lib/const";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Phone, Plus, Video } from "lucide-react";
import useBookings from "@/hooks/use-bookings";
import { Booking } from "@/lib/generated/prisma";
import Link from "next/link";
import useUserData from "@/hooks/use-userData";
import { useRouter } from "next/navigation";

const tabs = ["Today", "This Week", "This Month"];

const AppointmentsPage = () => {
  const [eventType, setEventType] = useState<string>("Today");
  const { data: rangedBookings, isLoading } = useBookings();
  const [selectedBookings, setSelectedBookings] = useState<Booking[]>(
    rangedBookings?.today || []
  );
  const { data: userInfo } = useUserData();
  const router = useRouter();

  // Calculate total and completed bookings
  const totalBookings = rangedBookings?.allBookings?.length || 0;
  const completedBookings =
    rangedBookings?.allBookings?.filter((b) => new Date(b.date) < new Date())
      .length || 0;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="w-4 h-4" />;
      case "phone":
        return <Phone className="w-4 h-4" />;
      case "in-person":
        return <MapPin className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  useEffect(() => {
    if (eventType === "Today") {
      setSelectedBookings(rangedBookings?.today || []);
    } else if (eventType === "This Week") {
      setSelectedBookings(rangedBookings?.thisWeek || []);
    } else if (eventType === "This Month") {
      setSelectedBookings(rangedBookings?.nextMonth || []);
    }
  }, [eventType, rangedBookings]);

  return (
    <div className="h-full w-full bg-gradient-to-t bg-[#151a1d] flex flex-col gap-y-12 lg:p-10 lg:px-40 p-2 sm:p-6 md:p-8 max-h-screen overflow-y-auto scrollbar-hide">
      {/* Responsive Bookings header and stats */}
      <div className="w-full px-4">
        {/* Mobile: Bookings + New button row, stats below */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-2">
          <div className="flex flex-row items-center justify-between md:block w-full md:w-auto">
            <h2 className="text-2xl text-white font-semibold">Bookings</h2>
            <Button
              size={"sm"}
              onClick={() => router.push(`/${userInfo?.username}`)}
              className={`rounded-full bg-gradient-to-b from-white/90 via-white/70 to-white/40 border-black/60 border md:hidden ml-2`}
            >
              New <Plus className="h-3 w-3" />
            </Button>
          </div>
          {/* Stats: below on mobile, right on md+ */}
          <div
            // className="rounded-full h-[50px] flex justify-center items-center font-mono text-xs text-[#a1a1a1] bg-[linear-gradient(145deg,_#2e2d2d,_#212121)] shadow-[inset_5px_5px_8px_#1a1a1a,inset_-5px_-5px_10px_#1a1a1a,-2px_-6px_18px_#1b1d2b,6px_6px_18px_#1b1d2b]transition-all duration-[500ms] active:shadow-[1px_1px_13px_#12141c,-1px_-1px_33px_#2a2e45]active:text-[#d6d6d6]active:duration-[100ms]"
            className={`flex flex-row md:flex-row md:items-center md:gap-x-20 justify-between mt-4 mx-4 md:mt-0 ${""} px-6 text-white md:justify-start`}
          >
            <p className={`inline-flex text-center gap-x-1 flex-col`}>
              <span className="text-lg lg:text-xl font-medium">
                {totalBookings}
              </span>
              <span className="text-gray-500 leading-4">Total</span>
            </p>
            <p className={`inline-flex gap-x-1 text-center flex-col`}>
              <span className="text-lg lg:text-xl font-medium">
                {completedBookings}
              </span>
              <span className="text-gray-500 leading-4">Completed</span>
            </p>
            {/* Cancelled section left blank for now */}
            <p className={`inline-flex text-center gap-x-1 flex-col`}>
              <span className="text-lg lg:text-xl font-medium">13</span>
              <span className="text-gray-500 leading-4">Cancelled</span>
            </p>
          </div>
          {/* New button for md+ screens */}
          <div className="hidden md:block">
            <Button
              onClick={() => router.push(`/${userInfo?.username}`)}
              className={` relative rounded-full bg-gradient-to-t from-neutral-300/10  to-neutral-700/10 border border-white/10`}
            >
              <div className="bg-gradient-to-tr rounded-full absolute inset-0 from-emerald-200/10 to-emerald-300/10" />
              New <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full rounded-xl p-6 pb-10 shadow-xl shadow-white/10 border-2 border-[#343a40]  bg-gradient-to-br from-[#161a1d] via-[#212529] to-[#161a1d]">
        <div className="w-fit rounded-xl bg-[#151a18] px-0.5 py-0.5">
          <div className="relative flex space-x-1 m-0.5">
            {tabs.map((tab) => {
              const isActive = eventType === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setEventType(tab)}
                  className={`relative z-10 text-base text-gray-300 w-fit rounded-lg px-4 py-0.5 border shadow-lg transition-all duration-300 ${
                    isActive
                      ? "border-slate-600/10"
                      : "bg-transparent border-slate-800/10"
                  }`}
                >
                  {tab}
                  {isActive && (
                    <motion.div
                      layoutId="tabBackground"
                      className="absolute inset-0 z-[-1] rounded-lg bg-gradient-to-t from-black/20 to-white/10"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
        <div className="py-4 h-full min-h-[70vh]">
          <Card className="bg-[#161a1d] h-full border-gray-700/30 shadow-inner border-[2px] ">
            <CardContent className="p-4 h-full">
              {/* todo create component which could sort no bookings when their is no bookings in selectedBookings */}
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <svg
                    className="animate-spin h-8 w-8 text-gray-400 mb-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    ></path>
                  </svg>
                  <p className="text-gray-400 text-lg font-medium">
                    Loading your bookings...
                  </p>
                </div>
              ) : selectedBookings.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <Calendar className="w-10 h-10 text-gray-500 mb-3" />
                  <p className="text-gray-400 text-lg font-semibold mb-1">
                    No bookings found
                  </p>
                  <p className="text-gray-500 text-sm text-center">
                    You have no bookings for this period.
                    <br />
                    Try selecting a different tab or create a new booking.
                  </p>
                </div>
              ) : null}
              {selectedBookings.length > 0 &&
                selectedBookings.map((booking, index) => (
                  <div key={booking.id} className="">
                    <div className="group hover:bg-gray-750 transition-all duration-200 px-4 py-5 rounded-lg lg:w-fit lg:flex items-center justify-center w-full overflow-hidden">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col-reverse md:flex-row items-center md:items-start space-x-4 flex-1 text-center md:text-left gap-y-2">
                          {/* Date and Time */}
                          <div className="flex flex-col items-center justify-center bg-gradient-to-t from-black/20 to-white/10 rounded-lg p-3 min-w-[220px]">
                            <div className="text-sm font-medium text-gray-100">
                              {booking.date.toString().split(" ")[0]}{" "}
                              {booking.date.toString().split(" ")[1]}
                              <span className=" ml-2 text-xs text-gray-400 mt-1">
                                {booking.date.toString().split(" ")[2]}
                              </span>
                            </div>

                            <div className="mt-1 flex items-center text-xs text-gray-300">
                              <Clock className="w-3 h-3 mr-1" />
                              {booking.date.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>

                            <div className="mt-2 flex flex-row gap-x-4">
                              <Link
                                href={`${booking?.meetingLink ?? "/"}`}
                                className="flex items-center space-x-1 text-gray-300"
                              >
                                {getTypeIcon("video")}
                                <span className="capitalize">
                                  {booking.meetingType || "video"}
                                </span>
                              </Link>

                              <div className="flex items-center space-x-1 text-gray-400">
                                <Clock className="w-3 h-3" />
                                <span>{booking.duration}min</span>
                              </div>
                            </div>
                          </div>

                          {/* Meeting Details */}
                          <div className="flex-1 flex flex-col md:items-start items-center">
                            <div className="flex items-center justify-start mb-2">
                              <h3 className="text-lg md:hidden font-semibold text-gray-100 truncate">
                                {booking.title.length > 30
                                  ? `${booking.title.slice(0, 20)}...`
                                  : booking.title}
                              </h3>
                              <h3 className="hidden md:block text-lg font-semibold text-gray-100 truncate">
                                {booking.title}
                              </h3>
                            </div>

                            <div className="flex items-center space-x-4 text-sm text-gray-300">
                              <div className="flex items-center space-x-2">
                                <div>
                                  <div className="font-medium text-gray-200">
                                    {booking.clientName}
                                  </div>
                                  <div className="text-xs text-gray-400">
                                    {booking.clientEmail}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Separator line - don't show after the last item */}
                    {index < bookings.length - 1 && (
                      <div className="flex justify-center py-2">
                        <div className="w-2/4 border-b border-gray-600/40 md:border-gray-600/20"></div>
                      </div>
                    )}
                  </div>
                ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsPage;

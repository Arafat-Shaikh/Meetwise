"use client";

import { Button } from "@/components/ui/button";
import { bookings, darkButtonStyles, dummyBookings } from "@/lib/const";
import { EventTypes } from "@/lib/types";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  Clock,
  Edit,
  Eye,
  MapPin,
  MoreHorizontal,
  Phone,
  Plus,
  Video,
  X,
} from "lucide-react";

const tabs = ["Upcoming", "Completed", "Canceled"];

const AppointmentsPage = () => {
  const [eventType, setEventType] = useState<any>("Upcoming");

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
  return (
    <div className="h-full w-full bg-gradient-to-t bg-[#151a1d] flex flex-col gap-y-12 lg:p-10 p-2 sm:p-6 md:p-8 max-h-screen overflow-y-auto scrollbar-hide">
      <div className="flex items-center justify-between w-full px-4">
        <div className="rounded-lg py-2 flex justify-between items-center gap-x-20 ">
          <h2 className="text-2xl text-white font-semibold">Bookings</h2>
          <div className={`${darkButtonStyles} px-6 gap-x-10`}>
            <p className={`inline-flex text-center gap-x-1 flex-col`}>
              <span className="text-lg lg:text-xl font-medium">260</span>
              <span className="text-gray-500">Total</span>
            </p>
            <p className={`inline-flex gap-x-1 text-center flex-col`}>
              <span className="text-lg lg:text-xl font-medium">400</span>
              <span className="text-gray-500">Completed</span>
            </p>
            <p className={`inline-flex text-center gap-x-1 flex-col`}>
              <span className="text-lg lg:text-xl font-medium">113</span>
              <span className="text-gray-500">Cancelled</span>
            </p>
          </div>
        </div>
        <div>
          <Button className="rounded-full bg-black border-gray-600/50 border">
            New <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>
      <div
        className="w-full rounded-xl p-6 shadow-xl shadow-white/10 border-2 border-[#343a40]  bg-gradient-to-br from-[#161a1d] via-[#212529] to-[#161a1d"
      // style={{ boxShadow: "0 10px 20px rgba(20, 160, 124, 0.1)" }}
      >
        <div className="w-fit rounded-xl bg-[#161411] px-0.5 py-0.5">
          <div className="relative flex space-x-1 m-0.5">
            {tabs.map((tab) => {
              const isActive = eventType === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setEventType(tab)}
                  className={`relative z-10 text-base text-gray-300 w-fit rounded-lg px-4 py-0.5 border shadow-lg transition-all duration-300 ${isActive
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
        <div className="pb-4 pt-8 w-full">
          <Card className="bg-[#161a1d] border-gray-700/30 shadow-inner border-[2px]">
            <CardContent className="p-4">
              {bookings.map((booking, index) => (
                <div key={booking.id} className="">
                  <div className="group hover:bg-gray-750 transition-all duration-200 px-4 py-5 rounded-lg lg:w-fit lg:flex items-center justify-center w-full overflow-hidden">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col-reverse md:flex-row items-center md:items-start space-x-4 flex-1 text-center md:text-left gap-y-2">
                        {/* Date and Time */}
                        <div className="flex flex-col items-center justify-center bg-gradient-to-t from-black/20 to-white/10 rounded-lg p-3 min-w-[220px]">
                          <div className="text-sm font-medium text-gray-100">
                            {booking.date.split(" ")[0]}{" "}
                            {booking.date.split(" ")[1]}
                            <span className=" ml-2 text-xs text-gray-400 mt-1">
                              {booking.date.split(" ")[2]}
                            </span>
                          </div>

                          <div className="mt-1 flex items-center text-xs text-gray-300">
                            <Clock className="w-3 h-3 mr-1" />
                            {booking.time}
                          </div>

                          <div className="mt-2 flex flex-row gap-x-4">
                            <div className="flex items-center space-x-1 text-gray-300">
                              {getTypeIcon(booking.type)}
                              <span className="capitalize">{booking.type}</span>
                            </div>

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
                                  {booking.client.firstName}{" "}
                                  {booking.client.lastName}
                                </div>
                                <div className="text-xs text-gray-400">
                                  {booking.client.email}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      {/* <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View Recording
                        </Button>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-300 hover:bg-gray-700"
                            >
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="w-48 bg-gray-800 border-gray-700"
                          >
                            <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Booking
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                              <Calendar className="w-4 h-4 mr-2" />
                              Reschedule
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                              <Eye className="w-4 h-4 mr-2" />
                              Check Recordings
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-gray-700" />
                            <DropdownMenuItem className="text-red-400 hover:bg-gray-700">
                              <X className="w-4 h-4 mr-2" />
                              Cancel Event
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div> */}
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

// model Booking {
//   id          String    @id @default(cuid())
//   hostId      String    // The logged-in user who owns the calendar
//   eventTypeId String
//   attendeeEmail String
//   attendeeName  String
//   startTime   DateTime
//   endTime     DateTime
//   status      BookingStatus @default(SCHEDULED)
//   location    String?
//   notes       String?
//   createdAt   DateTime  @default(now())

//   host        User      @relation(fields: [hostId], references: [id])
//   eventType   EventType @relation(fields: [eventTypeId], references: [id])
// }

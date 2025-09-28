import { useState } from "react";
import { Clock, User, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MeetingType } from "@/lib/generated/prisma";
import { getAppointmentTimes } from "@/lib/utils";
import Link from "next/link";

interface Booking {
  id: string;
  clientName: string;
  date: Date;
  meetingType?: MeetingType;
  duration: number;
  meetingLink?: string;
}

interface UpcomingAppointmentsProps {
  bookings: Booking[];
}

const PAGE_SIZE = 4;

const UpcomingAppointments = ({ bookings }: UpcomingAppointmentsProps) => {
  const [page, setPage] = useState(0);

  // Only show future appointments
  const now = new Date();
  const upcoming = bookings
    .filter((a) => new Date(a.date) > now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const startIdx = page * PAGE_SIZE;
  const endIdx = startIdx + PAGE_SIZE;
  const visible = upcoming.slice(startIdx, endIdx);

  const canGoNext = endIdx < upcoming.length;
  const canGoPrev = page > 0;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-600/20 text-green-400";
      case "pending":
        return "bg-yellow-600/20 text-yellow-400";
      case "canceled":
        return "bg-red-600/20 text-red-400";
      default:
        return "bg-gray-600/20 text-gray-400";
    }
  };

  return (
    <div className="bg-[#161a1d] rounded-2xl p-4 sm:p-6 border border-[#2e2d2d]">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center gap-3">
          <Calendar size={18} className="text-teal-400 sm:w-5 sm:h-5" />
          <h3 className="text-base sm:text-lg font-semibold text-gray-100">
            Upcoming Appointments
          </h3>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            className="h-8 w-8 p-0 hover:bg-nav-button-hover"
            disabled={!canGoPrev}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setPage((p) => p + 1)}
            className="h-8 w-8 p-0 hover:bg-nav-button-hover"
            disabled={!canGoNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {visible.length === 0 ? (
          <div className="text-gray-400 text-sm">No upcoming appointments.</div>
        ) : (
          visible.map((appointment) => (
            <div
              key={appointment.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-[#2e2d2d]/30 rounded-xl hover:bg-[#2e2d2d]/50 transition-all duration-200 gap-3 sm:gap-4"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="p-2 bg-teal-600/20 rounded-lg flex-shrink-0">
                  <User size={14} className="text-teal-400 sm:w-4 sm:h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-gray-100 font-medium text-sm sm:text-base">
                    {appointment.clientName}
                  </h4>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
                    <Clock size={10} className="sm:w-3 sm:h-3" />
                    <span>
                      {
                        getAppointmentTimes(
                          appointment.date,
                          appointment.duration
                        ).formattedStart
                      }{" "}
                      -{" "}
                      {
                        getAppointmentTimes(
                          appointment.date,
                          appointment.duration
                        ).formattedEnd
                      }
                    </span>
                    <span>•</span>
                    <span>{appointment.date.toLocaleDateString()}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {appointment.meetingType}
                  </p>
                </div>
              </div>

              <div className="flex gap-x-2 items-center">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    "confirmed"
                  )} `}
                >
                  {"confirmed"}
                </span>
                <div className="flex items-center gap-2 my-1">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 sm:h-8 px-2 sm:px-3 text-xs border-gray-600 text-gray-300 hover:bg-[#2e2d2d]"
                  >
                    Reschedule
                  </Button>
                  <Link
                    href={
                      appointment.meetingType === MeetingType.google_meet
                        ? appointment.meetingLink || "#"
                        : "#"
                    }
                    className="h-6 sm:h-7 px-2 sm:px-3 text-xs bg-white hover:bg-white/90 rounded-full text-neutral-800 font-medium flex items-center justify-center transition-colors duration-150"
                  >
                    Join
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UpcomingAppointments;

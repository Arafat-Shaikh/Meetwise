"use client";

import { CalendarDays, Clock, MapPin, User, ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useParams } from "next/navigation";
import CalendarLoader from "@/app/_components/calendar-loader";
import useBookingInfo from "@/hooks/use-booking-info";

export default function BookingIdPage() {
  const { bookingId } = useParams();
  const { data: bookingDetails, isLoading } = useBookingInfo(
    bookingId.toString()
  );

  if (isLoading) {
    return <CalendarLoader />;
  }

  if (!bookingDetails) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-950 p-4 sm:p-6">
        <div className="text-center text-neutral-400">
          <p>Booking not found.</p>
          <Link href="/" className="text-green-400 hover:underline">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  // Get client's timezone
  const clientTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Parse and convert the booking date to client's timezone
  const bookingDate = new Date(bookingDetails.date);
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: clientTimeZone,
  });

  // Format time as "10:30am" (lowercase, no space)
  const rawTime = bookingDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: clientTimeZone,
  });
  // Remove space before am/pm and make it lowercase
  const timeFormatted = rawTime.replace(/\s?(AM|PM)$/i, (match) =>
    match.trim().toLowerCase()
  );

  const bookingDateFormatted = dateFormatter.format(bookingDate);

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950 p-4 sm:p-6">
      <div className="w-full max-w-[330px]">
        {/* Header Section - Directly on the page */}
        <div className="mb-8 text-center">
          <div className="mb-4 text-green-400">
            <svg
              className="mx-auto h-16 w-16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-neutral-50 sm:text-2xl">
            Booking Confirmed!
          </h1>
          <p className="mt-3 text-lg text-neutral-400">
            Your appointment is all set.
          </p>
          {false && (
            <p className="mt-1 text-sm text-neutral-500">
              Please check your email for confirmation details.
            </p>
          )}
        </div>

        {/* Single Card for all details */}

        <Card className="rounded-2xl relative border-none bg-neutral-900 p-8 shadow-2xl">
          <div className="absolute inset-1 rounded-2xl border-[5px] shadow-md border-neutral-800/80 blur-sm pointer-events-none" />

          <div className="flex flex-col px-6 gap-y-4">
            <div className="flex items-center w-full">
              <p className="w-[20%] inline-flex justify-end mr-8">
                <CalendarDays className="h-5 w-5 flex-shrink-0 text-neutral-600 text-right" />
              </p>
              <p className="text-lg w-[70%] font-medium text-neutral-300 text-left">
                {bookingDateFormatted}
              </p>
            </div>

            {/* Time */}
            <div className="flex items-center w-full">
              <p className="w-[20%] inline-flex justify-end mr-8">
                <Clock className="h-5 w-5 flex-shrink-0 text-neutral-600 text-right" />
              </p>
              <p className="text-lg w-[70%] font-medium text-neutral-300 text-left">
                {timeFormatted}
              </p>
            </div>
            {/* Location */}
            <div className="flex items-center w-full">
              <p className="w-[20%] inline-flex justify-end mr-8">
                <MapPin className="h-5 w-5 flex-shrink-0 text-neutral-600 text-right" />
              </p>
              <p className="text-lg w-[70%] font-medium text-neutral-300 text-left">
                {typeof bookingDetails.meetingLink === "string" &&
                bookingDetails.meetingLink ? (
                  <Link
                    href={bookingDetails.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400/70 underline hover:text-green-300 transition-colors duration-150 cursor-pointer"
                    title={bookingDetails.meetingLink}
                  >
                    {bookingDetails.meetingType}
                  </Link>
                ) : (
                  bookingDetails.meetingType
                )}
              </p>
            </div>
            {/* Host */}
            <div className="flex items-center w-full">
              <p className="w-[20%] inline-flex justify-end mr-8">
                <User className="h-5 w-5 flex-shrink-0 text-neutral-600 text-right" />
              </p>
              <p className="text-lg w-[70%] font-medium text-neutral-300 text-left">
                {bookingDetails.user.name}
              </p>
            </div>
            {/* Duration */}
            <div className="flex items-center w-full">
              <p className="w-[20%] inline-flex justify-end mr-8">
                <Clock className="h-5 w-5 flex-shrink-0 text-neutral-600 text-right" />
              </p>
              <p className="text-lg w-[70%] font-medium text-neutral-300 text-left">
                {bookingDetails.duration} minutes
              </p>
            </div>
          </div>
        </Card>

        <div className="text-white mt-8 text-center">
          <ArrowLeft className="inline-block mr-2 h-4 w-4" />
          <Link href={"/"}>Go Home</Link>
        </div>
      </div>
    </div>
  );
}

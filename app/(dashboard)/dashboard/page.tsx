"use client";

import ClientOnly from "@/app/_components/client-only";
import BookingChart from "@/app/_components/dashboard/booking-chart";
import MetricsCards from "@/app/_components/dashboard/metrics-cards";
import QuickActions from "@/app/_components/dashboard/quick-actions";
import UpcomingAppointments from "@/app/_components/dashboard/upcoming-appointments";
import useBookings from "@/hooks/use-bookings";
import useUserData from "@/hooks/use-userData";
import { Booking } from "@/lib/generated/prisma";
import React from "react";

const DashboardPage = () => {
  const allBookings = useBookings();

  // Extract total bookings and unique clients (by email)
  const totalBookings = allBookings.data?.allBookings;
  const allClients = Array.from(
    new Set(
      (allBookings.data?.allBookings || []).map(
        (b: { clientEmail: string }) => b.clientEmail
      )
    )
  );
  // You can now use totalBookings and allClients in your UI

  return (
    <div className="h-full w-full bg-[#151a1d] flex flex-col gap-y-12 lg:p-10 p-2 sm:p-6 md:p-8 max-h-screen overflow-y-auto scrollbar-hide">
      <div className="w-full rounded-xl py-6 px-2 md:px-6 shadow-xl shadow-white/10 border-2 border-[#343a40] bg-gradient-to-br from-[#161a1d] via-[#212529] to-[#161a1d h-fit ">
        <div className="max-w-7xl mx-auto text-white">
          {/* Metrics Cards */}
          <div className="mb-6 sm:mb-8">
            <MetricsCards
              totalBookings={totalBookings}
              allClients={allClients}
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
            <div className="xl:col-span-2 order-1">
              <ClientOnly>
                <BookingChart allBookings={totalBookings} />
              </ClientOnly>
            </div>

            <div className="space-y-4 sm:space-y-6 order-2 xl:order-2">
              <QuickActions />
            </div>
          </div>

          {/* Charts & Analytics */}
          <div className="grid grid-cols-1 ">
            <UpcomingAppointments
              bookings={(totalBookings || []).map((b: Booking) => ({
                id: b.id,
                clientName: b.clientName,
                date: new Date(b.date),
                meetingType: b.meetingType || undefined,
                duration: b.duration,
                meetingLink: b.meetingLink || undefined,
              }))}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

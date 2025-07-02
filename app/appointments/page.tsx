"use client";

import { Button } from "@/components/ui/button";
import { dummyBookings } from "@/lib/const";

const AppointmentsPage = () => {
  return (
    <div className=" h-full w-full bg-gradient-to-t bg-[#000814] flex flex-col lg:p-10 p-2 sm:p-6 md:p-8 gap-y-4 max-h-screen overflow-y-auto">
      <div className="flex items-center justify-between w-full px-4">
        <div className="rounded-lg px-3 py-2 flex justify-between items-center gap-x-20 ">
          <h2 className="text-2xl font-semibold">Bookings</h2>
          <div className="flex w-full justify-between gap-x-4 items-center">
            <p className="text-sm  bg-violet-50/80 rounded-full py-3 px-5 space-x-1">
              <span className="text-2xl font-medium">260</span>
              <span className="text-gray-500">Total</span>
            </p>
            <p className="text-sm  bg-violet-50/80 rounded-full py-3 px-5 space-x-1">
              <span className="text-2xl font-medium">400</span>
              <span className="text-gray-500">Completed</span>
            </p>
            <p className="text-sm  bg-violet-50/80 rounded-full py-3 px-5 space-x-1">
              <span className="text-2xl font-medium">113</span>
              <span className="text-gray-500">Cancelled</span>
            </p>
          </div>
        </div>
        <div>
          <Button className="rounded-full">New +</Button>
        </div>
      </div>
      <div className=" w-full rounded-xl p-2 bg-[#212529]">
        <div>
          <h1 className="text-lg text-gray-300">filter</h1>
        </div>
        <div>
          {dummyBookings.map((booking, index) => (
            <div className="py-8">{booking.attendeeName}</div>
          ))}
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

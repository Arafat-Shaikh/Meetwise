"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/global-prisma";
import { addDays, startOfDay, endOfDay } from "date-fns";
import { toZonedTime, fromZonedTime } from "date-fns-tz";

// Return 3 groups: Today, This Week, Next 30 Days
export async function getBookingsByRange(timezoneParam?: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("User not authenticated");

  const userId = session.user.id;

  // 1. Get user timezone (must be saved in user profile)
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { timezone: true },
  });

  const tz = timezoneParam || user?.timezone || "UTC";

  const now = new Date();

  // this is how start time of the day(user's timezone) represented in utc timezone
  const todayStart = fromZonedTime(startOfDay(toZonedTime(now, tz)), tz);
  const todayEnd = fromZonedTime(endOfDay(toZonedTime(now, tz)), tz);
  const weekEnd = fromZonedTime(endOfDay(toZonedTime(addDays(now, 7), tz)), tz);
  const monthEnd = fromZonedTime(
    endOfDay(toZonedTime(addDays(now, 30), tz)),
    tz
  );

  const allBookings = await prisma.booking.findMany({
    where: {
      userId,
      date: {
        gte: todayStart,
        lte: monthEnd,
      },
    },
    orderBy: { date: "asc" },
  });

  const convertedBookings = allBookings.map((b) => ({
    ...b,
    date: toZonedTime(b.date, tz),
  }));

  const result = {
    today: [] as typeof convertedBookings,
    thisWeek: [] as typeof convertedBookings,
    nextMonth: [] as typeof convertedBookings,
    allBookings: convertedBookings,
  };

  for (const b of convertedBookings) {
    if (b.date >= todayStart && b.date <= todayEnd) {
      result.today.push(b);
    }
    if (b.date >= todayStart && b.date <= weekEnd) {
      result.thisWeek.push(b);
    }
    if (b.date >= todayStart && b.date <= monthEnd) {
      result.nextMonth.push(b);
    }
  }

  return result ?? { today: [], thisWeek: [], nextMonth: [], allBookings: [] };
}

"use server";
import prisma from "@/lib/global-prisma";
import {
  filterBookedSlots,
  generateTimeSlots,
  getDayRangeInUserTimezone,
} from "@/lib/utils";
import { formatInTimeZone, fromZonedTime, toZonedTime } from "date-fns-tz";
import { getAccessTokenVerified } from "./create-booking";
import { GoogleCalendarService } from "@/lib/googleCalendar";
import { addMinutes, format, parse } from "date-fns";

export async function getTimeSlots(
  username: string,
  date: Date,
  timezone: string
) {
  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
      timezone: true,
      googleAccessToken: true,
      googleRefreshToken: true,
      googleTokenExpiry: true,

      availability: {
        select: {
          day: true,
          enabled: true,

          slots: {
            select: {
              startTime: true,
              endTime: true,
            },
          },
        },
      },
    },
  });

  if (!user?.id || !user?.timezone) {
    throw new Error("User not found");
  }

  const userZonedDate = toZonedTime(date, user.timezone);
  const dayRange = getDayRangeInUserTimezone(userZonedDate, user.timezone);
  user.googleAccessToken = await getAccessTokenVerified(user);

  const calendarService = new GoogleCalendarService(
    user.googleAccessToken!,
    user.googleRefreshToken!
  );

  const googleCalendarEvents = await calendarService.getEvents(
    "primary",
    dayRange
  );

  const cleanedEvents = googleCalendarEvents
    .filter((event) => event.status === "confirmed")
    .map((event) => ({
      id: event.id,
      summary: event.summary,
      start: event.start?.dateTime,
      end: event.end?.dateTime,
    }));

  const dayName = format(userZonedDate, "EEEE");

  const dayAvailability = user.availability.find(
    (avail) => avail.day === dayName
  );

  if (!dayAvailability || !dayAvailability.enabled) {
    return { timeSlots: [] };
  }

  let allSlots: Date[] = [];

  for (const slot of dayAvailability.slots) {
    /**
     * Converts the given date to the user's timezone and formats it as a 12-hour time string (e.g., "3:45pm").
     */
    const start12hr = formatInTimeZone(
      new Date(slot.startTime),
      user.timezone,
      "h:mma"
    ).toLowerCase(); // "9:00am"
    const end12hr = formatInTimeZone(
      new Date(slot.endTime),
      user.timezone,
      "h:mma"
    ).toLowerCase(); // "5:00pm"

    // example: "9:00am" and "5:00pm and 30 minutes interval"
    const slotTimes = generateTimeSlots(start12hr, end12hr, 30);
    for (const slot of slotTimes) {
      // Combine date and timeStr into full datetime in user's timezone
      // Example: "2025-07-28 9:00am"
      const combined = `${format(userZonedDate, "yyyy-MM-dd")} ${slot}`;

      // Parse this string into a Date in user's TZ
      // Example: parse("2025-07-28 9:00am", "yyyy-MM-dd h:mma", new Date()) => Date object in user's TZ
      const naive = parse(combined, "yyyy-MM-dd h:mma", new Date());

      // Convert the parsed date to UTC
      // Example: fromZonedTime(naive, user.timezone) => Date object in UTC
      const utcSlot = fromZonedTime(naive, user.timezone);

      allSlots.push(utcSlot);
    }
  }

  // start and end date just to fetch the bookings for the selected date
  const startOfDay = fromZonedTime(
    new Date(`${format(userZonedDate, "yyyy-MM-dd")}T00:00:00`),
    user.timezone
  );
  const endOfDay = fromZonedTime(
    new Date(`${format(userZonedDate, "yyyy-MM-dd")}T23:59:59`),
    user.timezone
  );

  const dbBookings = await prisma.booking.findMany({
    where: {
      userId: user.id,
      date: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
  });

  const dbGoogleIds = new Set(
    dbBookings.map((booking) => booking.googleEventId).filter(Boolean)
  );

  const pureGoogleEvents = cleanedEvents.filter((event) => {
    if (!event.id) return false;
    return !dbGoogleIds.has(event.id); // Only keep external calendar events
  });

  const allBusySlots = [
    ...dbBookings.map((b) => {
      const start = new Date(b.date);
      const end = addMinutes(start, b.duration);
      return { start, end };
    }),

    ...pureGoogleEvents
      .filter((e) => e.start && e.end)
      .map((e) => {
        const start = new Date(e.start!);
        const end = new Date(e.end!);

        return {
          start,
          end,
        };
      }),
  ];

  const availableSlotsUtc = filterBookedSlots(allSlots, allBusySlots, 30);

  const finalSlots = availableSlotsUtc.map((slot) =>
    formatInTimeZone(slot, timezone, "h:mma").toLowerCase()
  );

  return finalSlots;
}

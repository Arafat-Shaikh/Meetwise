"use server";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import prisma from "@/lib/global-prisma";
import { nanoid } from "nanoid";
import { dayToDateMap } from "./const";
import { fromZonedTime } from "date-fns-tz";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { addMinutes, format, parse } from "date-fns";
import { formatTo12Hour, to24Hour } from "./test-utils";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugifyName(fullName: string) {
  return fullName
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "");
}

export async function generateUniqueUsername(
  fullName: string
): Promise<string> {
  const base = slugifyName(fullName);

  const existing = await prisma.user.findUnique({
    where: { username: base },
  });

  // const myName = "arafat-shaikh";
  // const existing = true; // yeah same name

  if (!existing) return base;

  let username = "";
  let exists = true;

  while (exists) {
    const suffix = nanoid(6);
    username = `${base}${suffix}`;
    const user = await prisma.user.findUnique({ where: { username } });
    exists = !!user;
  }

  return username;
}

export async function getTargetUser(
  usernameOverride?: string,
  clientTimeZone?: string
) {
  if (usernameOverride && clientTimeZone) {
    const user = await prisma.user.findUnique({
      where: { username: usernameOverride },
    });
    if (!user) throw new Error("User not found");
    return { user, targetTimeZone: clientTimeZone };
  }

  const session = await getServerSession(authOptions);

  if (session?.user?.id) {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) throw new Error("User not found");
    return { user, targetTimeZone: user.timezone };
  } else {
    throw new Error("Something went wrong");
  }
}

function normalizeTimeFormat(time: string): string {
  return time
    .toUpperCase() // "9:00am" -> "9:00AM"
    .replace(/(AM|PM)/, " $1") // "9:00AM" -> "9:00 AM"
    .trim(); // Clean any extra spaces
}

export function convertTimeSlotsToUtc(
  day: string,
  timeSlots: { startTime: string; endTime: string }[],
  userTimezone: string,
  enabled: boolean
) {
  const utcSlots = [];
  const fakeDate = dayToDateMap[day];

  for (const slot of timeSlots) {
    const fullStart = `${fakeDate} ${normalizeTimeFormat(slot.startTime)}`;
    const fullEnd = `${fakeDate} ${normalizeTimeFormat(slot.endTime)}`;

    const localStart = parse(fullStart, "yyyy-MM-dd h:mm a", new Date());
    const localEnd = parse(fullEnd, "yyyy-MM-dd h:mm a", new Date());

    const startUtc = fromZonedTime(localStart, userTimezone);
    const endUtc = fromZonedTime(localEnd, userTimezone);

    utcSlots.push({
      day,
      enabled,
      startUtc: startUtc.toISOString(),
      endUtc: endUtc.toISOString(),
    });
  }

  return utcSlots;
}

export function getDayRangeInUserTimezone(date: Date, userTimezone: string) {
  // This date is in client timezone. We treat it as a date only, no time part.
  const yyyyMMdd = format(date, "yyyy-MM-dd"); // e.g., "2025-08-04"

  // Now we treat that string as a day in the user's timezone
  const start = fromZonedTime(
    `${yyyyMMdd}T00:00:00`,
    userTimezone
  ).toISOString();
  const end = fromZonedTime(`${yyyyMMdd}T23:59:59`, userTimezone).toISOString();

  return { timeMin: start, timeMax: end };
}

type BusySlot = {
  start: Date;
  end: Date;
};

export const filterBookedSlots = (
  slots: Date[],
  bookings: BusySlot[],
  duration: number
) => {
  return slots.filter((slot) => {
    const slotEnd = addMinutes(slot, duration);
    return !bookings.some((booking) => {
      const bookingStart = booking.start;
      const bookingEnd = booking.end;

      // Check if the slot overlaps with the booking
      return slot < bookingEnd && bookingStart < slotEnd;
      // 9:00am < 10:00am && 9:30am < 9:30am = false = keep this slot
      // 9:00am < 9:30am && 9:00am  < 9:30am = true = remove this slot
    });
  });
};

export function generateTimeSlots(
  start: string,
  end: string,
  intervalMinutes: number
): string[] {
  const slots: string[] = [];
  const startDate = new Date(`1970-01-01T${to24Hour(start)}:00`);
  const endDate = new Date(`1970-01-01T${to24Hour(end)}:00`);

  while (startDate < endDate) {
    slots.push(formatTo12Hour(startDate));
    startDate.setMinutes(startDate.getMinutes() + intervalMinutes);
  }

  return slots;
}

export function getAppointmentTimes(date: Date, duration: number) {
  const startTime = date;
  const endTime = addMinutes(date, duration);

  // Format as "HH:mm" (24-hour) or "hh:mm a" (12-hour)
  const formattedStart = formatTo12Hour(startTime);
  const formattedEnd = formatTo12Hour(endTime);

  return {
    startTime,
    endTime,
    formattedStart,
    formattedEnd,
  };
}

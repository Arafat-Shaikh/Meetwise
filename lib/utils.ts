import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import prisma from "@/lib/global-prisma";
import { nanoid } from "nanoid";
import { dayToDateMap } from "./const";
import { parse } from "date-fns";
import { fromZonedTime } from "date-fns-tz";

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

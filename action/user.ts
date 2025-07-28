"use server";

import { AvailabilityMap } from "@/app/(dashboard)/availability/page";
import { authOptions } from "@/lib/auth";
import { Day } from "@/lib/const";
import { DayOfWeek } from "@/lib/generated/prisma";
import prisma from "@/lib/global-prisma";
import { onboardingSchema, OnboardingDataTypes } from "@/lib/zod/schema";
import { addDays, addMinutes, format, parse } from "date-fns";
import { getServerSession } from "next-auth";
import { any, z } from "zod";
import { formatInTimeZone, fromZonedTime, toZonedTime } from "date-fns-tz";
import { convertTimeSlotsToUtc, getTargetUser } from "@/lib/utils";
import { formatTo12Hour, to24Hour } from "@/lib/test-utils";

export async function getUser() {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    throw new Error("User not found");
  }
  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user?.id) {
    throw new Error("User not found");
  }

  return user;
}

export async function checkUsernameExists(username: string) {
  const exists = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  return !!exists;
}

export async function saveOnboardingUserData(rawData: any) {
  const session = await getServerSession(authOptions);

  if (!session?.user.email) {
    throw new Error("Unauthorized");
  }

  console.log("Raw data: ", rawData);

  const result = onboardingSchema.safeParse(rawData);

  if (!result.success) {
    console.error("Validation failed:", result.error);
    throw new Error("Invalid data provided");
  }

  const timezone = "Asia/Kolkata";

  const data: OnboardingDataTypes = result.data;

  const user = await prisma.user.update({
    where: { email: session.user.email },
    data: {
      username: data.username,
      fullName: data.fullName,
      timezone: data.timezone,
      googleCalendarConnected: data.connectCalendar,
      profilePicture: data.profilePicture,
      bio: data.bio,
      integrations: data.integrations,
    },
  });

  if (!user.id || !user.timezone) {
    throw new Error("No user found");
  }

  for (const [day, { enabled, timeSlots }] of Object.entries(
    data.availability
  )) {
    const utcSlots = convertTimeSlotsToUtc(
      day,
      timeSlots,
      user.timezone,
      enabled
    );

    await prisma.availability.create({
      data: {
        userId: user.id,
        day: day as keyof typeof DayOfWeek,
        enabled,
        slots: {
          create: utcSlots.map(({ startUtc, endUtc }) => ({
            startTime: new Date(startUtc),
            endTime: new Date(endUtc),
          })),
        },
      },
    });
  }

  return { success: true };
}

export async function saveUserAvailability(data: any) {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    throw new Error("Unauthorized");
  }

  const {
    availability,
    timezone,
    bufferTime,
    maxBookings,
    advanceNotice,
  }: {
    availability: AvailabilityMap;
    timezone: string;
    bufferTime: number;
    maxBookings: number;
    advanceNotice: number;
  } = data;

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      timezone,
      maxBookings,
      advanceNotice,
      bufferTime: bufferTime,
    },
  });

  console.log(availability);

  for (const [day, { enabled, timeSlots }] of Object.entries(availability)) {
    const dayOfWeek = day as keyof typeof DayOfWeek;

    const utcSlots = convertTimeSlotsToUtc(day, timeSlots, timezone, enabled);

    // Delete existing availability for the day
    const availability = await prisma.availability.findFirst({
      where: {
        userId: session.user.id,
        day: dayOfWeek,
      },
    });

    if (availability) {
      await prisma.timeSlot.deleteMany({
        where: {
          availabilityId: availability.id,
        },
      });

      await prisma.availability.delete({
        where: {
          id: availability.id,
        },
      });
    }

    // Create new availability for the day
    await prisma.availability.create({
      data: {
        userId: session.user.id,
        day: dayOfWeek,
        enabled,
        slots: {
          create: utcSlots.map(({ startUtc, endUtc }) => ({
            startTime: new Date(startUtc),
            endTime: new Date(endUtc),
          })),
        },
      },
    });
  }
}

export async function getUserAvailability(timezone?: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user.id) throw new Error("User not found");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      timezone: true,
      bufferTime: true,
      maxBookings: true,
      advanceNotice: true,
      availability: {
        select: {
          id: true,
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

  if (!user?.timezone) throw new Error("User not found");

  const targetTimeZone = timezone || user.timezone;

  function formatTimeToUserTZ(date: Date, timeZone: string): string {
    return formatInTimeZone(date, timeZone, "h:mma").toLowerCase(); // returns "9:00am"
  }

  const availability = user?.availability.reduce((acc, day) => {
    acc[day.day] = {
      enabled: day.enabled,
      timeSlots: day.slots.map((slot) => ({
        startTime: formatTimeToUserTZ(new Date(slot.startTime), targetTimeZone),
        endTime: formatTimeToUserTZ(new Date(slot.endTime), targetTimeZone),
      })),
    };
    return acc;
  }, {} as AvailabilityMap);

  const data = {
    availability,
    timezone: user?.timezone || "",
    bufferTime: user?.bufferTime || 0,
    maxBookings: user?.maxBookings || 10,
    advanceNotice: user?.advanceNotice || 0,
  };

  return data;
}

const mockBookings = [
  {
    id: "cmdjvomr80001s6li2wthgj2m",
    userId: "cmdgcez3y000ms6skr8l4vw6k",
    clientEmail: "one@gmail.com",
    clientName: "one",
    duration: 30,
    date: new Date("2025-07-28T05:00:00.000Z"),
    title: "your-booking",
    additionalNote: "yououououou",
  },
  {
    id: "cmdjvomr80001s6li2wthgj2m",
    userId: "cmdgcez3y000ms6skr8l4vw6k",
    clientEmail: "admin@gmail.com",
    clientName: "Arafat shaikh",
    duration: 30,
    date: new Date("2025-07-28T04:00:00.000Z"),
    title: "your-booking",
    additionalNote: "yououououou",
  },
];

export async function getPublicUserAvailability(
  targetTimeZone?: string,
  username?: string
) {
  if (!targetTimeZone || !username) throw new Error("Timezone missing");

  const detailedUser = await prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
      timezone: true,
      maxBookings: true,
      availability: {
        select: {
          id: true,
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

  if (!detailedUser) throw new Error("User not found");

  function formatTimeToUserTZ(date: Date, timeZone: string): string {
    return formatInTimeZone(date, timeZone, "h:mma").toLowerCase(); // returns "9:00am"
  }

  const availability = detailedUser?.availability.reduce((acc, day) => {
    acc[day.day] = {
      enabled: day.enabled,
      timeSlots: day.slots.map((slot) => ({
        startTime: formatTimeToUserTZ(new Date(slot.startTime), targetTimeZone),
        endTime: formatTimeToUserTZ(new Date(slot.endTime), targetTimeZone),
      })),
    };
    return acc;
  }, {} as AvailabilityMap);

  return {
    availability,
    timezone: detailedUser?.timezone || "",
    maxBookings: detailedUser?.maxBookings || 10,
  };
}

// booking function down below
const bookingFormSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  date: z.coerce.date(),
  timeSlot: z.string().min(1, "Time slot is required"),
  additionalNotes: z.string().optional(),
  duration: z.number(),
  username: z.string(),
});

export type BookingFormData = z.infer<typeof bookingFormSchema>;

export async function saveBooking(data: BookingFormData) {
  const validation = bookingFormSchema.safeParse(data);

  if (!validation.success) {
    console.error("Booking validation failed:", validation.error.flatten());
    throw new Error("Invalid booking data provided.");
  }

  console.log(data);

  const user = await prisma.user.findUnique({
    where: { username: data.username },
    select: { id: true, timezone: true },
  });

  if (!user?.id || !user.timezone) {
    throw new Error("Something went wrong");
  }

  console.log(data.date);
  console.log(data.timeSlot);
  // UTC date into user’s timezone
  const userLocalDate = toZonedTime(new Date(data.date), user.timezone);
  // Combine date + timeSlot (e.g., '9:00am')
  const dateStr = `${userLocalDate.getFullYear()}-${(
    userLocalDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${userLocalDate.getDate().toString().padStart(2, "0")} ${
    data.timeSlot
  }`;

  //  Parse this string into a Date in user's TZ
  const bookingStartInUserTz = parse(dateStr, "yyyy-MM-dd h:mma", new Date());
  // convert to utc
  const bookingStartUtc = fromZonedTime(bookingStartInUserTz, user.timezone);

  console.log(bookingStartUtc);

  const booking = await prisma.booking.create({
    data: {
      userId: user.id,
      title: "your-booking",
      clientName: data.fullName,
      clientEmail: data.email,
      date: bookingStartUtc,
      additionalNote: data.additionalNotes,
      duration: data.duration,
    },
  });

  const obj = {
    id: "cmdjvomr80001s6li2wthgj2m",
    userId: "cmdgcez3y000ms6skr8l4vw6k",
    clientEmail: "admin@gmail.com",
    clientName: "Arafat shaikh",
    duration: 30,
    date: "2025-07-28T04:00:00.000Z",
    title: "your-booking",
    additionalNote: "yououououou",
  };

  console.log(booking);

  return { success: false, bookingId: "9009" };
}

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

  /**
   * Converts the given date to the user's specified timezone.
   *
   * @param date - The original date to be converted.
   * @param user.timezone - The IANA timezone string representing the user's timezone.
   * @returns The date object adjusted to the user's timezone.
   */
  const userZonedDate = toZonedTime(date, user.timezone);
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
    console.log("Start 12hr:", start12hr); //
    console.log("End 12hr:", end12hr);
    // example: "9:00am" and "5:00pm and 30 minutes interval"
    const slotTimes = generateTimeSlots(start12hr, end12hr, 30);
    console.log("Slot times:", slotTimes);
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

  console.log("All slots: ", allSlots);
  console.log("User Zoned Date:", userZonedDate);
  console.log("User Timezone:", user.timezone);

  // start and end date just to fetch the bookings for the selected date
  const startOfDay = fromZonedTime(
    new Date(`${format(userZonedDate, "yyyy-MM-dd")}T00:00:00`),
    user.timezone
  );
  const endOfDay = fromZonedTime(
    new Date(`${format(userZonedDate, "yyyy-MM-dd")}T23:59:59`),
    user.timezone
  );

  const bookings = await prisma.booking.findMany({
    where: {
      userId: user.id,
      date: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
  });

  console.log("Bookings:", bookings);

  const availableSlotsUtc = filterBookedSlots(allSlots, bookings, 30);
  console.log("availableSlotsUtc:", availableSlotsUtc);

  const finalSlots = availableSlotsUtc.map((slot) =>
    formatInTimeZone(slot, timezone, "h:mma").toLowerCase()
  );

  return finalSlots;
}

const filterBookedSlots = (
  slots: Date[],
  bookings: any[],
  duration: number
) => {
  return slots.filter((slot) => {
    console.log("slot start:", slot);
    const slotEnd = addMinutes(slot, duration);
    console.log("slot end:", slotEnd);
    return !bookings.some((booking) => {
      const bookingStart = booking.date; // booking.date is already in UTC
      const bookingEnd = addMinutes(bookingStart, booking.duration);
      return slot < bookingEnd && bookingStart < slotEnd;
      // 9:00am < 10:00am && 9:30am < 9:30am = false = keep this slot
      // 9:00am < 9:30am && 9:00am  < 9:30am = true = remove this slot
    });
  });
};

function generateTimeSlots(
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

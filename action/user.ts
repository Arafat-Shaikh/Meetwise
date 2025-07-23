"use server";

import { AvailabilityMap } from "@/app/(dashboard)/availability/page";
import { authOptions } from "@/lib/auth";
import { Day } from "@/lib/const";
import { DayOfWeek } from "@/lib/generated/prisma";
import prisma from "@/lib/global-prisma";
import { onboardingSchema, OnboardingDataTypes } from "@/lib/zod/schema";
import { addDays, parse } from "date-fns";
import { getServerSession } from "next-auth";
import { any, z } from "zod";
import { formatInTimeZone, fromZonedTime } from "date-fns-tz";
import { convertTimeSlotsToUtc } from "@/lib/utils";

export async function getUser() {
  const users = await prisma.user.findMany({});
  console.log(users);
  return users;
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

export async function getUserAvailability() {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    throw new Error("Unauthorized");
  }

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

  console.log("User Availability:", user?.availability);
  console.log(user?.availability[0].day);

  console.log(user?.availability[0].slots[0].startTime);
  console.log(user?.availability[0].slots[0].endTime);

  function formatTimeToUserTZ(date: Date, timeZone: string): string {
    return formatInTimeZone(date, timeZone, "h:mma").toLowerCase(); // returns "9:00am"
  }

  const targetTimeZone = user?.timezone;

  // may have to fix this later
  if (!targetTimeZone) {
    throw new Error("Error while checking the timezone");
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

// booking function down below
const bookingFormSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  date: z.coerce.date(),
  timeSlot: z.string().min(1, "Time slot is required"),
  additionalNotes: z.string().optional(),
});

export type BookingFormData = z.infer<typeof bookingFormSchema>;

export async function saveBooking(data: BookingFormData) {
  const validation = bookingFormSchema.safeParse(data);

  if (!validation.success) {
    console.error("Booking validation failed:", validation.error.flatten());
    throw new Error("Invalid booking data provided.");
  }

  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true },
  });

  const booking = await prisma.booking.create({
    data: {
      userId: session.user.id,
      title: "your-booking",
      clientName: validation.data.fullName,
      clientEmail: validation.data.email,
      date: validation.data.date,
      additionalNote: validation.data.additionalNotes,
    },
  });

  return { success: true, bookingId: booking.id };
}

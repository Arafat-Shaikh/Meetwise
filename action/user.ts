"use server";

import { AvailabilityMap } from "@/app/(dashboard)/availability/page";
import { authOptions } from "@/lib/auth";
import { DayOfWeek } from "@/lib/generated/prisma";
import prisma from "@/lib/global-prisma";
import { onboardingSchema, OnboardingDataTypes } from "@/lib/zod/schema";
import { getServerSession } from "next-auth";
import { formatInTimeZone } from "date-fns-tz";
import { convertTimeSlotsToUtc } from "@/lib/utils";
import { google } from "googleapis";

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
      fullName: true,
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

  if (!detailedUser?.id) throw new Error("User not found");

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
    fullName: detailedUser.fullName,
    timezone: detailedUser?.timezone || "",
    maxBookings: detailedUser?.maxBookings || 10,
  };
}

// booking function down below

export async function getFreshAccessToken(refreshToken: string) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );
  oauth2Client.setCredentials({ refresh_token: refreshToken });
  const tokens = await oauth2Client.refreshAccessToken();
  return tokens.credentials.access_token;
}

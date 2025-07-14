"use server";

import { authOptions } from "@/lib/auth";
import { DayOfWeek } from "@/lib/generated/prisma";
import prisma from "@/lib/global-prisma";
import { onboardingSchema, OnboardingDataTypes } from "@/lib/zod/schema";
import { getServerSession } from "next-auth";
import { any } from "zod";

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

  const result = onboardingSchema.safeParse(rawData);

  if (!result.success) {
    console.error("Validation failed:", result.error);
    throw new Error("Invalid data provided");
  }

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

  for (const [day, { enabled, timeSlots }] of Object.entries(
    data.availability
  )) {
    await prisma.availability.create({
      data: {
        userId: user.id,
        day: day as keyof typeof DayOfWeek,
        enabled,
        slots: {
          create: timeSlots.map((slot) => ({
            startTime: slot.startTime,
            endTime: slot.endTime,
          })),
        },
      },
    });
  }

  return { success: true };
}

type AvailabilityDay = {
  id: string;
  name: string;
  enabled: boolean;
  slots: { startTime: string; endTime: string }[];
};

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
    availability: AvailabilityDay[];
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

  for (const el of availability) {
    const dayAvailability = await prisma.availability.findFirst({
      where: { day: el.name as keyof typeof DayOfWeek },
    });
    console.log("Day Availability:", dayAvailability);

    if (dayAvailability) {
      await prisma.availability.update({
        where: { id: dayAvailability.id },
        data: {
          enabled: el.enabled,
          slots: {
            deleteMany: {},
            create: el.slots.map((slot) => ({
              startTime: slot.startTime,
              endTime: slot.endTime,
            })),
          },
        },
      });
    } else {
      await prisma.availability.create({
        data: {
          userId: session.user.id,
          day: el.name as keyof typeof DayOfWeek,
          enabled: el.enabled,
          slots: {
            create: el.slots.map((slot) => ({
              startTime: slot.startTime,
              endTime: slot.endTime,
            })),
          },
        },
      });
    }
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

  const data = {
    timezone: user?.timezone || "",
    bufferTime: user?.bufferTime || 0,
    maxBookings: user?.maxBookings || 10,
    advanceNotice: user?.advanceNotice || 0,
    availability:
      user?.availability.map((day) => ({
        id: day.id,
        name: day.day,
        enabled: day.enabled,
        slots: day.slots.map((slot) => ({
          startTime: slot.startTime,
          endTime: slot.endTime,
        })),
      })) || [],
  };

  return data;
}

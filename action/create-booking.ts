"use server";

import { fromZonedTime, toZonedTime } from "date-fns-tz";
import { addMinutes, format, parse } from "date-fns";
import prisma from "@/lib/global-prisma";
import { GoogleCalendarService } from "@/lib/googleCalendar";
import { BookingFormData, bookingFormSchema } from "@/lib/zod/schema";
import { refreshAccessToken } from "@/lib/auth";
import { MeetingType } from "@/lib/generated/prisma";

export async function createBooking(data: BookingFormData) {
  const validation = bookingFormSchema.safeParse(data);

  if (!validation.success) {
    console.error("Booking validation failed:", validation.error.flatten());
    throw new Error("Invalid booking data provided.");
  }

  console.log("below is the booking data");
  console.log(data);

  const user = await prisma.user.findUnique({
    where: { username: data.username },
    select: {
      id: true,
      timezone: true,
      fullName: true,
      maxBookings: true,
      email: true,
      googleCalendarConnected: true,
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

  if (!user?.id || !user.timezone) {
    throw new Error("Something went wrong");
  }

  if (
    user.googleCalendarConnected &&
    (!user.googleAccessToken || !user.googleRefreshToken)
  ) {
    throw new Error(
      "Google Calendar is connected but access token or refresh token is missing"
    );
  }

  // check if user access token is valid, if not, refresh it
  user.googleAccessToken = await getAccessTokenVerified(user);

  const cleanDate = format(new Date(data.date), "yyyy-MM-dd"); // ex: "2025-07-30"
  const cleanTime = data.timeSlot; // ex: "10:30am"

  const combined = `${cleanDate} ${cleanTime}`; // "2025-07-30 10:30am"

  // Step 3: Parse into a JS Date object
  const parsed = parse(combined, "yyyy-MM-dd h:mma", new Date());
  if (isNaN(parsed.getTime())) {
    throw new Error("Invalid parsed datetime");
  }

  // Step 4: Convert to UTC based on user's timezone
  const start = fromZonedTime(parsed, user.timezone);

  const end = addMinutes(start, data.duration);

  // These are correct UTC ISO strings

  const startDateTime = start.toISOString();

  const endDateTime = end.toISOString();

  const calendarService = new GoogleCalendarService(
    user.googleAccessToken!,
    user.googleRefreshToken!
  );

  let googleMeetLink = "";
  let eventId = "";

  try {
    const { event } = await calendarService.createCalendarEvent({
      summary: "Your Booking",
      description: data.additionalNotes || "",
      attendeeEmail: data.email,
      startDateTime: startDateTime,
      endDateTime: endDateTime,
      userTimezone: user.timezone,
    });

    eventId = event?.data?.id || "";
    googleMeetLink = event?.data?.hangoutLink || "";
  } catch (error) {
    console.error("Error creating calendar event:", error);
    throw new Error("Failed to create calendar event");
  }

  console.log(googleMeetLink);

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

  try {
    const booking = await prisma.booking.create({
      data: {
        userId: user.id,
        title: "your-booking",
        clientName: data.fullName,
        clientEmail: data.email,
        date: bookingStartUtc,
        additionalNote: data.additionalNotes,
        duration: data.duration,
        meetingType: MeetingType.google_meet,
        meetingLink: googleMeetLink,
        googleEventId: eventId,
      },
    });

    console.log(booking);
    return { success: true, bookingId: booking.id };
  } catch (error) {
    console.error("Error creating booking:", error);
    return { success: false, bookingId: null };
  }
}

export async function getAccessTokenVerified(user: any) {
  const nowUnix = Math.floor(Date.now() / 1000);
  const expiresAtUnix = user.googleTokenExpiry
    ? Math.floor(new Date(user.googleTokenExpiry).getTime() / 1000)
    : null;

  const tokenExpired = !expiresAtUnix || nowUnix >= expiresAtUnix;

  const tokens = {
    accessToken: user.googleAccessToken,
    refreshToken: user.googleRefreshToken,
  };

  if (tokenExpired) {
    const refreshed = await refreshAccessToken(tokens);

    if (refreshed.error) {
      console.log(refreshed.error);
      throw new Error("Failed to refresh Google access token");
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        googleAccessToken: refreshed.accessToken,
        googleTokenExpiry: new Date(refreshed.expiresAt * 1000),
        ...(refreshed.refreshToken && {
          googleRefreshToken: refreshed.refreshToken,
        }),
      },
    });

    return updatedUser.googleAccessToken;
  }

  return user.googleAccessToken;
}

export async function getBookingDetails(bookingId: string) {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      user: {
        select: {
          email: true,
          name: true,
        },
      },
    },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  return booking;
}

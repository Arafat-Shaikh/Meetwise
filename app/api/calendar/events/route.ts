import { authOptions } from "@/lib/auth";
import { dummyEventData } from "@/lib/const";
import { GoogleCalendarService } from "@/lib/googleCalendar";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return NextResponse.json({ error: "Unauthorized" });
  }

  const calendarService = new GoogleCalendarService(session.accessToken);

  try {
    const calendarList = await calendarService.getCalendars();
    const events = await calendarService.getEvents("arafatshaikh823@gmail.com");

    console.log(calendarList);
    return NextResponse.json({ calendarList, events });
  } catch (error) {
    console.error("Calendar API error:", error);
    return NextResponse.json({ error: "Internal server error" });
  }
}

export async function POST(req: Request, res: Response) {
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return NextResponse.json({ error: "Unauthorized" });
  }

  const calendar = new GoogleCalendarService(session.accessToken);

  try {
    const newEvent = await calendar.createEvent("", dummyEventData);
    console.log(newEvent);
    return NextResponse.json(newEvent);
  } catch (error) {
    console.error("Calendar API error:", error);
    return NextResponse.json({ error: "Internal server error" });
  }
}

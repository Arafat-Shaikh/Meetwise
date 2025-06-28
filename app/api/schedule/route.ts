import { authOptions } from "@/lib/auth";
import { GoogleCalendarService } from "@/lib/googleCalendar";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { summary, description, attendeeEmail, startDateTime, endDateTime } =
      body;

    const session = await getServerSession(authOptions);

    if (!session || !session.refreshToken || !session.accessToken) {
      return NextResponse.json({ message: "Missing tokens" }, { status: 200 });
    }

    const calendar = new GoogleCalendarService(
      session.accessToken,
      session.refreshToken
    );

    const { event } = await calendar.createCalendarEvent({
      summary,
      description,
      attendeeEmail,
      startDateTime,
      endDateTime,
    });

    return NextResponse.json(event);
  } catch (error) {
    console.log("Error creating calendar event: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

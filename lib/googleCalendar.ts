import { calendar_v3, google } from "googleapis";

type CreateCalendarEventParams = {
  summary: string;
  description: string;
  attendeeEmail: string;
  startDateTime: string;
  endDateTime: string;
  userTimezone?: string;
};

export class GoogleCalendarService {
  private calendar: calendar_v3.Calendar;

  constructor(accessToken: string, refreshToken?: string) {
    const auth = new google.auth.OAuth2();
    auth.setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    this.calendar = google.calendar({
      version: "v3",
      auth: auth,
    });
  }

  async createCalendarEvent({
    summary,
    description,
    attendeeEmail,
    startDateTime,
    endDateTime,
    userTimezone = "Asia/Kolkata",
  }: CreateCalendarEventParams) {
    const event = await this.calendar.events.insert({
      calendarId: "primary",
      conferenceDataVersion: 1,
      requestBody: {
        summary,
        description,
        start: {
          dateTime: startDateTime,
          timeZone: userTimezone,
        },
        end: {
          dateTime: endDateTime,
          timeZone: userTimezone,
        },
        attendees: [{ email: attendeeEmail }],
        conferenceData: {
          createRequest: {
            requestId: Math.random().toString(36).substring(2),
            conferenceSolutionKey: {
              type: "hangoutsMeet",
            },
          },
        },
      },
    });

    return { event };
  }

  async getCalendars() {
    try {
      const response = await this.calendar.calendarList.list();
      return response.data.items;
    } catch (error) {
      console.error("Error fetching calendars:", error);
      throw error;
    }
  }

  async getEvents(
    calendarId?: string,
    timeRange: { timeMin?: string; timeMax?: string } = {}
  ) {
    try {
      const response = await this.calendar.events.list({
        calendarId: calendarId || "primary",
        timeMin: timeRange.timeMin || new Date().toISOString(),
        timeMax: timeRange.timeMax,
        maxResults: 100,
        singleEvents: true,
        orderBy: "startTime",
      });

      return response.data.items || [];
    } catch (error) {
      console.error("Error fetching events:", error);
      throw error;
    }
  }

  async createEvent(calendarId: string, eventData: any): Promise<any> {
    try {
      const response = await (this.calendar.events as any).insert({
        calendarId: calendarId || "primary",
        resource: eventData,
      });

      if (!response.data) {
        throw new Error("No data required from calendar API");
      }

      return (response as any).data;
    } catch (error) {
      console.error("Error creating event:", error);
      throw error;
    }
  }

  // async updateEvent(calendarId, eventId, eventData) {
  //   try {
  //     const response = await this.calendar.events.update({
  //       calendarId: calendarId || "primary",
  //       eventId,
  //       resource: eventData,
  //     });
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error updating event:", error);
  //     throw error;
  //   }
  // }

  // async deleteEvent(calendarId, eventId) {
  //   try {
  //     await this.calendar.events.delete({
  //       calendarId: calendarId || "primary",
  //       eventId,
  //     });
  //     return { success: true };
  //   } catch (error) {
  //     console.error("Error deleting event:", error);
  //     throw error;
  //   }
  // }

  // async checkAvailability(calendarId, timeMin, timeMax) {
  //   try {
  //     const response = await this.calendar.freebusy.query({
  //       resource: {
  //         timeMin,
  //         timeMax,
  //         items: [{ id: calendarId || "primary" }],
  //       },
  //     });
  //     return response.data.calendars[calendarId || "primary"].busy;
  //   } catch (error) {
  //     console.error("Error checking availability:", error);
  //     throw error;
  //   }
  // }
}

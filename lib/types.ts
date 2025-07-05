export interface CreateEventData {
  summary: string;
  description?: string;
  start: {
    dateTime: string;
    timeZone?: string;
  };
  end: {
    dateTime: string;
    timeZone?: string;
  };
  attendees?: Array<{
    email: string;
    displayName?: string;
  }>;
  location?: string;
  reminders?: {
    useDefault: boolean;
    overrides?: Array<{
      method: string;
      minutes: number;
    }>;
  };
}

export interface TimeSlot {
  startTime: string;
  endTime: string;
}

interface DayAvailability {
  enabled: boolean;
  timeSlots: TimeSlot[];
}

export interface MultiStepFormData {
  username: string;
  fullName: string;
  timezone: string;
  connectCalendar: boolean;
  integrations: {
    googleMeet: boolean;
  };
  availability: {
    [key: string]: DayAvailability;
  };
  profilePicture?: string;
  bio: string;
}

export type EventTypes = "Upcoming" | "Canceled";

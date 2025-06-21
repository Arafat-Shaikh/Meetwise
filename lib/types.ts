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

export interface DayAvailability {
  enabled: boolean;
  timeSlots: TimeSlot[];
}

export interface FormData {
  username: string;
  fullName: string;
  timezone: string;
  connectCalendar: boolean;
  integrations: {
    googleMeet: boolean;
    zoom: boolean;
    teams: boolean;
  };
  availability: {
    [key: string]: DayAvailability;
  };
  profilePicture: string;
  bio: string;
}

import { z } from "zod";

const timeSlotSchema = z.object({
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
});

const dayAvailabilitySchema = z.object({
  enabled: z.boolean(),
  timeSlots: z
    .array(timeSlotSchema)
    .min(1, "At least one time slot is required"),
});

export const onboardingSchema = z.object({
  username: z.string().min(3),
  fullName: z.string().min(1),
  timezone: z.string().min(1),
  connectCalendar: z.boolean(),
  integrations: z.object({
    googleMeet: z.boolean(),
  }),
  availability: z.record(dayAvailabilitySchema),
  profilePicture: z.string().optional(),
  bio: z.string().min(1),
});

export type OnboardingDataTypes = z.infer<typeof onboardingSchema>;

export const settingsSchema = z.object({
  profileName: z.string().min(2, "Name must be at least 2 characters"),
  profileImage: z.string().optional(),
  profileEmail: z.string().email(),
  meetingType: z.enum(["googleMeet", "phone", "inPerson"], {
    required_error: "Please select a meeting type",
  }),
  bookingSlug: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .regex(
      /^[a-z0-9-]+$/,
      "Username can only contain lowercase letters, numbers, and hyphens"
    )
    .refine(
      (val) => !["admin", "api", "www", "mail"].includes(val),
      "This username is not available"
    ),
  welcomeMessage: z
    .string()
    .min(10, "Welcome message must be at least 10 characters"),
  googleCalendarConnected: z.boolean(),
  connectedCalendar: z.string().optional(),
});
export type SettingsFormData = z.infer<typeof settingsSchema>;

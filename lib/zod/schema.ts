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

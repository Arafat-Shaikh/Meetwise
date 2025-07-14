import {
  Calendar,
  Camera,
  Clock,
  Share2,
  User,
  UserPlus,
  Video,
} from "lucide-react";
import { CreateEventData, MultiStepFormData } from "./types";

export const wave_image =
  "url(\"data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264.888-.14 1.652-1.1 2.782-2.752 3.112-4.83.33-2.077-.23-4.27-1.452-5.92C22.512 6.93 20.16 6.472 18.22 7.207c-1.94.734-3.332 2.465-3.723 4.43-.39 1.966.118 3.948 1.38 5.433.728.863 1.73 1.558 2.87 1.93zM19.307.003c.267-.003.536 0 .805.01 2.618.113 5.32 1.045 7.83 2.1 2.51 1.054 4.93 2.25 7.39 3.388.207.095.42.186.62.29 1.96 1.025 3.86 2.148 5.3 3.76 1.435 1.613 2.2 3.85 1.34 5.8-.442 1-1.22 1.81-2.15 2.4-1.047.667-2.282 1.02-3.525 1.09-2.4.14-4.8-.6-7.14-1.48-2.345-.88-4.65-1.9-7.026-2.717-1.222-.42-2.486-.772-3.764-.9-1.278-.13-2.614-.06-3.75.5-1.304.64-2.17 1.95-2.455 3.28-.285 1.33-.046 2.677.543 3.906.59 1.228 1.482 2.295 2.496 3.22 1.92 1.75 4.25 2.997 6.767 3.57 2.516.573 5.2.5 7.59-.477 1.298-.533 2.486-1.285 3.575-2.13 1.09-.845 2.063-1.78 2.94-2.797 1.752-2.035 2.974-4.496 3.11-7.08.134-2.584-.855-5.27-2.97-6.96-1.873-1.5-4.34-2.164-6.747-2.43-2.407-.267-4.836-.186-7.186.305-1.753.367-3.453.97-5.118 1.65-1.665.68-3.324 1.44-5.06 1.884-1.735.443-3.566.587-5.198-.17-1.63-.757-2.8-2.443-2.86-4.22-.06-1.776.916-3.53 2.598-4.5 1.68-.97 3.9-1.17 5.845-.7 1.945.47 3.69 1.44 5.37 2.4 1.68.96 3.332 1.91 5.12 2.53 1.788.62 3.702.9 5.47.51 1.767-.38 3.324-1.42 4.025-3.08.35-.83.43-1.72.33-2.59-.1-.87-.37-1.7-.77-2.47-.84-1.55-2.13-2.73-3.57-3.62-1.43-.9-3-1.55-4.58-2.15-3.17-1.19-6.44-2.14-9.86-2.32-.51-.03-1.02-.04-1.53-.04z' fill='%23ffffff' fillOpacity='0.1' fillRule='evenodd'/%3E%3C/svg%3E\")";

export const darkButtonStyles =
  "rounded-full h-[50px] flex justify-center items-center font-mono text-xs text-[#a1a1a1] bg-[linear-gradient(145deg,_#2e2d2d,_#212121)] shadow-[inset_5px_5px_8px_#1a1a1a,inset_-5px_-5px_10px_#1a1a1a,-2px_-6px_18px_#1b1d2b,6px_6px_18px_#1b1d2b]transition-all duration-[500ms] active:shadow-[1px_1px_13px_#12141c,-1px_-1px_33px_#2a2e45]active:text-[#d6d6d6]active:duration-[100ms]";

export const howItWorksSteps = [
  {
    number: 1,
    title: "Create Your Profile",
    description:
      "Sign up and set up your provider profile with your services and expertise.",
    icon: UserPlus,
  },
  {
    number: 2,
    title: "Set Your Availability",
    description:
      "Define when you're available for appointments and which services you offer.",
    icon: Calendar,
  },
  {
    number: 3,
    title: "Start Accepting Bookings",
    description:
      "Share your booking link with clients and let our AI assistant help them book.",
    icon: Share2,
  },
];

export const bookings = [
  {
    id: 1,
    date: "6 August 2024",
    time: "10:30am - 11:00am",
    duration: 30,
    title: "Product Strategy Session",
    client: {
      id: "client_001",
      firstName: "Sarah",
      lastName: "Johnson",
      email: "sarah.johnson@techcorp.com",
      phone: "+1 (555) 123-4567",
      notes: "Prefers morning meetings. Decision maker for product strategy.",
    },
    type: "Google meet",
    meetingLink: "https://meet.google.com/abc-defg-hij",
    internalNotes: "Follow up on Q3 roadmap discussion",
  },
  {
    id: 2,
    date: "1 July 2024",
    time: "2:30pm - 3:45pm",
    duration: 75,
    title: "Design Review & Feedback Session",
    client: {
      id: "client_002",
      firstName: "Michael",
      lastName: "Chen",
      email: "m.chen@designstudio.io",
      phone: "+1 (555) 987-6543",
      notes: "Creative director. Likes detailed mockups and prototypes.",
    },
    type: "video",
    meetingLink: "https://zoom.us/j/123456789",
    internalNotes: "Present final designs for mobile app",
  },
  {
    id: 3,
    date: "26 June 2024",
    time: "1:30pm - 2:15pm",
    duration: 45,
    title: "Client Onboarding & Requirements Gathering",
    client: {
      id: "client_003",
      firstName: "Emma",
      lastName: "Rodriguez",
      email: "emma.rodriguez@marketingpro.com",
      phone: "+1 (555) 456-7890",
      notes: "New client. Interested in marketing automation.",
    },
    type: "phone",
    meetingLink: null,
    internalNotes: "First meeting - focus on understanding current challenges",
  },
  {
    id: 4,
    date: "15 January 2024",
    time: "10:40am - 11:50am",
    duration: 70,
    title: "Quarterly Business Review",
    client: {
      id: "client_004",
      firstName: "David",
      lastName: "Park",
      email: "david.park@enterprise-solutions.com",
      phone: "+1 (555) 321-0987",
      notes: "VP of Ops. Requires detailed ROI analysis.",
    },
    type: "in-person",
    meetingLink: null,
    internalNotes: "Prepare Q4 performance report and Q1 projections",
  },
  {
    id: 5,
    date: "10 August 2024",
    time: "11:00am - 11:45am",
    duration: 45,
    title: "UX Audit Review",
    client: {
      id: "client_005",
      firstName: "Liam",
      lastName: "Nguyen",
      email: "liam.nguyen@uxstudio.com",
      phone: "+1 (555) 789-1234",
      notes: "Wants UX improvements for e-commerce platform.",
    },
    type: "video",
    meetingLink: "https://meet.google.com/xyz-1234",
    internalNotes: "Go over UX pain points and suggestions",
  },
  {
    id: 6,
    date: "5 August 2024",
    time: "3:00pm - 3:30pm",
    duration: 30,
    title: "Lead Qualification Call",
    client: {
      id: "client_006",
      firstName: "Nina",
      lastName: "Kaur",
      email: "nina.kaur@startuphub.com",
      phone: "+1 (555) 888-4321",
      notes: "Startup founder. Validating product-market fit.",
    },
    type: "phone",
    meetingLink: null,
    internalNotes: "Discuss initial interest and product scope",
  },
  {
    id: 7,
    date: "3 August 2024",
    time: "4:15pm - 5:00pm",
    duration: 45,
    title: "Technical Scoping Session",
    client: {
      id: "client_007",
      firstName: "Carlos",
      lastName: "Mendez",
      email: "carlos.mendez@devagency.com",
      phone: "+1 (555) 666-9090",
      notes: "Wants backend overhaul and API integrations.",
    },
    type: "Google meet",
    meetingLink: "https://meet.google.com/tech-call-001",
    internalNotes: "Confirm requirements before proposal",
  },
  {
    id: 8,
    date: "18 July 2024",
    time: "9:00am - 10:00am",
    duration: 60,
    title: "Marketing Campaign Kickoff",
    client: {
      id: "client_008",
      firstName: "Isabella",
      lastName: "Lee",
      email: "isabella.lee@brandlaunchers.com",
      phone: "+1 (555) 444-2323",
      notes: "Launching new product line this quarter.",
    },
    type: "video",
    meetingLink: "https://zoom.us/j/9988776655",
    internalNotes: "Align goals and timelines for campaign",
  },
  {
    id: 9,
    date: "20 July 2024",
    time: "12:00pm - 12:30pm",
    duration: 30,
    title: "Client Feedback Round",
    client: {
      id: "client_009",
      firstName: "Jacob",
      lastName: "Ali",
      email: "jacob.ali@creativeworks.com",
      phone: "+1 (555) 222-3344",
      notes: "Gives sharp, detailed design feedback.",
    },
    type: "video",
    meetingLink: "https://meet.google.com/feed-back",
    internalNotes: "Collect notes for next design revision",
  },
  {
    id: 10,
    date: "8 July 2024",
    time: "10:00am - 10:45am",
    duration: 45,
    title: "Project Planning & Timeline Discussion",
    client: {
      id: "client_010",
      firstName: "Olivia",
      lastName: "Wright",
      email: "olivia.wright@solutionshub.com",
      phone: "+1 (555) 777-6767",
      notes: "Needs a clear timeline before approval.",
    },
    type: "Google meet",
    meetingLink: "https://meet.google.com/planning-2024",
    internalNotes: "Walk through phases and deliverables",
  },
];
export const testimonials = [
  {
    id: 1,
    text: "This product has completely transformed how we work. The intuitive design and powerful features have increased our productivity by 300%. I can't imagine going back to our old workflow.",
    name: "Sarah Chen",
    role: "Product Manager at TechCorp",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 2,
    text: "Outstanding support and incredible attention to detail. The team went above and beyond to ensure our implementation was seamless. This is exactly what we were looking for.",
    name: "Marcus Rodriguez",
    role: "CTO at StartupXYZ",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 3,
    text: "The best investment we've made this year. The ROI has been incredible, and our team absolutely loves using it. Highly recommend to anyone looking to scale their operations.",
    name: "Emily Johnson",
    role: "CEO at GrowthCo",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 4,
    text: "Exceptional quality and reliability. We've been using this for over a year now, and it has never let us down. The continuous updates and improvements show real commitment to excellence.",
    name: "David Park",
    role: "Lead Developer at DevStudio",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  },
];

export const dummyEventData: CreateEventData = {
  summary: "Business Consultation with Arafat",
  description: "Discussion on project scope and next steps.",
  start: {
    dateTime: new Date("2025-06-21T15:30:00+05:30").toISOString(),
    timeZone: "Asia/Kolkata",
  },
  end: {
    dateTime: new Date("2025-06-21T16:00:00+05:30").toISOString(),
    timeZone: "Asia/Kolkata",
  },
  attendees: [
    {
      email: "client@example.com",
      displayName: "Client User",
    },
  ],
  location: "Zoom / Google Meet",
  reminders: {
    useDefault: false,
    overrides: [
      { method: "email", minutes: 60 },
      { method: "popup", minutes: 10 },
    ],
  },
};

export const steps = [
  {
    id: 1,
    title: "Basic Profile Setup",
    description: "Let's start with the basics",
    icon: User,
  },
  {
    id: 2,
    title: "Calendar Connection",
    description: "Connect your calendar",
    icon: Calendar,
  },
  {
    id: 3,
    title: "Integration Options",
    description: "Choose your meeting tools",
    icon: Video,
  },
  {
    id: 4,
    title: "Set Availability",
    description: "When are you available?",
    icon: Clock,
  },
  {
    id: 5,
    title: "Profile & Bio",
    description: "Complete your profile",
    icon: Camera,
  },
];

export const timezones = [
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Asia/Tokyo",
  "Asia/Shanghai",
  "Australia/Sydney",
];

export type Day =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export const weekDays: Day[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const defaultFormData: MultiStepFormData = {
  username: "",
  fullName: "",
  timezone: "America/New_York",
  connectCalendar: true,
  integrations: {
    googleMeet: false,
  },
  availability: {
    Monday: {
      enabled: true,
      timeSlots: [{ startTime: "9:00am", endTime: "5:00pm" }],
    },
    Tuesday: {
      enabled: true,
      timeSlots: [{ startTime: "9:00am", endTime: "5:00pm" }],
    },
    Wednesday: {
      enabled: true,
      timeSlots: [{ startTime: "9:00am", endTime: "5:00pm" }],
    },
    Thursday: {
      enabled: true,
      timeSlots: [{ startTime: "9:00am", endTime: "5:00pm" }],
    },
    Friday: {
      enabled: true,
      timeSlots: [{ startTime: "9:00am", endTime: "5:00pm" }],
    },
    Saturday: {
      enabled: false,
      timeSlots: [{ startTime: "9:00am", endTime: "5:00pm" }],
    },
    Sunday: {
      enabled: false,
      timeSlots: [{ startTime: "9:00am", endTime: "5:00pm" }],
    },
  },
  profilePicture: "",
  bio: "",
};

export const getStartAndEndDateTime = ({
  date,
  time,
  durationMinutes = 30,
  timeZoneOffset,
}: {
  date: string;
  time: string;
  durationMinutes: number;
  timeZoneOffset?: string;
}) => {
  const modifierMatch = time.match(/(am|pm)$/i);
  if (!modifierMatch) throw new Error("Time must end with 'am' or 'pm'");

  const modifier = modifierMatch[0].toLowerCase();

  const timeWithoutModifier = time.replace(/(am|pm)$/i, "").trim();

  let [hours, minutes] = timeWithoutModifier.split(":").map(Number);

  if (modifier === "pm" && hours < 12) hours += 12;
  if (modifier === "am" && hours === 12) hours = 0;

  const dateTimeString = `${date}T${String(hours).padStart(2, "0")}:${String(
    minutes || 0
  ).padStart(2, "0")}:00${timeZoneOffset}`;

  const start = new Date(dateTimeString);
  const end = new Date(start.getTime() + durationMinutes * 60 * 1000);

  return {
    startDateTime: start.toISOString(),
    endDateTime: end.toISOString(),
  };
};

export const dummyBookings = [
  {
    attendeeName: "John Doe",
    attendeeEmail: "john.doe@example.com",
    startTime: "2025-06-28T10:00:00.000Z",
    endTime: "2025-06-28T10:15:00.000Z",
    status: "SCHEDULED",
    notes: "Discussing the website redesign scope.",
  },
  {
    attendeeName: "Jane Smith",
    attendeeEmail: "jane.smith@example.com",
    startTime: "2025-06-29T14:30:00.000Z",
    endTime: "2025-06-29T14:45:00.000Z",
    status: "SCHEDULED",
    notes: "Demo session for sales CRM.",
  },
  {
    attendeeName: "Rahul Mehta",
    attendeeEmail: "rahul.mehta@example.com",
    startTime: "2025-06-25T09:00:00.000Z",
    endTime: "2025-06-25T09:30:00.000Z",
    status: "COMPLETED",
    notes: "Freelance project discussion.",
  },
  {
    attendeeName: "Emily Zhang",
    attendeeEmail: "emily.zhang@example.com",
    startTime: "2025-06-24T11:00:00.000Z",
    endTime: "2025-06-24T11:15:00.000Z",
    status: "CANCELLED",
    notes: "Had to cancel due to schedule conflict.",
  },
  {
    attendeeName: "Carlos Martinez",
    attendeeEmail: "carlos.martinez@example.com",
    startTime: "2025-06-30T15:00:00.000Z",
    endTime: "2025-06-30T15:30:00.000Z",
    status: "SCHEDULED",
    notes: "Interested in system integration services.",
  },
  {
    attendeeName: "Sana Ahmed",
    attendeeEmail: "sana.ahmed@example.com",
    startTime: "2025-07-01T13:00:00.000Z",
    endTime: "2025-07-01T13:15:00.000Z",
    status: "SCHEDULED",
    notes: "Introductory chat about mentorship program.",
  },
  {
    attendeeName: "Daniel Lee",
    attendeeEmail: "daniel.lee@example.com",
    startTime: "2025-07-02T10:00:00.000Z",
    endTime: "2025-07-02T10:30:00.000Z",
    status: "SCHEDULED",
    notes: "Technical interview round 1.",
  },
  {
    attendeeName: "Priya Nair",
    attendeeEmail: "priya.nair@example.com",
    startTime: "2025-06-23T12:00:00.000Z",
    endTime: "2025-06-23T12:30:00.000Z",
    status: "COMPLETED",
    notes: "UX consultation session.",
  },
  {
    attendeeName: "Mark Taylor",
    attendeeEmail: "mark.taylor@example.com",
    startTime: "2025-06-27T16:00:00.000Z",
    endTime: "2025-06-27T16:20:00.000Z",
    status: "SCHEDULED",
    notes: "Feedback on branding proposals.",
  },
  {
    attendeeName: "Alina Bashir",
    attendeeEmail: "alina.bashir@example.com",
    startTime: "2025-07-03T09:00:00.000Z",
    endTime: "2025-07-03T09:15:00.000Z",
    status: "SCHEDULED",
    notes: "Follow-up on blog writing services.",
  },
  {
    attendeeName: "Karthik Iyer",
    attendeeEmail: "karthik.iyer@example.com",
    startTime: "2025-06-22T17:00:00.000Z",
    endTime: "2025-06-22T17:20:00.000Z",
    status: "COMPLETED",
    notes: "Final call before signing contract.",
  },
  {
    attendeeName: "Sophia Loren",
    attendeeEmail: "sophia.loren@example.com",
    startTime: "2025-07-04T11:30:00.000Z",
    endTime: "2025-07-04T11:45:00.000Z",
    status: "SCHEDULED",
    notes: "Kickoff call for newsletter campaign.",
  },
  {
    attendeeName: "Ahmed Khan",
    attendeeEmail: "ahmed.khan@example.com",
    startTime: "2025-06-26T13:30:00.000Z",
    endTime: "2025-06-26T13:45:00.000Z",
    status: "CANCELLED",
    notes: "Client postponed meeting indefinitely.",
  },
  {
    attendeeName: "Rachel Green",
    attendeeEmail: "rachel.green@example.com",
    startTime: "2025-07-05T14:00:00.000Z",
    endTime: "2025-07-05T14:30:00.000Z",
    status: "SCHEDULED",
    notes: "Wants to explore a paid consulting session.",
  },
  {
    attendeeName: "Nikhil Joshi",
    attendeeEmail: "nikhil.joshi@example.com",
    startTime: "2025-07-06T15:00:00.000Z",
    endTime: "2025-07-06T15:20:00.000Z",
    status: "SCHEDULED",
    notes: "Clarification on contract terms.",
  },
];

export const bufferOptions = [
  { value: "0", label: "No buffer time" },
  { value: "5", label: "5 min" },
  { value: "10", label: "10 min" },
  { value: "15", label: "15 min" },
  { value: "30", label: "30 min" },
  { value: "45", label: "45 min" },
  { value: "60", label: "1 hour" },
];

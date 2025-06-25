import { Calendar, Camera, Clock, User, Video } from "lucide-react";
import { CreateEventData, FormData } from "./types";

export const wave_image =
  "url(\"data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264.888-.14 1.652-1.1 2.782-2.752 3.112-4.83.33-2.077-.23-4.27-1.452-5.92C22.512 6.93 20.16 6.472 18.22 7.207c-1.94.734-3.332 2.465-3.723 4.43-.39 1.966.118 3.948 1.38 5.433.728.863 1.73 1.558 2.87 1.93zM19.307.003c.267-.003.536 0 .805.01 2.618.113 5.32 1.045 7.83 2.1 2.51 1.054 4.93 2.25 7.39 3.388.207.095.42.186.62.29 1.96 1.025 3.86 2.148 5.3 3.76 1.435 1.613 2.2 3.85 1.34 5.8-.442 1-1.22 1.81-2.15 2.4-1.047.667-2.282 1.02-3.525 1.09-2.4.14-4.8-.6-7.14-1.48-2.345-.88-4.65-1.9-7.026-2.717-1.222-.42-2.486-.772-3.764-.9-1.278-.13-2.614-.06-3.75.5-1.304.64-2.17 1.95-2.455 3.28-.285 1.33-.046 2.677.543 3.906.59 1.228 1.482 2.295 2.496 3.22 1.92 1.75 4.25 2.997 6.767 3.57 2.516.573 5.2.5 7.59-.477 1.298-.533 2.486-1.285 3.575-2.13 1.09-.845 2.063-1.78 2.94-2.797 1.752-2.035 2.974-4.496 3.11-7.08.134-2.584-.855-5.27-2.97-6.96-1.873-1.5-4.34-2.164-6.747-2.43-2.407-.267-4.836-.186-7.186.305-1.753.367-3.453.97-5.118 1.65-1.665.68-3.324 1.44-5.06 1.884-1.735.443-3.566.587-5.198-.17-1.63-.757-2.8-2.443-2.86-4.22-.06-1.776.916-3.53 2.598-4.5 1.68-.97 3.9-1.17 5.845-.7 1.945.47 3.69 1.44 5.37 2.4 1.68.96 3.332 1.91 5.12 2.53 1.788.62 3.702.9 5.47.51 1.767-.38 3.324-1.42 4.025-3.08.35-.83.43-1.72.33-2.59-.1-.87-.37-1.7-.77-2.47-.84-1.55-2.13-2.73-3.57-3.62-1.43-.9-3-1.55-4.58-2.15-3.17-1.19-6.44-2.14-9.86-2.32-.51-.03-1.02-.04-1.53-.04z' fill='%23ffffff' fillOpacity='0.1' fillRule='evenodd'/%3E%3C/svg%3E\")";

export const howItWorksSteps = [
  {
    step: 1,
    title: "Create Your Profile",
    description:
      "Sign up and set up your provider profile with your services and expertise.",
  },
  {
    step: 2,
    title: "Set Your Availability",
    description:
      "Define when you're available for appointments and which services you offer.",
  },
  {
    step: 3,
    title: "Start Accepting Bookings",
    description:
      "Share your booking link with clients and let our AI assistant help them book.",
  },
];

export const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Life Coach",
    initial: "S",
    rating: 5,
    testimonial:
      "AppointAI has transformed my coaching business. The AI assistant helps my clients book the right sessions, and I love how it uses my uploaded materials to answer questions.",
    style:
      "bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/30",
  },
  {
    name: "Michael Chen",
    role: "Financial Consultant",
    initial: "M",
    rating: 5,
    testimonial:
      "The analytics dashboard gives me incredible insights into my business. I can see which services are most popular and optimize my schedule accordingly.",
    style:
      "bg-gradient-to-br from-blue-600/20 to-cyan-500/20 border border-blue-500/30",
  },
  {
    name: "Jessica Williams",
    role: "Fitness Trainer",
    initial: "J",
    rating: 5,
    testimonial:
      "My clients love how easy it is to book sessions with me. The availability management feature lets me offer different time slots for different types of training.",
    style:
      "bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30",
  },
  {
    name: "Carlos Rivera",
    role: "Therapist",
    initial: "C",
    rating: 5,
    testimonial:
      "Scheduling has always been a pain point for me. AppointAI has simplified the process and even reduced no-shows thanks to automated reminders.",
    style:
      "bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30",
  },
  {
    name: "Priya Mehta",
    role: "Career Counselor",
    initial: "P",
    rating: 5,
    testimonial:
      "The ability to customize my booking page and offer various session types makes my job easier and more professional. Clients love the smooth experience.",
    style:
      "bg-gradient-to-br from-fuchsia-500/20 to-rose-500/20 border border-fuchsia-500/30",
  },
  {
    name: "Liam O'Connor",
    role: "Nutritionist",
    initial: "L",
    rating: 5,
    testimonial:
      "AppointAI has helped me manage recurring appointments and track client progress effortlessly. It’s exactly what my practice needed.",
    style:
      "bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-500/30",
  },
  {
    name: "Amina Yusuf",
    role: "Mental Wellness Coach",
    initial: "A",
    rating: 5,
    testimonial:
      "The AI assistant is like having a full-time receptionist. It understands context and responds intelligently to client queries.",
    style:
      "bg-gradient-to-br from-yellow-500/20 to-lime-500/20 border border-yellow-500/30",
  },
  {
    name: "David Smith",
    role: "Business Mentor",
    initial: "D",
    rating: 5,
    testimonial:
      "As someone managing multiple mentees, AppointAI helps me keep things organized without back-and-forth emails. Absolute time-saver.",
    style:
      "bg-gradient-to-br from-red-500/20 to-pink-500/20 border border-red-500/30",
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

export const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const defaultFormData: FormData = {
  username: "",
  fullName: "",
  timezone: "America/New_York",
  connectCalendar: true,
  integrations: {
    googleMeet: false,
    zoom: false,
    teams: false,
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

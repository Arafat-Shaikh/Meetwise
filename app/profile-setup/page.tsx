"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getStartAndEndDateTime } from "@/lib/const";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const dummySchedulingData = {
  date: "2025-06-28",
  time: "11:30 PM",
  durationMinutes: 90,
  attendeeEmail: "arafatshaikh823@gmail.com",
  summary: "Project Kickoff",
  description: "Discuss roadmap and deliverables",
};

const ProfileSetup = () => {
  const router = useRouter();
  const session = useSession();

  console.log(session);

  const handleScheduleAppointment = async () => {
    const { startDateTime, endDateTime } = getStartAndEndDateTime({
      date: "2025-06-28",
      time: "11:30pm",
      durationMinutes: 30,
      timeZoneOffset: "+05:30",
    });

    const scheduleData = {
      startDateTime,
      endDateTime,
      attendeeEmail: dummySchedulingData.attendeeEmail,
      summary: dummySchedulingData.summary,
      description: dummySchedulingData.description,
    };

    console.log(scheduleData);

    try {
      const response = await fetch(`/api/schedule`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(scheduleData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        const error = await response.json();
        console.log("Failed to schedule: ", error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden">
      {/* <div>{JSON.stringify(session)}</div> */}

      <Button className="" onClick={handleScheduleAppointment}>
        Schedule meeting
      </Button>
    </div>
  );
};

export default ProfileSetup;

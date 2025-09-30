"use client";

import AvailabilityScheduler from "@/app/_components/availability-scheduler";
import BookingSettings from "@/app/_components/BookingSettings";
import Loader from "@/app/_components/loader";
import TimezoneSelector from "@/app/_components/timezone-selector";
import { Button } from "@/components/ui/button";
import useAvailability from "@/hooks/useAvailability";
import useSaveAvailability from "@/hooks/useSaveAvailability";
import { darkButtonStyles, Day, timezones } from "@/lib/const";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";

type TimeSlot = {
  startTime: string;
  endTime: string;
};

type DayAvailability = {
  enabled: boolean;
  timeSlots: TimeSlot[];
};

export type AvailabilityMap = Record<Day, DayAvailability>;

const AvailabilityPage = () => {
  const [timezone, setTimezone] = useState(timezones[0]);
  const [bufferTime, setBufferTime] = useState("15");
  const [maxBookings, setMaxBookings] = useState(5);
  const [advanceNotice, setAdvanceNotice] = useState(2);
  const [availability, setAvailability] = useState({
    Monday: {
      enabled: true,
      timeSlots: [
        {
          startTime: "9:00am",
          endTime: "5:00pm",
        },
      ],
    },
    Tuesday: {
      enabled: true,
      timeSlots: [
        {
          startTime: "9:00am",
          endTime: "5:00pm",
        },
      ],
    },
    Wednesday: {
      enabled: true,
      timeSlots: [
        {
          startTime: "9:00am",
          endTime: "5:00pm",
        },
      ],
    },
    Thursday: {
      enabled: true,
      timeSlots: [
        {
          startTime: "9:00am",
          endTime: "5:00pm",
        },
      ],
    },
    Friday: {
      enabled: true,
      timeSlots: [
        {
          startTime: "9:00am",
          endTime: "5:00pm",
        },
      ],
    },
    Saturday: {
      enabled: false,
      timeSlots: [
        {
          startTime: "9:00am",
          endTime: "5:00pm",
        },
      ],
    },
    Sunday: {
      enabled: false,
      timeSlots: [
        {
          startTime: "9:00am",
          endTime: "5:00pm",
        },
      ],
    },
  });

  const { data: userAvailability } = useAvailability();
  const { mutateAsync, isPending } = useSaveAvailability();

  console.log(userAvailability?.availability?.Monday.timeSlots[0].startTime);
  console.log(userAvailability?.availability?.Monday.timeSlots[0].endTime);

  useEffect(() => {
    if (userAvailability) {
      setAvailability(userAvailability.availability as AvailabilityMap);
      console.log("User Availability timezone: ", userAvailability.timezone);
      setTimezone(userAvailability.timezone);
      setBufferTime(userAvailability.bufferTime.toString());
      setMaxBookings(userAvailability.maxBookings);
      setAdvanceNotice(userAvailability.advanceNotice);
    }
  }, [userAvailability]);

  const toggleDay = (day: Day) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        enabled: !prev[day].enabled,
      },
    }));
  };

  const addTimeSlot = (day: Day) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        timeSlots: [
          ...prev[day].timeSlots,
          {
            startTime: "9:00am",
            endTime: "5:00pm",
          },
        ],
      },
    }));
  };

  const removeTimeSlot = (day: Day, index: number) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        timeSlots: prev[day].timeSlots.filter((_, i) => i !== index),
      },
    }));
  };

  const updateTime = (
    day: Day,
    slotIndex: number,
    timeType: "startTime" | "endTime",
    value: string
  ) => {
    setAvailability((prev) => {
      const updatedSlots = [...prev[day].timeSlots];
      updatedSlots[slotIndex] = {
        ...updatedSlots[slotIndex],
        [timeType]: value,
      };
      return {
        ...prev,
        [day]: {
          ...prev[day],
          timeSlots: updatedSlots,
        },
      };
    });
  };

  const handleSave = async () => {
    const data = {
      availability,
      timezone,
      bufferTime: Number(bufferTime),
      maxBookings,
      advanceNotice,
    };

    console.log("Saving availability data:", data);

    try {
      await mutateAsync(data);
      toast.success("Availability saved successfully");
    } catch (error) {
      toast.error("Failed to save availability");
      console.error(error);
    }
  };

  console.log("Current Timezone: ", timezone);

  return (
    <div className="h-full w-full bg-[#151a1d] flex flex-col gap-y-8 lg:p-10 lg:px-40 p-2 px-1 sm:p-6 md:p-8 max-h-screen overflow-y-auto scrollbar-hide">
      <div className="rounded-lg py-2 gap-x-20">
        <h2 className="text-3xl text-white font-semibold mb-4">Availability</h2>

        <p className="text-gray-500">
          Manage your working hours. Set your working hours, and choose your
          preferred timezone.
        </p>
      </div>
      <div
        className="w-full rounded-xl py-6 px-2 md:px-6 shadow-xl shadow-white/10 border-2 border-[#343a40] bg-gradient-to-br from-[#161a1d] via-[#212529] to-[#161a1d] h-fit"
        // style={{ boxShadow: "0 10px 20px rgba(20, 160, 124, 0.1)" }}
      >
        <div className="pb-4 pt-8 w-full">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* left side availability schedule  */}
            <div className="flex-1 lg:max-w-2xl">
              <AvailabilityScheduler
                availability={availability}
                toggleDay={toggleDay}
                addTimeSlot={addTimeSlot}
                removeTimeSlot={removeTimeSlot}
                updateTime={updateTime}
              />
            </div>

            <div className="flex-1 lg:max-w-lg">
              <div className="space-y-6">
                <TimezoneSelector
                  timezone={timezone}
                  setTimezone={setTimezone}
                />
                <BookingSettings
                  bufferTime={bufferTime}
                  maxBookings={maxBookings}
                  advanceNotice={advanceNotice}
                  setBufferTime={setBufferTime}
                  setMaxBookings={setMaxBookings}
                  setAdvanceNotice={setAdvanceNotice}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end items-center mt-10 md:mt-16 gap-x-4">
            <Button
              onClick={() => {}}
              disabled={isPending}
              className="bg-white/10 hover:bg-white/10 hover:text-white/80 px-8 transition-all duration-300 group relative overflow-hidden rounded-lg text-white hover:text-black"
            >
              {"Reset"}
            </Button>
            <Button
              onClick={() => handleSave()}
              disabled={isPending}
              className="px-8 text-base mr-3 bg-gradient-to-t from-white/70 via-white/80 to-white text-black hover:bg-opacity-90 transition-all duration-300 group relative overflow-hidden rounded-lg hover:text-black"
            >
              {isPending ? <Loader borderColor="border-white" /> : "Save"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityPage;

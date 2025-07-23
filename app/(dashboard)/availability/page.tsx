"use client";

import { saveUserAvailability } from "@/action/user";
import AvailabilityScheduler from "@/app/_components/availability-scheduler";
import BookingSettings from "@/app/_components/BookingSettings";
import Loader from "@/app/_components/loader";
import TimezoneSelector from "@/app/_components/timezone-selector";
import { Button } from "@/components/ui/button";
import useAvailability from "@/hooks/useAvailability";
import useSaveAvailability from "@/hooks/useSaveAvailability";
import { Day, timezones } from "@/lib/const";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";

// const tabs = ["Availability", "Others"];

// type EventTypes = "Availability" | "Others";

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

  return (
    <div className="h-full w-full bg-[#151a1d] flex flex-col gap-y-12 lg:p-10 p-2 sm:p-6 md:p-8 max-h-screen overflow-y-auto scrollbar-hide">
      <div
        className="w-full rounded-xl py-6 px-2 md:px-6 shadow-xl shadow-white/10 border-2 border-[#343a40] bg-gradient-to-br from-[#161a1d] via-[#212529] to-[#161a1d] h-fit"
        // style={{ boxShadow: "0 10px 20px rgba(20, 160, 124, 0.1)" }}
      >
        {/* <div className="w-fit rounded-xl bg-[#161411] px-0.5 py-0.5">
          <div className="relative flex space-x-1 m-0.5">
            {tabs.map((tab) => {
              const isActive = eventType === tab;
              return (
                <button
                  key={tab}
                  className={`relative z-10 text-base text-gray-300 w-fit rounded-lg px-4 py-0.5 border shadow-lg transition-all duration-300 ${
                    isActive
                      ? "border-slate-600/10"
                      : "bg-transparent border-slate-800/10"
                  }`}
                  onClick={() => setEventType(tab as EventTypes)}
                >
                  {tab}
                  {isActive && (
                    <motion.div
                      layoutId="tabBackground"
                      className="absolute inset-0 z-[-1] rounded-lg bg-gradient-to-t from-black/20 to-white/10"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div> */}
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

          <Button
            onClick={() => handleSave()}
            disabled={isPending}
            className="w-full mt-8 bg-teal-600"
          >
            {isPending ? <Loader borderColor="border-white" /> : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityPage;

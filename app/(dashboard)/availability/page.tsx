"use client";

import AvailabilityScheduler from "@/app/_components/availability-scheduler";
import BookingSettings from "@/app/_components/BookingSettings";
import TimezoneSelector from "@/app/_components/timezone-selector";
import { Button } from "@/components/ui/button";
import { timezones } from "@/lib/const";

import React, { useState } from "react";

const tabs = ["Availability", "Others"];

type EventTypes = "Availability" | "Others";

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
}

interface DayAvailability {
  id: string;
  name: string;
  enabled: boolean;
  slots: TimeSlot[];
}

const AvailabilityPage = () => {
  const [timezone, setTimezone] = useState(timezones[0]);
  const [bufferTime, setBufferTime] = useState("15");
  const [maxBookings, setMaxBookings] = useState(5);
  const [advanceNotice, setAdvanceNotice] = useState(2);

  const [availability, setAvailability] = useState<DayAvailability[]>([
    {
      id: "monday",
      name: "Monday",
      enabled: true,
      slots: [{ id: "monday-1", startTime: "9:00am", endTime: "5:00pm" }],
    },
    {
      id: "tuesday",
      name: "Tuesday",
      enabled: true,
      slots: [{ id: "tuesday-1", startTime: "9:00am", endTime: "5:00pm" }],
    },
    {
      id: "wednesday",
      name: "Wednesday",
      enabled: true,
      slots: [{ id: "wednesday-1", startTime: "9:00am", endTime: "5:00pm" }],
    },
    {
      id: "thursday",
      name: "Thursday",
      enabled: true,
      slots: [{ id: "thursday-1", startTime: "9:00am", endTime: "5:00pm" }],
    },
    {
      id: "friday",
      name: "Friday",
      enabled: true,
      slots: [{ id: "friday-1", startTime: "9:00am", endTime: "5:00pm" }],
    },
    {
      id: "saturday",
      name: "Saturday",
      enabled: false,
      slots: [{ id: "saturday-1", startTime: "9:00am", endTime: "5:00pm" }],
    },
    {
      id: "sunday",
      name: "Sunday",
      enabled: false,
      slots: [{ id: "sunday-1", startTime: "9:00am", endTime: "5:00pm" }],
    },
  ]);

  const toggleDay = (dayId: string) => {
    setAvailability((prev) =>
      prev.map((day) =>
        day.id === dayId ? { ...day, enabled: !day.enabled } : day
      )
    );
  };

  const addTimeSlot = (dayId: string) => {
    setAvailability((prev) =>
      prev.map((day) => {
        if (day.id === dayId) {
          const newSlot = {
            id: `${dayId}-${Date.now()}`,
            startTime: "9:00",
            endTime: "17:00",
          };
          return { ...day, slots: [...day.slots, newSlot] };
        }
        return day;
      })
    );
  };

  const removeTimeSlot = (dayId: string, slotId: string) => {
    setAvailability((prev) =>
      prev.map((day) => {
        if (day.id === dayId) {
          return {
            ...day,
            slots: day.slots.filter((slot) => slot.id !== slotId),
          };
        }
        return day;
      })
    );
  };

  const updateTime = (
    dayId: string,
    slotId: string,
    timeType: "startTime" | "endTime",
    value: string
  ) => {
    setAvailability((prev) =>
      prev.map((day) => {
        if (day.id === dayId) {
          return {
            ...day,
            slots: day.slots.map((slot) =>
              slot.id === slotId ? { ...slot, [timeType]: value } : slot
            ),
          };
        }
        return day;
      })
    );
  };

  const handleSave = () => {
    console.log("Availability saved:", availability);
    console.log("timezone saved:", timezone);
    console.log("bufferTime saved:", bufferTime);
    console.log("maxBookings saved:", maxBookings);
    console.log("advanceNotice saved:", advanceNotice);
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
            className="w-full mt-8 bg-teal-600"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityPage;

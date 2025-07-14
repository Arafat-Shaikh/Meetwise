import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import TimeInput from "./time-input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Plus, X } from "lucide-react";
import TimePicker from "./time-picker";
import { Day, weekDays } from "@/lib/const";
import { AvailabilityMap } from "../(dashboard)/availability/page";

interface AvailabilitySchedulerProps {
  availability: AvailabilityMap;
  toggleDay: (dayId: Day) => void;
  addTimeSlot: (dayId: Day) => void;
  removeTimeSlot: (dayId: Day, slotIndex: number) => void;
  updateTime: (
    dayId: Day,
    slotIndex: number,
    timeType: "startTime" | "endTime",
    value: string
  ) => void;
}

const AvailabilityScheduler = ({
  availability,
  toggleDay,
  addTimeSlot,
  removeTimeSlot,
  updateTime,
}: AvailabilitySchedulerProps) => {
  // const handleSave = () => {
  //   const enabledDays = availability.filter((day) => day.enabled);
  //   console.log("Availability saved:", enabledDays);
  //   toast({
  //     title: "Availability Saved",
  //     description: `Your availability has been set for ${enabledDays.length} days.`,
  //   });
  // };

  return (
    <div className="rounded-2xl border-[#2e2d2d]">
      <div className="space-y-1 bg-[#161a1d] border md:p-2 border-[#2e2d2d] rounded-xl">
        {weekDays.map((day, i) => (
          <div
            key={day}
            className="flex items-start justify-between p-4 rounded-lg  transition-all duration-200"
          >
            <div className="flex items-center gap-3 min-w-[120px]">
              <Switch
                checked={availability[day]?.enabled}
                onCheckedChange={() => toggleDay(day)}
                className="data-[state=checked]:bg-teal-600 data-[state=unchecked]:bg-gray-600"
              />
              <span
                className={`font-medium text-sm ${
                  availability[day]?.enabled ? "text-gray-100" : "text-gray-500"
                }`}
              >
                {day}
              </span>
            </div>

            {availability[day]?.enabled ? (
              <div className="flex-1 flex flex-col gap-2 ml-4">
                {availability[day]?.timeSlots.map((slot, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <TimePicker
                      value={slot.startTime}
                      onChange={(value) =>
                        updateTime(day, index, "startTime", value)
                      }
                      maxTime={slot.endTime}
                    />
                    <span className="text-gray-400 text-sm">-</span>

                    <TimePicker
                      value={slot.endTime}
                      onChange={(value) =>
                        updateTime(day, index, "endTime", value)
                      }
                      minTime={slot.startTime}
                    />

                    {availability[day]?.timeSlots.length > 1 && (
                      <button
                        onClick={() => removeTimeSlot(day, index)}
                        className="ml-2 p-1 text-gray-400 hover:text-red-400 hover:bg-red-900/20 rounded transition-colors"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => addTimeSlot(day)}
                  className="flex items-center gap-1 text-teal-400 hover:text-teal-300 text-sm font-medium mt-1 w-fit"
                >
                  <Plus size={16} />
                  Add slot
                </button>
              </div>
            ) : (
              <span className="text-gray-500 text-sm flex-1 text-right">
                Unavailable
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailabilityScheduler;

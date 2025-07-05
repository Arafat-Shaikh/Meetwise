import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import TimeInput from "./time-input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Plus, X } from "lucide-react";
import TimePicker from "./time-picker";

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

interface AvailabilitySchedulerProps {
  availability: DayAvailability[];
  toggleDay: (dayId: string) => void;
  addTimeSlot: (dayId: string) => void;
  removeTimeSlot: (dayId: string, slotId: string) => void;
  updateTime: (
    dayId: string,
    slotId: string,
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





  const handleSave = () => {
    const enabledDays = availability.filter((day) => day.enabled);
    console.log("Availability saved:", enabledDays);
    toast({
      title: "Availability Saved",
      description: `Your availability has been set for ${enabledDays.length} days.`,
    });
  };

  return (
    <div className="rounded-2xl border-[#2e2d2d]">
      <div className="space-y-1 bg-[#161a1d] border md:p-2 border-[#2e2d2d] rounded-xl">
        {availability.map((day) => (
          <div
            key={day.id}
            className="flex items-start justify-between p-4 rounded-lg  transition-all duration-200"
          >
            <div className="flex items-center gap-3 min-w-[120px]">
              <Switch
                checked={day.enabled}
                onCheckedChange={() => toggleDay(day.id)}
                className="data-[state=checked]:bg-teal-600 data-[state=unchecked]:bg-gray-600"
              />
              <span
                className={`font-medium text-sm ${
                  day.enabled ? "text-gray-100" : "text-gray-500"
                }`}
              >
                {day.name}
              </span>
            </div>

            {day.enabled ? (
              <div className="flex-1 flex flex-col gap-2 ml-4">
                {day.slots.map((slot, index) => (
                  <div key={slot.id} className="flex items-center gap-2">
                    <TimePicker
                      value={slot.startTime}
                      onChange={(value) =>
                        updateTime(day.id, slot.id, "startTime", value)
                      }
                      maxTime={slot.endTime}
                    />
                    <span className="text-gray-400 text-sm">-</span>

                    <TimePicker
                      value={slot.endTime}
                      onChange={(value) =>
                        updateTime(day.id, slot.id, "endTime", value)
                      }
                      minTime={slot.startTime}
                    />

                    {day.slots.length > 1 && (
                      <button
                        onClick={() => removeTimeSlot(day.id, slot.id)}
                        className="ml-2 p-1 text-gray-400 hover:text-red-400 hover:bg-red-900/20 rounded transition-colors"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => addTimeSlot(day.id)}
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

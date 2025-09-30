import {
  ArrowBigUpDashIcon,
  BookDashed,
  BookDashedIcon,
  LucideBookDashed,
  Plus,
  X,
} from "lucide-react";
import TimePicker from "./time-picker";
import { Day, weekDays } from "@/lib/const";
import { AvailabilityMap } from "../(dashboard)/availability/page";
import * as Switch from "@radix-ui/react-switch";

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
      <div className="space-y-1 bg-[#161a1d] border md:p-2 border-[#2e2d2d] rounded-xl overflow-hidden">
        {weekDays.map((day, i) => (
          <div
            key={day}
            className="flex items-start justify-between p-4 rounded-lg transition-all duration-200 md:mx-16"
          >
            <div className="flex flex-col items-start sm:flex-row sm:items-center gap-3 min-w-[100px] sm:min-w-[120px]">
              <Switch.Root
                checked={availability[day]?.enabled}
                onCheckedChange={() => toggleDay(day)}
                className="w-10 h-5 rounded-full bg-white/20 data-[state=checked]:bg-white/60 px-1"
              >
                <Switch.Thumb className="block w-4 h-4 rounded-full bg-neutral-800 transition-transform data-[state=checked]:translate-x-4" />
              </Switch.Root>

              <span
                className={`font-medium text-sm  ${
                  availability[day]?.enabled
                    ? "text-neutral-100"
                    : "text-neutral-400"
                }`}
              >
                {day}
              </span>
            </div>

            {availability[day]?.enabled ? (
              <div className="flex flex-col gap-2 ml-4 min-w-[220px]">
                {availability[day]?.timeSlots.map((slot, index) => (
                  <div key={index} className="flex items-center">
                    <TimePicker
                      value={slot.startTime}
                      onChange={(value) =>
                        updateTime(day, index, "startTime", value)
                      }
                      maxTime={slot.endTime}
                    />
                    <div className="text-gray-400 text-xl mr-2 font-medium">
                      -
                    </div>
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
                        className="text-gray-400 hover:text-red-300 rounded transition-colors"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => addTimeSlot(day)}
                  className="flex items-center gap-1 text-neutral-400 hover:text-neutral-300 transition duration-300 text-sm font-medium mt-1 w-fit"
                >
                  <Plus size={16} />
                  Add slot
                </button>
              </div>
            ) : (
              <span className="text-gray-500 min-w-[200px] text-sm text-start">
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { timezones } from "@/lib/const";
import { Globe } from "lucide-react";
import React, { useState } from "react";

interface TimezoneSelectorProps {
  timezone: string;
  setTimezone: (value: string) => void;
}

const TimezoneSelector = ({ timezone, setTimezone }: TimezoneSelectorProps) => {
  return (
    <div className="bg-[#161a1d] rounded-2xl p-6 border border-[#2e2d2d]">
      <div className="flex items-center gap-3 mb-4">
        <Globe size={20} className="text-teal-400" />
        <h3 className="text-lg font-semibold text-gray-100">Timezone</h3>
      </div>
      <Select value={timezone} onValueChange={setTimezone}>
        <SelectTrigger className="bg-[#2e2d2d] border-gray-600 text-gray-100">
          <SelectValue placeholder="Select your timezone" />
        </SelectTrigger>
        <SelectContent className="bg-[#212529] border-gray-600">
          {timezones.map((tz) => (
            <SelectItem
              key={tz}
              value={tz}
              className="text-gray-100 focus:bg-[#2e2d2d] focus:text-gray-100"
            >
              {tz}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TimezoneSelector;

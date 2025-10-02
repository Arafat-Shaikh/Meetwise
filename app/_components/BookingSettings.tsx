"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { bufferOptions } from "@/lib/const";
import { Settings } from "lucide-react";
import React from "react";

interface BookingSettingsProps {
  bufferTime: string;
  maxBookings: number;
  advanceNotice: number;
  setBufferTime: (value: string) => void;
  setMaxBookings: (value: number) => void;
  setAdvanceNotice: (value: number) => void;
}

const BookingSettings = ({
  bufferTime,
  maxBookings,
  advanceNotice,
  setBufferTime,
  setMaxBookings,
  setAdvanceNotice,
}: BookingSettingsProps) => {
  const handleMaxBookingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setMaxBookings(Math.max(0, value));
  };

  const handleAdvanceNoticeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(e.target.value) || 0;
    setAdvanceNotice(Math.min(Math.max(0, value), 24));
  };

  return (
    <div className="bg-[#161a1d] rounded-2xl p-6 border border-[#2e2d2d]">
      <div className="flex items-center gap-3 mb-6">
        <Settings size={20} className="text-neutral-400" />
        <h3 className="text-lg font-semibold text-gray-100">
          Booking Settings
        </h3>
      </div>

      <div className="space-y-4">
        {/* buffer time between meetings */}
        <div className="flex items-center justify-between">
          <span className="text-gray-100 text-sm font-medium flex-1">
            Buffer Time Between Meetings
          </span>
          <Select value={bufferTime} onValueChange={setBufferTime}>
            <SelectTrigger className="w-28 bg-[#2e2d2d] border-gray-600 text-gray-100 h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#212529] border-gray-600">
              {bufferOptions.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="text-gray-100 focus:bg-[#2e2d2d] focus:text-gray-100"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* maximum bookings per day  */}
        <div className="flex items-center justify-between">
          <span className="text-gray-100 text-sm font-medium flex-1">
            Maximum Bookings Per Day
          </span>
          <Input
            type="number"
            value={maxBookings}
            onChange={handleMaxBookingsChange}
            min="0"
            className="w-16 bg-[#2e2d2d] border-gray-600 text-gray-100 focus:border-teal-400 h-9 text-center"
          />
        </div>

        {/* advance notice  */}
        <div className="flex items-center justify-between">
          <span className="text-gray-100 text-sm font-medium flex-1">
            Advance Notice
          </span>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={advanceNotice}
              onChange={handleAdvanceNoticeChange}
              min="0"
              max="24"
              className="w-16 bg-[#2e2d2d] border-gray-600 text-gray-100 focus:border-teal-400 h-9 text-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSettings;

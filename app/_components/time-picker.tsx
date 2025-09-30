"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

// Generate time options in 15-minute intervals
const generateTimeOptions = () => {
  const times: string[] = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const time24 = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;
      const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      const ampm = hour < 12 ? "am" : "pm";
      const time12 = `${hour12}:${minute.toString().padStart(2, "0")}${ampm}`;
      times.push(time12);
    }
  }
  return times;
};

const timeOptions = generateTimeOptions();

export const convertTo24Hour = (time12: string): string => {
  const [time, period] = time12.split(/(am|pm)/);
  const [hours, minutes] = time.split(":");
  let hour24 = Number.parseInt(hours);

  if (period === "am" && hour24 === 12) {
    hour24 = 0;
  } else if (period === "pm" && hour24 !== 12) {
    hour24 += 12;
  }

  return `${hour24.toString().padStart(2, "0")}:${minutes}`;
};

const addMinutes = (time12: string, minutes: number): string => {
  const time24 = convertTo24Hour(time12);
  const [hours, mins] = time24.split(":").map(Number);
  const totalMinutes = hours * 60 + mins + minutes;
  const newHours = Math.floor(totalMinutes / 60) % 24;
  const newMins = totalMinutes % 60;
  const hour12 = newHours === 0 ? 12 : newHours > 12 ? newHours - 12 : newHours;
  const ampm = newHours > 12 ? "am" : "pm";

  return `${hour12}:${newMins.toString().padStart(2, "0")}${ampm}`;
};

// main component starts from here

interface TimePickerProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  minTime?: string;
  maxTime?: string;
}

const TimePicker = ({
  value,
  onChange,
  disabled = false,
  minTime,
  maxTime,
}: TimePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Find current value index
  useEffect(() => {
    const index = timeOptions.findIndex((option) => option === value);
    if (index !== -1) {
      setSelectedIndex(index);
    }
  }, [value]);

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // scroll to selected item when dropdown opens

  useEffect(() => {
    if (isOpen && listRef.current) {
      const selectedElement = listRef.current.children[
        selectedIndex
      ] as HTMLElement;

      if (selectedElement) {
        selectedElement.scrollIntoView({ block: "nearest" });
      }
    }
  }, [isOpen, selectedIndex]);

  const handleSelect = (time: string) => {
    onChange(time);
    setIsOpen(false);
  };

  const isTimeDisabled = (time: string) => {
    // 12:30pm
    const time24 = convertTo24Hour(time);
    // 00:30

    if (minTime) {
      const min24 = convertTo24Hour(minTime);
      // 14:30pm

      const minEndTime = addMinutes(minTime, 15);
      // 14:45pm
      const minEnd24 = convertTo24Hour(minEndTime);

      if (time24 <= min24) return true;
    }

    if (maxTime) {
      const max24 = convertTo24Hour(maxTime);
      if (time24 > max24) return true;
    }

    return false;
  };

  const filteredOptions = timeOptions.filter((time) => !isTimeDisabled(time));

  console.log(timeOptions);
  console.log(filteredOptions);

  return (
    <div className="relative min-w-[90px]" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
             bg-[#2e2d2d] hover:bg-[#1f1f1f] border border-gray-600 py-1.5 text-gray-100 text-sm font-medium transition-all duration-200 min-w-[80px] rounded-full
      
    
        `}
      >
        <span className="font-medium">{value || "Select time"}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 w-full mt-1 bg-[#161a1d] backdrop-blur-md border border-white/10 rounded-lg shadow-2xl max-h-60 overflow-hidden"
          >
            <div
              ref={listRef}
              className="overflow-y-auto max-h-60 py-1 styled-scrollbar"
            >
              {filteredOptions.map((time, index) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => handleSelect(time)}
                  className={`
                    w-full px-3 py-2 text-left text-sm transition-colors duration-150
                    ${
                      time === value
                        ? "bg-blue-500/30 text-blue-200 font-medium"
                        : "text-white hover:bg-white/10"
                    }
                  `}
                >
                  {time}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TimePicker;

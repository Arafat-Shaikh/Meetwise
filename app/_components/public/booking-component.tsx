import React, { useState, useRef, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format, isToday, isTomorrow } from "date-fns";
import { CalendarIcon, Clock, CheckCircle, Sparkles } from "lucide-react";

const formatTime = (time: string) => {
  const [hour, minute] = time.split(":");
  const hourNum = parseInt(hour);
  const ampm = hourNum >= 12 ? "pm" : "am";
  const formattedHour = hourNum % 12 || 12;
  return `${formattedHour}:${minute}${ampm}`;
};

const availableSlots = {
  "2025-07-16": ["09:00", "10:30", "14:00", "15:30", "17:00"],
  "2025-07-17": ["09:00", "11:00", "13:30"],
  "2025-07-18": [
    "10:00",
    "11:30",
    "14:30",
    "16:30",
    "17:30",
    "18:00",
    "19:00",
    "20:00",
  ], // More slots
  "2025-07-19": ["09:30"],
  "2025-07-20": ["10:00", "11:00"],
  "2025-07-21": ["12:00", "13:00", "14:00"],
  "2025-07-22": ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
  "2025-07-23": ["09:30", "11:30", "13:00", "14:30", "16:00"],
  "2025-07-24": ["10:00", "12:00", "15:30", "17:00"],
  "2025-07-25": ["09:00", "10:30", "13:30", "15:00", "16:30"],
};

const BookingComponent = ({
  value,
  onChange,
}: {
  value?: { date?: Date; time?: string };
  onChange?: (value: { date?: Date; time?: string }) => void;
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | undefined>();
  const [showTimeSlots, setShowTimeSlots] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const timeSlotsRef = useRef<HTMLDivElement>(null);
  const confirmationRef = useRef<HTMLDivElement>(null);

  // Get available dates
  const availableDates = Object.keys(availableSlots).map(
    (date) => new Date(date)
  );

  // Check if a date has available slots
  const isDayAvailable = (date: Date) => {
    const dateString = format(date, "yyyy-MM-dd");
    return (
      availableSlots[dateString as keyof typeof availableSlots]?.length > 0
    );
  };

  // Get time slots for selected date
  const getTimeSlots = (date: Date) => {
    const dateString = format(date, "yyyy-MM-dd");
    const slots =
      availableSlots[dateString as keyof typeof availableSlots] || [];
    return slots.map(formatTime);
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTime(undefined);
    setShowConfirmation(false);

    if (date) {
      // Small delay before showing time slots for smoother transition
      setTimeout(() => {
        setShowTimeSlots(true);
        // Scroll to time slots after animation starts
        setTimeout(() => {
          timeSlotsRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 200);
      }, 300);
    } else {
      setShowTimeSlots(false);
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);

    // Delay before showing confirmation for smoother transition
    setTimeout(() => {
      setShowConfirmation(true);
      // Scroll to confirmation after animation starts
      setTimeout(() => {
        confirmationRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 200);
    }, 400);
  };

  const handleBooking = () => {
    if (selectedDate && selectedTime) {
      onChange?.({ date: selectedDate, time: selectedTime });
      console.log(
        "Booking confirmed for:",
        format(selectedDate, "PPP"),
        "at",
        selectedTime
      );
      alert(
        `Booking confirmed for ${format(
          selectedDate,
          "PPP"
        )} at ${selectedTime}`
      );
    }
  };

  const getDateLabel = (date: Date) => {
    if (isToday(date)) return "Today";
    if (isTomorrow(date)) return "Tomorrow";
    return format(date, "EEEE, MMM dd");
  };

  return (
    <div className="max-w-2xl border-0 bg-transparent sm:bg-neutral-950  rounded-2xl mx-auto sm:p-6">
      {/* Header */}
      <div className="text-center space-y-3 mb-8 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
          <Sparkles className="h-4 w-4 text-white" />
          <span className="text-2xl sm:text-3xl font-medium text-white">
            Book Your Time
          </span>
        </div>

        <p className="text-muted-foreground sm:text-lg">
          Choose your preferred appointment slot
        </p>
      </div>

      {/* Single Unified Card */}
      <Card className="border-0 shadow-lg px-2 sm:px-8 bg-transparent transition-all duration-300 hover:shadow-xl animate-fade-in overflow-hidden sm:min-w-[400px] md:min-w-[524px]">
        <CardContent className="p-0">
          {/* Calendar Section */}
          <div className="py-8">
            <Calendar
              formatters={{
                formatWeekdayName: (date) => {
                  const days = [
                    "Sun",
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                  ];
                  return days[date.getDay()];
                },
              }}
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              disabled={(date) => {
                const isPast = date < new Date();
                const isUnavailable = !isDayAvailable(date);
                return isPast || isUnavailable;
              }}
              className="rounded-lg border-0 p-0 w-full"
              classNames={{
                months:
                  "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 w-full",
                month: "space-y-4 w-full",
                caption: "flex justify-center pt-1 relative items-center",
                caption_label: "text-base text-neutral-200 font-semibold",
                nav: "space-x-1 flex items-center",
                nav_button:
                  "h-8 w-8 flex items-center justify-center bg-transparent bg-white/90 p-0 hover:opacity-100 transition-all duration-200 rounded-full hover:bg-accent",
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse space-y-1",
                head_row: "flex w-full",
                head_cell:
                  "text-muted-foreground rounded-md w-12 font-normal text-sm flex-1 text-center",
                row: "flex w-full mt-2",
                cell: "text-center text-sm p-0 relative flex-1 focus-within:relative focus-within:z-20",
                day: "h-10 w-10 p-0 font-normal aria-selected:opacity-100 text-neutral-300 rounded-full transition-all duration-200 hover:scale-105",
                day_selected:
                  "bg-white text-neutral-900 hover:bg-white/90 shadow-md transform scale-105 rounded-full",
                day_today:
                  "border-2 bg-white/20 text-white border-neutral-100 font-semibold ring-2 ring-primary/20 rounded-full",
                day_outside: "text-muted-foreground opacity-50",
                day_disabled:
                  "text-muted-foreground opacity-30 cursor-not-allowed hover:bg-transparent hover:scale-100",
                day_range_middle:
                  "aria-selected:bg-accent aria-selected:text-accent-foreground",
                day_hidden: "invisible",
              }}
            />
          </div>

          {/* Time Slots Section */}
          {selectedDate && showTimeSlots && (
            <>
              <Separator className=" bg-neutral-800" />
              <div
                ref={timeSlotsRef}
                className=" animate-slide-up opacity-0  py-8"
                style={{
                  animationDelay: "300ms",
                  animationFillMode: "forwards",
                }}
              >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                  <div className="flex gap-x-2">
                    <Clock className="h-6 w-6 text-white" />
                    <h3 className="text-xl font-semibold text-white">
                      Available Times
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      variant="secondary"
                      className="text-sm px-3 py-1 bg-white/10 text-white border-0"
                    >
                      {getDateLabel(selectedDate)}
                    </Badge>
                    <span className="text-sm text-neutral-400">
                      {getTimeSlots(selectedDate).length} slots available
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mx-auto">
                  {getTimeSlots(selectedDate).map((time, index) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      onClick={() => handleTimeSelect(time)}
                      className={`
                        h-10 text-base transition-all duration-300 rounded-full
                        ${
                          selectedTime === time
                            ? "bg-gradient-to-t from-white/70 via-white/80 to-white text-black font-semibold shadow-lg transform scale-105 hover:bg-white/20"
                            : "bg-neutral-800 text-neutral-300 border border-neutral-700 hover:bg-neutral-700 hover:text-white"
                        }
                      `}
                      style={{
                        animationDelay: `${index * 70 + 400}ms`,
                        animation: "fade-in 0.5s ease-out forwards",
                        opacity: "0",
                      }}
                    >
                      <span className="font-medium">{time}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Confirmation Section */}
          {selectedDate && selectedTime && showConfirmation && (
            <div
              ref={confirmationRef}
              className="p-8 animate-slide-up opacity-0"
              style={{
                animationDelay: "400ms",
                animationFillMode: "forwards",
              }}
            >
              <div className="space-y-6 text-center">
                <div className="inline-flex items-center gap-3 text-primary">
                  <CheckCircle className="h-6 w-6 text-neutral-400" />
              
                </div>

                <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-xl p-6 space-y-4 shadow-lg shadow-neutral-950/50">
                  <p className="text-neutral-400 text-base font-medium">
                    Your appointment is scheduled for:
                  </p>
                  <p className="text-white text-2xl font-extrabold">
                    {getDateLabel(selectedDate)} at {selectedTime}
                  </p>
                </div>

                <Button
                  onClick={handleBooking}
                  className="mx-auto w-fit px-8 h-10 text-base font-semibold bg-gradient-to-t from-white/70 via-white/80 to-white border border-black/90 text-black hover:bg-neutral-200 transition-all duration-300 rounded-full hover:shadow-white/20"
                >
                  Confirm
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingComponent;

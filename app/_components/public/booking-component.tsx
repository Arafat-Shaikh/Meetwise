import React, { useState, useRef, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format, isToday, isTomorrow } from "date-fns";
import {
  Clock,
  CheckCircle,
  Sparkles,
  MessageSquare,
  Mail,
  User,
} from "lucide-react";
import useAvailability from "@/hooks/useAvailability";
import { AvailabilityMap } from "@/app/(dashboard)/availability/page";
import { formatTo12Hour, to24Hour } from "@/lib/test-utils";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import { BookingFormData } from "./booking-form";
import { weekDays } from "@/lib/const";

type Booking = {
  userId: string;
  date: Date;
  clientName: string;
  clientEmail: string;
  title: string;
  duration: number;
};

const mockBookings = [
  {
    userId: "user123",
    date: new Date("2025-07-24T09:00:00"), // thursday
    clientName: "Alice",
    clientEmail: "alice@example.com",
    title: "Strategy Session",
    duration: 30, // meeting duration
  },
  {
    userId: "user123",
    date: new Date("2025-07-24T10:15:00"), // thursday
    clientName: "Bob",
    clientEmail: "bob@example.com",
    title: "Quick Consult",
    duration: 15, // meeting duration
  },
];

const SLOT_DURATION = 15;

type BookingComponentProps = {
  register: UseFormRegister<BookingFormData>;
  errors: FieldErrors<BookingFormData>;
  control: Control<BookingFormData>;
  watch: UseFormWatch<BookingFormData>;
};

const BookingComponent = ({
  register,
  errors,
  control,
  watch,
}: BookingComponentProps) => {
  const { timeSlot: selectedTime, date: selectedDate } = watch();
  const [showTimeSlots, setShowTimeSlots] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const timeSlotsRef = useRef<HTMLDivElement>(null);
  const confirmationRef = useRef<HTMLDivElement>(null);
  const { data } = useAvailability();
  const availability = data?.availability as AvailabilityMap;
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  console.log(data);

  // Check if a date has available slots
  const isDayAvailable = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 30); // 30 days from today

    if (date < tomorrow || date > maxDate) return false;

    const dayName = weekDays[date.getDay()];
    const dayAvailability = availability?.[dayName as keyof AvailabilityMap];

    return dayAvailability?.enabled ?? false;
  };

  function generateTimeSlots(
    start: string,
    end: string,
    intervalMinutes: number
  ): string[] {
    const slots: string[] = [];
    const startDate = new Date(`1970-01-01T${to24Hour(start)}:00`);
    const endDate = new Date(`1970-01-01T${to24Hour(end)}:00`);

    while (startDate < endDate) {
      slots.push(formatTo12Hour(startDate));
      startDate.setMinutes(startDate.getMinutes() + intervalMinutes);
    }

    return slots;
  }

  const getTimeSlotsOfDay = (date: Date) => {
    const slotsOfDay =
      availability?.[weekDays[date.getDay()] as keyof AvailabilityMap]
        .timeSlots;
    console.log(slotsOfDay);
    const arrayOfSlots = [];
    for (const el of slotsOfDay) {
      arrayOfSlots.push(...generateTimeSlots(el.startTime, el.endTime, 15));
    }

    console.log(arrayOfSlots);
    return arrayOfSlots;
  };

  function filterBookedSlots(
    timeRanges: string[],
    bookings: Booking[]
  ): string[] {
    const bookedSlots = new Set<string>();

    bookings.forEach((booking) => {
      const start = booking.date;

      const isSameDate =
        start.getFullYear() === selectedDate?.getFullYear() &&
        start.getMonth() === selectedDate?.getMonth() &&
        start.getDate() === selectedDate?.getDate();

      if (!isSameDate) return;

      const duration = booking.duration || 15;

      const slotsToBlock = duration / SLOT_DURATION;

      const blocked: string[] = [];

      const startDate = new Date(start);
      for (let i = 0; i < slotsToBlock; i++) {
        const slotTime = formatTo12Hour(startDate);
        console.log("inside loop: ", slotTime);
        blocked.push(slotTime);

        startDate.setMinutes(startDate.getMinutes() + SLOT_DURATION);
      }

      blocked.forEach((slot) => bookedSlots.add(slot));
    });

    // Return only the slots that are NOT booked
    return timeRanges.filter((slot) => !bookedSlots.has(slot));
  }

  const handleDateSelect = (date: Date | undefined) => {
    setShowConfirmation(false);

    if (date) {
      // Small delay before showing time slots
      setTimeout(() => {
        setShowTimeSlots(true);
        // Scroll to time slots
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

  useEffect(() => {
    if (!selectedDate) return;
    const timeRanges = getTimeSlotsOfDay(selectedDate || new Date());
    // fake bookings for removing slots that are already booked
    const bookings = mockBookings;

    const availableSlots = filterBookedSlots(timeRanges, bookings);
    setAvailableTimeSlots(availableSlots as any);
  }, [selectedDate]);

  const handleTimeSelect = (time: string) => {
    // Delay before showing confirmation
    setTimeout(() => {
      setShowConfirmation(true);
      // Scroll to confirmation
      setTimeout(() => {
        confirmationRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 200);
    }, 400);
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
            <Controller
              name="date"
              control={control}
              rules={{ required: "Date is required" }}
              render={({ field, fieldState }) => (
                <>
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
                    selected={field.value}
                    onSelect={(date) => {
                      field.onChange(date);
                      handleDateSelect(date);
                    }}
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
                </>
              )}
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
                      className="text-sm px-3 py-1 bg-white/10 rounded-full text-neutral-400 border-0"
                    >
                      {getDateLabel(selectedDate)}
                    </Badge>
                    <span className="text-sm text-neutral-400">
                      {availableTimeSlots.length} slots available
                    </span>
                  </div>
                </div>

                <Controller
                  name="timeSlot"
                  control={control}
                  rules={{ required: "Please select a time slot" }}
                  render={({ field }) => (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mx-auto">
                      {availableTimeSlots.map((time, index) => (
                        <Button
                          key={time}
                          type="button" // don't remove this type
                          variant={field.value === time ? "default" : "outline"}
                          onClick={() => {
                            field.onChange(time);
                            handleTimeSelect(time);
                          }}
                          className={`
                        h-10 text-base transition-all duration-300 rounded-full
                        ${
                          selectedTime === time
                            ? "bg-gradient-to-t from-white/70 via-white/80 to-white text-black font-semibold shadow-lg transform scale-105 hover:bg-white/20"
                            : "bg-neutral-800 text-neutral-300 border border-neutral-700 hover:bg-neutral-700 hover:text-white"
                        }
                      `}
                          style={{
                            animationName: "fade-in",
                            animationDuration: "0.5s",
                            animationTimingFunction: "ease-out",
                            animationDelay: `${index * 70 + 400}ms`,
                            animationFillMode: "forwards",
                            opacity: "0",
                          }}
                        >
                          <span className="font-medium">{time}</span>
                        </Button>
                      ))}
                    </div>
                  )}
                />
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
                  <CheckCircle className="h-6 w-6 text-amber-400/70" />
                </div>

                <div className="flex justify-center">
                  <div className="relative bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800 border-[1px] border-neutral-700/20  py-2 px-8 rounded-full space-y-2 shadow-xl shadow-amber-50/5">
                    {/* just a background style  */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-emerald-50 opacity-10 rounded-full" />
                    <p className="hidden md:block text-neutral-500 text-sm font-medium">
                      Your appointment is scheduled for:
                    </p>
                    <p className="text-white text-lg font-extrabold">
                      {getDateLabel(selectedDate)} at {selectedTime}
                    </p>
                  </div>
                </div>

                <Card className="bg-transparent backdrop-blur-xl border-0 shadow-2xl">
                  <CardContent className="p-8 space-y-8">
                    {/* Name Field */}
                    <div className="space-y-3">
                      <Label
                        htmlFor="name"
                        className="text-white font-medium text-base flex items-center gap-3"
                      >
                        <div className="w-8 h-8 bg-neutral-800 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-neutral-400" />
                        </div>
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        {...register("fullName", {
                          required: "Full name is required",
                        })}
                        placeholder="Enter your full name"
                        className="border-neutral-700 text-white hover:border-neutral-600 hover:border-[2px] transition duration-500"
                      />
                      {errors.fullName && (
                        <p className="text-red-300 text-left text-xs ml-2 mt-1">
                          {errors.fullName.message}
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div className="space-y-3">
                      <Label
                        htmlFor="email"
                        className="text-white font-medium text-base flex items-center gap-3"
                      >
                        <div className="w-8 h-8 bg-neutral-800 rounded-full flex items-center justify-center">
                          <Mail className="w-4 h-4 text-neutral-400" />
                        </div>
                        Email
                      </Label>
                      <Input
                        id="email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Enter a valid email",
                          },
                        })}
                        type="email"
                        placeholder="your.email@example.com"
                        className="border-neutral-700 text-white hover:border-neutral-600 hover:border-[2px] transition duration-500"
                      />
                      {errors.fullName && (
                        <p className="text-red-300 text-left text-xs ml-2 mt-1">
                          {errors.fullName.message}
                        </p>
                      )}
                    </div>

                    {/* Notes Field */}
                    <div className="space-y-3">
                      <Label
                        htmlFor="notes"
                        className="text-white font-medium text-base flex items-center gap-3"
                      >
                        <div className="w-8 h-8 bg-neutral-800 flex rounded-full items-center justify-center">
                          <MessageSquare className="w-4 h-4 text-neutral-400" />
                        </div>
                        Additional Notes
                      </Label>
                      <Textarea
                        id="notes"
                        {...register("additionalNotes")}
                        placeholder="Add context or reminders for the meeting..."
                        className="border-neutral-700 hover:border-neutral-600 hover:border-[2px] transition duration-500 bg-black/50 placeholder:text-neutral-500 min-h-[140px] resize-none text-base leading-relaxed outline-none text-white"
                      />
                    </div>
                  </CardContent>
                </Card>
                <Button
                  type="submit"
                  className="mx-auto w-fit px-8 h-10 text-sm font-semibold bg-gradient-to-t from-white/70 via-white/80 to-white border border-black/90 text-black hover:bg-neutral-200 transition-all duration-300 rounded-full hover:shadow-white/20"
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

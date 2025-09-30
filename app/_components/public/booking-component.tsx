import React, { useState, useRef, useEffect, useMemo } from "react";
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
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { BookingFormData } from "./booking-form";
import { fromZonedTime, toZonedTime } from "date-fns-tz";
import { useParams } from "next/navigation";
import InvalidUsername from "./invalid-username";
import Loader from "../loader";
import CalendarLoader from "../calendar-loader";
import usePublicAvailability from "@/hooks/use-public-availability";
import useTimeSlots from "@/hooks/use-time-slots";
import GoogleIcon from "@/app/icon/google-icon";

type Booking = {
  id: string;
  userId: string;
  clientName: string;
  clientEmail: string;
  duration: number;
  date: Date;
  title: string;
  additionalNote: string;
};

const SLOT_DURATION = 15;

type BookingComponentProps = {
  register: UseFormRegister<BookingFormData>;
  errors: FieldErrors<BookingFormData>;
  control: Control<BookingFormData>;
  watch: UseFormWatch<BookingFormData>;
  setValue: UseFormSetValue<BookingFormData>;
  isLoadingForm: boolean;
};

const BookingComponent = ({
  register,
  errors,
  control,
  watch,
  setValue,
  isLoadingForm,
}: BookingComponentProps) => {
  const { timeSlot: selectedTime, date: selectedDate } = watch();
  const [showTimeSlots, setShowTimeSlots] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const timeSlotsRef = useRef<HTMLDivElement>(null);
  const confirmationRef = useRef<HTMLDivElement>(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const clientTimeZone = useMemo(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone,
    []
  );
  const { username } = useParams();
  const { data: userTimeSlots } = useTimeSlots(
    username.toString(),
    selectedDate,
    clientTimeZone
  );
  const DURATION = 30;
  console.log("userTimeSlots:", userTimeSlots);
  console.log("availableTimeSlots:", availableTimeSlots);

  useEffect(() => {
    setValue("username", username.toString());
    setValue("duration", DURATION);
  }, []);

  const { data: userData, isLoading } = usePublicAvailability(
    clientTimeZone,
    username.toString()
  );
  const availability = userData?.availability as AvailabilityMap;

  // Check if a date has available slots
  const isDayAvailable = (date: Date) => {
    const today = new Date();

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 30); // 30 days from today

    if (date < tomorrow || date > maxDate) return false;

    if (userData?.timezone) {
      // user zoned date
      const userZonedDate = toZonedTime(date, userData.timezone);
      const dayName = format(userZonedDate, "EEEE");
      const dayAvailability = availability?.[dayName as keyof AvailabilityMap];
      return dayAvailability?.enabled ?? false;
    }

    if (!userData?.timezone) return false;
  };

  useEffect(() => {
    if (!selectedDate) return;

    if (userTimeSlots) {
      console.log("userTimeSlots:", userTimeSlots);
      setAvailableTimeSlots(userTimeSlots as any);
    }
  }, [selectedDate, userTimeSlots]);

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

  if (!userData?.availability && !isLoading) {
    return <InvalidUsername />;
  }

  if (isLoading) {
    return <CalendarLoader />;
  }

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
              render={({ field }) => (
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
                    selected={selectedDate}
                    onSelect={(date) => {
                      console.log("Date selected in booking component: ", date);
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
                className=" animate-slide-up opacity-0 py-8"
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
                  <div className="relative bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800 border border-neutral-700/30 py-3 px-6 rounded-xl shadow-2xl">
                    {/* Subtle overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] to-white/[0.05] rounded-xl" />

                    {/* Content */}
                    <div className="relative">
                      <div className="flex items-center justify-between mb-1 space-x-6">
                        <h3 className="text-white text-lg font-semibold">
                          {userData?.fullName}
                        </h3>
                        <hr className="text-white w-2" />
                        <div className="flex items-center gap-1.5">
                          <GoogleIcon />
                          <span className="text-neutral-300 text-sm font-semibold">
                            Meet
                          </span>
                        </div>
                      </div>
                      <p className="text-neutral-300 text-sm font-medium">
                        {getDateLabel(selectedDate)} at{" "}
                        <span className="text-white">{selectedTime}</span>
                      </p>
                    </div>
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
                  disabled={isLoadingForm}
                  type="submit"
                  className="mx-auto w-fit px-8 h-10 text-sm font-semibold bg-gradient-to-t from-white/70 via-white/80 to-white border border-black/90 text-black hover:bg-neutral-200 transition-all duration-300 rounded-full hover:shadow-white/20"
                >
                  {isLoadingForm ? <Loader borderColor="border-black" /> : null}
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

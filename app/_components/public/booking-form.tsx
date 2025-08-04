"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import BookingComponent from "./booking-component";
import { toast } from "sonner";
import { createBooking } from "@/action/create-booking";
import { useRouter } from "next/navigation";

export type BookingFormData = {
  fullName: string;
  email: string;
  date: Date;
  timeSlot: string;
  additionalNotes?: string;
  username: string;
  duration: number;
};

const BookingForm = () => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BookingFormData>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: BookingFormData) => {
    console.log(data);
    setIsLoading(true);
    try {
      const response = await createBooking(data);

      if (response?.success) {
        toast.success("Appointment Booked!");
      }

      const bookingId = response.bookingId;
      router.push(`/booking/confirm/${bookingId}`);

      console.log("Server response:", response);
    } catch (error) {
      console.error("Booking failed:", error);
      toast.error("Booking failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <fieldset disabled={isLoading} className="space-y-4">
        <BookingComponent
          register={register}
          setValue={setValue}
          control={control}
          errors={errors}
          watch={watch}
          isLoadingForm={isLoading}
        />
      </fieldset>
    </form>
  );
};

export default BookingForm;

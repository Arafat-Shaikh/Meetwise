"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import BookingComponent from "./booking-component";
import { saveBooking } from "@/action/user";
import { toast } from "sonner";

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

  const onSubmit = async (data: BookingFormData) => {
    console.log(data);
    try {
      const response = await saveBooking(data);

      if (response.success) {
        toast.success("Appointment Booked!");
      }

      console.log("Server response:", response);
    } catch (error) {
      console.error("Booking failed:", error);
      toast.error("Booking failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <BookingComponent
        register={register}
        setValue={setValue}
        control={control}
        errors={errors}
        watch={watch}
      />
    </form>
  );
};

export default BookingForm;

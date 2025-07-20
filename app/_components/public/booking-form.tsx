"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import BookingComponent from "./booking-component";


const BookingForm = () => {
  const { control, handleSubmit, watch } = useForm();

  const onSubmit = (data:any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="booking"
        control={control}
        render={({ field }) => (
          <BookingComponent
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
    </form>
  );
};

export default BookingForm;
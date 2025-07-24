"use client";

import BookingForm from "@/app/_components/public/booking-form";
import React from "react";

const PublicPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br flex items-center from-neutral-950 via-black  to-neutral-950 py-12 px-4">
      <div className="max-w-4xl w-full mx-auto min-h-full">
        {/* <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl text-white mb-4">
            Book Your Appointment
          </h1>
          <p className="text-lg text-slate-400 max-w-md mx-auto">
            Select your preferred date and time for a seamless booking experience
          </p>
        </div> */}

        <div className="flex justify-center ">
          <BookingForm />
        </div>
      </div>
    </div>
  );
};

export default PublicPage;

// clients flow.👇

// able to select the date from calendar.
// able to just select the start time in time slot.
// able to see the faqs and notes, upload by user.
// able to fill their name, email, phone number (optional) and notes.
// able to confirm the appointment.
// able to be redirected to a confirmation page after booking.

// users info 👇

// users name, bio, if (profile), if (background image).
// users availability of every day of the week with time slots.

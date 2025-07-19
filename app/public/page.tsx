import React from "react";

const PublicPage = () => {
  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="container mx-auto px-4 py-8">
        {/* <div>
          <h1 className="text-3xl font-bold text-white">Public Page</h1>
          <p className="text-lg text-gray-400">
            This is a public page accessible to all users.
          </p>
        </div> */}
        <div className="bg-neutral-800 rounded-xl mx-auto mt-4 max-w-4xl">
          <div className="bg-white/50  h-[30vh] md:h-[35vh] rounded-xl"></div>
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

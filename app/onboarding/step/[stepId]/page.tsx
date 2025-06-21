"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { defaultFormData, steps, timezones, weekDays } from "@/lib/const";
import { FormData } from "@/lib/types";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Camera,
  Check,
  ChevronDown,
  Clock,
  Plus,
  Trash2,
  Video,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const OnboardingStepPage = () => {
  const router = useRouter();
  const params = useParams();
  const currentStep = Number.parseInt(params.stepId as string);

  const [isTimezoneOpen, setIsTimezoneOpen] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
    trigger,
  } = useForm<FormData>({ defaultValues: defaultFormData });

  const watchedData = watch();

  console.log(watchedData);

  const getContainerWidth = () => {
    return currentStep === 4 ? "max-w-xl" : "max-w-md";
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Username
                </label>
                <div className="relative">
                  <Controller
                    name="username"
                    control={control}
                    rules={{
                      required: "Username is required",
                      minLength: {
                        value: 3,
                        message: "Username must be at least 3 characters",
                      },
                    }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="text"
                        placeholder="alpha"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60 hover:border-white/30 focus:ring-0 focus-visible:ring-0"
                      />
                    )}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <span className="text-white/60 text-sm">app.com/alpha</span>
                  </div>
                </div>
                {errors.username && (
                  <p className="text-red-300 text-sm mt-1">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Full Name
                </label>
                <Controller
                  name="fullName"
                  control={control}
                  rules={{ required: "Full name is required" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      placeholder="John Doe"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60 hover:border-white/30 focus-visible:ring-0"
                    />
                  )}
                />
                {errors.fullName && (
                  <p className="text-red-300 text-sm mt-1">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Timezone
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsTimezoneOpen(!isTimezoneOpen)}
                    className="w-full bg-white/10 border border-white/20 text-white rounded-md px-3 py-2 text-left flex items-center justify-between focus-visible:ring-0 focus:outline-none hover:border-white/30"
                  >
                    <span>{watchedData.timezone}</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  <AnimatePresence>
                    {isTimezoneOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-10 w-full mt-1 bg-white/60 backdrop-blur-md border border-white/20 rounded-md shadow-lg max-h-60 overflow-auto"
                      >
                        {timezones.map((tz) => (
                          <button
                            key={tz}
                            type="button"
                            onClick={() => {
                              setValue("timezone", tz);
                              setIsTimezoneOpen(false);
                            }}
                            className="w-full px-3 py-2 text-left text-black/90 font-medium hover:bg-white/10 transition-colors"
                          >
                            {tz}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <Calendar className="h-16 w-16 text-violet-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Connect Your Calendar
              </h3>
              <p className="text-blue-100">
                Sync with your Google Calendar to avoid double bookings and
                manage your schedule seamlessly.
              </p>
            </div>

            <div className="bg-white/10 rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-violet-950 rounded-lg flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Google Calendar</h4>
                    <p className="text-white/70 text-sm">
                      Sync your existing calendar
                    </p>
                  </div>
                </div>
                <Controller
                  name="connectCalendar"
                  control={control}
                  render={({ field }) => (
                    <button
                      type="button"
                      onClick={() => field.onChange(!field.value)}
                      className={`relative inline-flex h-6 w-11 shadow-lg items-center rounded-full transition-colors ${
                        field.value ? "bg-violet-950/90" : "bg-white/20"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 shadow-sm transform rounded-full bg-white transition-transform ${
                          field.value ? "translate-x-6" : "translate-x-1"
                        } `}
                      />
                    </button>
                  )}
                />
              </div>
            </div>

            {watchedData.connectCalendar && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="bg-violet-300/10 border border-violet-400/10 rounded-xl p-4"
              >
                <div className="flex items-center space-x-2">
                  <Check className="h-5 w-5 text-violet-200" />
                  <span className="text-green-100">
                    Calendar connection will be set up after onboarding
                  </span>
                </div>{" "}
              </motion.div>
            )}
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <Video className="h-16 w-16 text-purple-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Meeting Integrations
              </h3>
              <p className="text-blue-100">
                Choose which video conferencing tools you'd like to use for
                meetings.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  key: "googleMeet" as const,
                  name: "Google Meet",
                  description: "Integrated with Google Calendar",
                  color: "bg-green-500",
                },
                {
                  key: "zoom" as const,
                  name: "Zoom",
                  description: "Professional video conferencing",
                  color: "bg-blue-500",
                },
                {
                  key: "teams" as const,
                  name: "Microsoft Teams",
                  description: "Enterprise collaboration",
                  color: "bg-purple-500",
                },
              ].map((integration) => (
                <div
                  key={integration.key}
                  className="bg-white/10 rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`h-10 w-10 ${integration.color} rounded-lg flex items-center justify-center`}
                      >
                        <Video className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">
                          {integration.name}
                        </h4>
                        <p className="text-blue-200 text-sm">
                          {integration.description}
                        </p>
                      </div>
                    </div>
                    <Controller
                      name={`integrations.${integration.key}`}
                      control={control}
                      render={({ field }) => (
                        <button
                          type="button"
                          onClick={() => field.onChange(!field.value)}
                          className={`relative inline-flex h-6 w-11 shadow-sm items-center rounded-full transition-colors ${
                            field.value ? "bg-violet-950/60" : "bg-white/20"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              field.value ? "translate-x-6" : "translate-x-1"
                            }`}
                          />
                        </button>
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <Clock className="h-16 w-16 text-green-300 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-2">
                Set Your Availability
              </h3>
              <p className="text-blue-100 text-lg">
                Define ranges of time when you are available
              </p>
              <p className="text-blue-200 text-sm mt-2">
                You can customize all of this later in the availability page.
              </p>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
              {weekDays.map((day, i) => (
                <div
                  key={day}
                  className="bg-white/5 rounded-xl border border-white/10 "
                >
                  <div className="p-4">
                    {/* day header with toggle  */}
                    <div className="flex items-center space-x-4 mb-3">
                      <button
                        type="button"
                        onClick={() => {}}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-200 ${
                          watchedData.availability[day]?.enabled
                            ? "bg-violet-800/80"
                            : "bg-white/20"
                        }`}
                      >
                        <motion.span
                          className="inline-block h-4 w-4 transform rounded-full bg-white"
                          animate={{
                            x: watchedData.availability[day]?.enabled ? 24 : 4,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      </button>
                      <span
                        className={`font-semibold text-lg min-w-[100px] ${
                          watchedData.availability[day]?.enabled
                            ? "text-white"
                            : "text-white/60"
                        } `}
                      >
                        {day}
                      </span>

                      {/* time slots for enabled days  */}

                      {watchedData.availability[day]?.enabled && (
                        <div className="flex-1 space-y-2">
                          {watchedData.availability[day].timeSlots.map(
                            (slot, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="flex items-center space-x-3"
                              >
                                <div className="flex items-center space-x-2">
                                  <Controller
                                    name={`availability.${day}.timeSlots.${index}.startTime`}
                                    control={control}
                                    render={({ field }) => (
                                      <motion.input
                                        {...field}
                                        type="time"
                                        className="bg-white/10 border border-white/20 text-white rounded-lg px-3 py-2 text-sm focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-400/20 transition-all"
                                        whileFocus={{ scale: 1.02 }}
                                      />
                                    )}
                                  />
                                  <span className="text-white/60 font-medium">
                                    -
                                  </span>
                                  <Controller
                                    name={`availability.${day}.timeSlots.${index}.endTime`}
                                    control={control}
                                    render={({ field }) => (
                                      <motion.input
                                        {...field}
                                        type="time"
                                        className="bg-white/10 border border-white/20 text-white rounded-lg px-3 py-2 text-sm focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-400/20 transition-all"
                                        whileFocus={{ scale: 1.02 }}
                                      />
                                    )}
                                  />
                                </div>
                                <div className="flex items-center space-x-2">
                                  <motion.button
                                    type="button"
                                    onClick={() => {}}
                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-green-100 transition-colors"
                                    title="Add time slot"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    <Plus className="h-4 w-4" />
                                  </motion.button>

                                  {watchedData.availability[day].timeSlots
                                    .length > 1 && (
                                    <motion.button
                                      type="button"
                                      onClick={() => {}}
                                      className="w-8 h-8 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg flex items-center justify-center text-red-300 transition-colors"
                                      title="Remove time slot"
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.95 }}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </motion.button>
                                  )}
                                </div>
                              </motion.div>
                            )
                          )}
                        </div>
                      )}
                    </div>

                    {/* show placeholder for disabled days  */}
                    {!watchedData.availability[day]?.enabled && (
                      <div className="ml-[76px] text-white/40 text-sm">
                        Unavailable
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <Camera className="h-16 w-16 text-violet-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Complete Your Profile
              </h3>
              <p className="text-blue-100">
                Add a photo and bio to help clients connect with you.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-3">
                Profile Picture
              </label>
              <div className="flex items-center space-x-4">
                <div className="h-20 w-20 bg-white/10 rounded-full flex items-center justify-center border border-dashed border-white/30 ">
                  {watchedData.profilePicture ? (
                    <img
                      src={watchedData.profilePicture || "/placeholder.svg"}
                      alt="Profile"
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <Camera className="h-8 w-8 text-white/60" />
                  )}
                </div>
                <Button
                  type="button"
                  variant={"outline"}
                  className="border-white/20 text-black hover:bg-white/90"
                >
                  Upload Photo
                </Button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Bio
              </label>
              <Controller
                name="bio"
                control={control}
                rules={{ required: "Bio is required" }}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    placeholder="Hi, I'm John! I'm passionate about helping people achieve their goals through personalized coaching sessions. Let's connect and make great things happen together!"
                    className="bg-white/10 border-white/20 hover:border-white/50 text-white transition-all duration-200 placeholder:text-white/60 focus-visible:ring-0 min-h-[120px] focus:outline-none focus-visible:outline-none resize-none"
                  />
                )}
              />
              {errors.bio && (
                <p className="text-red-300 text-sm mt-1">
                  {errors.bio.message}
                </p>
              )}
            </div>
          </motion.div>
        );
    }
    return <div>render step content</div>;
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-t from-black/90 to-violet-950 relative overflow-hidden">
        {/* background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-purple-900/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-900/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 min-h-screen flex flex-col">
          <header className="p-6">
            <Link href={"/"} className="text-2xl font-bold text-white">
              AppointAI
            </Link>
          </header>

          {/* progress bar  */}
          <div className="px-6 mb-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-4">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
                        currentStep >= step.id
                          ? "bg-white text-blue-600 border-white"
                          : "border-white/30 text-white/60"
                      }`}
                    >
                      {currentStep > step.id ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <step.icon className="h-5 w-5" />
                      )}
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`w-16 h-0.5 mx-2 transition-colors ${
                          currentStep > step.id ? "bg-white" : "bg-white/30"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white">
                  {steps[currentStep - 1]?.title}
                </h2>
                <p className="text-blue-100 mt-1">
                  {steps[currentStep - 1]?.description}
                </p>
              </div>
            </div>
          </div>

          {/* main content  */}

          <div className="flex-1 flex items-center justify-center px-6">
            <div className={`w-full ${getContainerWidth()}`}>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
                <AnimatePresence mode="wait">
                  {renderStepContent()}
                </AnimatePresence>

                {/* navigation buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-white/20">
                  <Button
                    type="button"
                    variant={"outline"}
                    disabled={currentStep === 1}
                    className="border-white/20 text-black hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  <Button>
                    {currentStep === 5 ? "Finish Setup" : "Next"}
                    {currentStep < 5 && (
                      <motion.span
                        className="ml-2 inline-flex"
                        initial={{ x: 0 }}
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowRight className="h-4 w-4" />
                      </motion.span>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <footer className="p-6 text-center">
            <p className="text-white/60 text-sm">
              Step {currentStep} of {steps.length} • Your data is secure and
              encrypted
            </p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default OnboardingStepPage;

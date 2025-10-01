"use client";

import { getUniqueUsername } from "@/action/generate-username";
import { checkUsernameExists, saveOnboardingUserData } from "@/action/user";
import Loader from "@/app/_components/loader";
import TimePicker, { convertTo24Hour } from "@/app/_components/time-picker";
import { UploadPhotoButton } from "@/app/_components/upload-photo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { defaultFormData, steps, timezones, weekDays } from "@/lib/const";
import { MultiStepFormData } from "@/lib/types";
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
  Trash,
  Video,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

const OnboardingStepPage = () => {
  const router = useRouter();
  const params = useParams();
  const currentStep = Number.parseInt(params.stepId as string);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const [isTimezoneOpen, setIsTimezoneOpen] = useState(false);
  const [timeValidationErrors, setTimeValidationErrors] = useState<{
    [key: string]: string;
  }>({});

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
    trigger,
  } = useForm<MultiStepFormData>({ defaultValues: defaultFormData });

  const watchedData = watch();
  // console.log("availability for monday", watchedData.availability["Monday"]);
  // console.log(timeValidationErrors);

  // detect timezone
  useEffect(() => {
    if (session?.user.name) {
      setValue("fullName", session.user.name);
    }
    const detectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log("Detected Timezone: ", detectedTimezone);
    setValue("timezone", detectedTimezone);
  }, [session?.user?.name, setValue]);

  // load data from localstorage
  useEffect(() => {
    const savedData = localStorage.getItem("onboarding-data");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      Object.keys(parsedData).forEach((key) => {
        setValue(key as keyof MultiStepFormData, parsedData[key]);
      });
    }
  }, [setValue]);

  // save data to localStorage

  useEffect(() => {
    const currentUser = getValues("username");
    if (currentUser) return;

    const getUsername = async () => {
      const fullName = getValues("fullName");
      if (fullName) {
        const uniqueUsername = await getUniqueUsername({ fullName });
        setValue("username", uniqueUsername);
      }
    };

    getUsername();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem("onboarding-data", JSON.stringify(watchedData));
    }, 100);

    return () => clearTimeout(timeout);
  }, [watchedData]);

  const handlePrevious = () => {
    if (currentStep > 1) {
      router.push(`/onboarding/step/${currentStep - 1}`);
    }
  };

  const toggleDayAvailability = (day: string) => {
    const currentAvailability = getValues(`availability.${day}`);
    setValue(`availability.${day}.enabled`, !currentAvailability.enabled);
  };

  const addTimeSlot = (day: string) => {
    const daySlots = getValues(`availability.${day}.timeSlots`);
    console.log(daySlots);
    setValue(`availability.${day}.timeSlots`, [
      ...daySlots,
      { startTime: "9:00am", endTime: "5:00pm" },
    ]);
  };

  const removeDaySlot = (day: string, index: number) => {
    const daySlotToRemove = getValues(`availability.${day}.timeSlots`);
    const filteredSlots = daySlotToRemove.filter((item, i) => i !== index);
    setValue(`availability.${day}.timeSlots`, filteredSlots);
  };

  // "validate time slots here"
  const validateTimeSlots = () => {
    const errors: { [key: string]: string } = {};

    Object.keys(watchedData.availability).forEach((day) => {
      const dayData = watchedData.availability[day];
      if (dayData.enabled) {
        dayData.timeSlots.forEach((slot, index) => {
          const startTime24 = convertTo24Hour(slot.startTime);
          const endTime24 = convertTo24Hour(slot.endTime);

          if (startTime24 >= endTime24) {
            errors[`${day}-${index}`] = "End time must be after start time";
          }
        });
      }
    });

    setTimeValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep = async (step: number): Promise<boolean> => {
    switch (step) {
      case 1:
        return await trigger(["username", "fullName", "timezone"]);
      case 2:
        return validateTimeSlots();
      case 3:
        return await trigger(["bio"]);
      default:
        return true;
    }
  };

  const handleNext = async () => {
    if (currentStep === 3) {
      setLoading(true);
    }
    const isValid = await validateStep(currentStep);
    if (isValid) {
      if (currentStep < 3) {
        router.push(`/onboarding/step/${currentStep + 1}`);
      } else {
        const finalData = getValues();
        console.log("Onboarding completed:", finalData);
        const result = await saveOnboardingUserData(finalData);
        if (result.success) {
          toast.success("Setup completed!");
          router.push("/availability");
          localStorage.removeItem("onboarding-data");
        } else {
          toast.error("Something went wrong");
        }
      }
    }
    if (currentStep === 3) {
      setLoading(false);
    }
  };

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
              className="space-y-6 flex-grow"
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
                      validate: async (value) => {
                        if (!value) return true;

                        const exists = await checkUsernameExists(value);
                        return exists ? "Username is already taken" : true;
                      },
                    }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="text"
                        placeholder="alpha"
                        className="bg-[#151a1d] border-white/20 text-white placeholder:text-white/60 hover:border-white/30 focus:ring-0 focus-visible:ring-0"
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
                      className="bg-[#151a1d] border-white/20 text-white placeholder:text-white/60 hover:border-white/30 focus-visible:ring-0"
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
                    className="w-full bg-[#151a1d] border border-white/20 text-white rounded-md px-3 py-2 text-left flex items-center justify-between focus-visible:ring-0 focus:outline-none hover:border-white/30"
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
                        className="absolute z-10 w-full mt-1 bg-[#151a1d] backdrop-blur-md border border-white/20 rounded-md shadow-lg max-h-60 overflow-auto"
                      >
                        {timezones.map((tz) => (
                          <button
                            key={tz}
                            type="button"
                            onClick={() => {
                              setValue("timezone", tz);
                              setIsTimezoneOpen(false);
                            }}
                            className="w-full px-3 py-2 text-left text-gray-100 font-medium hover:bg-white/10 transition-colors"
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
              <Calendar className="h-16 w-16 text-white mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Connect Integrations
              </h3>
              <p className="text-blue-100">
                Sync with your Google Calendar and choose your meeting type.
              </p>
            </div>

            {/* Combined integrations box */}
            <div className="bg-white/10 rounded-xl p-6 border border-white/20 space-y-6">
              {/* Google Calendar toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-green-500 rounded-lg flex items-center justify-center">
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
                        field.value ? "bg-green-500" : "bg-white/20"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 shadow-sm transform rounded-full bg-white transition-transform ${
                          field.value ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  )}
                />
              </div>
              {/* Google Meet toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-green-500 rounded-lg flex items-center justify-center">
                    <Video className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Google Meet</h4>
                    <p className="text-white/70 text-sm">
                      Integrated with Google Calendar
                    </p>
                  </div>
                </div>
                <Controller
                  name={`integrations.googleMeet`}
                  control={control}
                  render={({ field }) => (
                    <button
                      type="button"
                      onClick={() => field.onChange(!field.value)}
                      className={`relative inline-flex h-6 w-11 shadow-lg items-center rounded-full transition-colors ${
                        field.value ? "bg-green-500" : "bg-white/20"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 shadow-sm transform rounded-full bg-white transition-transform ${
                          field.value ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  )}
                />
              </div>
            </div>
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
              <Camera className="h-16 w-16 text-white mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Complete Your Profile
              </h3>
              <p className="text-blue-100">
                Add a photo and bio to help clients connect with you.
              </p>
            </div>

            <div className="text-center">
              <label className="block text-sm font-medium text-white mb-3">
                Profile Picture
              </label>
              <div className="flex items-center justify-center space-x-4">
                <div className="h-20 w-20 bg-white/10 rounded-full flex items-center justify-center relative border border-dashed border-white/30 ">
                  {watchedData.profilePicture ? (
                    <img
                      src={watchedData.profilePicture || "/placeholder.svg"}
                      alt="Profile"
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <Camera className="h-8 w-8 text-white/60" />
                  )}
                  <UploadPhotoButton
                    loading={loading}
                    onImageSelect={async (file) => {
                      console.log("Selected file:", file);
                      setLoading(true);
                      const formData = new FormData();
                      formData.append("file", file);

                      const res = await fetch("/api/upload", {
                        method: "POST",
                        body: formData,
                      });

                      if (!res.ok) {
                        toast.error("Can't upload the image");
                      }

                      const data = await res.json();
                      if (data.url) {
                        console.log("cloudinary image url: ", data.url);
                        setValue("profilePicture", data.url);
                        toast.success("Image uploaded");
                      }
                      setLoading(false);
                    }}
                  />
                </div>
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
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-t pt-6 bg-[#151a1d]  relative overflow-hidden">
        {/* background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-green-950/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-950/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 min-h-screen flex flex-col">
          {/* progress bar  */}

          <div className="px-6 mb-8">
            <div className="max-w-4xl w-full mx-auto flex flex-col items-center">
              <div className="px-6 mb-8">
                <div className="max-w-4xl w-full mx-auto flex flex-col items-center">
                  {/* mobile progress bar */}
                  <div className="md:hidden mb-6">
                    <div className="flex items-center justify-between text-white text-sm mb-3">
                      <span className="font-medium">
                        Step {currentStep} of {steps.length}
                      </span>
                    </div>
                    <div className="relative">
                      <div className="flex justify-between mt-2">
                        {steps.map((step, index) => (
                          <div
                            key={step.id}
                            className="flex flex-row items-center"
                          >
                            <div
                              className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                                currentStep >= step.id ||
                                currentStep === steps.length
                                  ? "bg-white text-green-600 border-white shadow-lg"
                                  : "border-white/40 text-white/60"
                              }`}
                            >
                              {currentStep > step.id ? (
                                <Check className="h-3 w-3" />
                              ) : (
                                <step.icon className="h-3 w-3" />
                              )}
                            </div>
                            {steps.length - 1 !== index && (
                              <div
                                className={`w-14 h-0.5 ${
                                  currentStep > index + 1
                                    ? "bg-green-600/80"
                                    : "bg-green-800/30"
                                }`}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* desktop progress bar */}
                  <div className="hidden md:flex items-center justify-center relative mb-8 w-full max-w-2xl mx-auto">
                    {steps.map((step, index) => (
                      <div key={step.id} className="flex items-center relative">
                        {/* Step Circle */}
                        <div
                          className={`flex items-center justify-center w-10 h-10 rounded-full border-2 z-10
                  ${
                    currentStep >= step.id || currentStep === steps.length
                      ? "bg-white text-green-600 border-white"
                      : "border-white/30 text-white/60 bg-black"
                  }`}
                        >
                          {currentStep > step.id ? (
                            <Check className="h-5 w-5" />
                          ) : (
                            <step.icon className="h-5 w-5" />
                          )}
                        </div>

                        {/* Connector Line (only if not last step) */}
                        {index < steps.length - 1 && (
                          <div className="relative h-0.5 w-32">
                            {/* Base line */}
                            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/30" />
                            {/* Progress line */}
                            <div
                              className={`absolute top-1/2 left-0 h-0.5 transition-colors duration-300 ${
                                currentStep > step.id
                                  ? "bg-white"
                                  : "bg-transparent"
                              }`}
                              style={{ width: "100%" }}
                            />
                          </div>
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
            </div>
          </div>

          {/* main content  */}

          <div className="flex-1 flex items-center justify-center px-0 sm:px-6">
            <div className={`w-full h-full ${getContainerWidth()}`}>
              <div
                className={`bg-gradient-to-br from-[#161a1d] via-[#212529] to-[#161a1d] backdrop-blur-md rounded-2xl mx-2 sm:mx-0 border border-white/20 shadow-2xl flex flex-col ${
                  currentStep === 4 ? "p-2 py-6 sm:p-8" : "px-8 py-6"
                }`}
              >
                <AnimatePresence mode="wait">
                  {renderStepContent()}
                </AnimatePresence>

                {/* navigation buttons */}
                <div
                  className={`flex mt-8 pt-6 border-t border-white/20 ${
                    currentStep === 1 ? "justify-end" : "justify-between"
                  }`}
                >
                  {currentStep === 1 ? (
                    ""
                  ) : (
                    <Button
                      type="button"
                      variant={"outline"}
                      onClick={() => handlePrevious()}
                      disabled={currentStep === 1}
                      className="bg-gradient-to-t bg-transparent text-white rounded-full border-white/20 border shadow-md hover:bg-white/10 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Previous
                    </Button>
                  )}
                  <Button
                    onClick={() => handleNext()}
                    className="bg-gradient-to-t bg-white hover:bg-white/80 transition-all duration-200 rounded-full text-black shadow-sm border border-green-600/10 flex items-center justify-center"
                  >
                    {currentStep === 3 ? `Finish Setup` : "Next"}
                    {currentStep < 3 && (
                      <motion.span
                        className="ml-2 inline-flex"
                        initial={{ x: 0 }}
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowRight className="h-4 w-4" />
                      </motion.span>
                    )}
                    {currentStep === 3 && loading && (
                      <span className="ml-2">
                        <Loader borderColor="#22c55e" />
                      </span>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OnboardingStepPage;

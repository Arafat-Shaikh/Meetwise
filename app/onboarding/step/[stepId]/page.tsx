"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { defaultFormData, steps, timezones } from "@/lib/const";
import { FormData } from "@/lib/types";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  ChevronDown,
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
    return currentStep === 4 ? "max-w-3xl" : "max-w-md";
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
              div 2
            </div>
            <div>div 3</div>
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

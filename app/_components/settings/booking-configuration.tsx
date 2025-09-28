import React from "react";
import {
  Calendar,
  Copy,
  ExternalLink,
  MapPin,
  Phone,
  Video,
} from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { SettingsFormData } from "@/lib/zod/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

type BookingConfigurationProps = {
  form: UseFormReturn<SettingsFormData>;
  copyBookingLink: () => void;
};
const BookingConfiguration = ({
  form,
  copyBookingLink,
}: BookingConfigurationProps) => {
  const { watch, setValue } = form;
  const watchedBookingSlug = watch("username");

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2">
        <Calendar className="h-5 w-5 text-neutral-500" />
        <h2 className="text-xl font-semibold">Booking Configuration</h2>
      </div>

      {/* Meeting Types */}
      <FormField
        control={form.control}
        name="meetingType"
        render={({ field }) => (
          <FormItem className="space-y-4">
            <FormLabel className="text-lg font-medium text-gray-300">
              Meeting Types
            </FormLabel>
            <FormDescription className="text-sm text-gray-400">
              Choose your preferred meeting type for client bookings
            </FormDescription>
            <FormControl>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-4 rounded-lg border border-gray-800 hover:bg-gray-800/50 transition-colors">
                  <input
                    type="radio"
                    id="google-meet"
                    value="googleMeet"
                    checked={field.value === "google_meet"}
                    onChange={() => field.onChange("google_meet")}
                    className="w-4 h-4 text-neutral-500 bg-gray-800 border-gray-600"
                  />
                  <label
                    htmlFor="google-meet"
                    className="flex items-center gap-3 cursor-pointer flex-1"
                  >
                    <Video className="h-5 w-5 text-neutral-500" />
                    <div>
                      <p className="font-medium">Google Meet</p>
                      <p className="text-xs text-gray-400">
                        Video calls via Google Meet
                      </p>
                    </div>
                  </label>
                </div>

                <div className="flex items-center space-x-3 p-4 rounded-lg border border-gray-800 hover:bg-gray-800/50 transition-colors">
                  <input
                    type="radio"
                    id="phone-call"
                    value="phone"
                    checked={field.value === "phone"}
                    onChange={() => field.onChange("phone")}
                    className="w-4 h-4 text-neutral-500 bg-gray-800 border-gray-600"
                  />
                  <label
                    htmlFor="phone-call"
                    className="flex items-center gap-3 cursor-pointer flex-1"
                  >
                    <Phone className="h-5 w-5 text-neutral-500" />
                    <div>
                      <p className="font-medium">Phone Call</p>
                      <p className="text-xs text-gray-400">
                        Traditional phone conversations
                      </p>
                    </div>
                  </label>
                </div>

                <div className="flex items-center space-x-3 p-4 rounded-lg border border-gray-800 hover:bg-gray-800/50 transition-colors">
                  <input
                    type="radio"
                    id="in-person"
                    value="in_person"
                    checked={field.value === "in_person"}
                    onChange={() => field.onChange("in_person")}
                    className="w-4 h-4 text-neutral-500 bg-gray-800 border-gray-600"
                  />
                  <label
                    htmlFor="in-person"
                    className="flex items-center gap-3 cursor-pointer flex-1"
                  >
                    <MapPin className="h-5 w-5 text-neutral-500" />
                    <div>
                      <p className="font-medium">In-Person Meeting</p>
                      <p className="text-xs text-gray-400">
                        Face-to-face meetings at your location
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Public Booking Page Settings */}
    </div>
  );
};

export default BookingConfiguration;

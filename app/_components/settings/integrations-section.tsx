import { Calendar, Link2 } from "lucide-react";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SettingsFormData } from "@/lib/zod/schema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertDescription } from "@/components/ui/alert";
import { CheckCircle } from "lucide-react";

interface IntegrationsSectionProps {
  form: UseFormReturn<SettingsFormData>;
  handleGoogleCalendarToggle: () => void;
}

const IntegrationsSection = ({
  form,
  handleGoogleCalendarToggle,
}: IntegrationsSectionProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link2 className="h-5 w-5 text-neutral-400" />
        <h2 className="text-xl font-semibold">Integrations</h2>
      </div>
      <p className="text-sm text-gray-400">
        Connect your external accounts and services
      </p>

      <div className="flex items-center justify-between p-6 rounded-lg border border-gray-800">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-neutral-900 rounded-lg">
            <Calendar className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="font-medium text-lg">Google Calendar</p>
            {form.getValues("googleCalendarConnected") ? (
              <div className="flex items-center gap-2 mt-1">
                <Badge
                  variant="secondary"
                  className="bg-neutral-800 hover:bg-neutral-800 text-neutral-100"
                >
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Connected
                </Badge>
              </div>
            ) : (
              <Badge
                variant="secondary"
                className="bg-gray-800 hover:bg-gray-800 text-gray-400 border-gray-700 mt-1"
              >
                Not Connected
              </Badge>
            )}
          </div>
        </div>
        <Button
          type="button"
          variant={
            form.getValues("googleCalendarConnected")
              ? "destructive"
              : "default"
          }
          onClick={handleGoogleCalendarToggle}
          className={
            form.getValues("googleCalendarConnected")
              ? ""
              : "bg-neutral-200 hover:bg-neutral-300 text-black"
          }
        >
          {form.getValues("googleCalendarConnected") ? "Disconnect" : "Connect"}
        </Button>
      </div>

      {form.getValues("googleCalendarConnected") && (
        <div className="flex gap-x-2 ">
          <CheckCircle className="h-4 w-4 text-neutral-200" />
          <AlertDescription className="text-neutral-400">
            Your bookings will automatically sync with your Google Calendar to
            prevent double-booking.
          </AlertDescription>
        </div>
      )}
    </div>
  );
};

export default IntegrationsSection;

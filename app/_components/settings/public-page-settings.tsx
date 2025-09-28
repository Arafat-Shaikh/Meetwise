import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink } from "lucide-react";
import { FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { FormDescription } from "@/components/ui/form";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SettingsFormData } from "@/lib/zod/schema";

interface PublicPageSettingsProps {
  form: UseFormReturn<SettingsFormData>;
  copyBookingLink: () => void;
}

const PublicPageSettings = ({
  form,
  copyBookingLink,
}: PublicPageSettingsProps) => {
  const { watch } = form;
  const watchedBookingSlug = watch("username");

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-300">Public Booking Page</h3>
      <p className="text-sm text-gray-400 mb-4">
        Customize how your public booking page appears to clients
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Booking Page Username</FormLabel>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-sm whitespace-nowrap">
                  meetwise.com/
                </span>
                <FormControl>
                  <Input
                    {...field}
                    className="bg-gray-800 border-gray-700 focus:border-neutral-500"
                    placeholder="your-username"
                  />
                </FormControl>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={copyBookingLink}
                  className="border-gray-700 hover:bg-gray-800 bg-transparent shrink-0"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <FormMessage />
              <div className="flex items-center gap-2 mt-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    window.open(
                      `https://meetwise.com/${watchedBookingSlug}`,
                      "_blank"
                    )
                  }
                  className="text-neutral-500 hover:text-neutral-400 p-0 h-auto"
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Preview your booking page
                </Button>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="welcomeMessage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Welcome Message</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="bg-gray-800 border-gray-700 focus:border-neutral-500 min-h-[100px]"
                  placeholder="Write a welcoming message for your visitors..."
                />
              </FormControl>
              <FormDescription>
                This message will appear at the top of your booking page
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default PublicPageSettings;

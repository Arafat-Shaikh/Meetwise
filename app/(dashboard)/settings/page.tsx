"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Form } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { SettingsFormData, settingsSchema } from "@/lib/zod/schema";
import BookingConfiguration from "@/app/_components/settings/booking-configuration";
import IntegrationsSection from "@/app/_components/settings/integrations-section";
import ProfileSection from "@/app/_components/settings/profile-section";
import { saveUserSettings } from "@/action/save-user-settings";
import useUserData from "@/hooks/use-userData";
import PublicPageSettings from "@/app/_components/settings/public-page-settings";

export default function SettingsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const userData = useUserData();

  const form = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      profileName: "John Doe",
      profileImage: "/placeholder.svg?height=64&width=64",
      profileEmail: "john.doe@gmail.com",
      meetingType: "google_meet",
      username: "john-doe",
      welcomeMessage:
        "Welcome! Let's schedule a time to connect and discuss your needs.",
      googleCalendarConnected: false,
    },
  });

  // When user data loads, populate the form
  useEffect(() => {
    if (!userData.data) return;

    form.reset({
      profileName: userData.data.name || "John Doe",
      profileImage:
        userData.data.profilePicture || "/placeholder.svg?height=64&width=64",
      profileEmail: userData.data.email || "john.doe@gmail.com",
      meetingType:
        (userData.data.meetingType as SettingsFormData["meetingType"]) ||
        "google_meet",
      username: userData.data.username || "john-doe",
      welcomeMessage:
        userData.data.welcomeMessage ||
        "Welcome! Let's schedule a time to connect and discuss your needs.",
      googleCalendarConnected: Boolean(userData.data.googleCalendarConnected),
    });
  }, [userData.data, form]);

  const { watch, setValue } = form;

  const watchedBookingSlug = watch("username");

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // check file type
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file.",
          variant: "destructive",
        });
        return;
      }

      // check file size limit to 5mb
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image smaller than 5MB.",
          variant: "destructive",
        });
        return;
      }

      // create url for preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setValue("profileImage", imageUrl);
        toast({
          title: "Photo updated",
          description: "Your profile photo has been updated successfully.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: SettingsFormData) => {
    setIsSubmitting(true);

    try {
      await saveUserSettings(data);
      toast({
        title: "Settings saved",
        description: "All your settings have been saved successfully.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error saving settings",
        description:
          "There was an error saving your settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleCalendarToggle = () => {
    const currentValue = form.watch("googleCalendarConnected");
    const newValue = !currentValue;
    form.setValue("googleCalendarConnected", newValue);
    toast({
      title: newValue ? "Calendar disconnected" : "Calendar connected",
      description: newValue
        ? "Your Google Calendar has been disconnected."
        : "Your Google Calendar has been connected successfully.",
      variant: newValue ? "destructive" : "default",
    });
  };

  const copyBookingLink = () => {
    navigator.clipboard.writeText(`https://meetwise.com/${watchedBookingSlug}`);
    toast({
      title: "Link copied",
      description: "Your booking page link has been copied to clipboard.",
    });
  };

  return (
    <div className="h-full w-full bg-[#151a1d] flex flex-col gap-y-12 lg:p-10 p-2 sm:p-6 md:p-8 max-h-screen overflow-y-auto scrollbar-hide">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* header */}
        <div className="space-y-2 text-white">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-gray-400">
            Manage your account settings and preferences
          </p>
        </div>

        {/* main Settings Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card className="bg-[#161a1d] border-[#2e2d2d] text-white">
              <CardContent className="p-8 space-y-12">
                {/* profile settings section */}
                <ProfileSection
                  form={form}
                  fileInputRef={fileInputRef}
                  handlePhotoUpload={handlePhotoUpload}
                />

                <Separator className="bg-gray-800" />

                {/* booking configuration */}
                <BookingConfiguration form={form} />

                <Separator className="bg-gray-800" />

                {/* public page settings */}
                <PublicPageSettings
                  form={form}
                  copyBookingLink={copyBookingLink}
                />

                <Separator className="bg-gray-800" />

                {/* integrations section */}
                <IntegrationsSection
                  form={form}
                  handleGoogleCalendarToggle={handleGoogleCalendarToggle}
                />

                <Separator className="bg-gray-800" />

                {/* submit button */}
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 text-base mr-3 bg-gradient-to-t from-white/70 via-white/80 to-white text-black hover:bg-opacity-90 transition-all duration-300 group relative overflow-hidden rounded-lg hover:text-black"
                  >
                    {isSubmitting ? "Saving..." : "Save"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  );
}

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";
import { User } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import { SettingsFormData } from "@/lib/zod/schema";
import { UseFormReturn } from "react-hook-form";

interface ProfileSectionProps {
  form: UseFormReturn<SettingsFormData>;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handlePhotoUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileSection = ({
  form,
  fileInputRef,
  handlePhotoUpload,
}: ProfileSectionProps) => {
  const watchedProfileImage = form.watch("profileImage");
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <User className="h-5 w-5 text-neutral-500" />
        <h2 className="text-xl font-semibold">Profile Settings</h2>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <div className="relative">
          <Avatar className="h-20 w-20">
            <AvatarImage
              src={watchedProfileImage || "/placeholder.svg"}
              alt="Profile"
            />
            <AvatarFallback className="bg-neutral-800 text-white text-xl">
              SJ
            </AvatarFallback>
          </Avatar>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute -bottom-2 -right-2 bg-neutral-300 hover:bg-neutral-400 text-neutral-800 rounded-full p-2 transition-colors"
          >
            <Camera className="h-4 w-4" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
          />
        </div>

        <div className="flex-1 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="profileName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-gray-800 border-gray-700 focus:border-teal-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Input
                  id="email"
                  value={form.getValues("profileEmail")}
                  disabled
                  className="bg-gray-800 border-gray-700 text-gray-400 pr-10"
                />
                <Mail className="absolute right-3 top-3 h-4 w-4 text-gray-500" />
              </div>
              <p className="text-xs text-gray-500">
                Email cannot be changed as you signed in with Google
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;

import { authOptions } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";
import { getServerSession } from "next-auth";
import prisma from "@/lib/global-prisma";
import { MeetingType } from "@/lib/generated/prisma";
import { SettingsFormData } from "@/lib/zod/schema";

export async function saveUserSettings(userSettings: SettingsFormData) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }

  let imageUrl = userSettings.profileImage;

  // profileImage is a base64 string, upload to Cloudinary
  if (
    userSettings.profileImage &&
    userSettings.profileImage.startsWith("data:image")
  ) {
    const uploadResponse = await cloudinary.uploader.upload(
      userSettings.profileImage,
      {
        folder: "user_profiles",
        resource_type: "image",
      }
    );
    imageUrl = uploadResponse.secure_url;
  }

  const updatedUser = await prisma.user.update({
    where: { id: session.user.id },
    data: {
      welcomeMessage: userSettings.welcomeMessage,
      calendarConnectedAt: userSettings.connectedCalendar,
      googleCalendarConnected: userSettings.googleCalendarConnected,
      username: userSettings.username,
      email: userSettings.profileEmail,
      meetingType: userSettings.meetingType as MeetingType,
      profilePicture: imageUrl,
    },
  });

  return updatedUser;
}

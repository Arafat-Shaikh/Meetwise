"use client";

import type React from "react";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Form } from "@/components/ui/form";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Trash2, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { SettingsFormData, settingsSchema } from "@/lib/zod/schema";
import BookingConfiguration from "@/app/_components/settings/booking-configuration";
import IntegrationsSection from "@/app/_components/settings/integrations-section";
import ProfileSection from "@/app/_components/settings/profile-section";

export default function SettingsPage() {
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [deleteConfirmText, setDeleteConfirmText] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const form = useForm<SettingsFormData>({
        resolver: zodResolver(settingsSchema),
        defaultValues: {
            profileName: "Sarah Johnson",
            profileImage: "/placeholder.svg?height=64&width=64",
            profileEmail: "sarah.johnson@gmail.com",
            meetingType: "googleMeet",
            bookingSlug: "sarah-johnson",
            welcomeMessage:
                "Welcome! Let's schedule a time to connect and discuss your needs.",
            googleCalendarConnected: true,
            connectedCalendar: "sarah.johnson@gmail.com",
        },
    });

    const { watch, setValue } = form;

    const watchedBookingSlug = watch("bookingSlug");

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
            // simulate api call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            console.log("Settings data to save:", data);

            toast({
                title: "Settings saved",
                description: "All your settings have been saved successfully.",
            });
        } catch (error) {
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

    const handleDeleteAccount = () => {
        if (deleteConfirmText !== "DELETE") return;

        toast({
            title: "Account deleted",
            description:
                "Your account and all associated data have been permanently deleted.",
            variant: "destructive",
        });
        setDeleteConfirmOpen(false);
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
                                <BookingConfiguration
                                    copyBookingLink={copyBookingLink}
                                    form={form}
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
                                        className="bg-teal-600 hover:bg-teal-700 px-8"
                                    >
                                        {isSubmitting ? "Saving..." : "Save All Settings"}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </form>
                </Form>

                {/*  account delete card */}
                <Card className="bg-gray-900 border-red-800/20">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-red-400">
                            <Trash2 className="h-5 w-5" />
                            Danger Zone
                        </CardTitle>
                        <CardDescription>
                            Permanently delete your account and all associated data
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Alert className="bg-red-900/10 border-red-800/20 mb-6">
                            <AlertCircle className="h-4 w-4 text-red-400" />
                            <AlertDescription className="text-red-300">
                                <strong>Warning:</strong> This action cannot be undone. All your
                                data including profile, bookings, and availability will be
                                permanently deleted.
                            </AlertDescription>
                        </Alert>

                        <Dialog
                            open={deleteConfirmOpen}
                            onOpenChange={setDeleteConfirmOpen}
                        >
                            <DialogTrigger asChild>
                                <Button
                                    variant="destructive"
                                    className="bg-red-700 hover:bg-red-700"
                                >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete My Account
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-gray-900 border-gray-800">
                                <DialogHeader>
                                    <DialogTitle className="text-red-400">
                                        Delete Account
                                    </DialogTitle>
                                    <DialogDescription>
                                        Are you sure you want to delete your account? This action is
                                        permanent and cannot be undone.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                    <Alert className="bg-red-900/20 border-red-800">
                                        <AlertCircle className="h-4 w-4 text-red-400" />
                                        <AlertDescription className="text-red-300">
                                            This will permanently delete:
                                            <ul className="list-disc list-inside mt-2 space-y-1">
                                                <li>Your profile and account information</li>
                                                <li>All booking history and upcoming appointments</li>
                                                <li>Your availability settings</li>
                                                <li>Connected integrations</li>
                                            </ul>
                                        </AlertDescription>
                                    </Alert>
                                    <div className="space-y-2">
                                        <Label htmlFor="delete-confirm">
                                            Type <strong>DELETE</strong> to confirm:
                                        </Label>
                                        <Input
                                            id="delete-confirm"
                                            value={deleteConfirmText}
                                            onChange={(e) => setDeleteConfirmText(e.target.value)}
                                            className="bg-gray-800 border-gray-700"
                                            placeholder="DELETE"
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setDeleteConfirmOpen(false);
                                            setDeleteConfirmText("");
                                        }}
                                        className="border-gray-700 hover:bg-gray-800"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        onClick={handleDeleteAccount}
                                        disabled={deleteConfirmText !== "DELETE"}
                                        className="bg-red-600 hover:bg-red-700"
                                    >
                                        Delete Account Permanently
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

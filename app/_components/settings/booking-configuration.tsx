import React from 'react'
import { Calendar, Copy, ExternalLink, MapPin, Phone, Video } from 'lucide-react'
import { Form, FormField, FormItem, FormLabel, FormDescription, FormMessage, FormControl } from '@/components/ui/form'
import { UseFormReturn } from 'react-hook-form'
import { SettingsFormData } from '@/lib/zod/schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

type BookingConfigurationProps = {
    form: UseFormReturn<SettingsFormData>;
    copyBookingLink: () => void;
};
const BookingConfiguration = ({ form, copyBookingLink }: BookingConfigurationProps) => {
    const { watch, setValue } = form
    const watchedBookingSlug = watch("bookingSlug")


    return (
        <div className="space-y-8">
            <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-teal-400" />
                <h2 className="text-xl font-semibold">Booking Configuration</h2>
            </div>

            {/* Meeting Types */}
            <FormField
                control={form.control}
                name="meetingType"
                render={({ field }) => (
                    <FormItem className="space-y-4">
                        <FormLabel className="text-lg font-medium text-gray-300">Meeting Types</FormLabel>
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
                                        checked={field.value === "googleMeet"}
                                        onChange={() => field.onChange("googleMeet")}
                                        className="w-4 h-4 text-teal-600 bg-gray-800 border-gray-600"
                                    />
                                    <label htmlFor="google-meet" className="flex items-center gap-3 cursor-pointer flex-1">
                                        <Video className="h-5 w-5 text-blue-400" />
                                        <div>
                                            <p className="font-medium">Google Meet</p>
                                            <p className="text-xs text-gray-400">Video calls via Google Meet</p>
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
                                        className="w-4 h-4 text-teal-600 bg-gray-800 border-gray-600"
                                    />
                                    <label htmlFor="phone-call" className="flex items-center gap-3 cursor-pointer flex-1">
                                        <Phone className="h-5 w-5 text-green-400" />
                                        <div>
                                            <p className="font-medium">Phone Call</p>
                                            <p className="text-xs text-gray-400">Traditional phone conversations</p>
                                        </div>
                                    </label>
                                </div>

                                <div className="flex items-center space-x-3 p-4 rounded-lg border border-gray-800 hover:bg-gray-800/50 transition-colors">
                                    <input
                                        type="radio"
                                        id="in-person"
                                        value="inPerson"
                                        checked={field.value === "inPerson"}
                                        onChange={() => field.onChange("inPerson")}
                                        className="w-4 h-4 text-teal-600 bg-gray-800 border-gray-600"
                                    />
                                    <label htmlFor="in-person" className="flex items-center gap-3 cursor-pointer flex-1">
                                        <MapPin className="h-5 w-5 text-purple-400" />
                                        <div>
                                            <p className="font-medium">In-Person Meeting</p>
                                            <p className="text-xs text-gray-400">Face-to-face meetings at your location</p>
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
            <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-300">Public Booking Page</h3>
                <p className="text-sm text-gray-400 mb-4">
                    Customize how your public booking page appears to clients
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="bookingSlug"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Booking Page Username</FormLabel>
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-400 text-sm whitespace-nowrap">meetwise.com/</span>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className="bg-gray-800 border-gray-700 focus:border-teal-500"
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
                                        onClick={() => window.open(`https://meetwise.com/${watchedBookingSlug}`, "_blank")}
                                        className="text-teal-400 hover:text-teal-300 p-0 h-auto"
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
                                        className="bg-gray-800 border-gray-700 focus:border-teal-500 min-h-[100px]"
                                        placeholder="Write a welcoming message for your visitors..."
                                    />
                                </FormControl>
                                <FormDescription>This message will appear at the top of your booking page</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </div>
        </div>
    )
}

export default BookingConfiguration
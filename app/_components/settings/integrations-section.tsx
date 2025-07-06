import { Calendar, Link2 } from 'lucide-react'
import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { SettingsFormData } from '@/lib/zod/schema'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Alert } from '@/components/ui/alert'
import { AlertDescription } from '@/components/ui/alert'
import { CheckCircle } from 'lucide-react'

interface IntegrationsSectionProps {
    form: UseFormReturn<SettingsFormData>;
    handleGoogleCalendarToggle: () => void;
}

const IntegrationsSection = ({ form, handleGoogleCalendarToggle }: IntegrationsSectionProps) => {
    return (
        (
            <div className="space-y-6">
                <div className="flex items-center gap-2">
                    <Link2 className="h-5 w-5 text-teal-400" />
                    <h2 className="text-xl font-semibold">Integrations</h2>
                </div>
                <p className="text-sm text-gray-400">Connect your external accounts and services</p>

                <div className="flex items-center justify-between p-6 rounded-lg border border-gray-800 hover:bg-gray-800/30 transition-colors">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-600 rounded-lg">
                            <Calendar className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <p className="font-medium text-lg">Google Calendar</p>
                            {form.getValues("googleCalendarConnected") ? (
                                <div className="flex items-center gap-2 mt-1">
                                    <Badge variant="secondary" className="bg-green-900 text-green-300 border-green-700">
                                        <CheckCircle className="h-3 w-3 mr-1" />
                                        Connected
                                    </Badge>
                                    <span className="text-sm text-gray-400">• {form.getValues("connectedCalendar")}</span>
                                </div>
                            ) : (
                                <Badge variant="secondary" className="bg-gray-800 text-gray-400 border-gray-700 mt-1">
                                    Not Connected
                                </Badge>
                            )}
                        </div>
                    </div>
                    <Button
                        type="button"
                        variant={form.getValues("googleCalendarConnected") ? "destructive" : "default"}
                        onClick={handleGoogleCalendarToggle}
                        className={form.getValues("googleCalendarConnected") ? "" : "bg-teal-600 hover:bg-teal-700"}
                    >
                        {form.getValues("googleCalendarConnected") ? "Disconnect" : "Connect"}
                    </Button>
                </div>

                {form.getValues("googleCalendarConnected") && (
                    <Alert className="bg-blue-900/20 border-blue-800">
                        <CheckCircle className="h-4 w-4 text-blue-400" />
                        <AlertDescription className="text-blue-300">
                            Your bookings will automatically sync with your Google Calendar to prevent double-booking.
                        </AlertDescription>
                    </Alert>
                )}
            </div>
        )
    )
}

export default IntegrationsSection
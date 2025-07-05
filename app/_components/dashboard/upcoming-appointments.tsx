import { Clock, User, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const UpcomingAppointments = () => {
    const appointments = [
        {
            id: 1,
            clientName: "Sarah Johnson",
            time: "2:00 PM - 3:00 PM",
            date: "Today",
            type: "Consultation Call",
            status: "confirmed",
        },
        {
            id: 2,
            clientName: "Mike Chen",
            time: "4:30 PM - 5:00 PM",
            date: "Today",
            type: "Follow-up Meeting",
            status: "confirmed",
        },
        {
            id: 3,
            clientName: "Emma Wilson",
            time: "10:00 AM - 11:00 AM",
            date: "Tomorrow",
            type: "Strategy Session",
            status: "pending",
        },
        {
            id: 4,
            clientName: "David Brown",
            time: "2:00 PM - 2:30 PM",
            date: "Tomorrow",
            type: "Quick Check-in",
            status: "confirmed",
        },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case "confirmed":
                return "bg-green-600/20 text-green-400";
            case "pending":
                return "bg-yellow-600/20 text-yellow-400";
            case "canceled":
                return "bg-red-600/20 text-red-400";
            default:
                return "bg-gray-600/20 text-gray-400";
        }
    };

    return (
        <div className="bg-[#161a1d] rounded-2xl p-4 sm:p-6 border border-[#2e2d2d]">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <Calendar size={18} className="text-teal-400 sm:w-5 sm:h-5" />
                <h3 className="text-base sm:text-lg font-semibold text-gray-100">Upcoming Appointments</h3>
            </div>

            <div className="space-y-3 sm:space-y-4">
                {appointments.map((appointment) => (
                    <div
                        key={appointment.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-[#2e2d2d]/30 rounded-xl hover:bg-[#2e2d2d]/50 transition-all duration-200 gap-3 sm:gap-4"
                    >
                        <div className="flex items-center gap-3 sm:gap-4">
                            <div className="p-2 bg-teal-600/20 rounded-lg flex-shrink-0">
                                <User size={14} className="text-teal-400 sm:w-4 sm:h-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <h4 className="text-gray-100 font-medium text-sm sm:text-base">{appointment.clientName}</h4>
                                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
                                    <Clock size={10} className="sm:w-3 sm:h-3" />
                                    <span>{appointment.time}</span>
                                    <span>•</span>
                                    <span>{appointment.date}</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">{appointment.type}</p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                            <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                    appointment.status
                                )} self-start`}
                            >
                                {appointment.status}
                            </span>
                            <div className="flex gap-2">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-7 sm:h-8 px-2 sm:px-3 text-xs border-gray-600 text-gray-300 hover:bg-[#2e2d2d]"
                                >
                                    Reschedule
                                </Button>
                                <Button
                                    size="sm"
                                    className="h-7 sm:h-8 px-2 sm:px-3 text-xs bg-teal-600 hover:bg-teal-700"
                                >
                                    Join
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UpcomingAppointments;
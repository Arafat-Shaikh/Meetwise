import { Plus, Calendar, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const QuickActions = () => {
    const actions = [
        {
            title: "Create New Availability",
            description: "Set your available time slots",
            icon: Calendar,
            color: "bg-teal-600 hover:bg-teal-700",
        },
        {
            title: "Book Appointment",
            description: "Manually schedule a meeting",
            icon: Plus,
            color: "bg-blue-600 hover:bg-blue-700",
        },
        {
            title: "Share Booking Link",
            description: "Send your booking page to clients",
            icon: Share2,
            color: "bg-purple-600 hover:bg-purple-700",
        },
    ];

    return (
        <div className="bg-[#161a1d] rounded-2xl p-4 sm:p-6 border border-[#2e2d2d] h-full">
            <h3 className="text-base sm:text-lg font-semibold text-gray-100 mb-4 sm:mb-6">Quick Actions</h3>

            <div className="space-y-2 sm:space-y-3">
                {actions.map((action, index) => (
                    <Button
                        key={index}
                        className={`w-full h-auto p-3 sm:p-4 ${action.color} text-white flex items-start gap-2 sm:gap-3 justify-start text-left`}
                    >
                        <div className="p-1 bg-white/20 rounded flex-shrink-0">
                            <action.icon size={14} className="sm:w-4 sm:h-4" />
                        </div>
                        <div className="text-left min-w-0">
                            <div className="font-medium text-sm sm:text-base">{action.title}</div>
                            <div className="text-xs opacity-80">{action.description}</div>
                        </div>
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default QuickActions;
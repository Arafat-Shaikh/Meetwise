import { Booking } from "@/lib/generated/prisma";
import { TrendingUp, Calendar, DollarSign, Users } from "lucide-react";

interface MetricsCardsProps {
  totalBookings?: Booking[];
  allClients?: string[];
}

const MetricsCards = ({ totalBookings, allClients }: MetricsCardsProps) => {
  console.log("Total Bookings in MetricsCards:", totalBookings); // Debugging line
  const metrics = [
    {
      title: "Total Bookings",
      subtitle: "This month",
      value: totalBookings?.length.toString(),
      change: "+12%",
      positive: true,
      icon: Calendar,
    },
    {
      title: "Canceled Appointments",
      value: "0",
      subtitle: "This week",
      change: "-3%",
      positive: true,
      icon: TrendingUp,
    },
    {
      title: "Active Clients",
      value: allClients?.length.toString() || "0",
      subtitle: "This month",
      change: "+8%",
      positive: true,
      icon: Users,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="bg-[#161a1d] rounded-2xl p-4 sm:p-6 border border-[#2e2d2d] hover:border-teal-400/30 transition-all duration-200"
        >
          <div className="flex items-start justify-between mb-3 sm:mb-4">
            <div className="p-2 bg-teal-600/20 rounded-lg">
              <metric.icon size={18} className="text-teal-400 sm:w-5 sm:h-5" />
            </div>
            <span
              className={`text-xs sm:text-sm font-medium ${
                metric.positive ? "text-green-400" : "text-red-400"
              }`}
            >
              {metric.change}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-100 mb-1">
            {metric.value}
          </h3>
          <p className="text-gray-400 text-xs sm:text-sm">{metric.title}</p>
          <p className="text-gray-500 text-xs mt-1">{metric.subtitle}</p>
        </div>
      ))}
    </div>
  );
};

export default MetricsCards;

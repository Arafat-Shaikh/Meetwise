"use client"

import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from "recharts"

const BookingChart = () => {
    const data = [
        { day: "Mon", bookings: 12 },
        { day: "Tue", bookings: 15 },
        { day: "Wed", bookings: 8 },
        { day: "Thu", bookings: 18 },
        { day: "Fri", bookings: 22 },
        { day: "Sat", bookings: 5 },
        { day: "Sun", bookings: 3 },
    ]

    return (
        <div className="bg-[#161a1d] rounded-2xl p-4 sm:p-6 border border-[#2e2d2d]">
            <h3 className="text-base sm:text-lg font-semibold text-gray-100 mb-4 sm:mb-6">Booking Trends</h3>
            <div className="h-48 sm:h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#2e2d2d" vertical={false} />
                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF", fontSize: 12 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF", fontSize: 12 }} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#161a1d",
                                border: "1px solid #2e2d2d",
                                borderRadius: "8px",
                                color: "#f3f4f6",
                            }}
                            cursor={{ fill: "transparent" }}
                            formatter={(value: any, name: any) => [`${value} bookings`, ""]}
                            labelStyle={{ color: "#f3f4f6" }}
                        />
                        <Bar dataKey="bookings" fill="#0d9488" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <style jsx>{`
        .recharts-bar-rectangle:hover {
          fill: #0f766e !important;
        }
      `}</style>
        </div>
    )
}

export default BookingChart

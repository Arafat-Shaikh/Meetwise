"use client";

import { useEffect, useState } from "react";
import { TooltipProps } from "recharts";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format, addDays, subDays, startOfDay } from "date-fns";
import { useMediaQuery } from "react-responsive";
import { Booking } from "@/lib/generated/prisma";

interface BookingData {
  day: string;
  bookings: number;
  date: Date;
}

// Mock function to generate booking data for any date range
const generateBookingData = (
  startDate: Date,
  allBookings: Booking[]
): BookingData[] => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const data: BookingData[] = [];

  for (let i = 0; i < 7; i++) {
    const currentDate = addDays(startDate, i);
    const dayName =
      days[currentDate.getDay() === 0 ? 6 : currentDate.getDay() - 1];
    const bookings = allBookings?.filter((booking) => {
      const bookingDate = new Date(booking.date);
      return (
        bookingDate.getFullYear() === currentDate.getFullYear() &&
        bookingDate.getMonth() === currentDate.getMonth() &&
        bookingDate.getDate() === currentDate.getDate()
      );
    }).length;

    data.push({
      day: dayName,
      bookings,
      date: currentDate,
    });
  }

  return data;
};

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div
        style={{
          background: "#161a1d",
          borderRadius: 8,
          padding: 12,
          color: "#f3f4f6",
          border: "1px solid #2e2d2d",
          boxShadow: "none",
        }}
      >
        <p style={{ fontWeight: 500 }}>{label}</p>
        <p style={{ color: "#eab308", fontWeight: 600 }}>
          {payload[0].value} booking{payload[0].value !== 1 ? "s" : ""}
        </p>
        <p style={{ color: "#9CA3AF", fontSize: 14 }}>
          {format(data.date, "MMM dd, yyyy")}
        </p>
      </div>
    );
  }
  return null;
};

interface BookingChartProps {
  allBookings: Booking[];
}

export default function BookingChart({ allBookings }: BookingChartProps) {
  // Start from Monday of current week
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    return startOfDay(subDays(today, daysToSubtract));
  });

  const isSmall = useMediaQuery({ maxWidth: 639 });

  const [data, setData] = useState(() =>
    generateBookingData(currentWeekStart, allBookings)
  );

  useEffect(() => {
    setData(generateBookingData(currentWeekStart, allBookings));
  }, [allBookings]);

  const goToPreviousWeek = () => {
    const newStart = subDays(currentWeekStart, 7);
    setCurrentWeekStart(newStart);
    setData(generateBookingData(newStart, allBookings));
  };

  const goToNextWeek = () => {
    const newStart = addDays(currentWeekStart, 7);
    setCurrentWeekStart(newStart);
    setData(generateBookingData(newStart, allBookings));
  };

  const weekEndDate = addDays(currentWeekStart, 6);
  const dateRangeText = `${format(currentWeekStart, "MMM dd")} - ${format(
    weekEndDate,
    "MMM dd, yyyy"
  )}`;

  return (
    <Card className="w-full bg-neutral-850">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-md md:text-2xl font-medium md:font-bold text-white">
          Booking Trends
        </CardTitle>
        <div className="flex items-center gap-4">
          <span className="text-muted-foreground text-sm font-medium">
            {dateRangeText}
          </span>
          <div className="flex items-center gap-1 text-white">
            <Button
              variant="ghost"
              size="sm"
              onClick={goToPreviousWeek}
              className="h-8 w-8 p-0 hover:bg-nav-button-hover hover:text-white/80"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={goToNextWeek}
              className="h-8 w-8 p-0 hover:bg-nav-button-hover hover:text-white/80"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full -ml-14 sm:-ml-0 mt-4">
          <ResponsiveContainer
            width={isSmall ? "130%" : "100%"}
            height={isSmall ? "80%" : "85%"}
          >
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--chart-grid))"
                opacity={0.3}
              />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--chart-text))", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--chart-text))", fontSize: 12 }}
              />
              <Tooltip
                cursor={{ fill: "transparent" }}
                content={<CustomTooltip />}
              />
              <Bar
                dataKey="bookings"
                fill="#fff"
                radius={[4, 4, 0, 0]}
                className="transition-colors duration-200"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <span>Weekly booking overview</span>
          <span>
            Total: {data.reduce((sum, item) => sum + item.bookings, 0) || 0}{" "}
            bookings
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

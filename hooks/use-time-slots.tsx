import { getTimeSlots } from "@/action/get-time-slots";
import { useQuery } from "@tanstack/react-query";

const useTimeSlots = (username: string, date: Date, clientTimeZone: string) => {
  return useQuery({
    queryKey: ["timeSlots", username, date, clientTimeZone],
    queryFn: () => getTimeSlots(username, date, clientTimeZone),
    enabled: !!username && !!date && !!clientTimeZone,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export default useTimeSlots;

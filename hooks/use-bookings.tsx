import { getBookingsByRange } from "@/action/get-bookings";
import { useQuery } from "@tanstack/react-query";

const useBookings = () => {
  return useQuery({
    queryKey: ["bookings"],
    queryFn: () => getBookingsByRange(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export default useBookings;

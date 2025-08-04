import { getBookingDetails } from "@/action/create-booking";
import { useQuery } from "@tanstack/react-query";

const useBooking = (bookingId: string) => {
  return useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBookingDetails(bookingId),
    enabled: !!bookingId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export default useBooking;

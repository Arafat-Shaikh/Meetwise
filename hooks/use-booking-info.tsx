import { getBookingDetails } from "@/action/create-booking";
import { useQuery } from "@tanstack/react-query";

const useBookingInfo = (bookingId: string) => {
  return useQuery({
    queryKey: ["booking-info", bookingId],
    queryFn: () => getBookingDetails(bookingId),
    enabled: !!bookingId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export default useBookingInfo;

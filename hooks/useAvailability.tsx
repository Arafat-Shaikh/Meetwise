import { getUserAvailability } from "@/action/user";
import { useQuery } from "@tanstack/react-query";

const useAvailability = (clientTimeZone?: string) => {
  return useQuery({
    queryKey: ["availability", clientTimeZone],
    queryFn: () => getUserAvailability(clientTimeZone),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export default useAvailability;

import { getPublicUserAvailability, getUserAvailability } from "@/action/user";
import { useQuery } from "@tanstack/react-query";

const usePublicAvailability = (clientTimeZone?: string, username?: string) => {
  return useQuery({
    queryKey: ["availability", clientTimeZone, username],
    queryFn: () => getPublicUserAvailability(clientTimeZone, username),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export default usePublicAvailability;

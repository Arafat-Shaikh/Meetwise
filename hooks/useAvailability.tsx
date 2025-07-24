import { getUserAvailability } from "@/action/user";
import { useQuery } from "@tanstack/react-query";

const useAvailability = (clientTimeZone?: string, username?: string) => {
  console.log(clientTimeZone);
  console.log(username);
  return useQuery({
    queryKey: ["availability", clientTimeZone, username],
    queryFn: () => getUserAvailability(clientTimeZone, username),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export default useAvailability;

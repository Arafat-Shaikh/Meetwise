import { getUser } from "@/action/user";
import { useQuery } from "@tanstack/react-query";

const useUserData = () => {
  return useQuery({
    queryKey: ["user-data"],
    queryFn: () => getUser(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export default useUserData;

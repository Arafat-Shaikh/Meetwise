import { getUserAvailability } from "@/action/user";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const useAvailability = () => {
  return useQuery({
    queryKey: ["availability"],
    queryFn: () => getUserAvailability(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export default useAvailability;

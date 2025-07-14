import { saveUserAvailability } from "@/action/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useSaveAvailability = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => saveUserAvailability(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["availability"] });
    },
  });
};

export default useSaveAvailability;

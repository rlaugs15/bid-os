import { userKeys } from "@/services/cache/user.cache";
import { logout } from "@/services/user/user.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useLogoutMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => await logout(),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: userKeys.me() });
    },
    onError: () => {
      console.log("로그아웃 실패");
    },
  });
}

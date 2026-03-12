import { userKeys } from "@/services/cache/user.cache";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

export default function useUser() {
  return useQuery<User>({
    queryKey: userKeys.me(),
    queryFn: async () => {
      const res = await fetch("/api/user");
      const data = await res.json();
      return data.me;
    },
  });
}

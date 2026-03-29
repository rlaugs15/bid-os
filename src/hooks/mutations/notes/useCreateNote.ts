import { fetchJson } from "@/lib/utils";
import { noteKeys } from "@/services/cache/notes.chache";
import { CreateNoteRequest, NoteItem } from "@/types/notes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function useCreateNote() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (body: CreateNoteRequest) =>
      fetchJson<NoteItem>("/api/notes", {
        method: "POST",
        body: JSON.stringify(body),
      }),
    onSuccess: () => {
      //refetchType는 전체 페이지에서 데이터를 refetch하도록 설정(안 하면 현재페이지만 됨)
      queryClient.invalidateQueries({ queryKey: noteKeys.lists(), refetchType: "all" });
      router.replace("/notes");
    },
  });
}

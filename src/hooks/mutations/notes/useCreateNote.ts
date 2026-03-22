import { fetchJson } from "@/lib/utils";
import { noteKeys } from "@/services/cache/notes.chache";
import { CreateNoteRequest, NoteItem } from "@/types/notes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCreateNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: CreateNoteRequest) =>
      fetchJson<NoteItem>("/api/notes", {
        method: "POST",
        body: JSON.stringify(body),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: noteKeys.lists() });
    },
  });
}

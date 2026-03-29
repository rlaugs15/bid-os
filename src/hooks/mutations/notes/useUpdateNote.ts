import { fetchJson } from "@/lib/utils";
import { noteKeys } from "@/services/cache/notes.chache";
import { NoteItem, UpdateNoteRequest } from "@/types/notes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useUpdateNote(noteId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: UpdateNoteRequest) =>
      fetchJson<NoteItem>(`/api/notes/${noteId}`, {
        method: "PATCH",
        body: JSON.stringify(body),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: noteKeys.detail(noteId) });
      queryClient.invalidateQueries({ queryKey: noteKeys.lists() });
    },
  });
}

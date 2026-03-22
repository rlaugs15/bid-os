import { fetchJson } from "@/lib/utils";
import { noteKeys } from "@/services/cache/notes.chache";
import { NoteItem } from "@/types/notes";
import { useQuery } from "@tanstack/react-query";

export default function useNote(noteId: string) {
  return useQuery({
    queryKey: noteKeys.detail(noteId),
    queryFn: async () => fetchJson<NoteItem>(`/api/notes/${noteId}`),
    enabled: Boolean(noteId),
  });
}

import { fetchJson } from "@/lib/utils";
import { noteKeys } from "@/services/cache/notes.chache";
import { NoteItem } from "@/types/notes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface DisconnectCaseVariables {
  noteId: string;
  caseId: string;
}

export default function useDisconnectCaseFromNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ noteId, caseId }: DisconnectCaseVariables) =>
      fetchJson<{ success: true }>(`/api/notes/${noteId}/cases/${caseId}`, {
        method: "DELETE",
      }),

    onMutate: async ({ noteId, caseId }) => {
      await queryClient.cancelQueries({
        queryKey: noteKeys.detail(noteId),
      });

      const previous = queryClient.getQueryData<NoteItem>(noteKeys.detail(noteId));

      if (previous) {
        queryClient.setQueryData<NoteItem>(noteKeys.detail(noteId), {
          ...previous,
          note_cases: (previous.note_cases ?? []).filter((relation) => relation.case_id !== caseId),
        });
      }

      return { previous, noteId };
    },

    onError: (_error, variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(noteKeys.detail(variables.noteId), context.previous);
      }
    },

    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: noteKeys.detail(variables.noteId),
      });
    },
  });
}

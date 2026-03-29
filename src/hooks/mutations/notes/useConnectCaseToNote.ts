import { fetchJson } from "@/lib/utils";
import { noteKeys } from "@/services/cache/notes.chache";
import { NoteCaseRelation, NoteItem } from "@/types/notes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ConnectCaseVariables {
  noteId: string;
  caseId: string;
}

export default function useConnectCaseToNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ noteId, caseId }: ConnectCaseVariables) =>
      fetchJson<NoteCaseRelation>(`/api/notes/${noteId}/cases`, {
        method: "POST",
        body: JSON.stringify({ caseId }),
      }),

    onMutate: async ({ noteId, caseId }) => {
      await queryClient.cancelQueries({
        queryKey: noteKeys.detail(noteId),
      });

      const previous = queryClient.getQueryData<NoteItem>(noteKeys.detail(noteId));

      if (previous) {
        queryClient.setQueryData<NoteItem>(noteKeys.detail(noteId), {
          ...previous,
          note_cases: [
            ...(previous.note_cases ?? []),
            {
              id: `temp-case-${caseId}`,
              created_at: new Date().toISOString(),
              note_id: noteId,
              case_id: caseId,
              cases: {
                id: caseId,
                created_at: new Date().toISOString(),
                user_id: previous.user_id,
                bid_number: "",
                title: "연결 중...",
                status: "active",
                opened_at: null,
                updated_at: new Date().toISOString(),
              },
            },
          ],
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

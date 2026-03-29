import { fetchJson } from "@/lib/utils";
import { noteKeys } from "@/services/cache/notes.chache";
import { NoteItem } from "@/types/notes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface DisconnectCompanyVariables {
  noteId: string;
  companyId: string;
}

export default function useDisconnectCompanyFromNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ noteId, companyId }: DisconnectCompanyVariables) =>
      fetchJson<{ success: true }>(`/api/notes/${noteId}/companies/${companyId}`, {
        method: "DELETE",
      }),

    onMutate: async ({ noteId, companyId }) => {
      await queryClient.cancelQueries({
        queryKey: noteKeys.detail(noteId),
      });

      const previous = queryClient.getQueryData<NoteItem>(noteKeys.detail(noteId));

      if (previous) {
        queryClient.setQueryData<NoteItem>(noteKeys.detail(noteId), {
          ...previous,
          note_companies: (previous.note_companies ?? []).filter(
            (relation) => relation.company_id !== companyId,
          ),
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

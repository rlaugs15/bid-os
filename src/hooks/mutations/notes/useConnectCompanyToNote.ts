import { fetchJson } from "@/lib/utils";
import { noteKeys } from "@/services/cache/notes.chache";
import { CompanyItem, NoteCompanyRelation, NoteItem } from "@/types/notes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ConnectCompanyVariables {
  noteId: string;
  companyId: string;
}

export default function useConnectCompanyToNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ noteId, companyId }: ConnectCompanyVariables) =>
      fetchJson<NoteCompanyRelation>(`/api/notes/${noteId}/companies`, {
        method: "POST",
        body: JSON.stringify({ companyId }),
      }),

    onMutate: async ({ noteId, companyId }) => {
      await queryClient.cancelQueries({
        queryKey: noteKeys.detail(noteId),
      });

      const previous = queryClient.getQueryData<NoteItem>(noteKeys.detail(noteId));

      if (previous) {
        const tempCompany: CompanyItem = {
          id: companyId,
          created_at: new Date().toISOString(),
          user_id: previous.user_id,
          name: "연결 중...",
          status: "active",
          type: "specialist",
          updated_at: new Date().toISOString(),
        };

        queryClient.setQueryData<NoteItem>(noteKeys.detail(noteId), {
          ...previous,
          note_companies: [
            ...(previous.note_companies ?? []),
            {
              id: `temp-company-${companyId}`,
              created_at: new Date().toISOString(),
              note_id: noteId,
              company_id: companyId,
              companies: tempCompany,
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

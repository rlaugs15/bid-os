import { CaseListParams, CompanyListParams, InboxListParams, NoteListParams } from "@/types/notes";

export const noteKeys = {
  all: ["notes"] as const,
  lists: () => [...noteKeys.all, "list"] as const,
  list: (params: NoteListParams) => [...noteKeys.lists(), params] as const,
  details: () => [...noteKeys.all, "detail"] as const,
  detail: (noteId: string) => [...noteKeys.details(), noteId] as const,
};

export const caseKeys = {
  all: ["cases"] as const,
  lists: () => [...caseKeys.all, "list"] as const,
  list: (params: CaseListParams) => [...caseKeys.lists(), params] as const,
  details: () => [...caseKeys.all, "detail"] as const,
  detail: (caseId: string) => [...caseKeys.details(), caseId] as const,
};

export const companyKeys = {
  all: ["companies"] as const,
  lists: () => [...companyKeys.all, "list"] as const,
  list: (params: CompanyListParams) => [...companyKeys.lists(), params] as const,
  details: () => [...companyKeys.all, "detail"] as const,
  detail: (companyId: string) => [...companyKeys.details(), companyId] as const,
};

export const inboxKeys = {
  all: ["inboxes"] as const,
  lists: () => [...inboxKeys.all, "list"] as const,
  list: (params: InboxListParams) => [...inboxKeys.lists(), params] as const,
  details: () => [...inboxKeys.all, "detail"] as const,
  detail: (inboxId: string) => [...inboxKeys.details(), inboxId] as const,
};

export interface NoteCaseRelation {
  id: string;
  created_at: string;
  note_id: string;
  case_id: string;
  cases?: CaseItem;
}

export interface NoteCompanyRelation {
  id: string;
  created_at: string;
  note_id: string;
  company_id: string;
  companies?: CompanyItem;
}

export interface NoteItem {
  id: string;
  user_id: string;
  title: string;
  content: string | null;
  type: string;
  source_inbox_id: string | null;
  created_at: string;
  updated_at: string;
  note_cases?: NoteCaseRelation[];
  note_companies?: NoteCompanyRelation[];
}

export interface CaseItem {
  id: string;
  created_at: string;
  user_id: string;
  bid_number: string;
  title: string;
  status: string;
  opened_at: string | null;
  updated_at: string;
  note_cases?: NoteCaseRelation[];
}

export interface CompanyItem {
  id: string;
  created_at: string;
  user_id: string;
  name: string;
  business_number: string | null;
  status: string;
  updated_at: string;
  note_companies?: NoteCompanyRelation[];
}

export interface InboxItem {
  id: string;
  user_id: string;
  raw_text: string;
  status: string;
  created_at: string;
  updated_at: string;
  converted_note_id: string | null;
}

export interface NoteListParams {
  page: number;
  pageSize: number;
  keyword?: string;
  type?: string;
}

export interface CaseListParams {
  page: number;
  pageSize: number;
  keyword?: string;
  status?: string;
}

export interface CompanyListParams {
  page: number;
  pageSize: number;
  keyword?: string;
  status?: string;
}

export interface InboxListParams {
  page: number;
  pageSize: number;
  keyword?: string;
  status?: string;
}

export interface CreateNoteRequest {
  title: string;
  content?: string;
  type?: string;
  source_inbox_id?: string | null;
}

export interface UpdateNoteRequest {
  title?: string;
  content?: string | null;
  type?: string;
}

export interface CreateCaseRequest {
  bid_number: string;
  title: string;
  status?: string;
  opened_at?: string | null;
}

export interface UpdateCaseRequest {
  bid_number?: string;
  title?: string;
  status?: string;
  opened_at?: string | null;
}

export interface CreateCompanyRequest {
  name: string;
  business_number?: string | null;
  status?: string;
}

export interface UpdateCompanyRequest {
  name?: string;
  business_number?: string | null;
  status?: string;
}

export interface CreateInboxRequest {
  raw_text: string;
}

export interface ConnectCaseToNoteRequest {
  caseId: string;
}

export interface ConnectCompanyToNoteRequest {
  companyId: string;
}

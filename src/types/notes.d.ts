// ===== Types =====

export type NoteType = "general" | "case" | "company"; // 미분류 / 공고관련 / 업체관련

export type CaseStatus = "active" | "closed"; // 공고 진행중 / 종료

export type CompanyStatus = "active" | "inactive"; // 업체 활동중 / 활동중지

// ===== Relations =====

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

// ===== Core Models =====

export interface NoteItem {
  id: string;
  user_id: string;
  title: string;
  content: string | null;
  type: NoteType;
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
  status: CaseStatus;
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
  status: CompanyStatus;
  updated_at: string;
  note_companies?: NoteCompanyRelation[];
}

export interface InboxItem {
  id: string;
  user_id: string;
  raw_text: string;
  created_at: string;
}

// ===== List Params =====

export interface NoteListParams {
  page: number;
  pageSize: number;
  keyword?: string;
  type?: NoteType;
}

export interface CaseListParams {
  page: number;
  pageSize: number;
  keyword?: string;
  status?: CaseStatus;
}

export interface CompanyListParams {
  page: number;
  pageSize: number;
  keyword?: string;
  status?: CompanyStatus;
}

export interface InboxListParams {
  page: number;
  pageSize: number;
  keyword?: string;
}

// ===== Requests =====
export interface ConvertInboxRequest {
  inboxId: string;
  title?: string;
  content?: string;
}

export interface CreateNoteRequest {
  title: string;
  content?: string;
  type?: NoteType;
}

export interface UpdateNoteRequest {
  title?: string;
  content?: string | null;
  type?: NoteType;
}

export interface CreateCaseRequest {
  bid_number: string;
  title: string;
  status?: CaseStatus;
  opened_at?: string | null;
}

export interface UpdateCaseRequest {
  bid_number?: string;
  title?: string;
  status?: CaseStatus;
  opened_at?: string | null;
}

export interface CreateCompanyRequest {
  name: string;
  business_number?: string | null;
  status?: CompanyStatus;
}

export interface UpdateCompanyRequest {
  name?: string;
  business_number?: string | null;
  status?: CompanyStatus;
}

export interface CreateInboxRequest {
  raw_text: string;
}

// ===== Relations Requests =====

export interface ConnectCaseToNoteRequest {
  caseId: string;
}

export interface ConnectCompanyToNoteRequest {
  companyId: string;
}

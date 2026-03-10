export type MemoType = "whelk" | "unqualified";

export interface Memo {
  id: string;
  content: string;
  description?: string | null;
  type: MemoType;
  user_id: string;
}

export interface CreateMemo {
  content: string;
  description?: string | null;
  type: MemoType;
}

export interface UpdateMemo {
  id: string;
  content: string;
  description?: string;
}

export type MemoType = "whelk" | "unqualified" | "hash";

export interface Memo {
  id: string;
  content: string;
  description?: string | null;
  type: MemoType;
  user_id: string;
  use_count: number;
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

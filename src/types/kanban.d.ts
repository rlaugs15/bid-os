export type Task = {
  id: string;
  title: string;
  position: string; // bigint는 JSON 직렬화 때문에 string으로 주고받는 것을 추천
  column_id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
};

export type Column = {
  id: string;
  title: string;
  position: string;
  board_id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  tasks: Task[];
};

export type Board = {
  id: string;
  title: string;
  position: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  columns: Column[];
};

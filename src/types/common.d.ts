// 옵셔널이 아닌 칠드런
export type StrictPropsWithChildren<P = unknown> = P & {
  children: ReactNode;
};

export interface PaginationResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

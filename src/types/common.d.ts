// 옵셔널이 아닌 칠드런
export type StrictPropsWithChildren<P = unknown> = P & {
  children: ReactNode;
};

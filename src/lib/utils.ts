import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* 쿼리키에서 undefined나 null 제거하는 함수 */
export function safeKey(...args: (string | number | undefined | null)[]) {
  return args
    .filter((v): v is string | number => v !== undefined && v !== null)
    .map((v) => String(v));
}

// 캐시키 배열을 문자열로 변환
export const cacheCore = {
  fromKey: (key: readonly (string | number)[]) => key.join(":"),
};

/* URLSearchParams로 변환해 API 요청용 쿼리스트링(query string) 으로 만들어주는 유틸 함수 */
export function toQueryString(params: Record<string, any>): string {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      query.set(key, String(value));
    }
  });

  return query.toString();
}

export function extractVariables(content: string) {
  const matches = content.match(/{([^{}]+)}/g) || [];
  return matches.map((v) => v.slice(1, -1).trim());
}

"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function useTabQuery<T extends Record<string, string>>(tabMap: T) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 현재 쿼리값 (없으면 기본 all)
  const currentValue = searchParams.get("type") ?? "all";

  // Tabs 컴포넌트용 데이터
  const tabs = Object.entries(tabMap).map(([label, value]) => ({
    label,
    value,
  }));

  // 현재 선택된 탭
  const currentTab = (
    Object.values(tabMap).includes(currentValue) ? currentValue : "all"
  ) as T[keyof T];

  // 탭 변경 시 URL 변경
  const setCurrentTab = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all") {
      params.delete("type"); // 기본값이면 제거
    } else {
      params.set("type", value);
    }

    router.push(`?${params.toString()}`);
  };

  return {
    tabs,
    currentTab,
    setCurrentTab,
  };
}

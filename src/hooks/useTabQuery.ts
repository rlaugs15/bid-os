"use client";

import { useRouter, useSearchParams } from "next/navigation";

type QueryKey = "status" | "type" | string;

export default function useTabQuery<T extends Record<string, string>>(
  tabMap: T,
  queryKey: QueryKey,
) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentValue = searchParams.get(queryKey) ?? "all";

  const tabs = Object.entries(tabMap).map(([label, value]) => ({
    label,
    value,
  }));

  const currentTab = (
    Object.values(tabMap).includes(currentValue) ? currentValue : "all"
  ) as T[keyof T];

  const setCurrentTab = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all") {
      params.delete(queryKey);
    } else {
      params.set(queryKey, value);
    }

    router.push(`?${params.toString()}`);
  };

  return {
    tabs,
    currentTab,
    setCurrentTab,
  };
}

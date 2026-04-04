"use client";

import useTabQuery from "@/hooks/useTabQuery";
import { useRouter, useSearchParams } from "next/navigation";

const tabMap = {
  전체: "all",
  진행중: "active",
  종료: "closed",
} as const;

export default function CasesTabs() {
  const { tabs, currentTab, setCurrentTab } = useTabQuery(tabMap, "status");
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleChange = (value: string) => {
    setCurrentTab(value);

    const params = new URLSearchParams(searchParams.toString());

    // status 처리
    if (value === "all") {
      params.delete("status");
    } else {
      params.set("status", value);
    }

    // keyword 제거
    params.delete("keyword");

    // 페이지 초기화
    params.set("page", "1");

    router.push(`/cases?${params.toString()}`);
  };
  return (
    <section className="flex gap-2 border-b my-4">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => handleChange(tab.value)}
          className={`px-4 py-2 ${
            currentTab === tab.value ? "border-b-2 border-black font-bold" : ""
          }`}
        >
          {tab.label}
        </button>
      ))}
    </section>
  );
}

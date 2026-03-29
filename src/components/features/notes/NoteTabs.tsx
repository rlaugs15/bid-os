"use client";

import useTabQuery from "@/hooks/useTabQuery";

const tabMap = {
  전체: "all",
  미분류: "general",
  공고관련: "case",
  업체관련: "company",
} as const;

export default function NoteTabs({ onChangeType }: { onChangeType?: (type: string) => void }) {
  const { tabs, currentTab, setCurrentTab } = useTabQuery(tabMap);

  const handleChange = (value: string) => {
    setCurrentTab(value);
    onChangeType?.(value);
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

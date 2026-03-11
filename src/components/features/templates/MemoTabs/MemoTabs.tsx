"use client";

import { useMemos } from "@/hooks/queries/memos/useMemos";
import { useState } from "react";
import MemoAccordion from "./MemoAccordion";

const tabs = ["@메모", "무자격"];

export default function MemoTabs() {
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const type = currentTab === "@메모" ? "whelk" : "unqualified";
  const { data } = useMemos(type);

  return (
    <section>
      {/* 탭 메뉴 */}
      <div className="flex gap-2 border-b mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 ${currentTab === tab ? "border-b-2 border-black font-bold" : ""}`}
            onClick={() => setCurrentTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 탭 내용 */}
      <div className="mt-4">
        {currentTab === "@메모" && <MemoAccordion memos={data ?? []} type={type} />}
        {currentTab === "무자격" && <MemoAccordion memos={data ?? []} type={type} />}
      </div>
    </section>
  );
}

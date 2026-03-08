"use client";

import { Memo } from "@/types/memos";
import { useState } from "react";
import MemoAccordion from "./MemoAccordion";

const memoData: Memo[] = [
  {
    id: "gdsg",
    user_id: "sdfsdf34",
    type: "whelk",
    content: "@※협정이 필요한 공고입니다.",
  },
  {
    id: "fdsfg",
    user_id: "sdfsddf",
    type: "whelk",
    content: "@※단가계약 공고 {금액}",
    description: "단가계약 공고 작성용",
  },
  {
    id: "awe423",
    user_id: "sdfsfdf",
    type: "whelk",
    content: "@※현장방문 공고 {날짜} {실험}",
    description: "현장방문 공고 작성용",
  },
];

const tabs = ["@메모", "무자격"];

export default function MemoTabs() {
  const [currentTab, setCurrentTab] = useState(tabs[0]);

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
      <div className="mt-4">{currentTab === "@메모" && <MemoAccordion memos={memoData} />}</div>
    </section>
  );
}

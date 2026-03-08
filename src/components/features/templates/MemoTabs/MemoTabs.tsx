"use client";

import { unqualifiedMockMemos, whelkMockMemos } from "@/mock-data";
import { useState } from "react";
import MemoAccordion from "./MemoAccordion";

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
      <div className="mt-4">
        {currentTab === "@메모" && <MemoAccordion memos={whelkMockMemos} />}
        {currentTab === "무자격" && <MemoAccordion memos={unqualifiedMockMemos} />}
      </div>
    </section>
  );
}

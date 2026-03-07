"use client";

import { useState } from "react";

const tabs = ["@메모", "무자격"];

export default function MemoTabs() {
  const [currentTab, setCurrentTab] = useState(tabs[0]);

  return (
    <section>
      {/* 탭 메뉴 */}
      <div className="flex gap-2 border-b">
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
      {/* <div className="mt-4">
        {currentTab === "@메모" && <TaggedMemo />}
        {currentTab === "무자격" && <UnqualifiedMemo />}
      </div> */}
    </section>
  );
}

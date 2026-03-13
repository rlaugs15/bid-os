"use client";

import useUser from "@/hooks/mutations/user/useUser";
import { useMemos } from "@/hooks/queries/memos/useMemos";
import { useState } from "react";
import MemoAccordion from "./MemoAccordion";

const tabMap = {
  "@메모": "whelk",
  무자격: "unqualified",
  "#메모": "hash",
} as const;

const tabs = Object.keys(tabMap) as (keyof typeof tabMap)[];

export default function MemoTabs() {
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const type = tabMap[currentTab];
  const { data: memo } = useMemos(type);

  const { data: me } = useUser();
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
        {!me ? (
          <p className="text-center font-bold text-2xl pt-10">
            로그인을 하시면 탭 기능을 이용할 수 있습니다.
          </p>
        ) : (
          <MemoAccordion memos={memo ?? []} type={type} />
        )}
      </div>
    </section>
  );
}

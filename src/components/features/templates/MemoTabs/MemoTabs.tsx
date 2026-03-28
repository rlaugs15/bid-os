"use client";

import Tabs from "@/components/common/Tabs";
import useUser from "@/hooks/mutations/user/useUser";
import { useMemos } from "@/hooks/queries/memos/useMemos";
import useTabMap from "@/hooks/useTabMap";
import MemoAccordion from "./MemoAccordion";

const tabMap = {
  "@메모": "whelk",
  무자격: "unqualified",
  "#메모": "hash",
} as const;

export default function MemoTabs() {
  const { tabs, currentTab, setCurrentTab, currentValue: type } = useTabMap(tabMap);
  const { data: memo } = useMemos(type);

  const { data: me } = useUser();
  return (
    <section>
      {/* 탭 메뉴 */}
      <Tabs tabs={tabs} currentTab={currentTab} onChange={setCurrentTab} />

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

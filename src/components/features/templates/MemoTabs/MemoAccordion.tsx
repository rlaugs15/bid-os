"use client";

import { Accordion } from "@/components/ui/accordion";
import { Memo } from "@/types/memos";
import MemoAccordionItem from "./MemoAccordionItem";

export default function MemoAccordion({ memos }: { memos: Memo[] }) {
  return (
    <Accordion type="single" collapsible>
      {memos.map((memo) => (
        <MemoAccordionItem key={memo.id} memo={memo} />
      ))}
    </Accordion>
  );
}

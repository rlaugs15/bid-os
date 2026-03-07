import MemoTabs from "@/components/features/templates/MemoTabs/MemoTabs";
import TemplateBuilder from "@/components/features/templates/TemplateBuilder/TemplateBuilder";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "메모 템플릿",
};

export default function TemplatesPage() {
  return (
    <main className="p-10 space-y-10">
      <TemplateBuilder />
      <MemoTabs />
    </main>
  );
}

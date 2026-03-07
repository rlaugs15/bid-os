import TemplateBuilder from "@/components/features/templates/TemplateBuilder/TemplateBuilder";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "메모 템플릿",
};

export default function TemplatesPage() {
  return (
    <main>
      <TemplateBuilder />
    </main>
  );
}

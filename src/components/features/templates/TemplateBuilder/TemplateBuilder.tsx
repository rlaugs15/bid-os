"use client";

import { Separator } from "@/components/ui/separator";
import useTemplate from "@/hooks/useTemplate";
import { TemplateOptions } from "./TemplateOptions";
import { TemplateResult } from "./TemplateResult";

export default function TemplateBuilder() {
  const { template, setTemplate, memo, setMemo, copied, copy, result } = useTemplate();
  return (
    <div className="p-10">
      <TemplateOptions template={template} setTemplate={setTemplate} />

      <div className="my-4">
        <Separator />
      </div>

      <TemplateResult result={result} memo={memo} setMemo={setMemo} copied={copied} copy={copy} />
    </div>
  );
}

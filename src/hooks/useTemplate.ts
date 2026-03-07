import { formatTemplate, initialTemplate } from "@/lib/template";
import { TemplateState } from "@/types/templated";
import { useState } from "react";

export default function useTemplate() {
  const [template, setTemplate] = useState<TemplateState>(initialTemplate);
  const [memo, setMemo] = useState(""); // 잡다한 메모
  const [copied, setCopied] = useState(false);

  const result = formatTemplate(template);

  const reset = () => {
    setTemplate(initialTemplate);
    setMemo("");
  };

  const copy = async () => {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => {
      reset();
    }, 1500);
  };

  return {
    template,
    setTemplate,
    memo,
    setMemo,
    copied,
    copy,
    result,
  };
}

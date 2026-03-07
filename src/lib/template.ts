import { TemplateState } from "@/types/templated";

export function formatTemplate(template: TemplateState) {
  const briefingText =
    template.briefing === "o" ? "현설o" : template.briefing === "x" ? "현설x" : null;

  const depositText =
    template.deposit === "o" ? "보증금o" : template.deposit === "x" ? "보증금x" : null;

  const conditionText = [briefingText, depositText].filter(Boolean).join(",");

  const mainLine = [template.price, template.evaluation, conditionText || null, template.type]
    .filter(Boolean)
    .join(" / ");

  const extraLine = [
    template.field ? `[주력: ${template.field}]` : null,
    template.site ? `[공사현장: ${template.site}]` : null,
  ]
    .filter(Boolean)
    .join(" ");

  return extraLine ? `${mainLine}\n${extraLine}` : mainLine;
}

export const initialTemplate: TemplateState = {
  price: "총액",
};

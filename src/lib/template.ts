import { TemplateState } from "@/types/templated";

export function formatTemplate(template: TemplateState) {
  const amountCheckParts = [];

  if (template.amountCheck?.base) amountCheckParts.push("기초");
  if (template.amountCheck?.aValue) amountCheckParts.push("A값");
  if (template.amountCheck?.net) amountCheckParts.push("순공사");

  const amountCheckText =
    amountCheckParts.length > 0 ? `${amountCheckParts.join(", ")} 확인` : null;

  const briefingText =
    template.briefing === "o" ? "현설o" : template.briefing === "x" ? "현설x" : null;

  const depositText =
    template.deposit === "o" ? "보증금o" : template.deposit === "x" ? "보증금x" : null;

  const conditionText = [briefingText, depositText].filter(Boolean).join(",");

  const mainLine = [template.price, template.evaluation, conditionText || null, template.type]
    .filter(Boolean)
    .join(" / ");

  const fieldText = template.field ? `[주력: ${template.field}]` : null;
  const siteText = template.site ? `[공사현장: ${template.site}]` : null;

  const secondLine = [amountCheckText, fieldText, siteText].filter(Boolean).join("");

  return secondLine ? `${mainLine}\n${secondLine}` : mainLine;
}

export const initialTemplate: TemplateState = {
  price: "총액",
  amountCheck: {
    base: false,
    aValue: false,
    net: false,
  },
};

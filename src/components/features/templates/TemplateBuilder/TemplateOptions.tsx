import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TemplateState } from "@/types/templated";
import { OptionGroup } from "./OptionGroup";

type Props = {
  template: TemplateState;
  setTemplate: React.Dispatch<React.SetStateAction<TemplateState>>;
};

export function TemplateOptions({ template, setTemplate }: Props) {
  return (
    <section className="space-y-4">
      <OptionGroup label="금액산정">
        <Button
          variant={template.price === "총액" ? "default" : "outline"}
          onClick={() => setTemplate((prev) => ({ ...prev, price: "총액" }))}
        >
          총액
        </Button>

        <Button
          variant={template.price === "단가계약" ? "default" : "outline"}
          onClick={() => setTemplate((prev) => ({ ...prev, price: "단가계약" }))}
        >
          단가계약
        </Button>

        <Button
          variant={template.price === "산출 내역서" ? "default" : "outline"}
          onClick={() => setTemplate((prev) => ({ ...prev, price: "산출 내역서" }))}
        >
          산출 내역서
        </Button>
      </OptionGroup>

      <OptionGroup label="적격심사">
        {["수의", "지자체", "조달청", "국방부", "한전", "한토공", "수자원"].map((v) => (
          <Button
            key={v}
            variant={template.evaluation === v ? "default" : "outline"}
            onClick={() =>
              setTemplate((prev) => ({
                ...prev,
                evaluation: v,
              }))
            }
          >
            {v}
          </Button>
        ))}

        <Input
          placeholder="기타 적격심사"
          className="w-40 text-text-lg!"
          value={
            ["수의", "지자체", "조달청", "국방부", "한전", "한토공", "수자원"].includes(
              template.evaluation ?? "",
            )
              ? ""
              : (template.evaluation ?? "")
          }
          onChange={(e) =>
            setTemplate((prev) => ({
              ...prev,
              evaluation: e.target.value,
            }))
          }
        />
      </OptionGroup>
      <OptionGroup label="금액확인">
        <Button
          variant={template.amountCheck?.base ? "default" : "outline"}
          onClick={() =>
            setTemplate((prev) => ({
              ...prev,
              amountCheck: {
                ...prev.amountCheck,
                base: !prev.amountCheck?.base,
              },
            }))
          }
        >
          기초금액
        </Button>

        <Button
          variant={template.amountCheck?.aValue ? "default" : "outline"}
          onClick={() =>
            setTemplate((prev) => ({
              ...prev,
              amountCheck: {
                ...prev.amountCheck,
                aValue: !prev.amountCheck?.aValue,
              },
            }))
          }
        >
          A값
        </Button>

        <Button
          variant={template.amountCheck?.net ? "default" : "outline"}
          onClick={() =>
            setTemplate((prev) => ({
              ...prev,
              amountCheck: {
                ...prev.amountCheck,
                net: !prev.amountCheck?.net,
              },
            }))
          }
        >
          순공사
        </Button>
      </OptionGroup>
      <OptionGroup label="현장설명">
        <Button
          variant={template.briefing === "o" ? "default" : "outline"}
          onClick={() =>
            setTemplate((prev) => ({
              ...prev,
              briefing: prev.briefing === "o" ? undefined : "o",
            }))
          }
        >
          현장설명 O
        </Button>

        <Button
          variant={template.briefing === "x" ? "default" : "outline"}
          onClick={() =>
            setTemplate((prev) => ({
              ...prev,
              briefing: prev.briefing === "x" ? undefined : "x",
            }))
          }
        >
          현장설명 X
        </Button>
      </OptionGroup>

      <OptionGroup label="보증금">
        <Button
          variant={template.deposit === "o" ? "default" : "outline"}
          onClick={() =>
            setTemplate((prev) => ({
              ...prev,
              deposit: prev.deposit === "o" ? undefined : "o",
            }))
          }
        >
          보증금 O
        </Button>

        <Button
          variant={template.deposit === "x" ? "default" : "outline"}
          onClick={() =>
            setTemplate((prev) => ({
              ...prev,
              deposit: prev.deposit === "x" ? undefined : "x",
            }))
          }
        >
          보증금 X
        </Button>
      </OptionGroup>

      <OptionGroup label="공사구분">
        <Button
          variant={template.type === "전문" ? "default" : "outline"}
          onClick={() => setTemplate((prev) => ({ ...prev, type: "전문" }))}
        >
          전문
        </Button>
        <Button
          variant={template.type === "종합" ? "default" : "outline"}
          onClick={() => setTemplate((prev) => ({ ...prev, type: "종합" }))}
        >
          종합
        </Button>
      </OptionGroup>
      <OptionGroup label="주력분야">
        <div className="flex items-center gap-4">
          <Input
            className="w-60 text-text-xl!"
            value={template.field === "x" ? "" : (template.field ?? "")}
            onChange={(e) =>
              setTemplate((prev) => ({
                ...prev,
                field: e.target.value,
              }))
            }
          />
          <Button
            variant={template.field === "x" ? "default" : "outline"}
            onClick={() =>
              setTemplate((prev) => ({
                ...prev,
                field: prev.field === "x" ? undefined : "x",
              }))
            }
          >
            주력 X
          </Button>
        </div>
      </OptionGroup>
      <OptionGroup label="공사현장">
        <Input
          className="w-60 text-text-xl!"
          value={template.site ?? ""}
          onChange={(e) =>
            setTemplate((prev) => ({
              ...prev,
              site: e.target.value,
            }))
          }
        />
      </OptionGroup>
    </section>
  );
}

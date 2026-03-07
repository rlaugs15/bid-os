import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  result: string;
  memo: string;
  setMemo: (v: string) => void;
  copy: () => void;
  copied: boolean;
};

export function TemplateResult({ result, memo, setMemo, copy, copied }: Props) {
  return (
    <section className="flex space-x-20">
      <div className="space-y-1">
        <Textarea
          className="w-100 border rounded-md p-2 text-sm resize-none text-text-xl!"
          value={result}
          readOnly
          rows={2}
        />
        <Button variant={copied ? "outline" : "default"} size="sm" className="w-30" onClick={copy}>
          {copied ? "복사됨" : "복사"}
        </Button>
      </div>

      <Textarea
        className="w-120 border rounded-md p-2 text-sm resize-none text-text-xl!"
        placeholder="이 칸은 잡다한 메모장입니다. 복사 후 사라집니다."
        rows={2}
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
      />
    </section>
  );
}

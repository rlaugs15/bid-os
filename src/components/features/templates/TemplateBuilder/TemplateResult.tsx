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
  const copyPossibility = () => {
    navigator.clipboard.writeText("가능");
  };
  const ownedBusiness = () => {
    navigator.clipboard.writeText("여성");
  };
  const specialNewcomerAward = () => {
    navigator.clipboard.writeText("특신");
  };
  return (
    <section className="flex space-x-15">
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

        <Button
          variant="default"
          size="sm"
          className="w-24 ml-5 bg-blue-800"
          onClick={ownedBusiness}
        >
          여성
        </Button>

        <Button
          variant="default"
          size="sm"
          className="w-24 ml-5 bg-blue-800"
          onClick={specialNewcomerAward}
        >
          특신
        </Button>

        <Button
          variant="default"
          size="sm"
          className="w-24 ml-5 bg-blue-800"
          onClick={copyPossibility}
        >
          가능
        </Button>
      </div>

      <Textarea
        className="w-120 border rounded-md p-2 text-sm resize-none text-text-xl!"
        placeholder="이 칸은 잡다한 메모장입니다. 복사버튼 클릭 후 사라집니다."
        rows={2}
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
      />
    </section>
  );
}

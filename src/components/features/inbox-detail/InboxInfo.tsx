import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface InboxInfoProps {
  raw_text: string;
  created_at: string;
}

export default function InboxInfo({ raw_text, created_at }: InboxInfoProps) {
  return (
    <section className="mb-6">
      <Card>
        <CardHeader>
          <CardTitle>원문</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-base font-medium">{raw_text}</p>
        </CardContent>
      </Card>

      <div className="mt-3 text-sm text-light-500">
        작성 시각:{" "}
        <time>
          {created_at ? new Date(created_at).toLocaleDateString() : ""}{" "}
          {created_at ? new Date(created_at).toLocaleTimeString() : ""}
        </time>
      </div>
    </section>
  );
}

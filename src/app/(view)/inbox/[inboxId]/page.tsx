"use client";

import LoadingLottie from "@/components/common/LoadingLottie";
import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
import ConvertInboxForm from "@/components/features/inbox-detail/ConvertInboxForm";
import InboxInfo from "@/components/features/inbox-detail/InboxInfo";
import { Separator } from "@/components/ui/separator";
import useInbox from "@/hooks/queries/inbox/useInbox";
import { useParams } from "next/navigation";

export default function InboxDetailPage() {
  const { inboxId } = useParams();
  const { data: inbox } = useInbox(String(inboxId));

  if (!inbox) {
    return <LoadingLottie />;
  }

  return (
    <PageContainer>
      <PageHeader title="Inbox 상세" description="Inbox 내용을 확인하고 메모로 변환하는 페이지" />

      {/* 원문 */}
      <InboxInfo
        raw_text={inbox?.raw_text || "데이터 조회 실패"}
        created_at={inbox?.created_at || ""}
      />

      {/* 구분선 */}
      <div className="my-6">
        <Separator />
      </div>

      {/* 메모 변환 */}
      <ConvertInboxForm inboxId={String(inboxId)} inbox={inbox} />
    </PageContainer>
  );
}

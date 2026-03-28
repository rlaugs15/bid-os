"use client";

import FallbackMessage from "@/components/common/FallbackMessage";
import LoadingLottie from "@/components/common/LoadingLottie";
import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
import InboxForm from "@/components/features/inbox/InboxForm";
import InboxItemCard from "@/components/features/inbox/InboxItemCard";
import useInboxes from "@/hooks/queries/inbox/useInboxes";

export default function InboxPage() {
  const { data, isPending } = useInboxes({ page: 1, pageSize: 10 });

  if (isPending) {
    return <LoadingLottie />;
  }

  if (!data || data.data.length === 0) {
    return <FallbackMessage message="inbox 데이터가 존재하지 않습니다." />;
  }

  return (
    <PageContainer>
      <PageHeader title="Inbox" description="생각난 내용을 먼저 넣고, 나중에 정리하는 공간" />

      <section className="mb-6">
        <InboxForm />
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">리스트</h2>
        <div className="space-y-4">
          {data?.data.map((item) => (
            <InboxItemCard
              key={item.id}
              id={item.id}
              raw_text={item.raw_text}
              created_at={item.created_at}
            />
          ))}
        </div>
      </section>
    </PageContainer>
  );
}

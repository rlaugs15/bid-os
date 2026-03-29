import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
import NoteDetailContainer from "@/components/features/note-detail/NoteDetailContainer";

export default function NoteDetailPage() {
  return (
    <PageContainer>
      <PageHeader
        title="노트 상세/수정페이지"
        description="노트를 필요한 공고나 업체와 연결해보세요"
      />
      <NoteDetailContainer />
    </PageContainer>
  );
}

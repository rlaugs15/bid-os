import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
import NotesForm from "@/components/features/notes-new/NotesForm";

export default function NewNotePage() {
  return (
    <PageContainer>
      <PageHeader title="새 노트 작성" description="새 노트를 작성해주세요." />

      <NotesForm />
    </PageContainer>
  );
}

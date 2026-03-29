import ActionButton from "@/components/common/button/ActionButton";
import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
import NoteList from "@/components/features/notes/NoteList";
import NotesSearchForm from "@/components/features/notes/NotesSearchForm";
import NoteTabs from "@/components/features/notes/NoteTabs";

export default async function NotesPage() {
  return (
    <PageContainer>
      <PageHeader title="노트" description="노트 확인하는 페이지" />

      <ActionButton label="노트 작성하기" link="/notes/new" />

      <NotesSearchForm />

      {/* 탭 메뉴 */}
      <NoteTabs />

      {/* 노트 리스트 */}
      <NoteList />
    </PageContainer>
  );
}

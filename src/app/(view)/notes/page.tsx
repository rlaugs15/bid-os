import ActionButton from "@/components/common/button/ActionButton";
import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
import NoteList from "@/components/features/notes/NoteList";
import NoteTabs from "@/components/features/notes/NoteTabs";

interface Props {
  searchParams: Promise<{ page: string }>;
}

export default async function NotesPage({ searchParams }: Props) {
  const { page } = await searchParams;
  const parsedPage = Number(page);
  const currentPage = isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;

  return (
    <PageContainer>
      <PageHeader title="노트" description="노트 확인하는 페이지" />

      <ActionButton label="노트 작성하기" link="/notes/new" />

      {/* 탭 메뉴 */}
      <NoteTabs />

      {/* 노트 리스트 */}
      <NoteList />
    </PageContainer>
  );
}

"use client";

import WritingButton from "@/components/common/button/WritingButton";
import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
import NoteTabs from "@/components/features/notes/NoteTabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const tabMap = {
  전체: "all",
  미분류: "general",
  공고관련: "case",
  업체관련: "company",
} as const;

export default function NotesPage() {
  return (
    <PageContainer>
      <PageHeader title="노트" description="노트 확인하는 페이지" />

      <WritingButton label="노트 작성하기" />

      <section>
        {/* 탭 메뉴 */}
        <NoteTabs />
      </section>

      <section>
        <Card>
          <CardHeader>
            <CardTitle className="text-md">타이틀</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm font-sans">
            {/* 메타 정보 */}
            <dl className="space-y-2">
              {/* 타입 */}
              <div className="flex items-center gap-2">
                <dt>타입 : </dt>
                <dd>
                  <span>업체관련</span>
                </dd>
              </div>

              {/* 연결 정보 */}
              <div className="flex items-center gap-2">
                <span>연결된 공고 2개</span>
                <p> / </p>
                <span>연결된 업체 1개</span>
              </div>

              {/* 최근 수정 */}
              <div className="flex items-center gap-2 text-light-500">
                <p>최근 수정 : </p>
                <time dateTime="2026-03-21T11:20">2026.03.21 11:20</time>
              </div>
            </dl>

            {/* 액션 */}
            <div className="flex">
              <Button size="sm" variant="outline">
                상세 보기
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </PageContainer>
  );
}

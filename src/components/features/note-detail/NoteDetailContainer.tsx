"use client";

import FallbackMessage from "@/components/common/FallbackMessage";
import LoadingLottie from "@/components/common/LoadingLottie";
import { Separator } from "@/components/ui/separator";
import useNote from "@/hooks/queries/notes/useNote";
import { useParams } from "next/navigation";
import NoteDetailForm from "./NoteDetailForm";

export default function NoteDetailContainer() {
  const { noteId } = useParams();
  const { data: note, isPending: isNotePending } = useNote(String(noteId));

  return (
    <>
      {isNotePending ? (
        <LoadingLottie />
      ) : !note ? (
        <FallbackMessage message="노트가 존재하지 않습니다." />
      ) : (
        <>
          <NoteDetailForm note={note} />
          <div>
            <Separator />
          </div>
          {/* <div className="flex gap-2">
            <section className="flex-1">
              <h2 className="text-md font-bold mb-2">📦연결된 공고</h2>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-text-md">R25BK01164983</CardTitle>
                    <CardDescription className="text-text-sm">
                      부남건설 차선도색 공사
                    </CardDescription>
                  </div>

                  <Badge variant="secondary">진행중</Badge>
                </CardHeader>

                <CardFooter className="gap-2">
                  <Button size="sm" variant="outline">
                    공고 보기
                  </Button>
                  <Button size="sm" variant="destructive">
                    연결 해제
                  </Button>
                </CardFooter>
              </Card>
            </section>
            <section className="flex-1">
              <h2 className="text-md font-bold mb-2">🏢연결된 업체</h2>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-text-md">부남건설</CardTitle>
                    <CardDescription className="text-text-sm">전문</CardDescription>
                  </div>

                  <Badge variant="secondary">서비스 중</Badge>
                </CardHeader>

                <CardFooter className="gap-2">
                  <Button size="sm" variant="outline">
                    업체 보기
                  </Button>
                  <Button size="sm" variant="destructive">
                    연결 해제
                  </Button>
                </CardFooter>
              </Card>
            </section>
          </div> */}
        </>
      )}
    </>
  );
}

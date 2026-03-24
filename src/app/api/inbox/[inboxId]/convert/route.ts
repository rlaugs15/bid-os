import { getUser } from "@/services/user/user.api";
import type { NoteItem } from "@/types/notes";
import { NextRequest, NextResponse } from "next/server";
import prisma from "prisma/prisma";

interface ConvertInboxContext {
  params: Promise<{ inboxId: string }>;
}

export async function PATCH(
  _request: NextRequest,
  context: ConvertInboxContext,
): Promise<NextResponse<NoteItem | string>> {
  const user = await getUser();
  if (!user) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const { inboxId } = await context.params;

  // 1. inbox 조회
  const inbox = await prisma.inboxes.findFirst({
    where: {
      id: inboxId,
      user_id: user.user_id,
    },
  });

  if (!inbox) {
    return NextResponse.json("Not found", { status: 404 });
  }

  // 2. note 생성
  const note = await prisma.notes.create({
    data: {
      user_id: user.user_id,
      title: inbox.raw_text ?? "제목 없음",
      content: "",
      type: "general",
    },
  });

  // 3. inbox 삭제
  await prisma.inboxes.delete({
    where: {
      id: inbox.id,
    },
  });

  // 4. 반환
  return NextResponse.json(note as unknown as NoteItem);
}

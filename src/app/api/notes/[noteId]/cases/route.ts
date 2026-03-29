import { getUser } from "@/services/user/user.api";
import { ConnectCaseToNoteRequest, NoteCaseRelation } from "@/types/notes";
import { NextRequest, NextResponse } from "next/server";
import prisma from "prisma/prisma";

interface NoteCaseContext {
  params: Promise<{ noteId: string }>;
}

export async function POST(
  request: NextRequest,
  context: NoteCaseContext,
): Promise<NextResponse<NoteCaseRelation | string>> {
  const user = await getUser();
  if (!user) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const { noteId } = await context.params;
  const body = (await request.json()) as ConnectCaseToNoteRequest;

  const [note, foundCase, exists] = await Promise.all([
    prisma.notes.findFirst({
      where: {
        id: noteId,
        user_id: user.user_id,
      },
    }),
    prisma.cases.findFirst({
      where: {
        id: body.caseId,
        user_id: user.user_id,
      },
    }),
    prisma.note_cases.findFirst({
      where: {
        note_id: noteId,
        case_id: body.caseId,
      },
    }),
  ]);

  if (!note || !foundCase) {
    return NextResponse.json("Not found", { status: 404 });
  }

  if (exists) {
    return NextResponse.json("Already connected", { status: 409 });
  }

  const relation = await prisma.note_cases.create({
    data: {
      note_id: noteId,
      case_id: body.caseId,
    },
    include: {
      cases: true,
    },
  });

  return NextResponse.json(relation as unknown as NoteCaseRelation, { status: 201 });
}

import { getUser } from "@/services/user/user.api";
import { NextRequest, NextResponse } from "next/server";
import prisma from "prisma/prisma";

interface DisconnectNoteCaseContext {
  params: Promise<{ noteId: string; caseId: string }>;
}

export async function DELETE(
  _request: NextRequest,
  context: DisconnectNoteCaseContext,
): Promise<NextResponse<{ success: true } | string>> {
  const user = await getUser();
  if (!user) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const { noteId, caseId } = await context.params;

  const [note, foundCase] = await Promise.all([
    prisma.notes.findFirst({
      where: {
        id: noteId,
        user_id: user.user_id,
      },
    }),
    prisma.cases.findFirst({
      where: {
        id: caseId,
        user_id: user.user_id,
      },
    }),
  ]);

  if (!note || !foundCase) {
    return NextResponse.json("Not found", { status: 404 });
  }

  await prisma.note_cases.deleteMany({
    where: {
      note_id: noteId,
      case_id: caseId,
    },
  });

  return NextResponse.json({ success: true });
}

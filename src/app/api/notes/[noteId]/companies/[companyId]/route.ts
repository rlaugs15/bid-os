// src/app/api/notes/[noteId]/companies/[companyId]/route.ts

import { getUser } from "@/services/user/user.api";
import { NextRequest, NextResponse } from "next/server";
import prisma from "prisma/prisma";

interface DisconnectNoteCompanyContext {
  params: Promise<{ noteId: string; companyId: string }>;
}

export async function DELETE(
  _request: NextRequest,
  context: DisconnectNoteCompanyContext,
): Promise<NextResponse<{ success: true } | string>> {
  const user = await getUser();
  if (!user) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const { noteId, companyId } = await context.params;

  const [note, company] = await Promise.all([
    prisma.notes.findFirst({
      where: {
        id: noteId,
        user_id: user.user_id,
      },
    }),
    prisma.companies.findFirst({
      where: {
        id: companyId,
        user_id: user.user_id,
      },
    }),
  ]);

  if (!note || !company) {
    return NextResponse.json("Not found", { status: 404 });
  }

  await prisma.note_companies.deleteMany({
    where: {
      note_id: noteId,
      company_id: companyId,
    },
  });

  return NextResponse.json({ success: true });
}

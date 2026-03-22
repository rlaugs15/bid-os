import { getUser } from "@/services/user/user.api";
import { ConnectCompanyToNoteRequest, NoteCompanyRelation } from "@/types/notes";
import { NextResponse } from "next/server";
import prisma from "prisma/prisma";

interface NoteCompanyContext {
  params: Promise<{ noteId: string }>;
}

export async function POST(
  request: Request,
  context: NoteCompanyContext,
): Promise<NextResponse<NoteCompanyRelation | string>> {
  const user = await getUser();
  if (!user) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const { noteId } = await context.params;
  const body = (await request.json()) as ConnectCompanyToNoteRequest;

  const [note, company, exists] = await Promise.all([
    prisma.notes.findFirst({
      where: {
        id: noteId,
        user_id: user.user_id,
      },
    }),
    prisma.companies.findFirst({
      where: {
        id: body.companyId,
        user_id: user.user_id,
      },
    }),
    prisma.note_companies.findFirst({
      where: {
        note_id: noteId,
        company_id: body.companyId,
      },
    }),
  ]);

  if (!note || !company) {
    return NextResponse.json("Not found", { status: 404 });
  }

  if (exists) {
    return NextResponse.json("Already connected", { status: 409 });
  }

  const relation = await prisma.note_companies.create({
    data: {
      note_id: noteId,
      company_id: body.companyId,
    },
    include: {
      companies: true,
    },
  });

  return NextResponse.json(relation as unknown as NoteCompanyRelation, { status: 201 });
}

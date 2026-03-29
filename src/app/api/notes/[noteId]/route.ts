import { getUser } from "@/services/user/user.api";
import { NoteItem, UpdateNoteRequest } from "@/types/notes";
import { NextRequest, NextResponse } from "next/server";
import prisma from "prisma/prisma";

interface NoteRouteContext {
  params: Promise<{ noteId: string }>;
}

export async function GET(
  _request: NextRequest,
  context: NoteRouteContext,
): Promise<NextResponse<NoteItem | string | null>> {
  const user = await getUser();
  if (!user) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const { noteId } = await context.params;

  const note = await prisma.notes.findFirst({
    where: {
      id: noteId,
      user_id: user.user_id,
    },
    include: {
      note_cases: {
        include: {
          cases: true,
        },
      },
      note_companies: {
        include: {
          companies: true,
        },
      },
    },
  });

  if (!note) {
    return NextResponse.json("Not found", { status: 404 });
  }

  return NextResponse.json(note as unknown as NoteItem);
}

export async function PATCH(
  request: NextRequest,
  context: NoteRouteContext,
): Promise<NextResponse<NoteItem | string>> {
  const user = await getUser();
  if (!user) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const { noteId } = await context.params;
  const body = (await request.json()) as UpdateNoteRequest;

  const existing = await prisma.notes.findFirst({
    where: {
      id: noteId,
      user_id: user.user_id,
    },
  });

  if (!existing) {
    return NextResponse.json("Not found", { status: 404 });
  }

  const updated = await prisma.notes.update({
    where: {
      id: noteId,
    },
    data: {
      ...(body.title !== undefined ? { title: body.title } : {}),
      ...(body.content !== undefined ? { content: body.content } : {}),
      ...(body.type !== undefined ? { type: body.type } : {}),
      updated_at: new Date(),
    },
  });

  return NextResponse.json(updated as unknown as NoteItem);
}

export async function DELETE(
  _request: NextRequest,
  context: NoteRouteContext,
): Promise<NextResponse<{ success: true } | string>> {
  const user = await getUser();
  if (!user) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const { noteId } = await context.params;

  const existing = await prisma.notes.findFirst({
    where: {
      id: noteId,
      user_id: user.user_id,
    },
  });

  if (!existing) {
    return NextResponse.json("Not found", { status: 404 });
  }

  await prisma.notes.delete({
    where: {
      id: noteId,
    },
  });

  return NextResponse.json({ success: true });
}

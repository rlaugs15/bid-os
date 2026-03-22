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

  const inbox = await prisma.inboxes.findFirst({
    where: {
      id: inboxId,
      user_id: user.user_id,
    },
  });

  if (!inbox) {
    return NextResponse.json("Not found", { status: 404 });
  }

  if (inbox.status === "converted" && inbox.converted_note_id) {
    const converted = await prisma.notes.findFirst({
      where: {
        id: inbox.converted_note_id,
        user_id: user.user_id,
      },
    });

    if (converted) {
      return NextResponse.json(converted as unknown as NoteItem);
    }
  }

  const note = await prisma.notes.create({
    data: {
      user_id: user.user_id,
      title: inbox.raw_text,
      content: "",
      type: "general",
      source_inbox_id: inbox.id,
    },
  });

  await prisma.inboxes.update({
    where: {
      id: inbox.id,
    },
    data: {
      status: "converted",
      converted_note_id: note.id,
      updated_at: new Date(),
    },
  });

  return NextResponse.json(note as unknown as NoteItem);
}

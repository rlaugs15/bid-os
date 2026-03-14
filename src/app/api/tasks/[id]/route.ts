import { NextRequest, NextResponse } from "next/server";
import prisma from "prisma/prisma";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;
  const body = await req.json();
  const { title, description, priority, due_at, remind_at, status } = body;

  const task = await prisma.task.update({
    where: {
      id,
    },
    data: {
      title,
      description,
      priority,
      due_at,
      remind_at,
      status,
    },
  });

  return NextResponse.json(task);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;

  await prisma.task.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({ ok: true });
}

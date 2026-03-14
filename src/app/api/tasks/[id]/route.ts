import { NextRequest, NextResponse } from "next/server";
import prisma from "prisma/prisma";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
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

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  await prisma.task.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({ ok: true });
}

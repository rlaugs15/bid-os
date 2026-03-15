import { NextResponse } from "next/server";
import prisma from "prisma/prisma";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { column_id, position } = await req.json();

  // Task 이동 (Drag 핵심)
  const task = await prisma.task.update({
    where: { id },
    data: {
      column_id,
      position,
    },
  });

  return NextResponse.json(task);
}

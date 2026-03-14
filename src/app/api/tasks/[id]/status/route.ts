import { NextRequest, NextResponse } from "next/server";
import prisma from "prisma/prisma";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { status } = await req.json();
  const { id } = await params;

  const task = await prisma.task.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });

  return NextResponse.json(task);
}

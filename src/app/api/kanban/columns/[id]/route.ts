import { NextRequest, NextResponse } from "next/server";
import prisma from "prisma/prisma";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();

  const column = await prisma.column.update({
    where: { id },
    data: {
      title: body.title,
    },
  });

  return NextResponse.json(column);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  await prisma.column.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}

import { NextRequest, NextResponse } from "next/server";
import prisma from "prisma/prisma";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();

  const { beforeColumnId, afterColumnId } = body;

  let position: bigint;

  if (beforeColumnId) {
    const before = await prisma.column.findUnique({
      where: { id: beforeColumnId },
    });

    if (!before) {
      return NextResponse.json({ error: "before column not found" }, { status: 404 });
    }

    const beforePos = BigInt(before.position);

    const prev = await prisma.column.findFirst({
      where: {
        position: {
          lt: before.position,
        },
      },
      orderBy: { position: "desc" },
    });

    if (prev) {
      const prevPos = BigInt(prev.position);
      position = (prevPos + beforePos) / BigInt(2);
    } else {
      position = beforePos / BigInt(2);
    }
  } else if (afterColumnId) {
    const after = await prisma.column.findUnique({
      where: { id: afterColumnId },
    });

    if (!after) {
      return NextResponse.json({ error: "after column not found" }, { status: 404 });
    }

    const afterPos = BigInt(after.position);

    const next = await prisma.column.findFirst({
      where: {
        position: {
          gt: after.position,
        },
      },
      orderBy: { position: "asc" },
    });

    if (next) {
      const nextPos = BigInt(next.position);
      position = (nextPos + afterPos) / BigInt(2);
    } else {
      position = afterPos + BigInt(1000);
    }
  } else {
    return NextResponse.json({ error: "invalid move" }, { status: 400 });
  }

  const column = await prisma.column.update({
    where: { id },
    data: {
      position,
    },
  });

  return NextResponse.json(column);
}

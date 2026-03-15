import { NextResponse } from "next/server";
import prisma from "prisma/prisma";

export async function POST(req: Request) {
  const { title, board_id } = await req.json();

  // Column 생성
  const column = await prisma.column.create({
    data: {
      title,
      board_id,
      position: Date.now(),
    },
  });

  return NextResponse.json(column);
}

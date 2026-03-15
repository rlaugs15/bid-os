import { NextResponse } from "next/server";
import prisma from "prisma/prisma";

export async function POST(req: Request) {
  const { title, column_id } = await req.json();

  // Task 생성
  const task = await prisma.task.create({
    data: {
      title,
      column_id,
      position: Date.now(),
    },
  });

  return NextResponse.json(task);
}

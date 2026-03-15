import { NextResponse } from "next/server";
import prisma from "prisma/prisma";

export async function GET() {
  // columns + tasks를 한번에 가져오기
  const columns = await prisma.column.findMany({
    orderBy: { position: "asc" },
    include: {
      task: {
        orderBy: { position: "asc" },
      },
    },
  });

  return NextResponse.json(columns);
}

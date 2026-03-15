import { NextRequest, NextResponse } from "next/server";
import prisma from "prisma/prisma";

/**
 * 컬럼 목록 조회
 */
export async function GET() {
  const columns = await prisma.column.findMany({
    orderBy: {
      position: "asc",
    },
  });

  return NextResponse.json(columns);
}

/**
 * 컬럼 생성
 */
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title } = body;

  const lastColumn = await prisma.column.findFirst({
    orderBy: {
      position: "desc",
    },
  });

  const position = lastColumn ? lastColumn.position + BigInt(1000) : BigInt(1000);

  const column = await prisma.column.create({
    data: {
      title,
      position,
    },
  });

  return NextResponse.json(column);
}

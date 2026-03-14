import { NextRequest, NextResponse } from "next/server";
import prisma from "prisma/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const status = searchParams.get("status");
  const priority = searchParams.get("priority");
  const today = searchParams.get("today");

  const where: any = {};

  if (status) {
    where.status = status;
  }

  if (priority) {
    where.priority = priority;
  }

  // today가 true이면 오늘 날짜 범위로 필터
  if (today === "true") {
    const start = new Date();
    start.setHours(0, 0, 0, 0); // 오늘 00:00:00

    const end = new Date();
    end.setHours(23, 59, 59, 999); // 오늘 23:59:59

    where.due_at = {
      gte: start, // due_at >= 오늘 시작
      lte: end, // due_at <= 오늘 끝
    };
  }

  const tasks = await prisma.task.findMany({
    where,
    orderBy: {
      created_at: "desc",
    },
  });

  return NextResponse.json(tasks);
}

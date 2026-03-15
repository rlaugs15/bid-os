import { fetchUserSupabaseWithRequest } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "prisma/prisma";

export async function POST(req: NextRequest) {
  const userId = await fetchUserSupabaseWithRequest(req);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { title, column_id } = await req.json();

  // Task 생성
  const task = await prisma.task.create({
    data: {
      title,
      column_id,
      user_id: userId,
      position: Date.now(),
    },
  });

  return NextResponse.json(task);
}

import { getUser } from "@/services/user/user.api";
import { MemoType } from "@/types/memos";
import { NextRequest, NextResponse } from "next/server";
import { memo_type } from "prisma/app/generated/prisma/enums";
import prisma from "prisma/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") as memo_type | null;

  const memos = await prisma.memo.findMany({
    where: type ? { type } : undefined,
    orderBy: [{ use_count: "desc" }, { created_at: "desc" }], // 같은 use_count끼린 최신이 위로
    select: { id: true, content: true, description: true, type: true, use_count: true },
  });

  return NextResponse.json(memos);
}

export async function POST(req: NextRequest) {
  const me = await getUser();
  if (!me) {
    return NextResponse.json({ error: "로그인 상태가 아닙니다." }, { status: 401 });
  }

  const body = await req.json();
  const { content, type, description } = body;

  const validTypes: MemoType[] = ["whelk", "unqualified", "hash"];

  if (!content || !validTypes.includes(type)) {
    return NextResponse.json({ error: "잘못된 요청" }, { status: 400 });
  }

  const memo = await prisma.memo.create({
    data: {
      content,
      description: description ? description : undefined,
      type,
      user_id: me.user_id,
    },
    select: {
      id: true,
      content: true,
      description: true,
      type: true,
      use_count: true,
    },
  });

  return NextResponse.json(memo);
}

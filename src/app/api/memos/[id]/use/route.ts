import { getUser } from "@/services/user/user.api";
import { NextRequest, NextResponse } from "next/server";
import prisma from "prisma/prisma";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const me = await getUser();
  const { id } = await params;

  if (!me) {
    return NextResponse.json({ error: "로그인 상태가 아닙니다." }, { status: 401 });
  }

  // 메모 존재 + 권한 확인
  const memo = await prisma.memo.findUnique({
    where: { id },
  });

  if (!memo || memo.user_id !== me.user_id) {
    return NextResponse.json(
      { error: "해당 메모가 존재하지 않거나 본인 소유가 아닙니다." },
      { status: 404 },
    );
  }

  // use_count 증가
  const updatedMemo = await prisma.memo.update({
    where: { id },
    data: {
      use_count: {
        increment: 1, // 프리즈마에서 atomic 증가를 하는 공식 방식
      },
    },
  });

  return NextResponse.json(updatedMemo);
}

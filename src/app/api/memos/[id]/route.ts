import { getUser } from "@/services/user/user.api";
import { NextRequest, NextResponse } from "next/server";
import prisma from "prisma/prisma";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const me = await getUser();
  const { id } = await params;
  if (!me) {
    return NextResponse.json({ error: "로그인 상태가 아닙니다." }, { status: 401 });
  }

  const { content, description } = await req.json();
  if (!content) {
    return NextResponse.json({ error: "콘텐츠가 없습니다." }, { status: 400 });
  }

  // 권한 체크: 해당 메모가 존재하고 본인 소유인지 확인
  const memo = await prisma.memo.findUnique({ where: { id } });
  if (!memo || memo.user_id !== me.user_id) {
    return NextResponse.json(
      { error: "해당 메모가 존재하지 않거나 본인 소유가 아닙니다." },
      { status: 404 },
    );
  }

  // 업데이트
  const updatedMemo = await prisma.memo.update({
    where: { id },
    data: { content, description: description ? description : undefined },
  });

  // 낙관적 업데이트용: 업데이트된 메모 객체 그대로 반환
  return NextResponse.json(updatedMemo);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const me = await getUser();
  const { id } = await params;
  if (!me) {
    return NextResponse.json({ error: "로그인 상태가 아닙니다." }, { status: 401 });
  }

  // 권한 체크 + 삭제
  const deletedMemo = await prisma.memo.deleteMany({
    where: { id, user_id: me.user_id },
  });

  if (deletedMemo.count === 0) {
    return NextResponse.json(
      { error: "해당 메모가 존재하지 않거나 본인 소유가 아닙니다." },
      { status: 404 },
    );
  }

  // 낙관적 업데이트용: 삭제된 id 반환
  return NextResponse.json({ success: true, id });
}

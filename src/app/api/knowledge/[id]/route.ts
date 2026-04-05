import { getUser } from "@/services/user/user.api";
import { NextRequest, NextResponse } from "next/server";
import prisma from "prisma/prisma";

interface Context {
  params: Promise<{ knowledgeId: string }>;
}

export async function GET(_req: NextRequest, context: Context) {
  const user = await getUser();
  if (!user) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const { knowledgeId } = await context.params;

  const data = await prisma.knowledge.findFirst({
    where: {
      id: knowledgeId,
      user_id: user.user_id,
    },
  });

  if (!data) {
    return NextResponse.json("Not Found", { status: 404 });
  }

  // UX 핵심: description 없으면 접근 불가
  if (!data.description) {
    return NextResponse.json("No Detail", { status: 404 });
  }

  return NextResponse.json(data);
}

export async function PATCH(req: NextRequest, context: Context) {
  const user = await getUser();
  if (!user) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const { knowledgeId } = await context.params;
  const body = await req.json();

  const updated = await prisma.knowledge.updateMany({
    where: {
      id: knowledgeId,
      user_id: user.user_id,
    },
    data: {
      ...body,
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, context: Context) {
  const user = await getUser();
  if (!user) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const { knowledgeId } = await context.params;

  await prisma.knowledge.deleteMany({
    where: {
      id: knowledgeId,
      user_id: user.user_id,
    },
  });

  return NextResponse.json({ success: true });
}

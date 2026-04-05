import { getUser } from "@/services/user/user.api";
import { NextRequest, NextResponse } from "next/server";
import prisma from "prisma/prisma";

export async function GET(request: NextRequest) {
  const user = await getUser();
  if (!user) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get("keyword") ?? "";

  const data = await prisma.knowledge.findMany({
    where: {
      user_id: user.user_id,
      ...(keyword
        ? {
            OR: [
              { title: { contains: keyword, mode: "insensitive" } },
              { summary: { contains: keyword, mode: "insensitive" } },
              { description: { contains: keyword, mode: "insensitive" } },
            ],
          }
        : {}),
    },

    // 핵심: 필요한 필드만 select
    select: {
      id: true,
      title: true,
      summary: true,
      description: true, // 내부에서만 쓰고
    },

    orderBy: {
      created_at: "desc",
    },

    take: 20,
  });

  // description → boolean 변환
  const result = data.map((item) => ({
    id: item.id,
    title: item.title,
    summary: item.summary,
    hasDescription: !!item.description,
  }));

  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  const user = await getUser();
  if (!user) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const body = await request.json();

  const { title, summary, description } = body;

  if (!title || !summary) {
    return NextResponse.json("title, summary required", { status: 400 });
  }

  const created = await prisma.knowledge.create({
    data: {
      user_id: user.user_id,
      title,
      summary,
      description, // optional
    },
  });

  return NextResponse.json(created);
}

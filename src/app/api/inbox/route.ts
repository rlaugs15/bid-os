// src/app/api/inbox/route.ts

import { getUser } from "@/services/user/user.api";
import { PaginationResponse } from "@/types/common";
import { CreateInboxRequest, InboxItem } from "@/types/notes";
import { NextRequest, NextResponse } from "next/server";
import prisma from "prisma/prisma";

export async function GET(
  request: NextRequest,
): Promise<NextResponse<PaginationResponse<InboxItem> | string>> {
  const user = await getUser();
  if (!user) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") ?? 1);
  const pageSize = Number(searchParams.get("pageSize") ?? 10);
  const keyword = searchParams.get("keyword") ?? "";
  const status = searchParams.get("status") ?? "";
  const skip = (page - 1) * pageSize;

  const where = {
    user_id: user.user_id,
    ...(status ? { status } : {}),
    ...(keyword
      ? {
          raw_text: { contains: keyword, mode: "insensitive" as const },
        }
      : {}),
  };

  const [totalCount, inboxes] = await Promise.all([
    prisma.inboxes.count({ where }),
    prisma.inboxes.findMany({
      where,
      orderBy: {
        created_at: "desc",
      },
      skip,
      take: pageSize,
    }),
  ]);

  return NextResponse.json({
    data: inboxes as unknown as InboxItem[],
    page,
    pageSize,
    totalCount,
    totalPages: Math.ceil(totalCount / pageSize),
  });
}

export async function POST(request: NextRequest): Promise<NextResponse<InboxItem | string>> {
  const user = await getUser();
  if (!user) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const body = (await request.json()) as CreateInboxRequest;

  const inbox = await prisma.inboxes.create({
    data: {
      user_id: user.user_id,
      raw_text: body.raw_text,
    },
  });

  return NextResponse.json(inbox as unknown as InboxItem, { status: 201 });
}

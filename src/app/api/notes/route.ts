// src/app/api/notes/route.ts

import { getUser } from "@/services/user/user.api";
import { PaginationResponse } from "@/types/common";
import { CreateNoteRequest, NoteItem } from "@/types/notes";
import { NextRequest, NextResponse } from "next/server";
import prisma from "prisma/prisma";

export async function GET(
  request: NextRequest,
): Promise<NextResponse<PaginationResponse<NoteItem> | string>> {
  const user = await getUser();
  if (!user) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") ?? 1);
  const pageSize = Number(searchParams.get("pageSize") ?? 10);
  const keyword = searchParams.get("keyword") ?? "";
  const type = searchParams.get("type") ?? "";

  const skip = (page - 1) * pageSize;

  const where = {
    user_id: user.user_id,
    ...(type ? { type } : {}),
    ...(keyword
      ? {
          OR: [
            { title: { contains: keyword, mode: "insensitive" as const } },
            { content: { contains: keyword, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const [totalCount, notes] = await Promise.all([
    prisma.notes.count({ where }),
    prisma.notes.findMany({
      where,
      include: {
        note_cases: true,
        note_companies: true,
      },
      orderBy: {
        updated_at: "desc",
      },
      skip,
      take: pageSize,
    }),
  ]);

  return NextResponse.json({
    data: notes as unknown as NoteItem[],
    page,
    pageSize,
    totalCount,
    totalPages: Math.ceil(totalCount / pageSize),
  });
}

export async function POST(request: NextRequest): Promise<NextResponse<NoteItem | string>> {
  const user = await getUser();
  if (!user) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const body = (await request.json()) as CreateNoteRequest;

  const note = await prisma.notes.create({
    data: {
      user_id: user.user_id,
      title: body.title,
      content: body.content ?? "",
      type: body.type ?? "general",
    },
  });

  return NextResponse.json(note as unknown as NoteItem, { status: 201 });
}

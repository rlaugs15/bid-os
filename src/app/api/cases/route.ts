// src/app/api/cases/route.ts

import { getUser } from "@/services/user/user.api";
import { PaginationResponse } from "@/types/common";
import type { CaseItem, CaseListItem, CreateCaseRequest } from "@/types/notes";
import { NextRequest, NextResponse } from "next/server";
import prisma from "prisma/prisma";

export async function GET(
  request: NextRequest,
): Promise<NextResponse<PaginationResponse<CaseListItem> | string>> {
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
          OR: [
            { bid_number: { contains: keyword, mode: "insensitive" as const } },
            { title: { contains: keyword, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const [totalCount, cases] = await Promise.all([
    prisma.cases.count({ where }),
    prisma.cases.findMany({
      where,
      include: {
        note_cases: {
          include: {
            notes: {
              include: {
                note_companies: true,
              },
            },
          },
        },
      },
      orderBy: {
        updated_at: "desc",
      },
      skip,
      take: pageSize,
    }),
  ]);

  const result = cases.map((c) => {
    const noteCount = c.note_cases.length;

    const companySet = new Set<string>();

    c.note_cases.forEach((nc) => {
      nc.notes.note_companies.forEach((ncp) => {
        companySet.add(ncp.company_id);
      });
    });

    return {
      ...c,
      noteCount,
      companyCount: companySet.size,
    };
  });

  return NextResponse.json({
    data: result as unknown as CaseListItem[],
    page,
    pageSize,
    totalCount,
    totalPages: Math.ceil(totalCount / pageSize),
  });
}

export async function POST(request: NextRequest): Promise<NextResponse<CaseItem | string>> {
  const user = await getUser();
  if (!user) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const body = (await request.json()) as CreateCaseRequest;

  const created = await prisma.cases.create({
    data: {
      user_id: user.user_id,
      bid_number: body.bid_number,
      title: body.title,
      status: body.status ?? "active",
      opened_at: body.opened_at ? new Date(body.opened_at) : null,
    },
  });

  return NextResponse.json(created as unknown as CaseItem, { status: 201 });
}

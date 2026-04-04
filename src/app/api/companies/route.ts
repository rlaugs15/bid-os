// src/app/api/companies/route.ts

import { getUser } from "@/services/user/user.api";
import { PaginationResponse } from "@/types/common";
import { CompanyItem, CompanyListItem, CreateCompanyRequest } from "@/types/notes";
import { NextRequest, NextResponse } from "next/server";
import prisma from "prisma/prisma";

export async function GET(
  request: NextRequest,
): Promise<NextResponse<PaginationResponse<CompanyListItem> | string>> {
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
            { name: { contains: keyword, mode: "insensitive" as const } },
            {
              business_number: {
                contains: keyword,
                mode: "insensitive" as const,
              },
            },
          ],
        }
      : {}),
  };

  const [totalCount, companies] = await Promise.all([
    prisma.companies.count({ where }),
    prisma.companies.findMany({
      where,
      include: {
        _count: {
          select: {
            note_companies: true, // 노트 수
          },
        },
        note_companies: {
          include: {
            notes: {
              include: {
                note_cases: {
                  select: {
                    case_id: true, // 공고 ID만 가져오기
                  },
                },
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

  const data = companies.map((company) => {
    const noteCount = company._count.note_companies;

    const caseIds = company.note_companies.flatMap(
      (nc) => nc.notes?.note_cases.map((c) => c.case_id) ?? [],
    );

    const caseCount = new Set(caseIds).size; // 중복 제거

    return {
      ...company,
      noteCount,
      caseCount,
    };
  });

  return NextResponse.json({
    data: data as unknown as CompanyListItem[],
    page,
    pageSize,
    totalCount,
    totalPages: Math.ceil(totalCount / pageSize),
  });
}

export async function POST(request: NextRequest): Promise<NextResponse<CompanyItem | string>> {
  const user = await getUser();
  if (!user) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const body = (await request.json()) as CreateCompanyRequest;

  const created = await prisma.companies.create({
    data: {
      user_id: user.user_id,
      name: body.name,
      status: body.status ?? "active",
      type: body.type,
    },
  });

  return NextResponse.json(created as unknown as CompanyItem, { status: 201 });
}

// src/app/api/cases/[caseId]/route.ts

import { getUser } from "@/services/user/user.api";
import type { CaseItem, UpdateCaseRequest } from "@/types/notes";
import { NextRequest, NextResponse } from "next/server";
import prisma from "prisma/prisma";

interface CaseRouteContext {
  params: Promise<{ caseId: string }>;
}

export async function GET(
  _request: NextRequest,
  context: CaseRouteContext,
): Promise<NextResponse<CaseItem | string>> {
  const user = await getUser();
  if (!user) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const { caseId } = await context.params;

  const foundCase = await prisma.cases.findFirst({
    where: {
      id: caseId,
      user_id: user.user_id,
    },
    include: {
      note_cases: {
        include: {
          notes: true,
        },
      },
    },
  });

  if (!foundCase) {
    return NextResponse.json("Not found", { status: 404 });
  }

  return NextResponse.json(foundCase as unknown as CaseItem);
}

export async function PATCH(
  request: NextRequest,
  context: CaseRouteContext,
): Promise<NextResponse<CaseItem | string>> {
  const user = await getUser();
  if (!user) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const { caseId } = await context.params;
  const body = (await request.json()) as UpdateCaseRequest;

  const existing = await prisma.cases.findFirst({
    where: {
      id: caseId,
      user_id: user.user_id,
    },
  });

  if (!existing) {
    return NextResponse.json("Not found", { status: 404 });
  }

  const updated = await prisma.cases.update({
    where: {
      id: caseId,
    },
    data: {
      ...(body.bid_number !== undefined ? { bid_number: body.bid_number } : {}),
      ...(body.title !== undefined ? { title: body.title } : {}),
      ...(body.status !== undefined ? { status: body.status } : {}),
      ...(body.opened_at !== undefined
        ? { opened_at: body.opened_at ? new Date(body.opened_at) : null }
        : {}),
      updated_at: new Date(),
    },
  });

  return NextResponse.json(updated as unknown as CaseItem);
}

export async function DELETE(
  _request: NextRequest,
  context: CaseRouteContext,
): Promise<NextResponse<{ success: true } | string>> {
  const user = await getUser();
  if (!user) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const { caseId } = await context.params;

  const existing = await prisma.cases.findFirst({
    where: {
      id: caseId,
      user_id: user.user_id,
    },
  });

  if (!existing) {
    return NextResponse.json("Not found", { status: 404 });
  }

  await prisma.cases.delete({
    where: {
      id: caseId,
    },
  });

  return NextResponse.json({ success: true });
}

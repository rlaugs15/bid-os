import { getUser } from "@/services/user/user.api";
import { CompanyItem, UpdateCompanyRequest } from "@/types/notes";
import { NextRequest, NextResponse } from "next/server";
import prisma from "prisma/prisma";

interface CompanyRouteContext {
  params: Promise<{ companyId: string }>;
}

export async function GET(
  _request: NextRequest,
  context: CompanyRouteContext,
): Promise<NextResponse<CompanyItem | string>> {
  const user = await getUser();
  if (!user) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const { companyId } = await context.params;

  const company = await prisma.companies.findFirst({
    where: {
      id: companyId,
      user_id: user.user_id,
    },
    include: {
      note_companies: {
        include: {
          notes: true,
        },
      },
    },
  });

  if (!company) {
    return NextResponse.json("Not found", { status: 404 });
  }

  return NextResponse.json(company as unknown as CompanyItem);
}

export async function PATCH(
  request: NextRequest,
  context: CompanyRouteContext,
): Promise<NextResponse<CompanyItem | string>> {
  const user = await getUser();
  if (!user) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const { companyId } = await context.params;
  const body = (await request.json()) as UpdateCompanyRequest;

  const existing = await prisma.companies.findFirst({
    where: {
      id: companyId,
      user_id: user.user_id,
    },
  });

  if (!existing) {
    return NextResponse.json("Not found", { status: 404 });
  }

  const updated = await prisma.companies.update({
    where: {
      id: companyId,
    },
    data: {
      ...(body.name !== undefined ? { name: body.name } : {}),
      ...(body.business_number !== undefined ? { business_number: body.business_number } : {}),
      ...(body.status !== undefined ? { status: body.status } : {}),
      updated_at: new Date(),
    },
  });

  return NextResponse.json(updated as unknown as CompanyItem);
}

export async function DELETE(
  _request: NextRequest,
  context: CompanyRouteContext,
): Promise<NextResponse<{ success: true } | string>> {
  const user = await getUser();
  if (!user) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const { companyId } = await context.params;

  const existing = await prisma.companies.findFirst({
    where: {
      id: companyId,
      user_id: user.user_id,
    },
  });

  if (!existing) {
    return NextResponse.json("Not found", { status: 404 });
  }

  await prisma.companies.delete({
    where: {
      id: companyId,
    },
  });

  return NextResponse.json({ success: true });
}

import { getUser } from "@/services/user/user.api";
import type { InboxItem } from "@/types/notes";
import { NextRequest, NextResponse } from "next/server";
import prisma from "prisma/prisma";

interface InboxRouteContext {
  params: Promise<{ inboxId: string }>;
}

export async function GET(
  _request: NextRequest,
  context: InboxRouteContext,
): Promise<NextResponse<InboxItem | string>> {
  const user = await getUser();
  if (!user) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const { inboxId } = await context.params;

  const inbox = await prisma.inboxes.findFirst({
    where: {
      id: inboxId,
      user_id: user.user_id,
    },
  });

  if (!inbox) {
    return NextResponse.json("Not found", { status: 404 });
  }

  return NextResponse.json(inbox as unknown as InboxItem);
}

export async function DELETE(
  _request: NextRequest,
  context: InboxRouteContext,
): Promise<NextResponse<{ success: true } | string>> {
  const user = await getUser();
  if (!user) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const { inboxId } = await context.params;

  const inbox = await prisma.inboxes.findFirst({
    where: {
      id: inboxId,
      user_id: user.user_id,
    },
  });

  if (!inbox) {
    return NextResponse.json("Not found", { status: 404 });
  }

  await prisma.inboxes.delete({
    where: {
      id: inboxId,
    },
  });

  return NextResponse.json({ success: true });
}

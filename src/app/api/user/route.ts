import { getUser } from "@/services/user/user.api";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const me = await getUser();
    return NextResponse.json({ me });
  } catch (_error) {
    console.error(_error);
    return NextResponse.json(
      { success: false, msg: "사용자 정보를 찾을 수 없습니다." },
      { status: 500 },
    );
  }
}

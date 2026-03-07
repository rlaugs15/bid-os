"use server";

import { createClient } from "@/lib/supabase/server";
import { cacheTag, revalidateTag } from "next/cache";
import prisma from "prisma/prisma";
import { globalTags } from "../cache/global.cache";
import { userTags } from "../cache/user.cache";

export async function fetchUserSupabase() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user?.id ?? null;
}

async function fetchUserPrisma(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { user_id: userId },
      select: {
        user_id: true,
        nickname: true,
        image_url: true,
        description: true,
      },
    });

    if (!user) return null;

    return {
      ...user,
    };
  } catch (error) {
    console.error(`로그인 유저 조회 실패 (${userId})`, error);
    return null;
  }
}

async function getCachedUser(userId: string) {
  "use cache";

  // 조건별 태그
  cacheTag(userTags.me());

  // 전체 무효화용 태그
  cacheTag(globalTags.userAll);

  return fetchUserPrisma(userId);
}

export async function getUser() {
  const userId = await fetchUserSupabase();
  if (!userId) return null;

  return getCachedUser(userId);
}

// ===================================================================
// 로그아웃
// ===================================================================
export async function logout() {
  const supabase = await createClient();

  try {
    await supabase.auth.signOut();
    // 서버 캐시 무효화
    revalidateTag(userTags.me(), "none"); // use cache로 캐싱된 사용자 상태 즉시 갱신
  } catch (error) {
    console.error("로그아웃 실패:", error);
  }
}

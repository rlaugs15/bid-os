import { NextResponse, type NextRequest } from "next/server";
import { fetchUserSupabaseWithRequest } from "./lib/auth";

// 인증이 필요한 경로
const protectedRoutes = [/^\/profile(\/.*)?$/];

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 보호 경로 여부 판단
  const isProtected = protectedRoutes.some((regex) => regex.test(pathname));

  // 인증 필요 경로인데 비로그인 유저일 경우 홈으로 리디렉트
  if (isProtected) {
    const userId = await fetchUserSupabaseWithRequest(request);
    const isLoggedIn = !!userId;

    if (!isLoggedIn) {
      return Response.redirect(new URL("/login", request.url));
    }
  }
  // 로그인 상태거나 보호 경로가 아닐 경우 그냥 통과
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

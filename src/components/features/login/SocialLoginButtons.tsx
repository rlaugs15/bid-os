"use client";

import { signInWithGoogle } from "@/app/(view)/@modal/(.)login/actions";
import SocialLoginButton from "./SocialLoginButton";

export default function SocialLoginButtons() {
  const handleGoogleLogin = () => {
    signInWithGoogle();
  };
  return (
    <form className="flex flex-col items-center w-full gap-2.5 py-10">
      <SocialLoginButton
        formAction={handleGoogleLogin}
        imgSrc="/login/google-login-button.png"
        alt="구글 로그인 버튼"
      />
      {/* <SocialLoginButton imgSrc="/login/kakao-login-button.png" alt="카카오 로그인 버튼" /> */}
    </form>
  );
}

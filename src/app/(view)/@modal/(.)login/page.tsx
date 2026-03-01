import XButton from "@/components/common/button/XButton";
import ModalContent from "@/components/common/modal/ModalContent";
import ModalHeader from "@/components/common/modal/ModalHeader";
import SocialLoginButtons from "@/components/features/login/SocialLoginButtons";

export default async function LoginModal() {
  return (
    <ModalContent>
      <ModalHeader>
        <XButton />
      </ModalHeader>
      <section className="flex flex-col text-center items-center self-stretch">
        <h1 className="font-prompt text-3xl font-bold mb-10">BID OS</h1>
        <h2 className="font-bold text-lg web:text-xl mb-3">로그인</h2>
      </section>
      <SocialLoginButtons />
    </ModalContent>
  );
}

import Link from "next/link";
import { Button } from "../ui/button";

export default function Header() {
  return (
    <header className="flex items-center justify-between fixed w-full z-50 bg-black px-12.5 py-4 web:py-5 left-0 top-0 h-15">
      <Link href="/" className="text-white text-[23px] font-bold">
        BID OS
      </Link>
      <section>
        <Link href="/login">
          <Button variant={"ghost"} className="font-bold">
            회원가입/로그인
          </Button>
        </Link>
      </section>
    </header>
  );
}

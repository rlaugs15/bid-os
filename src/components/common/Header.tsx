import { getUser } from "@/services/user/user.api";
import Link from "next/link";
import { Suspense } from "react";
import UserMenu from "./UserMenu";

export default async function Header() {
  const me = await getUser();
  return (
    <header className="flex items-center justify-between fixed w-full z-50 bg-black px-12.5 py-4 web:py-5 left-0 top-0 h-15">
      <Link href="/" className="text-white text-[23px] font-bold">
        BID OS
      </Link>
      <Suspense>
        <UserMenu me={me} />
      </Suspense>
    </header>
  );
}

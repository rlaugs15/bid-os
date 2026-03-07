import { getUser } from "@/services/user/user.api";
import Link from "next/link";
import { Button } from "../ui/button";
import UserDropdown from "./UserDropdown";

export default async function UserMenu() {
  const me = await getUser();
  return (
    <section>
      {!me ? (
        <Link href="/login">
          <Button variant={"ghost"} className="font-bold">
            회원가입/로그인
          </Button>
        </Link>
      ) : (
        <UserDropdown />
      )}
    </section>
  );
}

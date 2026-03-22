"use client";

import { User } from "@/types/user";
import Link from "next/link";
import { Button } from "../ui/button";
import UserDropdown from "./UserDropdown";

interface UserMenuProps {
  me: User | null;
}

export default function UserMenu({ me }: UserMenuProps) {
  return (
    <section>
      {!me ? (
        <Link href="/login">
          <Button variant="ghost" className="font-bold">
            회원가입/로그인
          </Button>
        </Link>
      ) : (
        <UserDropdown />
      )}
    </section>
  );
}

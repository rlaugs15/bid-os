"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { UserBlackIcon, UserIcon } from "./icons";
import LogoutButton from "./LogoutButton";

export default function UserDropdown() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger asChild className="focus:outline-none">
        <Button variant={"ghost"} size={"icon"} className="relative group">
          <UserIcon className="absolute group-hover:opacity-0" />
          <UserBlackIcon className="opacity-0 group-hover:opacity-100" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent autoFocus={false} forceMount className="w-66">
        {/* 로그아웃 */}
        <DropdownMenuSeparator />
        <div className="m-1">
          <DropdownMenuItem asChild className="flex items-center justify-start text-text-sm">
            <LogoutButton label="로그아웃" />
          </DropdownMenuItem>
        </div>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

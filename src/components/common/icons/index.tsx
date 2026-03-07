import { cn } from "@/lib/utils";
import Image from "next/image";

interface IconProps {
  className?: string;
}

/* modal header */
export const XIcon = ({ className }: { className?: string }) => {
  return (
    <div className={cn("relative", className ? className : "w-5 h-5")}>
      <Image
        src="/icons/x.svg"
        alt="엑스 아이콘"
        fill
        className="object-contain object-center stroke-2"
      />
    </div>
  );
};

export const UserIcon = ({ className }: IconProps) => {
  return (
    <Image
      src="/icons/user.svg"
      width={20}
      height={20}
      alt="유저 아이콘"
      className={cn("w-5 h-5", className)}
    />
  );
};

export const UserBlackIcon = ({ className }: IconProps) => {
  return (
    <Image
      src="/icons/user-black.svg"
      width={20}
      height={20}
      alt="유저 아이콘"
      className={cn("w-5 h-5", className)}
    />
  );
};

export const LogoutIcon = ({ className }: IconProps) => {
  return (
    <Image
      src="/icons/log-out.svg"
      width={14}
      height={15}
      alt="헤드폰 아이콘"
      className={cn("w-5 h-5", className)}
    />
  );
};

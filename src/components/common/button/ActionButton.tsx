import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  label: string;
  link?: string;
}

export default function ActionButton({ label, link }: Props) {
  return (
    <>
      {link ? (
        <Link href={link}>
          <Button className="rounded-full w-46 h-10 text-text-md font-medium bg-black text-white group-hover:bg-light-900 group-hover:text-white transition-colors duration-200">
            {label}
          </Button>
        </Link>
      ) : (
        <Button className="rounded-full w-46 h-10 text-text-md font-medium bg-black text-white group-hover:bg-light-900 group-hover:text-white transition-colors duration-200">
          {label}
        </Button>
      )}
    </>
  );
}

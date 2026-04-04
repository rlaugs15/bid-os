import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ComponentProps } from "react";

type ButtonProps = ComponentProps<typeof Button>;

interface Props extends ButtonProps {
  label: string;
  link?: string;
  variant?: ComponentProps<typeof Button>["variant"];
}

export default function ActionButton({ label, link, variant = "default", ...rest }: Props) {
  return (
    <>
      {link ? (
        <Link href={link}>
          <Button
            variant={variant}
            className="rounded-full w-46 h-10 text-text-md font-medium text-white transition-colors duration-200"
            {...rest}
          >
            {label}
          </Button>
        </Link>
      ) : (
        <Button
          variant={variant}
          className="rounded-full w-46 h-10 text-text-md font-medium text-white transition-colors duration-200"
          {...rest}
        >
          {label}
        </Button>
      )}
    </>
  );
}

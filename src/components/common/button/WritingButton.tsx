import { Button } from "@/components/ui/button";

interface Props {
  label: string;
}

export default function WritingButton({ label }: Props) {
  return (
    <Button className="pointer-events-none rounded-full w-46 h-10 text-text-md font-medium bg-black text-white group-hover:bg-light-900 group-hover:text-white transition-colors duration-200">
      {label}
    </Button>
  );
}

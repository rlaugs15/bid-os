import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between fixed w-full z-50 bg-black px-12.5 py-4 web:py-5 left-0 top-0 h-15">
      <Link href="/" className="text-white text-[23px] font-bold">
        BID OS
      </Link>
    </header>
  );
}

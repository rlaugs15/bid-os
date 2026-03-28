"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RefObject } from "react";

export default function useQueryPagination(
  queryKey = "page",
  scrollTargetRef?: RefObject<HTMLElement | null>,
) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get(queryKey) ?? 1);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(queryKey, String(newPage));

    router.push(`${pathname}?${params.toString()}`, { scroll: false });

    scrollTargetRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return { currentPage, handlePageChange };
}

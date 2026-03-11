import { useMutation } from "@tanstack/react-query";

async function fetchMemo(id: string) {
  const res = await fetch(`/api/memos/${id}/use`, {
    method: "PATCH",
  });

  if (!res.ok) throw new Error("메모 사용 카운트 증가 실패");

  return res.json();
}

export default function useCopyMemo() {
  return useMutation({
    mutationFn: (id: string) => fetchMemo(id),
  });
}

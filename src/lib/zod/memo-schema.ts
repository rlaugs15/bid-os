import { z } from "zod";

export const memoSchema = z.object({
  content: z.string().min(1, "최소 1 글자는 입력해야 합니다."),
  description: z.string().optional(),
});

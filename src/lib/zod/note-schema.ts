import { z } from "zod";

export const inboxSchema = z.object({
  raw_text: z.string().min(1, "최소 1 글자는 입력해야 합니다."),
});

export const convertInboxSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
});

"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import useCreateInbox from "@/hooks/mutations/inbox/useCreateInbox";
import { inboxSchema } from "@/lib/zod/note-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

export default function InboxForm() {
  const { mutate, isPending, isSuccess } = useCreateInbox();

  const form = useForm<z.infer<typeof inboxSchema>>({
    resolver: zodResolver(inboxSchema),
    defaultValues: {
      raw_text: "",
    },
  });

  const onSubmit = (data: z.infer<typeof inboxSchema>) => {
    if (isPending) return;

    mutate(data);
  };

  useEffect(() => {
    if (isSuccess) {
      form.reset({ raw_text: "" });
    }
  }, [isSuccess, form]);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2 items-end">
      <Controller
        name="raw_text"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name} className="font-bold">
              내용 입력
            </FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="예: 부남건설 차선도색 실적 확인 필요"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Button disabled={isPending}>추가</Button>
    </form>
  );
}

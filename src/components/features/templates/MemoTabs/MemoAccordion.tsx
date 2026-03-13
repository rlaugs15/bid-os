"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useCreateMemo } from "@/hooks/mutations/memos/useCreateMemo";
import { memoSchema } from "@/lib/zod/memo-schema";
import { Memo, MemoType } from "@/types/memos";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import MemoAccordionItem from "./MemoAccordionItem";

interface MemoAccordionProps {
  memos: Memo[];
  type: MemoType;
}

export default function MemoAccordion({ memos, type }: MemoAccordionProps) {
  const { mutate, isSuccess } = useCreateMemo();
  const form = useForm<z.infer<typeof memoSchema>>({
    resolver: zodResolver(memoSchema),
    defaultValues: {
      content: "",
      description: "",
    },
  });

  useEffect(() => {
    if (isSuccess) {
      form.reset({
        content: "",
        description: "",
      });
    }
  }, [isSuccess, form]);

  const onSubmit = (values: z.infer<typeof memoSchema>) => {
    const isWhelkType = type === "whelk";
    const isHashType = type === "hash";

    let content = values.content;

    if (isWhelkType && !content.startsWith("@※")) {
      content = `@※${content}`;
    }
    if (isHashType && !content.startsWith("#")) {
      content = `#${content}`;
    }

    mutate({
      content,
      description: values.description ?? null,
      type,
    });
  };
  return (
    <>
      <Accordion type="single" collapsible defaultValue="shipping" className="max-w-full">
        <AccordionItem value="returns">
          <AccordionTrigger className="font-bold text-text-2xl">메모추가(클릭)</AccordionTrigger>
          <AccordionContent>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
                <Controller
                  name="content"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="메모 추가"
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
                <Controller
                  name="description"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <Textarea
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="설명 추가(선택)"
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </FieldGroup>
              <Button className="my-4 text-text-sm! text-white">메모 추가</Button>
            </form>
            <Separator />
          </AccordionContent>
        </AccordionItem>

        {memos.map((memo) => (
          <MemoAccordionItem key={memo.id} memo={memo} />
        ))}
      </Accordion>
    </>
  );
}

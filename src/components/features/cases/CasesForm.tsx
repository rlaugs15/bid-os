"use client";

import ActionButton from "@/components/common/button/ActionButton";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import useCreateCase from "@/hooks/mutations/cases/useCreateCase";
import { caseSchema } from "@/lib/zod/note-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

export default function CasesForm() {
  const { mutate: createCase, isPending: isCreatingCase } = useCreateCase();

  const form = useForm<z.infer<typeof caseSchema>>({
    resolver: zodResolver(caseSchema),
    defaultValues: {
      bid_number: "",
      title: "",
      status: "active",
    },
  });

  useEffect(() => {
    form.reset({
      bid_number: "",
      title: "",
      status: "active",
    });
  }, [form]);

  const handleCreateCase = (data: z.infer<typeof caseSchema>) => {
    if (isCreatingCase) return;
    createCase(data);
  };
  const currentStatus = form.watch("status");

  return (
    <form onSubmit={form.handleSubmit(handleCreateCase)} className="space-y-6">
      <FieldGroup>
        <Controller
          name="bid_number"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name} className="font-bold">
                공고번호
              </FieldLabel>
              <Input {...field} id={field.name} className="h-12" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name} className="font-bold">
                공고이름
              </FieldLabel>
              <Input {...field} id={field.name} className="h-12" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      {/* 상태 선택 */}
      <section className="space-y-2">
        <FieldLabel className="font-bold">공고 상태</FieldLabel>
        <div className="flex gap-4">
          <Button
            type="button"
            variant={currentStatus === "active" ? "default" : "outline"}
            onClick={() => form.setValue("status", "active")}
          >
            진행중
          </Button>

          <Button
            type="button"
            variant={currentStatus === "closed" ? "default" : "outline"}
            onClick={() => form.setValue("status", "closed")}
          >
            종료
          </Button>
        </div>
      </section>

      {/* 제출 */}
      <div>
        <Separator />
      </div>
      <div className="mt-6">
        <ActionButton label={isCreatingCase ? "공고 등록 중..." : "공고 등록하기"} />
      </div>
    </form>
  );
}

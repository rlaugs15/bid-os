"use client";

import ActionButton from "@/components/common/button/ActionButton";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import useDeleteCase from "@/hooks/mutations/cases/useDeleteCase";
import useUpdateCase from "@/hooks/mutations/cases/useUpdateCase";
import { caseSchema } from "@/lib/zod/note-schema";
import { CaseItem } from "@/types/notes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

interface Props {
  caseData: CaseItem;
  caseId: string;
}

export default function CaseDetailForm({ caseData, caseId }: Props) {
  const { mutate: updateCase, isPending: isUpdatePending } = useUpdateCase(caseId);
  const { mutate: deleteCase, isPending: isDeletePending } = useDeleteCase();

  const form = useForm<z.infer<typeof caseSchema>>({
    resolver: zodResolver(caseSchema),
    defaultValues: {
      bid_number: caseData?.bid_number || "",
      title: caseData?.title || "",
      status: caseData?.status || "active",
    },
  });

  useEffect(() => {
    if (caseData) {
      form.reset({
        bid_number: caseData?.bid_number ?? "",
        title: caseData?.title ?? "",
        status: caseData?.status ?? "active",
      });
    }
  }, [caseData, form]);

  const onSubmit = (data: z.infer<typeof caseSchema>) => {
    if (isUpdatePending) return;
    updateCase(data);
  };

  const onDeleteCaseClick = () => {
    if (isDeletePending) return;
    deleteCase(caseId);
  };

  const currentStatus = form.watch("status");
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                공고명
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
      <section>
        <div>
          <Separator />
        </div>
        <div className="mt-6 gap-4 flex">
          <ActionButton label={isUpdatePending ? "공고 수정 중..." : "공고 수정하기"} />
          <ActionButton
            onClick={onDeleteCaseClick}
            type="button"
            label={isDeletePending ? "공고 삭제 중..." : "공고 삭제하기"}
            variant={"destructive"}
          />
        </div>
      </section>
    </form>
  );
}

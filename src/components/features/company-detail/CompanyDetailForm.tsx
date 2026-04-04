"use client";

import ActionButton from "@/components/common/button/ActionButton";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import useDeleteCompany from "@/hooks/mutations/companies/useDeleteCompany";
import useUpdateCompany from "@/hooks/mutations/companies/useUpdateCompany";
import { companySchema } from "@/lib/zod/note-schema";
import { CompanyItem } from "@/types/notes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

interface Props {
  companyData: CompanyItem;
  companyId: string;
}

export default function CompanyDetailForm({ companyData, companyId }: Props) {
  const { mutate: updateCompany, isPending: isUpdatePending } = useUpdateCompany(companyId);
  const { mutate: deleteCompany, isPending: isDeletePending } = useDeleteCompany();

  const form = useForm<z.infer<typeof companySchema>>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: companyData?.name || "",
      status: companyData?.status || "active",
      type: companyData?.type || "general",
    },
  });

  useEffect(() => {
    if (companyData) {
      form.reset({
        name: companyData?.name ?? "",
        status: companyData?.status ?? "active",
        type: companyData?.type ?? "general",
      });
    }
  }, [companyData, form]);

  const onSubmit = (data: z.infer<typeof companySchema>) => {
    if (isUpdatePending) return;
    updateCompany(data);
  };

  const onDeleteCompanyClick = () => {
    if (isDeletePending) return;
    deleteCompany(companyId);
  };

  const currentStatus = form.watch("status");
  const currentType = form.watch("type");
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <Controller
        name="name"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name} className="font-bold">
              업체명
            </FieldLabel>
            <Input {...field} id={field.name} className="h-12" />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* 업체타입 선택 */}
      <section className="space-y-2">
        <FieldLabel className="font-bold">업체 타입</FieldLabel>
        <div className="flex gap-4">
          <Button
            type="button"
            variant={currentType === "general" ? "default" : "outline"}
            onClick={() => form.setValue("type", "general")}
          >
            종합
          </Button>

          <Button
            type="button"
            variant={currentType === "specialist" ? "default" : "outline"}
            onClick={() => form.setValue("type", "specialist")}
          >
            전문
          </Button>
          <Button
            type="button"
            variant={currentType === "communication" ? "default" : "outline"}
            onClick={() => form.setValue("type", "communication")}
          >
            전소통
          </Button>
        </div>
      </section>

      {/* 업체타입 선택 */}
      <section className="space-y-2">
        <FieldLabel className="font-bold">업체 타입</FieldLabel>
        <div className="flex gap-4">
          <Button
            type="button"
            variant={currentStatus === "active" ? "default" : "outline"}
            onClick={() => form.setValue("status", "active")}
          >
            서비스 중
          </Button>

          <Button
            type="button"
            variant={currentStatus === "inactive" ? "default" : "outline"}
            onClick={() => form.setValue("status", "inactive")}
          >
            서비스 종료
          </Button>
        </div>
      </section>

      {/* 제출 */}
      <div>
        <Separator />
      </div>
      <div className="mt-6 gap-4 flex">
        <ActionButton label={isUpdatePending ? "업체 수정 중..." : "업체 수정하기"} />
        <ActionButton
          onClick={onDeleteCompanyClick}
          type="button"
          label={isDeletePending ? "업체 삭제 중..." : "업체 삭제하기"}
          variant={"destructive"}
        />
      </div>
    </form>
  );
}

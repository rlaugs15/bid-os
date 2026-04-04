"use client";

import ActionButton from "@/components/common/button/ActionButton";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import useCreateCompany from "@/hooks/mutations/companies/useCreateCompany";
import { companySchema } from "@/lib/zod/note-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

export default function CompanyForm() {
  const { mutate: createCompany, isPending: isCreatingCompany } = useCreateCompany();

  const form = useForm<z.infer<typeof companySchema>>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: "",
      status: "active",
      type: "general", // 추후 바꾸기
    },
  });

  useEffect(() => {
    form.reset({
      name: "",
      status: "active",
      type: "general",
    });
  }, [form]);

  const handleCreateCompany = (data: z.infer<typeof companySchema>) => {
    if (isCreatingCompany) return;
    console.log(data);

    createCompany(data);
  };
  const currentStatus = form.watch("status");
  const currentType = form.watch("type");

  return (
    <form onSubmit={form.handleSubmit(handleCreateCompany)} className="space-y-6">
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
      <div className="mt-6">
        <ActionButton label={isCreatingCompany ? "업체 등록 중..." : "업체 등록하기"} />
      </div>
    </form>
  );
}

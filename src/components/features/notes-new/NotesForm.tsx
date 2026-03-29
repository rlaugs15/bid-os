"use client";

import ActionButton from "@/components/common/button/ActionButton";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import useCreateNote from "@/hooks/mutations/notes/useCreateNote";
import { noteSchema } from "@/lib/zod/note-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

export default function NotesForm() {
  const { mutate: createNote, isPending: isCreatingNote } = useCreateNote();

  const form = useForm<z.infer<typeof noteSchema>>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: "",
      content: "",
      type: "general",
    },
  });

  useEffect(() => {
    form.reset({
      title: "",
      content: "",
      type: "general",
    });
  }, [form]);

  const handleCreateNote = (data: z.infer<typeof noteSchema>) => {
    if (isCreatingNote) return;
    createNote(data);
  };
  const currentType = form.watch("type");

  return (
    <form onSubmit={form.handleSubmit(handleCreateNote)} className="space-y-6">
      <FieldGroup>
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name} className="font-bold">
                제목
              </FieldLabel>
              <Input {...field} id={field.name} className="h-12" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="content"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name} className="font-bold">
                내용
              </FieldLabel>
              <Textarea {...field} id={field.name} rows={4} className="min-h-50" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      {/* 🔥 타입 선택 */}
      <section className="space-y-2">
        <FieldLabel className="font-bold">타입</FieldLabel>
        <div className="flex gap-4">
          <Button
            type="button"
            variant={currentType === "general" ? "default" : "outline"}
            onClick={() => form.setValue("type", "general")}
          >
            미분류
          </Button>

          <Button
            type="button"
            variant={currentType === "case" ? "default" : "outline"}
            onClick={() => form.setValue("type", "case")}
          >
            공고
          </Button>

          <Button
            type="button"
            variant={currentType === "company" ? "default" : "outline"}
            onClick={() => form.setValue("type", "company")}
          >
            업체
          </Button>
        </div>
      </section>

      {/* 제출 */}
      <div>
        <Separator />
      </div>
      <div className="mt-6">
        <ActionButton label={isCreatingNote ? "노트 생성 중..." : "노트 생성하기"} />
      </div>
    </form>
  );
}

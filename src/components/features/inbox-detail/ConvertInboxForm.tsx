"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useConvertInbox from "@/hooks/mutations/inbox/useConvertInbox";
import useDeleteInbox from "@/hooks/mutations/inbox/useDeleteInbox";
import { convertInboxSchema } from "@/lib/zod/note-schema";
import { InboxItem } from "@/types/notes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

interface ConvertInboxFormProps {
  inboxId: string;
  inbox: InboxItem;
}

export default function ConvertInboxForm({ inboxId, inbox }: ConvertInboxFormProps) {
  const router = useRouter();
  const { mutate: convertInbox, isPending: isConverting } = useConvertInbox();
  const { mutate: deleteInbox, isPending: isDeleting } = useDeleteInbox({
    onSuccess: () => {
      router.replace("/inbox");
    },
  });

  const form = useForm<z.infer<typeof convertInboxSchema>>({
    resolver: zodResolver(convertInboxSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  useEffect(() => {
    if (inbox) {
      form.reset({
        title: inbox.raw_text,
        content: "",
      });
    }
  }, [inbox]);

  const onSubmit = (data: z.infer<typeof convertInboxSchema>) => {
    if (isConverting) return;
    convertInbox({ inboxId: String(inboxId), ...data });
  };

  const handleDelete = () => {
    if (isDeleting) return;
    deleteInbox(String(inboxId));
  };
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>노트 재료</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FieldGroup>
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name} className="font-bold">
                      제목
                    </FieldLabel>
                    <Input {...field} id={field.name} />
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
                    <Textarea {...field} id={field.name} rows={4} />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </FieldGroup>
            <div className="flex gap-2 pt-4">
              <Button disabled={isConverting} className="flex-1">
                {isConverting ? "생성 중..." : "노트 생성"}
              </Button>
              <Button
                onClick={handleDelete}
                disabled={isDeleting}
                type="button"
                variant="destructive"
              >
                {isDeleting ? "삭제 중..." : "삭제"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}

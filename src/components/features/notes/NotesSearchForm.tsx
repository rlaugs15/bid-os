"use client";

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { noteSearchSchema } from "@/lib/zod/note-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

type FormValues = z.infer<typeof noteSearchSchema>;

export default function NotesSearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<FormValues>({
    resolver: zodResolver(noteSearchSchema),
    defaultValues: {
      keyword: searchParams.get("keyword") ?? "",
      type: (searchParams.get("type") as FormValues["type"]) ?? undefined,
    },
  });

  const onSubmit = (data: FormValues) => {
    const params = new URLSearchParams();

    params.set("page", "1");
    params.set("pageSize", "10");

    if (data.keyword) params.set("keyword", data.keyword);
    if (data.type) params.set("type", data.type);

    router.push(`/notes?${params.toString()}`);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
      <FieldGroup>
        {/* keyword 검색 */}
        <Controller
          name="keyword"
          control={form.control}
          render={({ field }) => (
            <Field>
              <FieldLabel className="font-bold">검색</FieldLabel>
              <Input {...field} placeholder="제목 또는 내용 검색" className="h-12" />
            </Field>
          )}
        />
      </FieldGroup>
    </form>
  );
}

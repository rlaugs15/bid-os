"use client";

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useCopyMemo from "@/hooks/mutations/memos/useCopyMemo";
import { useUpdateMemo } from "@/hooks/mutations/memos/useUpdateMemo";
import { extractVariables } from "@/lib/utils";
import { Memo } from "@/types/memos";
import { useState } from "react";
import MemoDeleteButton from "./MemoDeleteButton";

/**
 * MemoAccordionItem
 * -----------------
 * 한 개의 메모 항목을 아코디언 형태로 표시
 * - 아코디언 트리거에는 메모 텍스트와 ⚡ 아이콘만 표시
 * - 펼치면 description, 변수 입력 필드, 버튼이 나타남
 * - 입력값을 실시간으로 텍스트에 반영
 * - 복사 버튼 클릭 시 입력값을 치환하여 클립보드에 복사
 */

export default function MemoAccordionItem({ memo }: { memo: Memo }) {
  const [isPressed, setIsPressed] = useState(false); // 클릭 순간만 outline
  const { mutate: copyMemo } = useCopyMemo();

  // 수정 기능------------------------------
  const [isEditing, setIsEditing] = useState(false);

  const [editContent, setEditContent] = useState(memo.content);
  const [editDescription, setEditDescription] = useState(memo.description ?? "");

  const { mutate: updateMemo } = useUpdateMemo();
  // ------------------------------
  // 1️. 변수 매칭
  // - {금액}, {날짜}, {장소} 등 변수를 추출
  // - 한글, 공백, 특수문자 포함 가능
  // ------------------------------
  const variableNames = extractVariables(memo.content);

  // ------------------------------
  // 2. 변수 상태 관리
  // - 변수 이름을 key로 하고 입력값을 value로 저장
  // ------------------------------
  const [variables, setVariables] = useState<Record<string, string>>(
    Object.fromEntries(variableNames.map((name) => [name, ""])),
  );

  // ------------------------------
  // 3. 복사 로직
  // - 입력값을 치환하여 클립보드에 복사
  // ------------------------------
  const handleCopy = () => {
    let copiedContent = memo.content;
    variableNames.forEach((name) => {
      copiedContent = copiedContent.replace(`{${name}}`, variables[name] || "");
    });
    // 클립보드에 복사
    navigator.clipboard.writeText(copiedContent);

    // 카운트 증가 API 호출
    copyMemo(memo.id);

    // 변수 입력 초기화
    setVariables(Object.fromEntries(variableNames.map((name) => [name, ""])));
  };

  return (
    <AccordionItem value={String(memo.id)}>
      {/* Trigger 안에는 텍스트만 두기 */}
      <AccordionTrigger>
        {isEditing ? (
          <Input value={editContent} onChange={(e) => setEditContent(e.target.value)} />
        ) : (
          <span>
            {variableNames.length > 0
              ? variableNames.reduce(
                  (text, name) => text.replace(`{${name}}`, variables[name] || `{${name}}`),
                  memo.content,
                )
              : memo.content}{" "}
            {variableNames.length > 0 && "⚡"}
            {memo.description && "📄"}
          </span>
        )}
      </AccordionTrigger>

      <AccordionContent>
        {/* 설명 */}
        {isEditing ? (
          <Textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="mb-2"
          />
        ) : (
          memo.description && (
            <p className="text-text-sm mb-2">
              {memo.description.split("\n").map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          )
        )}

        {/* 변수 입력 필드 */}
        {variableNames.length > 0 &&
          variableNames.map((name) => (
            <Input
              key={name}
              placeholder={name}
              value={variables[name] || ""}
              onChange={(e) => setVariables((prev) => ({ ...prev, [name]: e.target.value }))}
              className="mb-1"
            />
          ))}
      </AccordionContent>
      {/* Trigger 밖에 버튼 배치 */}
      <div className="flex gap-2 justify-between mb-2">
        <div className="space-x-4 text-text-xl!">
          <Button
            variant={isPressed ? "outline" : "default"}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            onMouseLeave={() => setIsPressed(false)}
            onClick={handleCopy}
          >
            복사
          </Button>
          <Button
            onClick={() => {
              if (isEditing) {
                updateMemo({
                  id: memo.id,
                  content: editContent,
                  description: editDescription,
                });

                setIsEditing(false);
              } else {
                setIsEditing(true);
              }
            }}
          >
            {isEditing ? "저장" : "수정"}
          </Button>
        </div>
        <MemoDeleteButton id={memo.id} />
      </div>
    </AccordionItem>
  );
}

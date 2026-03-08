"use client";

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Memo } from "@/types/memos";
import { useState } from "react";

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

  // ------------------------------
  // 1️. 변수 매칭
  // - {금액}, {날짜}, {장소} 등 변수를 추출
  // - 한글, 공백, 특수문자 포함 가능
  // ------------------------------
  const variableMatches = memo.content.match(/{([^{}]+)}/g) || [];
  const variableNames = variableMatches.map((v) => v.slice(1, -1).trim());

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

    // 변수 입력 초기화
    setVariables(Object.fromEntries(variableNames.map((name) => [name, ""])));
  };

  return (
    <AccordionItem value={String(memo.id)}>
      {/* Trigger 안에는 텍스트만 두기 */}
      <AccordionTrigger>
        <span>
          {/* 실시간 보기 및 변수 존재 시 번개아이콘 */}
          {variableNames.length > 0
            ? variableNames.reduce(
                (text, name) => text.replace(`{${name}}`, variables[name] || `{${name}}`),
                memo.content,
              )
            : memo.content}{" "}
          {variableNames.length > 0 && "⚡"}
        </span>
      </AccordionTrigger>

      <AccordionContent>
        {/* 설명 */}
        {memo.description && <p className="text-text-sm mb-2">{memo.description}</p>}

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
          <Button onClick={() => alert("수정 기능")}>수정</Button>
        </div>
        <Button onClick={() => alert("삭제 기능")} className="bg-green-700">
          삭제
        </Button>
      </div>
    </AccordionItem>
  );
}

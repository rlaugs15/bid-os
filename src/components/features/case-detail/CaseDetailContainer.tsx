"use client";

import FallbackMessage from "@/components/common/FallbackMessage";
import LoadingLottie from "@/components/common/LoadingLottie";
import useCase from "@/hooks/queries/cases/useCase";
import { useParams } from "next/navigation";
import CaseDetailForm from "./CaseDetailForm";

export default function CaseDetailContainer() {
  const { caseId } = useParams();
  const { data: caseData, isPending: isCasePending } = useCase(String(caseId));

  if (!isCasePending && !caseData) {
    return <FallbackMessage message="공고를 찾을 수 없습니다." />;
  }

  return (
    <>
      {isCasePending ? (
        <LoadingLottie />
      ) : (
        <CaseDetailForm caseData={caseData} caseId={String(caseId)} />
      )}
    </>
  );
}

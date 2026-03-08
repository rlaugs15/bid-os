import { Memo } from "./types/memos";

export const whelkMockMemos: Memo[] = [
  {
    id: "m1",
    user_id: "u1",
    type: "whelk",
    content: "@※직접시공 공사 공고입니다. (공고문 기재사항)",
  },
  {
    id: "m2",
    user_id: "u1",
    type: "whelk",
    content: "@※실태조사 공고입니다.",
  },
  {
    id: "m8",
    user_id: "u1",
    type: "whelk",
    content: "@※주력분야가 {주력분야}이어야 합니다.",
  },
  {
    id: "m15",
    user_id: "u1",
    type: "whelk",
    content: "@※단가계약 공고로 총 {계약방식} {금액}원인 공고입니다.",
    description: "총 소요예산 부분은 추정가격이나 공고문 써있는 거 적기, 공고문 메모장 확인",
  },
  {
    id: "m4",
    user_id: "u1",
    type: "whelk",
    content: "@※ {발주처} 공고입니다. 홈페이지 가입여부 확인 후 투찰 바랍니다.",
    description: "가입안한 발주처",
  },
  {
    id: "m5",
    user_id: "u1",
    type: "whelk",
    content: "@※공고문 특기사항 확인 후 투찰 바랍니다.",
  },
  {
    id: "m6",
    user_id: "u1",
    type: "whelk",
    content: "@※신기술(특허) 적용 공고입니다. 확인 후 투찰 바랍니다.",
    description: "참가자격 일때만",
  },
  {
    id: "m7",
    user_id: "u1",
    type: "whelk",
    content: "@※공사현장이 {주소}인 전국 공고입니다.",
    description:
      "10억 이상은 무조건 분석, 아니면 질문 - 팀장님,동엽님 업체: 기본 분석 후 메모, 7~8천 이하 이러면 분석 없이 메모(금액대는 느낌적인 느낌)",
  },

  {
    id: "m9",
    user_id: "u1",
    type: "whelk",
    content: "@※공보증금 납부 공고입니다. 공고문 확인 후 분석 필요 시 요청사항에 기재 바랍니다.",
  },
  {
    id: "m10",
    user_id: "u1",
    type: "whelk",
    content: "@※협정이 필요한 공고입니다.",
    description:
      "협력업체 발견 시 연락드리겠습니다. or 협력업체 연결 필요 시 요청사항에 기재 바랍니다.",
  },
  {
    id: "m11",
    user_id: "u1",
    type: "whelk",
    content:
      "@※실적 부족으로 공동도급을 진행해야 하는 공고입니다. 협력업체 연결 혹은 분석 필요 시 요청사항에 기재 바랍니다.",
    description: "부팀",
  },
  {
    id: "m12",
    user_id: "u1",
    type: "whelk",
    content: "@※재입찰 공고입니다. 투찰 후 체크 부탁드립니다.",
    description: "문자, 전화 안내까지(하루 밀리면 문자, 2시간 정도면 촉박하므로 전화)",
  },
  {
    id: "m13",
    user_id: "u1",
    type: "whelk",
    content: "@※주요자재 선정 공고입니다.",
  },
  {
    id: "m14",
    user_id: "u1",
    type: "whelk",
    content:
      "@※시방서에 따라 계약이행이 가능한 업체이어야 합니다. 공고문 공사 유의사항 확인 후 투찰 바랍니다.",
    description: "주로 서울대학교",
  },

  {
    id: "m16",
    user_id: "u1",
    type: "whelk",
    content: "@※보증금 납부 공고입니다. 분석 필요 시 요청사항에 기재 바랍니다.",
  },
  {
    id: "m17",
    user_id: "u1",
    type: "whelk",
    content: "@※참여인력과 필수장비 및 안전장구를 확보해야 하는 공고입니다.",
    description:
      "보통 분석은 안 해주고 @메모로 표기. 기술자부터 장비 요구하는 공고라 일반 공고는 아님",
  },
  {
    id: "m18",
    user_id: "u1",
    type: "whelk",
    content: "@※입찰개시일시 - {날짜 시간}",
  },
  {
    id: "m19",
    user_id: "u1",
    type: "whelk",
    content:
      "@※종합공사의 등록기준(기술자, 자본금 등)을 만족해야합니다. 참여 가능 시 요청사항에 기재 바랍니다.",
  },
  {
    id: "m20",
    user_id: "u1",
    type: "whelk",
    content: "@※입찰참가 신청 시 건설업등록증 1부를 스캔파일 형태로 첨부(업로드)해야 합니다.",
  },
  {
    id: "m21",
    user_id: "u1",
    type: "whelk",
    content:
      "@※입찰참가 서류 우편 또는 방문제출 및 보증금 납부 공고입니다. 공고문 확인 후 분석 필요 시 서류제출 및 발주처 유선확인 완료 후 분석요청 바랍니다.",
    description: "찬호주임님 상담 실내건축 대부분",
  },
  {
    id: "m22",
    user_id: "u1",
    type: "whelk",
    content:
      "@※입찰참가 서류 우편 또는 방문제출 및 보증금 납부 공고입니다 공고문 확인 후 투찰 바랍니다.",
    description: "에스엘플랜 해당 메모 후 분석",
  },
  {
    id: "m25",
    user_id: "u1",
    type: "whelk",
    content:
      "@※현장방문 필수 공고입니다.(참석 시 구비서류 지참) [ {날짜 시간} / {주소}] 분석 필요 시 현장 설명 참여 후 요청사항에 기재 바랍니다.",
    description: "동엽대리님 상담 앞으로 요렇게",
  },
  {
    id: "m23",
    user_id: "u1",
    type: "whelk",
    content:
      "@※인원 및 장비, 시설 등의 특수계약조건을 만족해야 합니다. 공고문 확인 후 참여 가능 시 요청사항 바랍니다.",
    description: "E012508143, E012508348-1",
  },
  {
    id: "m24",
    user_id: "u1",
    type: "whelk",
    content:
      "@※순시위탁공사 공고입니다. 첨부된 지중선로 순시위탁공사 시방서 및 지중선로 외상고장예방 관리절차서 등을 확인 후 투찰 바랍니다.",
  },
  {
    id: "m26",
    user_id: "u1",
    type: "whelk",
    content:
      "# 순시위탁공사 공고로 첨부된 지중선로 순시위탁공사 시방서, 지중선로 외상고장예방 관리절차서 등을 확인하여 인원 및 장비의 구비등을 확인 후 분석 필요 시 요청사항에 기재 바랍니다.",
  },
  {
    id: "m27",
    user_id: "u1",
    type: "whelk",
    content:
      "@※필수 장비 및 순시원4명 , 시공관리책임자1명 자격을 갖춰야합니다. 분석 필요 시 요청사항에 기재 바랍니다.",
    description: "동엽대리",
  },
];

export const unqualifiedMockMemos: Memo[] = [
  {
    id: "u1",
    user_id: "u1",
    type: "unqualified",
    content: "실태조사 공고입니다.",
  },
  {
    id: "u2",
    user_id: "u1",
    type: "unqualified",
    content: "경영상태 감점 공고입니다.",
  },
  {
    id: "u3",
    user_id: "u1",
    type: "unqualified",
    content: "영업기간 감점 공고입니다.",
  },
  {
    id: "u4",
    user_id: "u1",
    type: "unqualified",
    content: "실적이 부족한 공고입니다.",
  },
  {
    id: "u5",
    user_id: "u1",
    type: "unqualified",
    content: "{업종}의 실적이 부족한 공고입니다.",
  },
  {
    id: "u6",
    user_id: "u1",
    type: "unqualified",
    content: "주력분야가 {주력분야}이어야 합니다.",
  },
  {
    id: "u7",
    user_id: "u1",
    type: "unqualified",
    content: "지명경쟁 입찰 공고입니다.",
  },
  {
    id: "u8",
    user_id: "u1",
    type: "unqualified",
    content: "접근성 감점 공고입니다.",
  },
  {
    id: "u13",
    user_id: "u1",
    type: "unqualified",
    content: "내역입찰 대상 공사입니다.",
    description: "ex)R25BK00875838-000 100억 이상짜리 공고",
  },
  {
    id: "u15",
    user_id: "u1",
    type: "unqualified",
    content: "종합공사 공고입니다.",
  },
  {
    id: "u17",
    user_id: "u1",
    type: "unqualified",
    content: "최저가 낙찰제 공고입니다. (공고문 하한율 미기재)",
  },
  {
    id: "u16",
    user_id: "u1",
    type: "unqualified",
    content: "단일예가 공고입니다.",
    description: "예가를 발주처에서 선정을 해서 분석을 진행 할 수 없다",
  },
  {
    id: "u9",
    user_id: "u1",
    type: "unqualified",
    content: "입찰참가자격 사전심사 대상 공사입니다.",
  },
  {
    id: "u10",
    user_id: "u1",
    type: "unqualified",
    content: "면허자격요건 미기재 공고로 분석이 불가합니다.",
  },
  {
    id: "u11",
    user_id: "u1",
    type: "unqualified",
    content: "기초금액 미공개인 서류제출 공고입니다.",
  },
  {
    id: "u12",
    user_id: "u1",
    type: "unqualified",
    content: "입찰참가자격 사전심사 대상 공사입니다.",
  },

  {
    id: "u14",
    user_id: "u1",
    type: "unqualified",
    content: "사회적기업이어야 합니다.",
  },

  {
    id: "u18",
    user_id: "u1",
    type: "unqualified",
    content: "기술능력 평가 공고로 협정연결이 어렵습니다.",
  },
  {
    id: "u19",
    user_id: "u1",
    type: "unqualified",
    content: "취소공고",
  },
  {
    id: "u20",
    user_id: "u1",
    type: "unqualified",
    content: "정정공고",
  },
  {
    id: "u21",
    user_id: "u1",
    type: "unqualified",
    content: "분석 필요 시 연락 바랍니다.",
  },
];

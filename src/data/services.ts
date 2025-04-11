export interface Service {
  id: number;
  name: string;
  path: string;
  icon: string;
  description: string;
}

export interface Category {
  id: number;
  name: string;
  services: number[];
}

export const services: Service[] = [
  { id: 1, name: "당근마켓", path: "/market", icon: "🥕", description: "교내 중고물품 거래 서비스" },
  { id: 2, name: "야구 스코어", path: "/baseball", icon: "⚾", description: "야구 경기 점수 및 통계 정보" },
  { id: 3, name: "계정 관리", path: "/account", icon: "👤", description: "사용자 계정 관리 서비스" },
  { id: 4, name: "Workspace", path: "/workspace", icon: "💼", description: "수업 및 과제 관리 공간" },
  { id: 5, name: "환율", path: "/exchange", icon: "💱", description: "실시간 환율 정보 제공" },
  { id: 6, name: "모의주식", path: "/stocks", icon: "📈", description: "가상 주식 거래 서비스" },
  { id: 7, name: "짜증지수", path: "/mood", icon: "😡", description: "감정 분석 및 예측 서비스" },
  { id: 8, name: "채팅방", path: "/chat", icon: "💬", description: "실시간 채팅 서비스" },
  { id: 9, name: "음악 스트리밍", path: "/music", icon: "🎵", description: "음악 감상 서비스" },
  { id: 10, name: "1대1 채팅", path: "/dm", icon: "📱", description: "개인 메시지 서비스" },
  { id: 11, name: "LLM", path: "/llm", icon: "🤖", description: "인공지능 대화 서비스" },
  { id: 12, name: "알바천국", path: "/jobs", icon: "💰", description: "아르바이트 정보 제공" },
  { id: 13, name: "콴다", path: "/qanda", icon: "❓", description: "질문/답변 커뮤니티" },
  { id: 14, name: "사과", path: "/apple", icon: "🍎", description: "과일 쇼핑몰 서비스" },
  { id: 15, name: "듀오링고", path: "/duolingo", icon: "🇯🇵", description: "일본어 가타카나 학습" },
  { id: 16, name: "도박", path: "/gambling", icon: "🎰", description: "가상 도박 게임" },
  { id: 17, name: "스픽", path: "/speak", icon: "🗣️", description: "말하기 연습 서비스" },
  { id: 18, name: "스네이크 게임", path: "/snake", icon: "🐍", description: "스네이크 및 사과게임" },
  { id: 19, name: "타로", path: "/tarot", icon: "🔮", description: "타로 점술 서비스" },
  { id: 20, name: "e알리미", path: "/ealimi", icon: "📢", description: "학교 알림 서비스" },
  { id: 21, name: "컴시간알리미", path: "/timetable", icon: "🕒", description: "시간표 안내 서비스" },
  { id: 22, name: "날씨", path: "/weather", icon: "🌤️", description: "실시간 날씨 정보" },
  { id: 23, name: "열품타", path: "/timer", icon: "⏱️", description: "집중 타이머 서비스" },
  { id: 24, name: "교과서PDF", path: "/textbook", icon: "📚", description: "디지털 교과서 서비스" },
  { id: 25, name: "필기시스템", path: "/notes", icon: "✏️", description: "노트 작성 서비스" },
  { id: 26, name: "이미지 번역기", path: "/translator", icon: "🖼️", description: "이미지 텍스트 번역" },
  { id: 27, name: "입시정보", path: "/college", icon: "🎓", description: "대학 입시 정보 제공" },
  { id: 28, name: "맛집추천", path: "/food", icon: "🍔", description: "주변 맛집 추천 서비스" },
  { id: 29, name: "AI 친구", path: "/aifriend", icon: "👩", description: "3D AI 가상 친구" },
  { id: 30, name: "스트리밍 서비스", path: "/streaming", icon: "📺", description: "동영상 스트리밍 서비스" },
];

export const categories: Category[] = [
  { id: 1, name: "학습", services: [13, 15, 17, 24, 25, 27] },
  { id: 2, name: "생활", services: [1, 3, 12, 20, 21, 22, 28] },
  { id: 3, name: "엔터테인먼트", services: [9, 16, 18, 19, 29, 30] },
  { id: 4, name: "통신", services: [8, 10, 11, 26] },
  { id: 5, name: "업무", services: [2, 4, 5, 6, 7, 14, 23] },
]; 
export const CHANNELS = [
  '인스타그램 피드',
  '인스타그램 릴스',
  '인스타그램 스토리',
  '유튜브 숏츠',
  '유튜브 일반',
  '틱톡',
  '블라인드',
  'X(트위터)',
  '네이버 카페'
];

export const KANBAN_COLUMNS = [
  { key: 'DRAFT', label: '발송 대기' },
  { key: 'REVIEWING', label: '검토 중' },
  { key: 'NEGOTIATING', label: '협의 중(Redline)' },
  { key: 'APPROVED', label: '서명 대기' },
  { key: 'SIGNED', label: '완료' }
] as const;

export const DEFAULT_SPECIAL_TERMS = [
  '제품 배송/설치/회수 과정에서 발생한 파손은 공급사 책임으로 한다.',
  '고객 AS 및 교환/환불 응대 주체는 공급사로 한다.'
];

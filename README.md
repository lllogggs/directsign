# DirectSign MVP

인플루언서-마케팅사 직거래 전자계약 SaaS MVP 입니다.

## 구현 범위
- 계약서 빌더(Wizard + 실시간 미리보기 + 공유 URL 생성)
- 인플루언서 계약 검토(텍스트 선택 기반 수정/삭제 요청 + 역제안 입력)
- 광고주 대시보드(상태 기반 칸반 + 요청 핑퐁 처리)
- Supabase 스키마 마이그레이션 초안
- Next.js API Route 목업(계약 생성/서명 기록/PDF URL 발급)

## 실행
```bash
npm install
npm run dev
```

## 추후 작업
- Supabase Realtime 연동
- Canvas 서명 패드 및 Storage 업로드
- Puppeteer/JSPDF 기반 PDF 실제 생성
- Resend/SendGrid 이메일 발송 통합

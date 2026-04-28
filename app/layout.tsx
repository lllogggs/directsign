import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DirectSign MVP',
  description: '인플루언서-마케팅사 직거래 전자계약 SaaS'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}

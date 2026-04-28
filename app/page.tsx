import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-6 p-8">
      <h1 className="text-3xl font-bold">DirectSign MVP</h1>
      <p className="text-slate-600">
        중간 대행사 없이 광고주와 인플루언서가 계약 생성, 협의, 전자서명을 처리하는 플랫폼입니다.
      </p>
      <div className="flex gap-3">
        <Link href="/builder" className="rounded bg-blue-600 px-4 py-2 text-white">
          계약서 만들기
        </Link>
        <Link href="/dashboard" className="rounded border border-slate-300 px-4 py-2">
          협업 대시보드
        </Link>
      </div>
    </main>
  );
}

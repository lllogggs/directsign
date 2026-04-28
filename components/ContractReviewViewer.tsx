'use client';

import { useMemo, useState } from 'react';
import type { Clause, ClauseStatus } from '@/lib/types';

const seedClauses: Clause[] = [
  {
    clause_id: 'c_001',
    category: '수수료 및 정산',
    content: '판매 수익의 15%를 수수료로 지급한다.',
    status: 'MODIFICATION_REQUESTED',
    history: [
      {
        role: 'influencer',
        action: '수정 요청',
        comment: '수수료율 20%로 상향 요청합니다.',
        timestamp: '2026-04-28T09:12:17Z'
      }
    ]
  },
  {
    clause_id: 'c_002',
    category: '광고 표기',
    content: '콘텐츠 내 광고 문구를 고지한다.',
    status: 'APPROVED',
    history: []
  }
];

export default function ContractReviewViewer({ contractId }: { contractId: string }) {
  const [clauses, setClauses] = useState(seedClauses);
  const [selected, setSelected] = useState<{ text: string; clauseId: string } | null>(null);
  const [comment, setComment] = useState('');
  const [newTerm, setNewTerm] = useState('');

  const allApproved = useMemo(() => clauses.every((c) => c.status === 'APPROVED'), [clauses]);

  const pushRequest = (nextStatus: ClauseStatus, action: string) => {
    if (!selected || !comment) return;
    setClauses((prev) =>
      prev.map((clause) =>
        clause.clause_id === selected.clauseId
          ? {
              ...clause,
              status: nextStatus,
              history: [
                ...clause.history,
                {
                  role: 'influencer',
                  action,
                  comment,
                  timestamp: new Date().toISOString()
                }
              ]
            }
          : clause
      )
    );
    setComment('');
    setSelected(null);
  };

  const handleSelection = (clauseId: string) => {
    const text = window.getSelection()?.toString().trim();
    if (text) {
      setSelected({ text, clauseId });
    }
  };

  return (
    <section className="mx-auto max-w-4xl space-y-4 p-5">
      <h1 className="text-2xl font-bold">계약 검토 #{contractId}</h1>
      {clauses.map((clause) => (
        <article
          key={clause.clause_id}
          onMouseUp={() => handleSelection(clause.clause_id)}
          onTouchEnd={() => handleSelection(clause.clause_id)}
          className={`rounded border p-4 ${clause.status !== 'APPROVED' ? 'border-amber-400 bg-amber-50' : 'bg-white'}`}
        >
          <p className="text-xs text-slate-500">
            {clause.clause_id} · {clause.category}
          </p>
          <p>{clause.content}</p>
          {clause.history.at(-1) && (
            <p className="mt-2 text-sm text-amber-700">💬 {clause.history.at(-1)?.comment}</p>
          )}
        </article>
      ))}

      {selected && (
        <div className="rounded border bg-white p-4 shadow">
          <p className="text-sm">선택 텍스트: “{selected.text}”</p>
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="mt-2 w-full rounded border p-2"
            placeholder="수정/삭제 요청 사유"
          />
          <div className="mt-2 flex gap-2">
            <button className="rounded bg-blue-600 px-3 py-1 text-white" onClick={() => pushRequest('MODIFICATION_REQUESTED', '수정 요청')}>
              ✏️ 수정 요청
            </button>
            <button className="rounded bg-rose-600 px-3 py-1 text-white" onClick={() => pushRequest('DELETION_REQUESTED', '삭제 요청')}>
              🗑️ 삭제 요청
            </button>
          </div>
        </div>
      )}

      <div className="rounded border bg-white p-4">
        <p className="font-medium">역제안 특약 추가</p>
        <textarea
          className="mt-2 h-24 w-full rounded border p-2"
          value={newTerm}
          onChange={(e) => setNewTerm(e.target.value)}
          placeholder="추가 제안 조항"
        />
      </div>

      <button disabled={!allApproved} className="rounded bg-emerald-600 px-4 py-2 text-white disabled:opacity-40">
        최종 전자서명
      </button>
    </section>
  );
}

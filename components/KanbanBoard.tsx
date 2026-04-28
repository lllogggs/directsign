'use client';

import { useMemo, useState } from 'react';
import { KANBAN_COLUMNS } from '@/lib/constants';
import type { ContractStatus } from '@/lib/types';

interface Card {
  id: string;
  influencer: string;
  status: ContractStatus;
  pendingRequest?: string;
}

const seedCards: Card[] = [
  { id: 'CTR-1001', influencer: '뷰티크리에이터 A', status: 'DRAFT' },
  { id: 'CTR-1002', influencer: '테크리뷰어 B', status: 'NEGOTIATING', pendingRequest: '수수료율 20% 요청' },
  { id: 'CTR-1003', influencer: '푸드인플루언서 C', status: 'APPROVED' }
];

export default function KanbanBoard() {
  const [cards, setCards] = useState(seedCards);

  const grouped = useMemo(
    () =>
      KANBAN_COLUMNS.map((column) => ({
        ...column,
        cards: cards.filter((card) => card.status === column.key)
      })),
    [cards]
  );

  const resolveRequest = (id: string, decision: '수락' | '거절' | '대안 제시') => {
    setCards((prev) =>
      prev.map((card) =>
        card.id === id
          ? {
              ...card,
              pendingRequest: `${decision} 처리됨`,
              status: decision === '수락' ? 'APPROVED' : 'NEGOTIATING'
            }
          : card
      )
    );
  };

  return (
    <div className="grid gap-3 xl:grid-cols-5">
      {grouped.map((column) => (
        <section key={column.key} className="rounded-lg bg-white p-3 shadow-sm">
          <h3 className="mb-3 font-semibold">{column.label}</h3>
          <div className="space-y-2">
            {column.cards.map((card) => (
              <article key={card.id} className="rounded border p-2 text-sm">
                <p className="font-medium">{card.id}</p>
                <p>{card.influencer}</p>
                {card.pendingRequest && <p className="mt-1 text-amber-700">🔔 {card.pendingRequest}</p>}
                {card.status === 'NEGOTIATING' && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {(['수락', '거절', '대안 제시'] as const).map((decision) => (
                      <button
                        key={decision}
                        onClick={() => resolveRequest(card.id, decision)}
                        className="rounded border px-2 py-1"
                      >
                        {decision}
                      </button>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

'use client';

import { useMemo, useState } from 'react';
import { CHANNELS, DEFAULT_SPECIAL_TERMS } from '@/lib/constants';
import type { Clause } from '@/lib/types';

interface BuilderForm {
  type: string;
  channels: string[];
  customChannel: string;
  retentionMonths: number;
  exclusivityMonths: number;
  exposureCount: number;
  fixedFee: number;
  commissionRate: number;
  specialTerms: string;
}

const initialForm: BuilderForm = {
  type: 'SPONSORSHIP',
  channels: [],
  customChannel: '',
  retentionMonths: 6,
  exclusivityMonths: 3,
  exposureCount: 1,
  fixedFee: 0,
  commissionRate: 15,
  specialTerms: ''
};

const baseClauses = (form: BuilderForm): Clause[] => [
  {
    clause_id: 'c_001',
    category: '매체 및 채널',
    content: `채널: ${[...form.channels, form.customChannel].filter(Boolean).join(', ') || '미정'}`,
    status: 'APPROVED',
    history: []
  },
  {
    clause_id: 'c_002',
    category: '노출 및 기간',
    content: `유지기간 ${form.retentionMonths}개월 / 경쟁사 배제 ${form.exclusivityMonths}개월 / 최소 노출 ${form.exposureCount}회`,
    status: 'APPROVED',
    history: []
  },
  {
    clause_id: 'c_003',
    category: '정산',
    content: `고정비 ${form.fixedFee.toLocaleString()}원 또는 수수료 ${form.commissionRate}%`,
    status: 'APPROVED',
    history: []
  },
  {
    clause_id: 'c_004',
    category: '특약',
    content: form.specialTerms || '특약 없음',
    status: 'APPROVED',
    history: []
  }
];

export default function ContractBuilderWizard() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<BuilderForm>(initialForm);
  const [shareUrl, setShareUrl] = useState('');

  const clauses = useMemo(() => baseClauses(form), [form]);

  const onToggleChannel = (channel: string) => {
    setForm((prev) => ({
      ...prev,
      channels: prev.channels.includes(channel)
        ? prev.channels.filter((item) => item !== channel)
        : [...prev.channels, channel]
    }));
  };

  const appendDefaultTerms = () => {
    setForm((prev) => ({
      ...prev,
      specialTerms: [prev.specialTerms, ...DEFAULT_SPECIAL_TERMS].filter(Boolean).join('\n')
    }));
  };

  const generateShareUrl = () => {
    const id = crypto.randomUUID();
    setShareUrl(`${window.location.origin}/contract/${id}`);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="space-y-4 rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">하이브리드 계약서 빌더 (Step {step}/4)</h2>

        {step === 1 && (
          <div className="space-y-2">
            {['SPONSORSHIP', 'PPL', 'GROUP_BUY'].map((type) => (
              <label key={type} className="block rounded border p-3">
                <input
                  type="radio"
                  name="contract-type"
                  checked={form.type === type}
                  onChange={() => setForm((prev) => ({ ...prev, type }))}
                />{' '}
                {type === 'SPONSORSHIP' ? '제품 협찬' : type === 'PPL' ? '유료 광고(PPL)' : '공동구매'}
              </label>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {CHANNELS.map((channel) => (
                <label key={channel} className="rounded border p-2 text-sm">
                  <input
                    type="checkbox"
                    checked={form.channels.includes(channel)}
                    onChange={() => onToggleChannel(channel)}
                  />{' '}
                  {channel}
                </label>
              ))}
            </div>
            <input
              placeholder="기타 채널 직접 입력"
              className="w-full rounded border p-2"
              value={form.customChannel}
              onChange={(e) => setForm((prev) => ({ ...prev, customChannel: e.target.value }))}
            />
          </div>
        )}

        {step === 3 && (
          <div className="grid grid-cols-2 gap-3">
            {[
              ['유지 기간(개월)', 'retentionMonths'],
              ['경쟁사 배제(개월)', 'exclusivityMonths'],
              ['노출 보장 건수', 'exposureCount'],
              ['고정비(원)', 'fixedFee'],
              ['수수료율(%)', 'commissionRate']
            ].map(([label, key]) => (
              <label key={key} className="text-sm">
                {label}
                <input
                  type="number"
                  className="mt-1 w-full rounded border p-2"
                  value={form[key as keyof BuilderForm] as number}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, [key]: Number(e.target.value) || 0 }))
                  }
                />
              </label>
            ))}
          </div>
        )}

        {step === 4 && (
          <div className="space-y-2">
            <button
              type="button"
              onClick={appendDefaultTerms}
              className="rounded border border-amber-400 bg-amber-50 px-3 py-2 text-sm"
            >
              기본 특약 옵션 추가
            </button>
            <textarea
              className="h-40 w-full rounded border p-2"
              value={form.specialTerms}
              onChange={(e) => setForm((prev) => ({ ...prev, specialTerms: e.target.value }))}
              placeholder="자유 특약 입력"
            />
          </div>
        )}

        <div className="flex gap-2">
          <button
            type="button"
            disabled={step === 1}
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            className="rounded border px-3 py-2 disabled:opacity-50"
          >
            이전
          </button>
          <button
            type="button"
            disabled={step === 4}
            onClick={() => setStep((s) => Math.min(4, s + 1))}
            className="rounded bg-blue-600 px-3 py-2 text-white disabled:opacity-50"
          >
            다음
          </button>
          <button type="button" onClick={generateShareUrl} className="rounded bg-emerald-600 px-3 py-2 text-white">
            공유 URL 생성
          </button>
        </div>

        {shareUrl && <p className="rounded bg-slate-100 p-2 text-sm">공유 링크: {shareUrl}</p>}
      </section>

      <section className="rounded-xl bg-white p-6 shadow-sm">
        <h3 className="mb-3 text-lg font-semibold">실시간 계약서 미리보기</h3>
        <ol className="space-y-3">
          {clauses.map((clause) => (
            <li key={clause.clause_id} className="rounded border border-slate-200 p-3">
              <p className="text-xs text-slate-500">
                {clause.clause_id} · {clause.category}
              </p>
              <p>{clause.content}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

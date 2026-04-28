export type ContractType = 'SPONSORSHIP' | 'PPL' | 'GROUP_BUY';
export type ContractStatus = 'DRAFT' | 'REVIEWING' | 'NEGOTIATING' | 'APPROVED' | 'SIGNED';

export type ClauseStatus = 'APPROVED' | 'MODIFICATION_REQUESTED' | 'DELETION_REQUESTED';

export interface ClauseHistory {
  role: 'advertiser' | 'influencer';
  action: string;
  comment: string;
  timestamp: string;
}

export interface Clause {
  clause_id: string;
  category: string;
  content: string;
  status: ClauseStatus;
  history: ClauseHistory[];
}

export interface Contract {
  id: string;
  advertiser_id: string;
  type: ContractType;
  status: ContractStatus;
  influencer_info: {
    name: string;
    channel_url: string;
    contact: string;
  };
  clauses: Clause[];
  signature_data: {
    adv_sign?: string;
    inf_sign?: string;
    signed_at?: string;
    ip?: string;
  };
  pdf_url?: string;
  created_at: string;
  updated_at: string;
}

create extension if not exists "uuid-ossp";

create table if not exists users (
  id uuid primary key,
  company_name varchar not null,
  role varchar not null check (role in ('admin', 'user')),
  created_at timestamptz not null default now()
);

create table if not exists contracts (
  id uuid primary key default uuid_generate_v4(),
  advertiser_id uuid not null references users(id),
  type varchar not null check (type in ('협찬', 'PPL', '공구')),
  status varchar not null check (status in ('DRAFT', 'REVIEWING', 'NEGOTIATING', 'APPROVED', 'SIGNED')),
  influencer_info jsonb not null default '{"name":"", "channel_url":"", "contact":""}'::jsonb,
  clauses jsonb not null default '[]'::jsonb,
  signature_data jsonb not null default '{}'::jsonb,
  pdf_url varchar,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_contracts_status on contracts(status);
create index if not exists idx_contracts_advertiser_id on contracts(advertiser_id);

comment on column contracts.clauses is 'JSONB array of clauses. status values: APPROVED, MODIFICATION_REQUESTED, DELETION_REQUESTED';

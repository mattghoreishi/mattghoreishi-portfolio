create extension if not exists pgcrypto;

create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null,
  role text,
  company_size text,
  main_use_case text,
  consent boolean not null default false,
  contact_consent boolean not null default false,
  agent_name text,
  recommendation text,
  brief jsonb,
  inputs jsonb,
  user_agent text
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  event_name text not null,
  agent_name text,
  metadata jsonb not null default '{}'::jsonb
);

create table if not exists public.feedback (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text,
  agent_name text,
  rating int check (rating between 1 and 5),
  comment text not null
);

alter table public.submissions enable row level security;
alter table public.events enable row level security;
alter table public.feedback enable row level security;

drop policy if exists "No public read submissions" on public.submissions;
drop policy if exists "No public read events" on public.events;
drop policy if exists "No public read feedback" on public.feedback;

create policy "Service role can manage submissions"
  on public.submissions
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

create policy "Service role can manage events"
  on public.events
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

create policy "Service role can manage feedback"
  on public.feedback
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

create index if not exists submissions_created_at_idx on public.submissions (created_at desc);
create index if not exists submissions_email_idx on public.submissions (email);
create index if not exists events_created_at_idx on public.events (created_at desc);
create index if not exists feedback_created_at_idx on public.feedback (created_at desc);

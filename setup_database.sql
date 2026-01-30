-- Tabela para salvar filtros favoritos
create table if not exists saved_filters (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  name text not null,
  keyword text not null,
  filters jsonb not null,
  preset_id text,
  created_at timestamptz default now()
);

-- Tabela para histórico de buscas (usada para limite de uso gratuito)
create table if not exists search_history (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  keyword text not null,
  filters jsonb,
  results_count int default 0,
  created_at timestamptz default now()
);

-- Habilitar RLS (Row Level Security)
alter table saved_filters enable row level security;
alter table search_history enable row level security;

-- Policies para saved_filters
-- Removemos antes para evitar erro de duplicidade se re-rodar
drop policy if exists "Users can all own filters" on saved_filters;
create policy "Users can all own filters" on saved_filters 
for all using (auth.uid() = user_id);

-- Policies para search_history
drop policy if exists "Users can insert own history" on search_history;
create policy "Users can insert own history" on search_history 
for insert with check (auth.uid() = user_id);

drop policy if exists "Users can view own history" on search_history;
create policy "Users can view own history" on search_history 
for select using (auth.uid() = user_id);

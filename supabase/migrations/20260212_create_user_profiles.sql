-- Create user_profiles table for onboarding/profile storage
create table if not exists public.user_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  full_name text,
  username text,
  avatar_url text,
  user_type text default 'candidate' check (user_type in ('candidate','company','interviewer')),
  company_name text,
  company_id text,
  job_title text,
  years_of_experience integer,
  user_role text,
  resume_url text,
  linkedin_url text,
  github_url text,
  portfolio_url text,
  preferred_languages text[],
  skills text[],
  auth_provider text,
  is_active boolean default true,
  is_verified boolean default false,
  onboarding_completed boolean default false,
  last_login_at timestamptz,
  remember_me boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Updated_at trigger
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_user_profiles_updated_at
before update on public.user_profiles
for each row execute function public.set_updated_at();

-- Enable RLS
alter table public.user_profiles enable row level security;

-- Policies: user can select/insert/update own profile
create policy "Users can view their profile"
  on public.user_profiles for select
  using (auth.uid() = id);

create policy "Users can insert their profile"
  on public.user_profiles for insert
  with check (auth.uid() = id);

create policy "Users can update their profile"
  on public.user_profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

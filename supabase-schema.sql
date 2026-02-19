-- ================================================
-- Second Opinion — Supabase Database Schema
-- Run this in your Supabase SQL Editor
-- ================================================

-- Profiles (extends Supabase auth.users)
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  first_name text,
  age integer,
  sex text,
  known_conditions text[],
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Waitlist (pre-launch)
create table if not exists waitlist (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  created_at timestamptz default now()
);

-- Lab Reports
create table if not exists reports (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade,
  title text,
  upload_type text,
  file_url text,
  raw_extracted_text text,
  analysis_json jsonb,
  overall_status text,
  created_at timestamptz default now()
);

-- Individual Biomarker Values (for tracking over time)
create table if not exists biomarkers (
  id uuid default gen_random_uuid() primary key,
  report_id uuid references reports(id) on delete cascade,
  user_id uuid references profiles(id) on delete cascade,
  name text not null,
  value numeric,
  unit text,
  reference_range text,
  status text,
  recorded_at timestamptz default now()
);

-- Medications
create table if not exists medications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade,
  name text not null,
  dosage text,
  frequency text,
  active boolean default true,
  created_at timestamptz default now()
);

-- ================================================
-- Row Level Security Policies
-- ================================================

alter table profiles enable row level security;
alter table reports enable row level security;
alter table biomarkers enable row level security;
alter table medications enable row level security;
alter table waitlist enable row level security;

-- Profiles: users can read/update their own profile
create policy "Users can view own profile" on profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on profiles
  for update using (auth.uid() = id);

create policy "Users can insert own profile" on profiles
  for insert with check (auth.uid() = id);

-- Reports: users can CRUD their own reports
create policy "Users can view own reports" on reports
  for select using (auth.uid() = user_id);

create policy "Users can insert own reports" on reports
  for insert with check (auth.uid() = user_id);

create policy "Users can delete own reports" on reports
  for delete using (auth.uid() = user_id);

-- Biomarkers: users can CRUD their own biomarkers
create policy "Users can view own biomarkers" on biomarkers
  for select using (auth.uid() = user_id);

create policy "Users can insert own biomarkers" on biomarkers
  for insert with check (auth.uid() = user_id);

-- Medications: users can CRUD their own medications
create policy "Users can view own medications" on medications
  for select using (auth.uid() = user_id);

create policy "Users can insert own medications" on medications
  for insert with check (auth.uid() = user_id);

create policy "Users can update own medications" on medications
  for update using (auth.uid() = user_id);

create policy "Users can delete own medications" on medications
  for delete using (auth.uid() = user_id);

-- Waitlist: anyone can insert (public), service role can read
create policy "Anyone can join waitlist" on waitlist
  for insert with check (true);

-- ================================================
-- Auto-create profile on user signup
-- ================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, first_name)
  values (new.id, new.raw_user_meta_data ->> 'first_name');
  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ================================================
-- Storage: lab-uploads bucket + RLS policies
-- Create the bucket in Dashboard: Storage > New bucket > name "lab-uploads", private
-- Then run the policies below so uploads work (they use path: user_id/filename)
-- ================================================

-- Allow authenticated users to upload to their own folder (path must start with their user id)
create policy "Users can upload own lab files"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'lab-uploads'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- Allow users to read their own files
create policy "Users can read own lab files"
  on storage.objects for select
  to authenticated
  using (
    bucket_id = 'lab-uploads'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- Allow users to update/delete their own files
create policy "Users can update own lab files"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'lab-uploads'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Users can delete own lab files"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'lab-uploads'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

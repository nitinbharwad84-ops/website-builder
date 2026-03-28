-- Create the projects table
create table public.projects (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  name text not null,
  slug text not null,
  is_published boolean default false,
  content jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Ensure slug is unique so dynamic routes work flawlessly
alter table public.projects add constraint projects_slug_key unique (slug);

-- Set up Row Level Security (RLS)
alter table public.projects enable row level security;

-- Create policies

-- Policy 1: Users can read their own projects, or any project if it is published
create policy "Users can view their own projects or published projects."
on public.projects for select
using ( auth.uid() = user_id or is_published = true );

-- Policy 2: Users can insert their own projects
create policy "Users can insert their own projects."
on public.projects for insert
with check ( auth.uid() = user_id );

-- Policy 3: Users can update their own projects
create policy "Users can update their own projects."
on public.projects for update
using ( auth.uid() = user_id );

-- Policy 4: Users can delete their own projects
create policy "Users can delete their own projects."
on public.projects for delete
using ( auth.uid() = user_id );

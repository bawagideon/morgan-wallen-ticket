-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Tours Table
create table tours (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Shows Table
create type show_status as enum ('available', 'sold_out', 'low_qty');

create table shows (
  id uuid default uuid_generate_v4() primary key,
  tour_id uuid references tours(id) not null,
  venue text not null,
  city text not null,
  state text not null,
  date timestamp with time zone not null,
  ticket_link text,
  status show_status default 'available',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Meet & Greets Table (The "Vetted" Table)
create type meet_greet_status as enum ('pending_payment', 'paid');

create table meet_and_greets (
  id uuid default uuid_generate_v4() primary key,
  show_id uuid references shows(id) not null,
  status meet_greet_status default 'pending_payment',
  full_name text not null,
  email text not null,
  phone text not null,
  dob date not null,
  instagram_handle text,
  stripe_session_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- SEED DATA
-- Insert Tour
insert into tours (id, name, active)
values ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'One Night At A Time 2026', true);

-- Insert Shows
insert into shows (tour_id, venue, city, state, date, status)
values
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Lucas Oil Stadium', 'Indianapolis', 'IN', '2026-04-14 19:00:00+00', 'sold_out'),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Vaught-Hemingway Stadium', 'Oxford', 'MS', '2026-04-20 19:00:00+00', 'available'),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Nissan Stadium', 'Nashville', 'TN', '2026-05-02 19:00:00+00', 'available'),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Nissan Stadium', 'Nashville', 'TN', '2026-05-03 19:00:00+00', 'low_qty'),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'MetLife Stadium', 'East Rutherford', 'NJ', '2026-05-18 19:00:00+00', 'available');

-- 4. Mailing List Table
create table mailing_list_subscribers (
  id uuid default uuid_generate_v4() primary key,
  first_name text not null,
  last_name text not null,
  email text not null unique,
  zip_code text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);


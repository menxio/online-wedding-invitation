create extension if not exists pgcrypto;

create type public.attendance_status as enum ('attending', 'declining');

create table public.rsvp_responses (
  id uuid primary key default gen_random_uuid(),
  guest_name text not null check (
    guest_name = btrim(guest_name)
    and char_length(guest_name) between 2 and 160
  ),
  attendance public.attendance_status not null,
  submitted_at timestamptz not null default clock_timestamp()
);

-- Names are intentionally not unique. Two invited people can legitimately share a name.
create index rsvp_responses_guest_name_ci_idx on public.rsvp_responses (lower(guest_name));
create index rsvp_responses_attendance_idx on public.rsvp_responses (attendance);
create index rsvp_responses_submitted_at_idx on public.rsvp_responses (submitted_at desc);

create table public.rsvp_rate_limits (
  key_digest text not null check (key_digest ~ '^[0-9a-f]{64}$'),
  action text not null check (char_length(action) between 1 and 40),
  window_started_at timestamptz not null,
  attempts integer not null default 1 check (attempts > 0),
  primary key (key_digest, action, window_started_at)
);

create or replace function public.assert_rsvp_open(p_now timestamptz)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if p_now > '2026-10-05 23:59:59.999999+08'::timestamptz then
    raise exception using errcode = 'P0001', message = 'RSVP_DEADLINE_PASSED';
  end if;
end;
$$;

create or replace function public.submit_rsvp(
  p_guest_name text,
  p_attendance public.attendance_status
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_guest_name text;
  v_response_id uuid;
begin
  perform public.assert_rsvp_open(clock_timestamp());

  v_guest_name := regexp_replace(btrim(p_guest_name), '[[:space:]]+', ' ', 'g');
  if char_length(v_guest_name) not between 2 and 160 then
    raise exception using errcode = '22023', message = 'INVALID_RSVP';
  end if;

  insert into public.rsvp_responses (guest_name, attendance)
  values (v_guest_name, p_attendance)
  returning id into v_response_id;

  return v_response_id;
end;
$$;

create or replace function public.consume_rsvp_rate_limit(
  p_key_digest text,
  p_action text,
  p_window_seconds integer,
  p_max_attempts integer
)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_window timestamptz;
  v_attempts integer;
begin
  if p_key_digest !~ '^[0-9a-f]{64}$'
     or p_action !~ '^[a-z_]{1,40}$'
     or p_window_seconds not between 10 and 86400
     or p_max_attempts not between 1 and 1000 then
    return false;
  end if;

  v_window := to_timestamp(
    floor(extract(epoch from clock_timestamp()) / p_window_seconds) * p_window_seconds
  );

  insert into public.rsvp_rate_limits (key_digest, action, window_started_at, attempts)
  values (p_key_digest, p_action, v_window, 1)
  on conflict (key_digest, action, window_started_at)
  do update set attempts = public.rsvp_rate_limits.attempts + 1
  returning attempts into v_attempts;

  return v_attempts <= p_max_attempts;
end;
$$;

create or replace function public.is_rsvp_admin()
returns boolean
language sql
stable
security invoker
set search_path = ''
as $$
  select coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'rsvp_admin', false)
$$;

alter table public.rsvp_responses enable row level security;
alter table public.rsvp_rate_limits enable row level security;

revoke all on public.rsvp_responses, public.rsvp_rate_limits from anon, authenticated;
grant select on public.rsvp_responses to authenticated;

create policy responses_admin_select on public.rsvp_responses
for select to authenticated
using ((select public.is_rsvp_admin()));

revoke execute on function public.assert_rsvp_open(timestamptz) from public, anon, authenticated;
revoke execute on function public.submit_rsvp(text, public.attendance_status) from public, anon, authenticated;
revoke execute on function public.consume_rsvp_rate_limit(text, text, integer, integer) from public, anon, authenticated;
revoke execute on function public.is_rsvp_admin() from public, anon;

grant execute on function public.submit_rsvp(text, public.attendance_status) to service_role;
grant execute on function public.consume_rsvp_rate_limit(text, text, integer, integer) to service_role;
grant execute on function public.is_rsvp_admin() to authenticated;

comment on table public.rsvp_responses is
  'Shared-link wedding RSVP responses. Each row represents exactly one seat; names are not verified against a guest list and are not unique.';
comment on table public.rsvp_rate_limits is
  'Server-side abuse counters keyed by an HMAC digest. Raw request addresses are not stored.';

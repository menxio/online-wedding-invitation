create type public.rsvp_role as enum (
  'guest',
  'principal_sponsor',
  'secondary_sponsor',
  'entourage'
);

alter table public.rsvp_responses
add column guest_role public.rsvp_role not null default 'guest';

create index rsvp_responses_guest_role_idx
on public.rsvp_responses (guest_role);

-- Keep the existing two-argument mutation available during deployment so the
-- live application remains compatible until the new build is promoted.
create or replace function public.submit_rsvp(
  p_guest_name text,
  p_attendance public.attendance_status,
  p_guest_role public.rsvp_role
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
  v_guest_name := regexp_replace(btrim(p_guest_name), '[[:space:]]+', ' ', 'g');
  if char_length(v_guest_name) not between 2 and 160 then
    raise exception using errcode = '22023', message = 'INVALID_RSVP';
  end if;

  insert into public.rsvp_responses (guest_name, attendance, guest_role)
  values (v_guest_name, p_attendance, p_guest_role)
  returning id into v_response_id;

  return v_response_id;
end;
$$;

revoke execute on function public.submit_rsvp(
  text,
  public.attendance_status,
  public.rsvp_role
) from public, anon, authenticated;

grant execute on function public.submit_rsvp(
  text,
  public.attendance_status,
  public.rsvp_role
) to service_role;

comment on column public.rsvp_responses.guest_role is
  'Guest-selected wedding role used for RSVP coordination.';

comment on function public.submit_rsvp(
  text,
  public.attendance_status,
  public.rsvp_role
) is 'Creates a one-seat RSVP response with a guest-selected wedding role.';

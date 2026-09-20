-- October 5 remains the requested reply-by date in the invitation copy, but it
-- is intentionally advisory. Guests may still submit a response afterward.
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

drop function if exists public.assert_rsvp_open(timestamptz);

revoke execute on function public.submit_rsvp(text, public.attendance_status)
from public, anon, authenticated;
grant execute on function public.submit_rsvp(text, public.attendance_status)
to service_role;

comment on function public.submit_rsvp(text, public.attendance_status) is
  'Creates a one-seat RSVP response. The displayed reply-by date is advisory and does not close submissions.';

begin;
select plan(17);

select tests.rls_enabled('public', 'rsvp_responses');
select tests.rls_enabled('public', 'rsvp_rate_limits');

insert into public.rsvp_responses (guest_name, attendance)
values ('Codex RSVP Admin Visibility Test', 'attending');

set local role anon;
select throws_ok('select * from public.rsvp_responses', '42501', null, 'anon cannot enumerate responses');
select throws_ok(
  $$insert into public.rsvp_responses (guest_name, attendance) values ('Public Guest', 'attending')$$,
  '42501', null, 'anon cannot insert responses directly'
);
select throws_ok(
  $$update public.rsvp_responses set attendance = 'declining'$$,
  '42501', null, 'anon cannot update responses'
);
select throws_ok(
  $$delete from public.rsvp_responses$$,
  '42501', null, 'anon cannot delete responses'
);
select throws_ok(
  $$select public.submit_rsvp('Public Guest', 'attending')$$,
  '42501', null, 'anon cannot invoke the RSVP mutation'
);

set local role authenticated;
select set_config('request.jwt.claims', '{"app_metadata":{"role":"ordinary_user"}}', true);
select is_empty('select * from public.rsvp_responses', 'non-admin authenticated users see no responses');
select throws_ok(
  $$select public.submit_rsvp('Authenticated Guest', 'attending')$$,
  '42501', null, 'authenticated users cannot invoke the privileged RSVP mutation'
);
select set_config('request.jwt.claims', '{"app_metadata":{"role":"rsvp_admin"}}', true);
select results_eq(
  $$select guest_name from public.rsvp_responses order by guest_name$$,
  array['Codex RSVP Admin Visibility Test']::text[],
  'authenticated RSVP admins can read responses through RLS'
);

reset role;
select is_empty(
  $$select 1 from pg_proc where proname = 'assert_rsvp_open'$$,
  'the obsolete hard-deadline function has been removed'
);
select is_empty(
  $$select 1 from pg_proc where proname = 'submit_rsvp' and prosrc like '%assert_rsvp_open%'$$,
  'the RSVP mutation does not enforce the requested reply-by date'
);
select isnt_empty(
  $$select 1 from pg_proc where proname = 'submit_rsvp' and prosecdef$$,
  'the restricted mutation is security definer'
);

select ok(
  public.consume_rsvp_rate_limit(repeat('a', 64), 'rsvp_test', 600, 1),
  'the first request in a rate-limit window is allowed'
);
select ok(
  not public.consume_rsvp_rate_limit(repeat('a', 64), 'rsvp_test', 600, 1),
  'a request beyond the configured limit is rejected'
);

insert into public.rsvp_responses (guest_name, attendance)
values ('Codex Duplicate Name Test', 'attending'), ('Codex Duplicate Name Test', 'declining');
select is(
  (select count(*) from public.rsvp_responses where guest_name = 'Codex Duplicate Name Test'),
  2::bigint,
  'duplicate names are allowed because names are not identities'
);

select * from finish();
rollback;

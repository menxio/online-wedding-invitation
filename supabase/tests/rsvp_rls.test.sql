begin;
select plan(11);

select tests.rls_enabled('public', 'rsvp_responses');
select tests.rls_enabled('public', 'rsvp_rate_limits');

set local role anon;
select throws_ok('select * from public.rsvp_responses', '42501', null, 'anon cannot enumerate responses');
select throws_ok(
  $$insert into public.rsvp_responses (guest_name, attendance) values ('Public Guest', 'attending')$$,
  '42501', null, 'anon cannot insert responses directly'
);
select throws_ok(
  $$select public.submit_rsvp('Public Guest', 'attending')$$,
  '42501', null, 'anon cannot invoke the RSVP mutation'
);

set local role authenticated;
select is_empty('select * from public.rsvp_responses', 'non-admin authenticated users see no responses');
select throws_ok(
  $$select public.submit_rsvp('Authenticated Guest', 'attending')$$,
  '42501', null, 'authenticated users cannot invoke the privileged RSVP mutation'
);

reset role;
select lives_ok(
  $$select public.assert_rsvp_open('2026-10-05 23:59:59+08'::timestamptz)$$,
  'database deadline permits a response before the cutoff'
);
select throws_ok(
  $$select public.assert_rsvp_open('2026-10-06 00:00:00+08'::timestamptz)$$,
  'P0001', 'RSVP_DEADLINE_PASSED', 'database deadline rejects a late response'
);

select isnt_empty(
  $$select 1 from pg_proc where proname = 'submit_rsvp' and prosrc like '%clock_timestamp()%'$$,
  'the atomic RSVP mutation checks the database clock'
);
select isnt_empty(
  $$select 1 from pg_proc where proname = 'submit_rsvp' and prosecdef$$,
  'the restricted mutation is security definer'
);

select * from finish();
rollback;

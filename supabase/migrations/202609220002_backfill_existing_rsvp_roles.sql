-- Backfill only existing responses that unambiguously match the configured
-- wedding list. Unmatched or ambiguous names intentionally remain guests.
update public.rsvp_responses
set guest_role = 'secondary_sponsor'
where guest_role = 'guest'
  and lower(guest_name) in (
    'princess arianne joannah rubiato',
    'princess arianne joannah p. rubiato',
    'christian rubiato',
    'christian r. rubiato',
    'ivy melsie rubiato',
    'ivy melsie c. rubiato',
    'rey a dionaldo',
    'rey a. dionaldo',
    'iris ellen r dionaldo',
    'iris ellen r. dionaldo'
  );

update public.rsvp_responses
set guest_role = 'entourage'
where guest_role = 'guest'
  and lower(guest_name) in (
    'chris nathaniel jhames rubiato',
    'chris nathaniel jhames p. rubiato',
    'chris ethan jhames rubiato',
    'chris ethan jhames p. rubiato',
    'earl rubiato',
    'earl john r. rubiato',
    'hazel rubiato',
    'hazel r. rubiato',
    'rey ivan r. dionaldo',
    'johnpaul rey r. dionaldo'
  );

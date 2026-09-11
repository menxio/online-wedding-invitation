# RSVP security

RSVP infrastructure has not been implemented yet.

The approved design is private household invitation access using opaque credentials. Guest data must be accessed through controlled server-side operations. Each household may see only its own invitation and eligible invitees; guest enumeration and cross-household access are prohibited.

Approved business rules:

- RSVP deadline: October 5, 2026, pending confirmation that it remains consistent with the final wedding date.
- No arbitrary plus-ones.
- Children are not invited unless they are explicitly named as members of the wedding entourage.
- Household and invitee records, not frontend fields alone, must enforce eligibility.

Still awaiting couple approval: RSVP wording, confirmation wording, response editing, meal options, dietary questions, and invitation-code wording.

Supabase migrations and RLS tests will be added during the RSVP backend checkpoint after business rules are reviewed.

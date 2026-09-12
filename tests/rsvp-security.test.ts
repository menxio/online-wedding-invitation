import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const migrationPath = "supabase/migrations/202609120001_shared_link_rsvp.sql";

describe("RSVP privacy and infrastructure guardrails", () => {
  it("keeps the service-role credential out of every Client Component", () => {
    const clientFiles = [
      "src/components/rsvp/rsvp-form.tsx",
      "src/components/admin/admin-login-form.tsx",
      "src/components/admin/admin-response-table.tsx",
    ];
    for (const file of clientFiles) {
      expect(readFileSync(resolve(file), "utf8")).not.toContain("SUPABASE_SERVICE_ROLE_KEY");
    }
  });

  it("enables RLS and removes anonymous table access", () => {
    const migration = readFileSync(resolve(migrationPath), "utf8");
    expect(migration).toContain("alter table public.rsvp_responses enable row level security");
    expect(migration).toContain("alter table public.rsvp_rate_limits enable row level security");
    expect(migration).toContain("revoke all on public.rsvp_responses, public.rsvp_rate_limits from anon, authenticated");
    expect(migration).toContain("using ((select public.is_rsvp_admin()))");
  });

  it("restricts mutations to the service role and enforces a database-clock deadline", () => {
    const migration = readFileSync(resolve(migrationPath), "utf8");
    expect(migration).toContain("grant execute on function public.submit_rsvp");
    expect(migration).toContain("to service_role");
    expect(migration).toContain("perform public.assert_rsvp_open(clock_timestamp())");
    expect(migration).toContain("2026-10-05 23:59:59.999999+08");
  });

  it("stores rate-limit keys as digests and configures short and daily limits", () => {
    const migration = readFileSync(resolve(migrationPath), "utf8");
    const route = readFileSync(resolve("src/app/api/rsvp/submit/route.ts"), "utf8");
    expect(migration).toContain("key_digest text not null");
    expect(route).toContain('"rsvp_submit_short", 5, 600');
    expect(route).toContain('"rsvp_submit_daily", 20, 86_400');
  });

  it("has one shared public RSVP route and no credential routes", () => {
    const page = readFileSync(resolve("src/app/rsvp/page.tsx"), "utf8");
    expect(page).toContain("<RsvpForm");
    expect(page).not.toMatch(/token|invitation code|household/i);
  });
});

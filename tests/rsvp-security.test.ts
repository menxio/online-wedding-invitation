import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const migrationPath = "supabase/migrations/202609120001_shared_link_rsvp.sql";
const advisoryDateMigrationPath = "supabase/migrations/202609200001_allow_late_rsvp.sql";
const guestRoleMigrationPath = "supabase/migrations/202609220001_add_rsvp_guest_role.sql";

describe("RSVP privacy and infrastructure guardrails", () => {
  it("keeps the elevated Supabase credential out of every Client Component", () => {
    const clientFiles = [
      "src/components/rsvp/rsvp-form.tsx",
      "src/components/admin/admin-login-form.tsx",
      "src/components/admin/admin-response-table.tsx",
    ];
    for (const file of clientFiles) {
      expect(readFileSync(resolve(file), "utf8")).not.toContain("SUPABASE_SECRET_KEY");
    }
  });

  it("enables RLS and removes anonymous table access", () => {
    const migration = readFileSync(resolve(migrationPath), "utf8");
    expect(migration).toContain("alter table public.rsvp_responses enable row level security");
    expect(migration).toContain("alter table public.rsvp_rate_limits enable row level security");
    expect(migration).toContain("revoke all on public.rsvp_responses, public.rsvp_rate_limits from anon, authenticated");
    expect(migration).toContain("using ((select public.is_rsvp_admin()))");
  });

  it("restricts mutations to the service role and keeps the reply-by date advisory", () => {
    const migration = readFileSync(resolve(migrationPath), "utf8");
    const advisoryDateMigration = readFileSync(resolve(advisoryDateMigrationPath), "utf8");
    expect(migration).toContain("grant execute on function public.submit_rsvp");
    expect(migration).toContain("to service_role");
    expect(advisoryDateMigration).toContain("drop function if exists public.assert_rsvp_open");
    expect(advisoryDateMigration).not.toContain("perform public.assert_rsvp_open");
    expect(advisoryDateMigration).toContain("The displayed reply-by date is advisory");
  });

  it("stores the selected wedding role through a service-only mutation", () => {
    const roleMigration = readFileSync(resolve(guestRoleMigrationPath), "utf8");
    expect(roleMigration).toContain("guest_role public.rsvp_role not null default 'guest'");
    expect(roleMigration).toContain("p_guest_role public.rsvp_role");
    expect(roleMigration).toContain("to service_role");
    expect(roleMigration).toContain("from public, anon, authenticated");
  });

  it("stores rate-limit keys as digests and configures shared-network-safe layered limits", () => {
    const migration = readFileSync(resolve(migrationPath), "utf8");
    const route = readFileSync(resolve("src/app/api/rsvp/submit/route.ts"), "utf8");
    expect(migration).toContain("key_digest text not null");
    expect(route).toContain("RSVP_RATE_LIMITS.map");
    const constants = readFileSync(resolve("src/lib/rsvp/constants.ts"), "utf8");
    expect(constants).toContain('{ action: "rsvp_submit_minute", maxAttempts: 10, windowSeconds: 60 }');
    expect(constants).toContain('{ action: "rsvp_submit_ten_minutes", maxAttempts: 30, windowSeconds: 600 }');
    expect(constants).toContain('{ action: "rsvp_submit_daily", maxAttempts: 100, windowSeconds: 86_400 }');
  });

  it("requires server-side Turnstile verification before rate limiting and persistence", () => {
    const route = readFileSync(resolve("src/app/api/rsvp/submit/route.ts"), "utf8");
    const verificationCall = "verifyTurnstileToken(parsed.data.turnstileToken";
    const limiterCall = "consumeRateLimit(limiterKey";
    expect(route).toContain(verificationCall);
    expect(route.indexOf(verificationCall)).toBeLessThan(route.indexOf(limiterCall));
    expect(readFileSync(resolve("src/lib/turnstile/verify.ts"), "utf8")).toContain("/siteverify");
  });

  it("has one shared public RSVP route and no credential routes", () => {
    const page = readFileSync(resolve("src/app/rsvp/page.tsx"), "utf8");
    expect(page).toContain("<RsvpForm");
    expect(page).not.toMatch(/token|invitation code|household/i);
  });
});

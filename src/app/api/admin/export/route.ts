import { requireRsvpAdmin } from "@/lib/rsvp/admin";
import { toAdminCsv } from "@/lib/rsvp/csv";
import { getAdminResponses } from "@/lib/rsvp/data";
import { PRIVATE_RESPONSE_HEADERS } from "@/lib/rsvp/request";

export const dynamic = "force-dynamic";

export async function GET() {
  await requireRsvpAdmin();
  const csv = toAdminCsv(await getAdminResponses());
  return new Response(`\uFEFF${csv}`, { headers: { ...PRIVATE_RESPONSE_HEADERS, "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": 'attachment; filename="michael-marris-rsvp.csv"' } });
}

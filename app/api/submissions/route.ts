import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabaseClient";
import { validateLead } from "@/lib/validation";

export const runtime = "edge";

const rateLimit = new Map<string, { count: number; resetAt: number }>();

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : {};
}

function clientIp(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
}

function checkRateLimit(ip: string) {
  const now = Date.now();
  const current = rateLimit.get(ip);
  if (!current || current.resetAt < now) {
    rateLimit.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }
  if (current.count >= 5) return false;
  current.count += 1;
  return true;
}

export async function POST(request: NextRequest) {
  const ip = clientIp(request);
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "Too many submissions. Please wait a minute." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = asRecord(await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const lead = asRecord(body.lead);
  const brief = asRecord(body.brief);
  const state = asRecord(body.state);
  const quickStart = asRecord(state.quickStart);
  const validation = validateLead(lead);
  if (!validation.valid) {
    return NextResponse.json({ error: Object.values(validation.errors)[0], errors: validation.errors }, { status: 400 });
  }

  const supabase = createServerSupabaseClient();
  if (!supabase) {
    return NextResponse.json({
      ok: true,
      stored: false,
      message: "Export unlocked. Supabase is not configured, so this submission was not stored."
    });
  }

  const submissionPayload = {
    email: String(lead.email).trim().toLowerCase(),
    role: lead.role || null,
    company_size: lead.companySize || null,
    main_use_case: lead.mainUseCase || null,
    contact_consent: Boolean(lead.contactConsent),
    consent: Boolean(lead.consent),
    agent_name: typeof brief.title === "string" ? brief.title : typeof quickStart.agentName === "string" ? quickStart.agentName : null,
    recommendation: typeof brief.recommendation === "string" ? brief.recommendation : null,
    brief,
    inputs: state,
    user_agent: request.headers.get("user-agent") || null
  };

  const { error } = await supabase.from("submissions").insert(submissionPayload);
  if (error) {
    return NextResponse.json({ error: "Could not save submission." }, { status: 500 });
  }

  await supabase.from("events").insert({
    event_name: "export_gate_submitted",
    agent_name: submissionPayload.agent_name,
    metadata: { recommendation: submissionPayload.recommendation }
  });

  return NextResponse.json({ ok: true, stored: true });
}

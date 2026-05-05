import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabaseClient";

export const runtime = "edge";

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : {};
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = asRecord(await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const eventName = typeof body?.eventName === "string" ? body.eventName.slice(0, 120) : "";
  if (!eventName) {
    return NextResponse.json({ error: "eventName is required." }, { status: 400 });
  }

  const supabase = createServerSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ ok: true, stored: false });
  }

  const { error } = await supabase.from("events").insert({
    event_name: eventName,
    agent_name: typeof body?.agentName === "string" ? body.agentName.slice(0, 180) : null,
    metadata: asRecord(body.metadata)
  });

  if (error) {
    return NextResponse.json({ error: "Could not save event." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, stored: true });
}

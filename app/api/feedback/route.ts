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

  const comment = typeof body?.comment === "string" ? body.comment.trim().slice(0, 2000) : "";
  if (!comment) {
    return NextResponse.json({ error: "Feedback comment is required." }, { status: 400 });
  }

  const rating = Number(body?.rating || 0);
  const supabase = createServerSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ ok: true, stored: false });
  }

  const { error } = await supabase.from("feedback").insert({
    email: typeof body?.email === "string" ? body.email.toLowerCase().slice(0, 320) : null,
    agent_name: typeof body?.agentName === "string" ? body.agentName.slice(0, 180) : null,
    rating: Number.isFinite(rating) ? Math.max(1, Math.min(5, rating)) : null,
    comment
  });

  if (error) {
    return NextResponse.json({ error: "Could not save feedback." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, stored: true });
}

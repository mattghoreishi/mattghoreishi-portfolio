"use client";

import { useMemo, useState } from "react";
import { ShieldCheck } from "lucide-react";
import type { AgentProductBrief, ExportLead, MapperState } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DownloadButtons } from "@/components/DownloadButtons";

export function ExportGate({
  state,
  brief
}: {
  state: MapperState;
  brief: AgentProductBrief;
}) {
  const startedAt = useMemo(() => Date.now(), []);
  const [lead, setLead] = useState<ExportLead>({
    email: "",
    role: "",
    companySize: "",
    mainUseCase: "",
    consent: false,
    contactConsent: false,
    website: "",
    startedAt
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "ready" | "error">("idle");
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState("");

  async function submit() {
    setStatus("submitting");
    setMessage("");
    const response = await fetch("/api/submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lead, brief, state })
    });
    const data = await response.json();
    if (!response.ok) {
      setStatus("error");
      setMessage(data.error || "Something went wrong. Please try again.");
      return;
    }
    setStatus("ready");
    setMessage("Export unlocked. Your brief is ready to download.");
  }

  async function sendFeedback(kind: string) {
    await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventName: `download_${kind}`, agentName: brief.title })
    });
  }

  async function submitFeedback() {
    if (!feedback.trim()) return;
    await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: lead.email, rating: 4, comment: feedback, agentName: brief.title })
    });
    setFeedback("");
    setMessage("Thanks. Feedback received.");
  }

  return (
    <Card className="no-print border-primary/25 bg-primary/5 shadow-editorial">
      <CardHeader>
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-primary" />
          <CardTitle>Export your Agent Product Brief</CardTitle>
        </div>
        <CardDescription>
          You already have the brief preview. We ask for email only when you download so we can improve the tool.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {status !== "ready" ? (
          <div className="grid gap-4 md:grid-cols-2">
            <input
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              value={lead.website}
              onChange={(event) => setLead({ ...lead, website: event.target.value })}
              aria-hidden="true"
            />
            <div className="space-y-2">
              <Label>Email address *</Label>
              <Input
                type="email"
                value={lead.email}
                onChange={(event) => setLead({ ...lead, email: event.target.value })}
                placeholder="you@company.com"
              />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Select value={lead.role} onChange={(event) => setLead({ ...lead, role: event.target.value })}>
                <option value="">Select role</option>
                <option>Senior PM</option>
                <option>AI PM</option>
                <option>Founder</option>
                <option>Product leader</option>
                <option>Enterprise AI team</option>
                <option>Hiring manager</option>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Company size</Label>
              <Select
                value={lead.companySize}
                onChange={(event) => setLead({ ...lead, companySize: event.target.value })}
              >
                <option value="">Select size</option>
                <option>1 to 10</option>
                <option>11 to 50</option>
                <option>51 to 250</option>
                <option>251 to 1000</option>
                <option>1000+</option>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Main use case</Label>
              <Input
                value={lead.mainUseCase}
                onChange={(event) => setLead({ ...lead, mainUseCase: event.target.value })}
                placeholder="Support automation, internal ops, sales workflow"
              />
            </div>
            <label className="flex gap-3 rounded-md border border-border bg-card p-3 text-sm md:col-span-2">
              <input
                type="checkbox"
                checked={lead.consent}
                onChange={(event) => setLead({ ...lead, consent: event.target.checked })}
              />
              <span>
                I consent to storing this submission to improve the tool. Please do not enter confidential, regulated, or
                customer-identifying data.
              </span>
            </label>
            <label className="flex gap-3 rounded-md border border-border bg-card p-3 text-sm md:col-span-2">
              <input
                type="checkbox"
                checked={lead.contactConsent}
                onChange={(event) => setLead({ ...lead, contactConsent: event.target.checked })}
              />
              <span>Contact me about related AI product resources.</span>
            </label>
            <div className="flex flex-wrap items-center gap-3 md:col-span-2">
              <Button type="button" onClick={submit} disabled={status === "submitting"}>
                {status === "submitting" ? "Submitting..." : "Unlock downloads"}
              </Button>
              {message && <p className="text-sm text-muted-foreground">{message}</p>}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm font-semibold text-primary">{message}</p>
            <DownloadButtons brief={brief} state={state} onDownload={sendFeedback} />
            <div className="space-y-2">
              <Label>Quick feedback after download</Label>
              <Textarea
                value={feedback}
                onChange={(event) => setFeedback(event.target.value)}
                placeholder="What would make this more useful for your team?"
              />
              <Button type="button" variant="outline" onClick={submitFeedback}>
                Send feedback
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

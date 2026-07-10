"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, FileSearch, Mail, MessageSquareText, MousePointer2, Pause, Play } from "lucide-react";
import { profile } from "@/data/site";
import { analyticsEvents, trackEvent } from "@/lib/analytics";

type Era = "2020" | "today";
type Mode = "observe" | "recommend" | "act";

const syntheticCalls = [
  {
    id: "QA-204",
    reason: "Clear QA concern",
    duration: "05:42",
    date: "May 12, 2021",
    agent: "Agent 42",
    customer: "Synthetic customer A",
    score: "82",
    status: "Needs review",
    summary: "Billing explanation with visible customer frustration.",
    transcript: [
      ["Customer", "I called last week and still do not understand why this charge changed."],
      ["Agent", "I can compare the current invoice with the previous one."],
      ["Customer", "I need someone to explain it clearly, not read the same answer again."],
      ["Agent", "You are right. The difference is connected to the plan change from May 12. I will summarize it and send the billing issue for review."]
    ],
    signals: ["Customer frustration detected", "Billing explanation present", "Follow-up action mentioned"]
  },
  {
    id: "QA-219",
    reason: "Routine call",
    duration: "03:16",
    date: "May 13, 2021",
    agent: "Agent 18",
    customer: "Synthetic customer B",
    score: "94",
    status: "Ready to confirm",
    summary: "Address update completed with clear confirmation.",
    transcript: [
      ["Customer", "I need to update the address on my account before the next delivery."],
      ["Agent", "I can help with that. I will read the new address back before saving it."],
      ["Customer", "That is correct."],
      ["Agent", "The address is updated. Your next delivery will use the new location."]
    ],
    signals: ["Customer intent identified", "Confirmation step completed", "No follow-up needed"]
  },
  {
    id: "QA-233",
    reason: "Mixed signals",
    duration: "07:08",
    date: "May 14, 2021",
    agent: "Agent 07",
    customer: "Synthetic customer C",
    score: "Review needed",
    status: "Manual review needed",
    summary: "Customer frustration is present, but the policy explanation and next action may be appropriate.",
    transcript: [
      ["Customer", "I do not know if this is a billing issue or a service issue anymore."],
      ["Agent", "I see notes from two previous calls. The policy is that a service ticket has to be reviewed before a billing adjustment can be approved."],
      ["Customer", "I am frustrated because I just want someone to own it."],
      ["Agent", "I will create the service follow-up, attach the billing note, and mark the case for review so the next owner has both records."]
    ],
    signals: [
      "Customer frustration present",
      "Policy explanation appears acceptable",
      "Appropriate next action present",
      "Signals point in different directions",
      "Reviewer determines whether this was a QA failure or a difficult customer interaction handled appropriately"
    ]
  }
] as const;

type CallId = (typeof syntheticCalls)[number]["id"];

const eraSteps: Record<Era, string[]> = {
  "2020": ["Audio", "ASR", "Text and language processing", "Quality or topic signals", "Prioritized review queue", "Human QA review"],
  today: [
    "Audio + transcript + permitted workflow context",
    "Structured evidence extraction",
    "Quality / intent / uncertainty evaluation",
    "Dynamic routing",
    "AI-assisted investigation or recommendation",
    "Bounded action or human review"
  ]
};

const modeContent = {
  observe: {
    title: "Observe",
    body: "Useful AI does not need autonomy.",
    actions: ["Transcribe", "Extract topics", "Identify quality signals", "Organize evidence"]
  },
  recommend: {
    title: "Recommend",
    body: "Recommendation changes how a person starts the work.",
    actions: ["Prioritize review", "Suggest a rationale", "Draft a follow-up", "Recommend next action"]
  },
  act: {
    title: "Act",
    body: "Once the system changes work, consequence and reversibility matter.",
    actions: ["Create a review task", "Route a case", "Update a permitted workflow record", "Notify the appropriate owner"]
  }
} satisfies Record<Mode, { title: string; body: string; actions: string[] }>;

const rolePhases = [
  ["Discover & focus", "Customer discovery, market benchmarking, and initial product focus.", "xl:col-span-2"],
  ["Define & design", "MVP, success signals, reviewer workflow, and high-fidelity prototype.", "xl:col-span-2"],
  ["Align & build", "Roadmaps across contact-center, voice, NLP, and engineering.", "xl:col-span-2"],
  ["Test & iterate", "Customer MVP testing and feedback-led product releases.", "xl:col-span-3"],
  ["Commercialize", "Pricing and commercial work with sales and customer-facing teams.", "xl:col-span-3"]
] as const;

const priorityLanes = [
  { label: "High priority", value: 9, tone: "rose" },
  { label: "Mixed signals", value: 8, tone: "violet" },
  { label: "Review suggested", value: 21, tone: "cyan" },
  { label: "Lower priority", value: 62, tone: "slate" }
] as const;

export function ContactCenterAICase() {
  const [processed, setProcessed] = useState(false);
  const [callId, setCallId] = useState<CallId>("QA-204");
  const [era, setEra] = useState<Era>("2020");
  const [mode, setMode] = useState<Mode>("observe");
  const selectedCall = useMemo(() => syntheticCalls.find((call) => call.id === callId) ?? syntheticCalls[0], [callId]);

  function processCalls() {
    setProcessed(true);
    trackEvent(analyticsEvents.ccaiRunTriage, {
      synthetic_result: true,
      calls_processed: 100,
      calls_surfaced: 38
    });
    trackEvent(analyticsEvents.playDemo, {
      demo_name: "ccai_100_call_problem",
      action: "process_all_100"
    });
  }

  function chooseCall(nextCallId: CallId) {
    const previous = callId;
    setCallId(nextCallId);
    trackEvent(analyticsEvents.switchDemoTab, {
      demo: "ccai_workflow",
      tab: nextCallId,
      previous_tab: previous
    });
  }

  return (
    <>
      <Hero />
      <SectionRail />
      <RoleSection />
      <ProblemSection processed={processed} onProcess={processCalls} />
      <ProductDecision />
      <Workflow selectedCall={selectedCall} callId={callId} onChooseCall={chooseCall} />
      <HistoricalArtifact />
      <Decisions />
      <Evidence />
      <Today era={era} onSetEra={setEra} />
      <Autonomy mode={mode} onSetMode={setMode} />
      <ChangeToday />
      <LookingBack />
      <RelatedThinking />
      <FinalCta />
    </>
  );
}

function Hero() {
  return (
    <section className="relative scroll-mt-28 overflow-hidden px-5 py-14 md:px-8 md:py-20">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.055)_1px,transparent_1px)] bg-[size:36px_36px]" />
      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.76fr] lg:items-center">
        <div>
          <Label>Contact Center AI · 2020 → today</Label>
          <h1 className="mt-5 max-w-5xl text-4xl font-semibold tracking-normal text-white md:text-6xl">
            In 2020, we were trying to make AI useful inside a contact center.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Sotoon already had ASR and NLP capabilities. The harder product question was what came next: how do you turn
            model output into a workflow a contact-center QA team will actually use?
          </p>
          <p className="mt-5 max-w-3xl leading-7 text-slate-400">
            I started working on this product problem in 2020. This is a modern interactive reconstruction of the product
            decisions behind that work, followed by how I would approach the same problem with today&apos;s AI capabilities.
          </p>
          <p className="mt-5 max-w-3xl text-sm leading-6 text-slate-500">
            Interactive reconstruction using synthetic data. No customer or confidential operational data is shown.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <TrackedLink href="#problem" name="explore_problem">Explore the problem</TrackedLink>
            <TrackedLink href="#today" name="see_today_change" variant="secondary">See what I would change today</TrackedLink>
            <TrackedLink href="/contact" name="discuss_this_work" variant="quiet">Discuss this work</TrackedLink>
          </div>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
          {[
            ["2020", "ASR + NLP", "Specialized capabilities were available."],
            ["Product work", "QA review", "The hard part was turning output into something a reviewer could use."],
            ["Today", "Models + actions", "The opportunity is larger, and so are the product consequences."]
          ].map(([year, title, body]) => (
            <div key={title} className="mb-4 grid grid-cols-[5rem_1fr] gap-4 rounded-md border border-white/10 bg-[#050914] p-4 last:mb-0">
              <p className={year === "Today" ? "font-semibold text-cyan-100" : "font-semibold text-amber-100"}>{year}</p>
              <div>
                <p className="font-semibold text-white">{title}</p>
                <p className="mt-1 text-sm leading-6 text-slate-400">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionRail() {
  return (
    <nav aria-label="Case study sections" className="border-y border-white/10 bg-[#050914]/88 px-5 py-3 backdrop-blur md:px-8">
      <div className="mx-auto flex max-w-7xl gap-3 overflow-x-auto text-sm">
        {[
          ["Problem", "#problem"],
          ["Product decision", "#product-decision"],
          ["Workflow", "#workflow"],
          ["Evidence", "#evidence"],
          ["Today", "#today"]
        ].map(([label, href]) => (
          <a key={href} href={href} className="shrink-0 rounded-full border border-white/10 px-3 py-2 text-slate-300 hover:border-cyan-300/35 hover:text-white">
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}

function RoleSection() {
  return (
    <section className="scroll-mt-28 px-5 py-14 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.35fr_0.65fr]">
        <div>
          <Label tone="warm">My Role</Label>
          <h2 className="mt-4 text-3xl font-semibold text-white">Product ownership, not model ownership.</h2>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.035] p-5 md:p-6">
          <div className="relative grid gap-4 md:grid-cols-2 xl:grid-cols-6">
            <div className="absolute left-5 top-8 hidden h-px w-[calc(100%-2.5rem)] bg-gradient-to-r from-amber-200/0 via-amber-200/25 to-cyan-200/0 xl:block" />
            {rolePhases.map(([title, body, span], index) => (
              <div key={title} className={`relative rounded-md border border-white/10 bg-[#050914] p-4 ${span}`}>
                <div className="flex items-center gap-3">
                  <p className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-amber-200/30 bg-amber-200/10 text-xs font-semibold text-amber-100">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-white">{title}</h3>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-400">{body}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 leading-7 text-slate-300">
            The voice and NLP teams owned the models. I owned the productization: turning those capabilities into a product,
            an operating workflow, a validation plan, and a path to customers.
          </p>
        </div>
      </div>
    </section>
  );
}

function ProblemSection({ processed, onProcess }: { processed: boolean; onProcess: () => void }) {
  return (
    <section id="problem" className="scroll-mt-28 border-y border-white/10 bg-[#07111f] px-5 py-16 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr]">
        <div>
          <Label tone="warm">The 2020 Problem</Label>
          <h2 className="mt-4 text-4xl font-semibold tracking-normal text-white md:text-5xl">
            A QA team could only review a fraction of its calls.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Quality monitoring was constrained by human attention. Reviewing a call took time, so the product problem was
            not simply “score calls with AI.”
          </p>
          <p className="mt-5 text-xl font-semibold leading-8 text-white">Which calls deserve a reviewer&apos;s attention?</p>
          <p className="mt-5 text-sm leading-6 text-slate-400">
            In the product research and planning behind this work, manual QA was commonly framed as reviewing roughly 5%
            to 20% of calls.
          </p>
        </div>
        <div className="rounded-lg border border-white/10 bg-[#050914] p-4 md:p-5">
          {!processed ? (
            <>
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-300">100 calls received</p>
                  <p className="mt-1 text-3xl font-semibold text-white">10 manually sampled</p>
                  <p className="text-sm text-slate-400">90 outside the manual review sample</p>
                </div>
                <span className="w-fit rounded-full border border-amber-300/25 bg-amber-300/10 px-3 py-1 text-xs font-semibold text-amber-100">
                  Limited manual sampling
                </span>
              </div>
              <UnsortedCalls />
              <div className="mt-6 grid gap-3 md:grid-cols-2">
                <Box title="Selection signals" body="Calls might be selected through a random sample, call duration, or an existing customer score." />
                <Box title="Product opportunity" body="Use ASR and NLP to surface more of the calls worth reviewing." />
              </div>
              <button
                type="button"
                onClick={onProcess}
                className="mt-5 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-[#050914]"
              >
                Process all 100 and prioritize review
                <MousePointer2 className="h-4 w-4" />
              </button>
            </>
          ) : (
            <div aria-live="polite">
              <Label>Illustrative synthetic result</Label>
              <div className="mt-4 grid gap-4 lg:grid-cols-[0.38fr_0.62fr]">
                <div className="rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-4">
                  <p className="text-sm font-semibold text-cyan-100">100 processed</p>
                  <p className="mt-2 text-3xl font-semibold text-white">38 moved into review lanes</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">in this synthetic example</p>
                </div>
                <PriorityLaneGrid />
              </div>
              <div className="mt-5 rounded-lg border border-white/10 bg-white/[0.035] p-4">
                <p className="text-lg font-semibold text-white">The system did not replace QA. It changed where reviewers started.</p>
                <p className="mt-2 leading-7 text-slate-400">
                  Instead of starting from a limited manual sample, the QA team could begin with a prioritized view across
                  a broader set of calls.
                </p>
                <p className="mt-2 leading-7 text-slate-400">
                  The goal was not to eliminate QA time. It was to use scarce review time on a broader, better-prioritized set of calls.
                </p>
              </div>
              <TrackedLink href="#workflow" name="open_prioritized_review_queue">
                Open the review queue
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function UnsortedCalls() {
  return (
    <div className="mt-5 grid grid-cols-10 gap-1.5" aria-label="100 synthetic calls, with 10 manually sampled">
      {Array.from({ length: 100 }, (_, index) => {
        const sampled = index % 10 === 0;
        const height = index % 7 === 0 ? "h-5" : index % 5 === 0 ? "h-4" : "h-3";
        return (
          <span
            key={index}
            className={`${height} rounded-sm border transition-colors motion-reduce:transition-none ${
              sampled ? "border-amber-200/70 bg-amber-300/70" : "border-slate-700/70 bg-slate-800/80"
            }`}
          />
        );
      })}
    </div>
  );
}

function PriorityLaneGrid() {
  return (
    <div className="grid gap-3 md:grid-cols-2" aria-label="Synthetic priority lanes after processing 100 calls">
      {priorityLanes.map((lane) => (
        <PriorityLane key={lane.label} {...lane} />
      ))}
    </div>
  );
}

function PriorityLane({ label, value, tone }: { label: string; value: number; tone: "rose" | "violet" | "cyan" | "slate" }) {
  const color =
    tone === "rose"
      ? "border-rose-300/30 bg-rose-300/10 text-rose-100"
      : tone === "violet"
        ? "border-violet-300/30 bg-violet-300/10 text-violet-100"
        : tone === "cyan"
          ? "border-cyan-300/30 bg-cyan-300/10 text-cyan-100"
          : "border-slate-400/25 bg-slate-400/10 text-slate-200";

  return (
    <div className={`rounded-lg border p-4 ${color}`}>
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.14em]">{label}</p>
        <p className="text-3xl font-semibold text-white">{value}</p>
      </div>
      <div className="mt-4 grid grid-cols-8 gap-1" aria-hidden="true">
        {Array.from({ length: Math.min(value, 24) }, (_, index) => (
          <span key={index} className="h-2 rounded-full bg-current opacity-70" />
        ))}
      </div>
    </div>
  );
}

function ProductDecision() {
  return (
    <section id="product-decision" className="scroll-mt-28 px-5 py-16 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <Label tone="warm">The Product Decision</Label>
          <h2 className="mt-4 text-4xl font-semibold tracking-normal text-white">We did not start with full automation.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-400">
            The broader vision included more ambitious contact-center automation. But a broad AI vision is not an MVP.
          </p>
          <p className="mt-5 leading-7 text-slate-400">
            My bias was to find the first workflow where the AI capability could change an operating process, not just
            create an impressive demo.
          </p>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
          <Box title="Broad contact-center vision" body="Automatic answering · Outbound automation · Call classification · Monitoring and trends · Quality monitoring" />
          <div className="py-3 text-center text-2xl text-slate-500">↓</div>
          <Box title="Customer and market learning" body="Stakeholder conversations · Global product benchmarking · Prototype exploration · Operational workflow analysis" />
          <div className="py-3 text-center text-2xl text-slate-500">↓</div>
          <div className="rounded-lg border border-amber-300/25 bg-amber-300/10 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-100">Initial focus</p>
            <h3 className="mt-2 text-3xl font-semibold text-white">Quality monitoring</h3>
            <p className="mt-3 leading-7 text-slate-300">
              The pain already existed, the reviewer already had a job to do, and ASR/NLP capabilities could enter that
              workflow without requiring the entire contact center to change at once.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Workflow({ selectedCall, callId, onChooseCall }: { selectedCall: (typeof syntheticCalls)[number]; callId: CallId; onChooseCall: (id: CallId) => void }) {
  return (
    <section id="workflow" className="scroll-mt-28 border-y border-white/10 bg-[#07111f] px-5 py-16 md:px-8">
      <div className="mx-auto max-w-7xl">
        <Label>Interactive Reconstruction</Label>
        <h2 className="mt-4 text-4xl font-semibold tracking-normal text-white md:text-5xl">A score was not a product.</h2>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
          The reviewer still needed to hear the call, read the transcript, understand the context, and continue the QA workflow.
        </p>
        <div className="mt-8 rounded-lg border border-white/10 bg-[#050914]">
          <div className="border-b border-white/10 p-4 md:p-5">
            <Label>Quality review workspace</Label>
            <p className="mt-1 text-sm text-slate-400">Modern reconstruction of the historic workflow logic</p>
          </div>
          <div className="grid lg:grid-cols-[0.78fr_1.22fr]">
            <div className="border-b border-white/10 p-4 md:p-5 lg:border-b-0 lg:border-r">
              <h3 className="flex items-center gap-2 font-semibold text-white">
                <FileSearch className="h-5 w-5 text-cyan-200" />
                Review queue
              </h3>
              <div className="mt-4 grid gap-3">
                {syntheticCalls.map((call) => (
                  <button
                    key={call.id}
                    type="button"
                    onClick={() => onChooseCall(call.id)}
                    className={`rounded-md border p-4 text-left transition focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-[#050914] ${
                      callId === call.id ? "border-cyan-300/50 bg-cyan-300/10" : "border-white/10 bg-white/[0.035] hover:border-cyan-300/25"
                    }`}
                  >
                    <div className="flex justify-between gap-3">
                      <span className="font-semibold text-white">{call.id}</span>
                      <span className="text-sm text-slate-400">{call.duration}</span>
                    </div>
                    <p className="mt-2 text-sm text-slate-300">{call.reason}</p>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-200">{call.status}</p>
                  </button>
                ))}
              </div>
            </div>
            <div className="p-4 md:p-5">
              <div className="grid gap-4 xl:grid-cols-[1fr_0.75fr]">
                <div>
                  <div className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
                    <p className="font-semibold text-white">{selectedCall.summary}</p>
                    <p className="mt-1 text-sm text-slate-400">
                      {selectedCall.date} · {selectedCall.agent} · {selectedCall.customer} · Quality score: {selectedCall.score}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        aria-label={`Start playback simulation for ${selectedCall.id}`}
                        onClick={() => trackEvent(analyticsEvents.playDemo, { demo: "ccai_workflow", action: "playback_simulation", call_id: selectedCall.id })}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-300 text-slate-950 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-[#050914]"
                      >
                        <Play className="h-4 w-4 fill-current" />
                      </button>
                      <Pause className="h-4 w-4 text-slate-500" />
                      <div className="h-2 w-40 overflow-hidden rounded-full bg-white/10">
                        <div className="h-full w-[54%] rounded-full bg-cyan-300" />
                      </div>
                      <span className="text-sm text-slate-400">{selectedCall.duration}</span>
                    </div>
                  </div>
                  <div className="mt-4 rounded-lg border border-white/10 bg-white/[0.035] p-4">
                    <h4 className="flex items-center gap-2 font-semibold text-white">
                      <MessageSquareText className="h-5 w-5 text-cyan-200" />
                      Transcript
                    </h4>
                    {selectedCall.transcript.map(([speaker, text]) => (
                      <div key={`${speaker}-${text}`} className="mt-3 rounded-md bg-[#050914] p-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-200">{speaker}</p>
                        <p className="mt-1 text-sm leading-6 text-slate-300">{text}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid content-start gap-4">
                  <Panel title="Analysis signals" items={selectedCall.signals} />
                  <ReviewActions callId={selectedCall.id} />
                  <Box title="The system helps with" body="Transcription · Initial scoring signals · Call prioritization · Topic or pattern extraction" />
                  <Box title="The reviewer decides" body="Final QA assessment · Score adjustment · Follow-up need · Coaching or operational action" />
                  <p className="text-sm leading-6 text-slate-400">
                    The model changes what reaches the reviewer and what evidence is visible. The reviewer still owns the QA decision.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReviewActions({ callId }: { callId: string }) {
  return (
    <div className="rounded-lg border border-amber-300/20 bg-amber-300/10 p-4">
      <h4 className="font-semibold text-white">Reviewer workflow</h4>
      <div className="mt-4 flex flex-wrap gap-2">
        {["Confirm review", "Adjust score", "Mark for follow-up", "Continue QA form"].map((action) => (
          <button
            key={action}
            type="button"
            onClick={() => trackEvent(analyticsEvents.ccaiReviewAction, { synthetic_call_id: callId, action, demo: "ccai_workflow" })}
            className="rounded-full border border-amber-200/25 px-3 py-2 text-sm font-semibold text-amber-50 transition hover:bg-amber-200/10 focus:outline-none focus:ring-2 focus:ring-amber-100 focus:ring-offset-2 focus:ring-offset-[#1d1a10]"
          >
            {action}
          </button>
        ))}
      </div>
    </div>
  );
}

function HistoricalArtifact() {
  return (
    <section className="px-5 py-16 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.42fr_0.58fr] lg:items-center">
        <div>
          <Label tone="warm">From the 2020 prototype</Label>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            The original product interface was designed for Persian-speaking contact-center teams.
          </p>
        </div>
        <figure className="rounded-lg border border-white/10 bg-white/[0.035] p-3">
          <Image
            src="/assets/cases/contact-center-prototype-2020.png"
            alt="Original 2020 Persian quality-monitoring prototype showing call playback, transcript, call context, and quality score."
            width={2940}
            height={1742}
            className="max-h-[520px] w-full rounded-md object-contain"
            sizes="(min-width: 1024px) 58vw, 100vw"
            priority={false}
          />
          <figcaption className="mt-3 text-sm leading-6 text-slate-500">
            Original quality-monitoring prototype excerpt, 2020. Persian UI. Identifying fields obscured.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function Decisions() {
  const decisions = [
    ["Start with quality monitoring, not full automation", "Quality monitoring presented a sharper problem, an existing user, and a faster route to an MVP. A broad AI capability becomes a product only after you choose the workflow where it earns the right to exist."],
    ["Put AI inside the review flow", "A score returned by an API was not enough. The reviewer needed playback, transcript, call context, score, and the next review step in one place."],
    ["Measure the operating workflow", "The product evidence had to move from model output to operating value. Could we process more calls? Could more relevant calls reach reviewers? Could scoring become more reliable?"]
  ];
  return (
    <section className="px-5 py-16 md:px-8">
      <div className="mx-auto max-w-7xl">
        <Label tone="warm">Product Decisions</Label>
        <h2 className="mt-4 max-w-4xl text-4xl font-semibold tracking-normal text-white md:text-5xl">Three decisions mattered more than the model demo.</h2>
        <div className="mt-10 grid gap-6">
          {decisions.map(([title, body], index) => (
            <div key={title} className="grid gap-4 border-t border-white/10 pt-6 md:grid-cols-[8rem_1fr]">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-100">Decision {String(index + 1).padStart(2, "0")}</p>
              <div>
                <h3 className="text-2xl font-semibold text-white">{title}</h3>
                <p className="mt-3 max-w-3xl leading-7 text-slate-400">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Evidence() {
  return (
    <section id="evidence" className="scroll-mt-28 border-y border-white/10 bg-white/[0.025] px-5 py-16 md:px-8">
      <div className="mx-auto max-w-7xl">
        <Label>Operating Evidence</Label>
        <h2 className="mt-4 max-w-4xl text-4xl font-semibold tracking-normal text-white md:text-5xl">The product moved beyond a prototype.</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <Metric value="18K+" label="Daily calls" detail="Handled through the ASR workflow" />
          <Metric value="35%" label="Review / reporting throughput" detail="Improvement in the operational workflow" />
          <Metric value="2.15x" label="Call-scoring accuracy" detail="Improvement" />
        </div>
        <p className="mt-6 max-w-3xl text-sm leading-6 text-slate-500">
          These are historical operating signals from my documented product work. The interface on this page is a synthetic reconstruction, not the original production system.
        </p>
      </div>
    </section>
  );
}

function Today({ era, onSetEra }: { era: Era; onSetEra: (era: Era) => void }) {
  return (
    <section id="today" className="scroll-mt-28 px-5 py-16 md:px-8">
      <div className="mx-auto max-w-7xl">
        <Label>2020 → today</Label>
        <h2 className="mt-4 text-4xl font-semibold tracking-normal text-white md:text-6xl">The model layer changed dramatically.</h2>
        <p className="mt-4 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Current product reflection, updated July 2026.</p>
        <p className="mt-5 text-3xl font-semibold text-cyan-100">The product question did not disappear.</p>
        <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-400">
          In 2020, much of the work was about combining specialized ASR and NLP capabilities with a usable operational
          workflow. Today, modern models can interpret far more context, produce structured outputs, use tools, and in
          some systems take actions across software.
        </p>
        <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-400">
          That expands the product opportunity. It also expands the consequences of a bad product decision.
        </p>
        <div className="mt-10 rounded-lg border border-white/10 bg-white/[0.035] p-4 md:p-5">
          <div className="inline-flex rounded-md border border-white/10 bg-[#050914] p-1" role="tablist" aria-label="Product logic comparison">
            {(["2020", "today"] as Era[]).map((option) => (
              <button
                key={option}
                type="button"
                role="tab"
                aria-selected={era === option}
                onClick={() => {
                  onSetEra(option);
                  trackEvent(analyticsEvents.ccaiEraSwitch, { era: option });
                }}
                className={`rounded px-4 py-2 text-sm font-semibold ${era === option ? "bg-cyan-300 text-slate-950" : "text-slate-300"}`}
              >
                {option === "2020" ? "2020 product logic" : "Today's product logic"}
              </button>
            ))}
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-3 xl:grid-cols-6">
            {eraSteps[era].map((step, index) => (
              <div key={step} className="rounded-md border border-white/10 bg-[#050914] p-4">
                <p className="text-sm font-semibold text-cyan-200">{String(index + 1).padStart(2, "0")}</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{step}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 max-w-3xl leading-7 text-slate-400">
            {era === "2020"
              ? "The system helps interpret and prioritize evidence before the reviewer acts."
              : "A modern system can potentially move beyond interpretation and recommendation. It can prepare or take actions. That makes product boundaries more important, not less."}
          </p>
          <div className="mt-6 rounded-lg border border-amber-300/20 bg-amber-300/10 p-5">
            <p className="text-xl font-semibold text-white">One thing I would resist today is calling every intelligent workflow an agent.</p>
            <p className="mt-3 leading-7 text-slate-300">
              If the system only classifies, scores, or summarizes, I would design it as a strong AI workflow. I would
              introduce agentic behavior only where tool use and multi-step action create real product value.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Autonomy({ mode, onSetMode }: { mode: Mode; onSetMode: (mode: Mode) => void }) {
  const active = modeContent[mode];
  return (
    <section className="border-y border-white/10 bg-[#07111f] px-5 py-16 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <Label>Observe / recommend / act</Label>
          <h2 className="mt-4 text-4xl font-semibold tracking-normal text-white">Autonomy should follow the consequence of the action.</h2>
          <p className="mt-5 leading-7 text-slate-400">
            Autonomy should be designed around the consequence and reversibility of the action, not around how impressive the model looks.
          </p>
        </div>
        <div className="rounded-lg border border-white/10 bg-[#050914] p-4">
          <div className="grid gap-2 md:grid-cols-3">
            {(["observe", "recommend", "act"] as Mode[]).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onSetMode(option);
                  trackEvent(analyticsEvents.ccaiAutonomyMode, { mode: option });
                }}
                className={`rounded-md border p-4 text-left ${mode === option ? "border-cyan-300/50 bg-cyan-300/10" : "border-white/10 bg-white/[0.035]"}`}
              >
                <p className="font-semibold text-white">{modeContent[option].title}</p>
              </button>
            ))}
          </div>
          <div className="mt-5 rounded-lg border border-white/10 bg-white/[0.035] p-5">
            <h3 className="text-2xl font-semibold text-white">{active.title}</h3>
            <p className="mt-3 leading-7 text-slate-400">{active.body}</p>
            <Panel title="Example actions" items={active.actions} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ChangeToday() {
  const items = [
    ["Trace signals to evidence", "Every important quality signal should point back to the transcript, audio segment, policy context, or workflow event that supports it."],
    ["Evaluate the queue, not just the model", "I would measure whether the right calls reach reviewers, how often they correct the system, and whether the workflow removes work or creates more review."],
    ["Use agents only when action adds value", "Classification, scoring, and summarization do not automatically need an agent. I would add tool use and multi-step action only where the workflow benefits from it."],
    ["Design correction before autonomy", "If the system creates tasks, updates records, or routes work, correction and escalation should exist before more autonomy is added."]
  ];
  return (
    <section className="px-5 py-16 md:px-8">
      <div className="mx-auto max-w-7xl">
        <Label>What I Would Change Today</Label>
        <h2 className="mt-4 max-w-4xl text-4xl font-semibold tracking-normal text-white md:text-5xl">
          I would keep the reviewer&apos;s job at the center. I would change how the system handles evidence, uncertainty, and action.
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {items.map(([title, body]) => (
            <Box key={title} title={title} body={body} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LookingBack() {
  return (
    <section className="border-y border-white/10 bg-white/[0.025] px-5 py-16 md:px-8">
      <div className="mx-auto max-w-4xl">
        <Label tone="warm">Looking Back</Label>
        <h2 className="mt-4 text-4xl font-semibold tracking-normal text-white md:text-5xl">This is one of the product problems that stayed with me.</h2>
        <div className="mt-6 grid gap-5 text-lg leading-8 text-slate-400">
          <p>I started working on this product problem in 2020.</p>
          <p>At the time, we were combining ASR and NLP capabilities with contact-center workflows. The model layer was difficult, but productizing it created a different set of questions.</p>
          <p>Which workflow should we start with?</p>
          <p>What does the reviewer need to see?</p>
          <p>Where does the model output enter the job?</p>
          <p>What do we measure when the demo is over?</p>
          <p className="text-2xl font-semibold leading-9 text-white">The model capability is the beginning. The product starts when it changes a real workflow.</p>
        </div>
      </div>
    </section>
  );
}

function RelatedThinking() {
  return (
    <section className="px-5 py-16 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 rounded-lg border border-white/10 bg-white/[0.035] p-6 md:p-8 lg:grid-cols-[1fr_0.55fr]">
        <div>
          <Label>Related Thinking</Label>
          <h2 className="mt-4 text-3xl font-semibold text-white">From model output to product system.</h2>
          <p className="mt-4 leading-7 text-slate-400">
            My recent article, The Agentic AI Product Gap, looks at a more modern version of the same product tension.
          </p>
          <p className="mt-4 leading-7 text-slate-400">
            Once AI moves from interpreting work to taking action, workflow fit, evaluation, human control, monitoring,
            and recovery become part of the product itself.
          </p>
          <blockquote className="mt-5 border-l-2 border-cyan-300 pl-4 text-lg font-semibold leading-8 text-white">
            “An agent is not ready when the model looks smart. It is ready when the workflow can absorb its mistakes.”
          </blockquote>
        </div>
        <TrackedLink href="/writing/the-agentic-ai-product-gap" name="read_agentic_ai_product_gap">
          Read The Agentic AI Product Gap
          <ArrowRight className="h-4 w-4" />
        </TrackedLink>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="px-5 pb-16 md:px-8">
      <div className="mx-auto max-w-5xl rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-6 md:p-8">
        <Label>Continue The Conversation</Label>
        <h2 className="mt-4 text-4xl font-semibold tracking-normal text-white">The part I enjoy starts after the model works.</h2>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
          Choosing the workflow, testing it with users, earning adoption, and measuring what actually changed.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <TrackedLink href="/contact" name="discuss_this_work">
            Discuss this work
            <Mail className="h-4 w-4" />
          </TrackedLink>
          <TrackedLink href="/work" name="view_more_work" variant="secondary">View more work</TrackedLink>
          <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center justify-center rounded-md px-2 text-sm font-semibold text-cyan-100 hover:text-cyan-50">
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}

function Label({ children, tone = "cool" }: { children: React.ReactNode; tone?: "cool" | "warm" }) {
  return <p className={`text-sm font-semibold uppercase tracking-[0.18em] ${tone === "warm" ? "text-amber-100" : "text-cyan-200"}`}>{children}</p>;
}

function TrackedLink({ href, name, children, variant = "primary" }: { href: string; name: string; children: React.ReactNode; variant?: "primary" | "secondary" | "quiet" }) {
  const className = variant === "primary"
    ? "mt-5 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-cyan-300 px-5 text-sm font-semibold text-slate-950 hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-[#050914]"
    : variant === "secondary"
      ? "mt-5 inline-flex h-12 items-center justify-center gap-2 rounded-md border border-cyan-300/25 px-5 text-sm font-semibold text-cyan-100 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-[#050914]"
      : "mt-5 inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/15 px-5 text-sm font-semibold text-white hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-[#050914]";
  return <Link href={href} onClick={() => trackEvent(analyticsEvents.clickPrimaryCta, { cta_name: name, cta_location: "ccai_v3", destination: href })} className={className}>{children}</Link>;
}

function Box({ title, body }: { title: string; body: string }) {
  return <div className="rounded-lg border border-white/10 bg-white/[0.035] p-4"><h3 className="font-semibold text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{body}</p></div>;
}

function Panel({ title, items }: { title: string; items: readonly string[] }) {
  return <div className="rounded-lg border border-white/10 bg-white/[0.035] p-4"><h4 className="font-semibold text-white">{title}</h4><div className="mt-3 grid gap-2">{items.map((item) => <span key={item} className="flex items-start gap-2 text-sm leading-6 text-slate-400"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-cyan-200" />{item}</span>)}</div></div>;
}

function Metric({ value, label, detail }: { value: string; label: string; detail: string }) {
  return <div className="rounded-lg border border-white/10 bg-[#050914] p-5"><p className="text-4xl font-semibold text-white">{value}</p><p className="mt-3 text-sm font-semibold uppercase tracking-[0.16em] text-cyan-200">{label}</p><p className="mt-3 leading-7 text-slate-400">{detail}</p></div>;
}

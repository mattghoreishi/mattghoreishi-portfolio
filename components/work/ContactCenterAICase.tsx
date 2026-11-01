"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, FileSearch, MessageSquareText, MousePointer2 } from "lucide-react";
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
    trackEvent(analyticsEvents.ccaiRunTriage, { synthetic_result: true, calls_processed: 100, calls_surfaced: 38 });
    trackEvent(analyticsEvents.playDemo, { demo_name: "ccai_100_call_problem", action: "process_all_100" });
  }
  function chooseCall(nextCallId: CallId) {
    setCallId(nextCallId);
    trackEvent(analyticsEvents.switchDemoTab, { demo: "ccai_workflow", tab: nextCallId, previous_tab: callId });
  }

  return (
    <>
      <header className="portfolio-wrap story-hero">
        <Link href="/work" className="portfolio-text-link mb-10"><ArrowLeft size={17} aria-hidden="true" />All work</Link>
        <p className="portfolio-eyebrow">Sotoon / Case study / Work started in 2020</p>
        <h1 className="portfolio-heading">Contact Center AI</h1>
        <p className="portfolio-lead mt-6 max-w-3xl">How working with two quality managers changed my starting point: from displaying speech and language outputs to helping a reviewer decide which call needed attention.</p>
        <p className="story-role"><span>My role</span>Customer discovery, product scope, reviewer workflow, roadmap coordination, customer testing, and pricing and pilot discussions. The voice and NLP teams owned the models.</p>
        <p className="mt-6 max-w-3xl text-sm leading-6 text-[var(--portfolio-secondary)]">This account combines historical product work, an original prototype, and a modern reconstruction using synthetic calls. The last section is my current reflection.</p>
      </header>
      <nav aria-label="Case study sections" className="portfolio-wrap border-y border-[var(--portfolio-rule)] py-4">
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
          {[["Discovery", "#discovery"], ["Problem", "#problem"], ["Scope", "#product-decision"], ["Prototype", "#prototype"], ["Try the workflow", "#workflow"], ["Results", "#evidence"], ["Revisiting it", "#today"]].map(([label, href]) => <a key={href} href={href} className="portfolio-text-link">{label}</a>)}
        </div>
      </nav>
      <section id="discovery" className="portfolio-wrap story-section scroll-mt-28">
        <p className="portfolio-eyebrow">01 / Discovery</p>
        <div>
          <h2>Two weeks with the people reviewing calls.</h2>
          <p>Sotoon already had automatic speech recognition and natural language processing capabilities. I spent two weeks working with two quality managers to understand how those capabilities might fit their work.</p>
          <p>The useful question became which call to look at next, and what evidence would help them judge it. Sentiment and keywords could help surface a call, but they did not settle whether an agent had handled it well.</p>
          <p>That shifted my focus from a dashboard of model outputs to a prioritized review queue. A reviewer needed the call, its transcript and context, the quality signals, and a way to continue the assessment in one place.</p>
        </div>
      </section>
      <ProblemSection processed={processed} onProcess={processCalls} />
      <section id="product-decision" className="portfolio-wrap story-section scroll-mt-28">
        <p className="portfolio-eyebrow">02 / Choosing the scope</p>
        <div>
          <h2>Start with quality monitoring.</h2>
          <p>The broader contact-center vision included automatic answering, outbound automation, classification, monitoring, and quality review. For the initial product, I focused on quality monitoring: an existing job where speech and language signals could help a person find and assess calls.</p>
          <p>It meant keeping the reviewer responsible for the final assessment. A frustrated customer could be evidence of a service problem, a difficult situation handled appropriately, or poor agent performance. A sentiment score alone could not make that distinction.</p>
          <dl className="mt-8 grid gap-5 border-y border-[var(--portfolio-rule)] py-6 sm:grid-cols-2">
            <div><dt className="font-semibold">The system’s part</dt><dd className="mt-2 leading-7 text-[var(--portfolio-secondary)]">Transcribe, surface quality signals, and organize calls for review.</dd></div>
            <div><dt className="font-semibold">The reviewer’s part</dt><dd className="mt-2 leading-7 text-[var(--portfolio-secondary)]">Interpret the context, make the QA assessment, and decide on follow-up.</dd></div>
          </dl>
        </div>
      </section>
      <HistoricalArtifact />
      <Workflow selectedCall={selectedCall} callId={callId} onChooseCall={chooseCall} />
      <section className="portfolio-wrap story-section">
        <p className="portfolio-eyebrow">05 / Taking it to customers</p>
        <div>
          <h2>Pricing and pilots were part of the product work.</h2>
          <p>Alongside the reviewer workflow, I worked on pricing and pilot discussions with sales and customer-facing teams. Interest in the technology was a starting point; we needed to understand whether the operational problem mattered enough for a customer to pay to solve it.</p>
          <p>My responsibilities also included coordinating roadmaps across the contact-center, voice, NLP, and engineering teams, defining the MVP, and using customer testing to guide subsequent releases.</p>
        </div>
      </section>
      <Evidence />
      <Today era={era} onSetEra={setEra} mode={mode} onSetMode={setMode} />
      <section className="portfolio-wrap portfolio-section border-t border-[var(--portfolio-rule)]">
        <p className="portfolio-eyebrow">Continue reading</p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <Link href="/work/inline-apps-to-video" className="portfolio-text-link">From Inline Apps to video<ArrowRight size={18} aria-hidden="true" /></Link>
          <Link href="/writing/the-agentic-ai-product-gap" className="portfolio-text-link">The Agentic AI Product Gap<ArrowRight size={18} aria-hidden="true" /></Link>
        </div>
      </section>
    </>
  );
}

function ProblemSection({ processed, onProcess }: { processed: boolean; onProcess: () => void }) {
  return (
    <section id="problem" className="portfolio-wrap pb-12 scroll-mt-28">
      <div className="case-workspace rounded-lg bg-background p-5 text-foreground md:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Label>The attention constraint</Label>
            <h2 className="mt-4 text-2xl font-semibold text-foreground md:text-3xl">Which calls reach a reviewer?</h2>
            <p className="mt-5 leading-7 text-muted-foreground">Manual review takes time. Sampling calls limits the amount a quality manager has to listen to, but it can also leave relevant calls unseen.</p>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">This illustration starts with 10 sampled calls out of 100. The priority counts below are invented to explain the interaction, not historical results or a model evaluation.</p>
          </div>
          <div className="rounded-lg border border-border bg-background p-4 md:p-5">
            {!processed ? <>
              <p className="text-sm font-semibold text-muted-foreground">100 synthetic calls received</p>
              <p className="mt-2 text-2xl font-semibold text-foreground">10 manually sampled</p>
              <p className="mt-2 text-sm text-muted-foreground">90 calls outside the sample</p>
              <UnsortedCalls />
              <button type="button" onClick={onProcess} className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 text-left transition-colors hover:bg-primary/90 motion-reduce:transition-none text-sm font-semibold text-primary-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">Process all 100 and prioritize review<MousePointer2 size={18} className="shrink-0" aria-hidden="true" /></button>
            </> : <div aria-live="polite">
              <Label>Illustrative synthetic result</Label>
              <p className="mt-3 text-2xl font-semibold text-foreground">38 calls moved into review lanes</p>
              <p className="mb-5 mt-2 text-sm text-muted-foreground">All 100 were processed in this example.</p>
              <PriorityLaneGrid />
              <p className="mt-5 leading-7 text-muted-foreground">The reviewer starts with a broader, prioritized set of calls. They still make the quality assessment.</p>
              <TrackedLink href="#workflow" name="open_prioritized_review_queue">Open the review queue<ArrowRight size={18} aria-hidden="true" /></TrackedLink>
            </div>}
          </div>
        </div>
      </div>
    </section>
  );
}

function HistoricalArtifact() {
  return <section id="prototype" className="portfolio-wrap portfolio-section scroll-mt-28">
    <div className="grid gap-8 lg:grid-cols-[0.36fr_0.64fr] lg:items-start">
      <div>
        <p className="portfolio-eyebrow">03 / The original prototype</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight">Designed for Persian-speaking QA teams.</h2>
        <p className="mt-5 leading-7 text-[var(--portfolio-secondary)]">The 2020 prototype brought call playback, transcript, call context, and a quality score together. It is an early artifact of the workflow described here.</p>
      </div>
      <figure>
        <a href="/assets/cases/contact-center-prototype-2020.png" target="_blank" rel="noopener noreferrer" className="block rounded border border-[var(--portfolio-rule)] bg-white p-2" aria-label="Open the original 2020 prototype image in a new tab">
          <Image src="/assets/cases/contact-center-prototype-2020.png" alt="Original 2020 Persian quality-monitoring prototype showing call playback, transcript, call context, and quality score." width={2940} height={1742} className="h-auto w-full object-contain" sizes="(min-width: 1024px) 700px, 100vw" />
        </a>
        <figcaption className="mt-3 text-sm leading-6 text-[var(--portfolio-secondary)]">Overview of the original prototype workspace, 2020. Persian interface; identifying fields obscured. Open the full-size image to inspect the archive.</figcaption>
      </figure>
    </div>
  </section>;
}

function Evidence() {
  return <section id="evidence" className="portfolio-wrap story-section scroll-mt-28">
    <p className="portfolio-eyebrow">06 / Historical results</p>
    <div>
      <h2>What the operating results describe.</h2>
      <dl className="mt-7 grid gap-6 sm:grid-cols-2">
        <div className="border-t border-[var(--portfolio-rule)] pt-5"><dt className="text-sm font-semibold">Review / reporting throughput</dt><dd className="mt-2 text-3xl font-semibold">+35%</dd><dd className="mt-3 leading-7 text-[var(--portfolio-secondary)]">Historical improvement in the operational review and reporting workflow.</dd></div>
        <div className="border-t border-[var(--portfolio-rule)] pt-5"><dt className="text-sm font-semibold">Supporting ASR volume</dt><dd className="mt-2 text-3xl font-semibold">18K+ calls / day</dd><dd className="mt-3 leading-7 text-[var(--portfolio-secondary)]">Daily volume handled through the supporting speech-recognition workflow. This is not a count of CCAI users or reviewed calls.</dd></div>
      </dl>
      <p>These are historical team outcomes recorded in my career materials. The synthetic examples on this page illustrate product behavior and do not reproduce a measured test.</p>
    </div>
  </section>;
}

function Today({ era, onSetEra, mode, onSetMode }: { era: Era; onSetEra: (era: Era) => void; mode: Mode; onSetMode: (mode: Mode) => void }) {
  const active = modeContent[mode];
  return <section id="today" className="portfolio-wrap portfolio-section scroll-mt-28">
    <p className="portfolio-eyebrow">07 / Revisiting the work</p>
    <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">What I would examine now.</h2>
    <p className="portfolio-lead mt-5 max-w-3xl">I would look closely at which calls reach the queue, how often reviewers correct the system, and whether suggested actions reduce work or create more review. I would also make each important signal traceable to its supporting evidence.</p>
    <p className="mt-4 max-w-3xl leading-7 text-[var(--portfolio-secondary)]">This is a present-day design reflection, not a claim about features in the original product. The controls below compare the historical workflow with a possible extension, then separate observing, recommending, and acting.</p>
    <div className="case-workspace mt-8 rounded-lg bg-background p-5 text-foreground md:p-7">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Product logic comparison">
        {(["2020", "today"] as Era[]).map(option => <button key={option} type="button" aria-pressed={era === option} onClick={() => {onSetEra(option); trackEvent(analyticsEvents.ccaiEraSwitch, {era: option});}} className={`min-h-11 rounded border px-4 py-2 text-sm font-semibold transition-colors motion-reduce:transition-none ${era === option ? "border-primary bg-primary text-primary-foreground" : "border-[var(--portfolio-control)] text-foreground hover:bg-muted"}`}>{option === "2020" ? "2020 product logic" : "Today's product logic"}</button>)}
      </div>
      <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {eraSteps[era].map((step, index) => <li key={step} className="rounded border border-border p-4"><span className="text-xs font-semibold text-primary">{String(index + 1).padStart(2, "0")}</span><p className="mt-2 text-sm leading-6 text-foreground">{step}</p></li>)}
      </ol>
      <p className="mt-5 leading-7 text-muted-foreground" aria-live="polite">{era === "2020" ? "The system interprets and prioritizes evidence before the reviewer acts." : "A possible extension prepares recommendations or takes permitted actions. Those actions need boundaries, review, and a way to correct mistakes."}</p>
      <div className="mt-8 border-t border-border pt-7">
        <h3 className="text-xl font-semibold text-foreground">Three levels of responsibility</h3>
        <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">I would add autonomy only where an action improves the workflow and its consequences can be managed. Classification and summarization do not require an agent.</p>
        <div className="mt-5 grid gap-2 sm:grid-cols-3" role="group" aria-label="Autonomy level">
          {(["observe", "recommend", "act"] as Mode[]).map(option => <button key={option} type="button" aria-pressed={mode === option} onClick={() => {onSetMode(option); trackEvent(analyticsEvents.ccaiAutonomyMode, {mode: option});}} className={`min-h-11 rounded border p-3 text-left font-semibold transition-colors motion-reduce:transition-none ${mode === option ? "border-primary bg-primary text-primary-foreground" : "border-[var(--portfolio-control)] text-foreground hover:bg-muted"}`}>{modeContent[option].title}</button>)}
        </div>
        <div className="mt-5 rounded border border-border p-5">
          <h4 className="text-lg font-semibold text-foreground">{active.title}</h4>
          <p className="mt-2 leading-7 text-muted-foreground">{active.body}</p>
          <ul className="mt-4 grid gap-2 text-sm text-foreground sm:grid-cols-2">{active.actions.map(action => <li key={action} className="flex items-start gap-2"><CheckCircle2 size={16} className="mt-1 shrink-0 text-primary" aria-hidden="true" />{action}</li>)}</ul>
        </div>
      </div>
    </div>
  </section>;
}

function UnsortedCalls() {
  return (
    <div className="mt-5 grid grid-cols-10 gap-1.5" aria-hidden="true">
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

function Workflow({ selectedCall, callId, onChooseCall }: { selectedCall: (typeof syntheticCalls)[number]; callId: CallId; onChooseCall: (id: CallId) => void }) {
  const [transcriptPosition, setTranscriptPosition] = useState<{ callId: string; turn: number } | null>(null);
  const transcriptTurn = transcriptPosition?.callId === callId ? transcriptPosition.turn : null;
  return (
    <section id="workflow" className="portfolio-wrap portfolio-section scroll-mt-28">
      <div>
        <p className="portfolio-eyebrow">04 / The review workflow</p>
        <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">Try the reviewer’s side of the product.</h2>
        <p className="portfolio-lead mt-5 max-w-3xl">Select a call, inspect the transcript and signals, then make a review decision. These fictional calls illustrate the workflow; no model is running here.</p>
        <div className="case-workspace mt-8 overflow-hidden rounded-lg border border-border bg-background text-foreground">
          <div className="border-b border-border p-4 md:p-5">
            <Label>Quality review workspace</Label>
            <p className="mt-1 text-sm text-muted-foreground">Synthetic reconstruction of the historical workflow. Review changes stay in this browser view.</p>
          </div>
          <div className="grid lg:grid-cols-[0.78fr_1.22fr]">
            <div className="border-b border-border p-4 md:p-5 lg:border-b-0 lg:border-r">
              <h3 className="flex items-center gap-2 font-semibold text-foreground">
                <FileSearch className="h-5 w-5 text-primary" aria-hidden="true" />
                Review queue
              </h3>
              <div className="mt-4 grid gap-3">
                {syntheticCalls.map((call) => (
                  <button
                    key={call.id}
                    type="button"
                    aria-pressed={callId === call.id}
                    onClick={() => onChooseCall(call.id)}
                    className={`rounded-md border p-4 text-left transition focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background ${
                      callId === call.id ? "border-primary bg-primary/10" : "border-[var(--portfolio-control)] bg-card hover:border-primary"
                    }`}
                  >
                    <div className="flex justify-between gap-3">
                      <span className="font-semibold text-foreground">{call.id}</span>
                      <span className="text-sm text-muted-foreground">{call.duration}</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{call.reason}</p>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">{call.status}</p>
                  </button>
                ))}
              </div>
            </div>
            <div className="p-4 md:p-5">
              <div className="grid gap-4 xl:grid-cols-[1fr_0.75fr]">
                <div>
                  <div className="rounded-lg border border-border bg-card p-4">
                    <p className="font-semibold text-foreground">{selectedCall.summary}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {selectedCall.date} · {selectedCall.agent} · {selectedCall.customer} · Initial model score: {selectedCall.score}
                    </p>
                    <div className="mt-4">
                      <button type="button" onClick={() => {
                        setTranscriptPosition({ callId, turn: transcriptTurn === null ? 0 : (transcriptTurn + 1) % selectedCall.transcript.length });
                        trackEvent(analyticsEvents.playDemo, { demo: "ccai_workflow", action: "transcript_walkthrough", call_id: selectedCall.id });
                      }} className="inline-flex min-h-11 items-center gap-2 rounded-md border border-[var(--portfolio-control)] px-3 py-2 text-sm text-primary transition-colors hover:bg-muted motion-reduce:transition-none">
                        {transcriptTurn === null ? "Walk through transcript" : transcriptTurn === selectedCall.transcript.length - 1 ? "Restart transcript" : "Next transcript turn"}<ArrowRight size={16} aria-hidden="true" />
                      </button>
                      <p className="mt-3 text-xs leading-5 text-muted-foreground" aria-live="polite">{transcriptTurn === null ? "Synthetic transcript. Audio is not included in this reconstruction." : `Turn ${transcriptTurn + 1} of ${selectedCall.transcript.length}: ${selectedCall.transcript[transcriptTurn][0]}. Highlighted below.`}</p>
                    </div>
                  </div>
                  <div className="mt-4 rounded-lg border border-border bg-card p-4">
                    <h4 className="flex items-center gap-2 font-semibold text-foreground">
                      <MessageSquareText className="h-5 w-5 text-primary" aria-hidden="true" />
                      Transcript
                    </h4>
                    {selectedCall.transcript.map(([speaker, text], index) => (
                      <div key={`${speaker}-${text}`} className={`mt-3 rounded-md border p-3 ${transcriptTurn === index ? "border-primary bg-primary/10" : "border-transparent bg-background"}`}>
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">{speaker}</p>
                        <p className="mt-1 text-sm leading-6 text-muted-foreground">{text}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid content-start gap-4">
                  <Panel title="Analysis signals" items={selectedCall.signals} />
                  <ReviewActions key={selectedCall.id} callId={selectedCall.id} />
                  <Box title="The system helps with" body="Transcription · Initial scoring signals · Call prioritization · Topic or pattern extraction" />
                  <Box title="The reviewer decides" body="Final QA assessment · Score adjustment · Follow-up need · Coaching or operational action" />
                  <p className="text-sm leading-6 text-muted-foreground">
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
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState("");
  const [reviewNotes, setReviewNotes] = useState("");

  function choose(action: string) {
    setSelectedAction(action);
    setFeedback(action === "Confirm review" ? `${callId}: review confirmed in this demo.` : action === "Mark for follow-up" ? `${callId}: marked for follow-up in this demo.` : "");
    trackEvent(analyticsEvents.ccaiReviewAction, { synthetic_call_id: callId, action, demo: "ccai_workflow" });
  }

  return <div className="rounded-lg border border-border bg-card p-4">
    <h4 className="font-semibold text-foreground">Reviewer workflow</h4>
    <p className="mt-2 text-xs leading-5 text-muted-foreground">Try a review action. Changes stay in this demo and reset when you choose another call.</p>
    <div className="mt-4 flex flex-wrap gap-2">{["Confirm review", "Adjust score", "Mark for follow-up", "Add review note"].map(action => <button key={action} type="button" aria-pressed={selectedAction === action} onClick={() => choose(action)} className={`min-h-11 rounded-full border px-3 py-2 text-sm font-semibold transition-colors motion-reduce:transition-none ${selectedAction === action ? "border-primary bg-primary/10 text-primary" : "border-[var(--portfolio-control)] text-foreground hover:bg-muted"}`}>{action}</button>)}</div>
    {selectedAction === "Adjust score" && <form className="mt-4" onSubmit={event => { event.preventDefault(); setFeedback(`${callId}: demo score updated to ${score}.`); }}>
      <label htmlFor={`score-${callId}`} className="text-sm text-foreground">Reviewer score (0–100)</label>
      <div className="mt-2 flex flex-wrap gap-2"><input id={`score-${callId}`} type="number" min="0" max="100" required value={score} onChange={event => setScore(event.target.value)} className="w-24 rounded border border-[var(--portfolio-control)] bg-background px-3 py-2 text-foreground" /><button type="submit" className="min-h-11 rounded bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 motion-reduce:transition-none">Save demo score</button></div>
    </form>}
    {selectedAction === "Add review note" && <form className="mt-4" onSubmit={event => { event.preventDefault(); setFeedback(`${callId}: review note recorded locally for this demo.`); }}>
      <label htmlFor={`note-${callId}`} className="text-sm text-foreground">Demo review note</label><textarea id={`note-${callId}`} required maxLength={500} value={reviewNotes} onChange={event => setReviewNotes(event.target.value)} placeholder="Use a fictional note. Nothing is submitted." className="mt-2 w-full rounded border border-[var(--portfolio-control)] bg-background p-3 text-base sm:text-sm text-foreground" /><button type="submit" className="mt-2 min-h-11 rounded bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 motion-reduce:transition-none">Save demo note</button>
    </form>}
    <p className="mt-3 text-sm leading-6 text-primary" role="status">{feedback}</p>
  </div>;
}

function Label({ children, tone = "cool" }: { children: React.ReactNode; tone?: "cool" | "warm" }) {
  return <p className={`text-sm font-semibold uppercase tracking-[0.18em] ${tone === "warm" ? "text-warning-foreground" : "text-primary"}`}>{children}</p>;
}

function TrackedLink({ href, name, children, variant = "primary" }: { href: string; name: string; children: React.ReactNode; variant?: "primary" | "secondary" | "quiet" }) {
  const className = variant === "primary"
    ? "mt-5 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
    : variant === "secondary"
      ? "mt-5 inline-flex h-12 items-center justify-center gap-2 rounded-md border border-[var(--portfolio-control)] px-5 text-sm font-semibold text-primary hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
      : "mt-5 inline-flex h-12 items-center justify-center gap-2 rounded-md border border-border px-5 text-sm font-semibold text-foreground hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background";
  return <Link href={href} onClick={() => trackEvent(analyticsEvents.clickPrimaryCta, { cta_name: name, cta_location: "ccai_v3", destination: href })} className={className}>{children}</Link>;
}

function Box({ title, body }: { title: string; body: string }) {
  return <div className="rounded-lg border border-border bg-card p-4"><h3 className="font-semibold text-foreground">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p></div>;
}

function Panel({ title, items }: { title: string; items: readonly string[] }) {
  return <div className="rounded-lg border border-border bg-card p-4"><h4 className="font-semibold text-foreground">{title}</h4><div className="mt-3 grid gap-2">{items.map((item) => <span key={item} className="flex items-start gap-2 text-sm leading-6 text-muted-foreground"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />{item}</span>)}</div></div>;
}

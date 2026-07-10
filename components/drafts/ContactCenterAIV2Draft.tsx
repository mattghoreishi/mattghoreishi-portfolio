"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, FileSearch, Mail, MessageSquareText, MousePointer2, Pause, Play } from "lucide-react";
import { profile } from "@/data/site";
import { analyticsEvents, trackEvent } from "@/lib/analytics";

type Era = "2020" | "2026";
type Mode = "observe" | "recommend" | "act";

const calls = [
  {
    id: "QA-204",
    reason: "Low quality score",
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
    reason: "Routine sample",
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
    reason: "Uncertain classification",
    duration: "07:08",
    date: "May 14, 2021",
    agent: "Agent 07",
    customer: "Synthetic customer C",
    score: "Unclear",
    status: "Reviewer judgment needed",
    summary: "The transcript suggests a complaint, but the resolution signal is incomplete.",
    transcript: [
      ["Customer", "I do not know if this is a billing issue or a service issue anymore."],
      ["Agent", "I see notes from two previous calls. Let me check both records."],
      ["Customer", "I just want someone to own it."],
      ["Agent", "I will create a follow-up for the service team and add the billing note too."]
    ],
    signals: ["Repeat topic detected", "Intent classification uncertain", "Possible follow-up mentioned"]
  }
] as const;

type CallId = (typeof calls)[number]["id"];

const eraSteps: Record<Era, string[]> = {
  "2020": ["Audio", "ASR", "Text and language processing", "Quality or topic signals", "Prioritized review queue", "Human QA review"],
  "2026": ["Audio, transcript, and permitted context", "Structured evidence extraction", "Intent, quality, and uncertainty evaluation", "Dynamic routing", "Agent-assisted investigation or recommendation", "Bounded action or human review"]
};

const modeCopy = {
  observe: ["Observe", "Useful AI does not need autonomy. Observation can already change the operating workflow.", ["transcribe a call", "extract topics", "identify quality signals", "show uncertainty", "organize evidence"]],
  recommend: ["Recommend", "Recommendation changes the reviewer’s starting point. The product now needs stronger evaluation of evidence, confidence, and failure modes.", ["prioritize review", "suggest a QA rationale", "draft a coaching note", "recommend follow-up"]],
  act: ["Act", "Better models expand the action surface. Product design still has to decide where the system stops.", ["create a review task", "update a QA workflow record", "route a call for follow-up", "notify an appropriate supervisor"]]
} as const;

export function ContactCenterAIV2Draft() {
  const [coverage, setCoverage] = useState(10);
  const [triageRun, setTriageRun] = useState(false);
  const [callId, setCallId] = useState<CallId>("QA-204");
  const [era, setEra] = useState<Era>("2020");
  const [mode, setMode] = useState<Mode>("observe");
  const selectedCall = useMemo(() => calls.find((call) => call.id === callId) ?? calls[0], [callId]);

  function runTriage() {
    setTriageRun(true);
    trackEvent(analyticsEvents.playDemo, { demo_name: "ccai_100_call_problem", action: "run_ai_assisted_triage" });
    trackEvent(analyticsEvents.ccaiRunTriage, { synthetic_result: true });
  }

  return (
    <>
      <section className="relative overflow-hidden px-5 py-14 md:px-8 md:py-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.055)_1px,transparent_1px)] bg-[size:36px_36px]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.82fr] lg:items-center">
          <div>
            <Label>Contact Center AI · 2020 → 2026</Label>
            <h1 className="mt-5 max-w-5xl text-4xl font-semibold tracking-normal text-white md:text-6xl">
              Before copilots became a category, we were trying to make AI useful inside a contact center.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Sotoon already had ASR and NLP capabilities. The harder product question was what came next: how do you turn model output into a workflow a contact-center QA team will actually use?
            </p>
            <p className="mt-5 max-w-3xl leading-7 text-slate-400">
              I started working on this product problem around 2020. This page is a modern interactive reconstruction of the decisions behind that work, followed by how I would approach the same problem with 2026 AI capabilities.
            </p>
            <p className="mt-5 max-w-3xl text-sm leading-6 text-slate-500">
              Interactive reconstruction using synthetic data. No customer or confidential operational data is shown.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <TrackedLink href="#problem" name="explore_2020_problem">Explore the 2020 problem <ArrowRight className="h-4 w-4" /></TrackedLink>
              <TrackedLink href="#rethink" name="see_2026_rethink" variant="secondary">See what I would build in 2026</TrackedLink>
              <TrackedLink href="/contact" name="discuss_this_work" variant="quiet">Discuss this work</TrackedLink>
            </div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
            {[["2020", "ASR + NLP", "Specialized capabilities were available."], ["Product workflow", "QA review", "The work was turning output into something a reviewer could use."], ["2026", "Models + actions", "The opportunity is larger, and so are the product consequences."]].map(([year, title, body]) => (
              <div key={title} className="mb-4 grid grid-cols-[5rem_1fr] gap-4 rounded-md border border-white/10 bg-[#050914] p-4 last:mb-0">
                <p className={year === "2026" ? "font-semibold text-cyan-100" : "font-semibold text-amber-100"}>{year}</p>
                <div><p className="font-semibold text-white">{title}</p><p className="mt-1 text-sm leading-6 text-slate-400">{body}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <nav aria-label="Page eras" className="border-y border-white/10 bg-[#050914]/88 px-5 py-3 backdrop-blur md:px-8">
        <div className="mx-auto flex max-w-7xl gap-3 overflow-x-auto text-sm">
          {["2020 Problem", "2020 MVP decision", "2021 Workflow and evidence", "2026 Rethink"].map((item) => <span key={item} className="shrink-0 rounded-full border border-white/10 px-3 py-2 text-slate-300">{item}</span>)}
        </div>
      </nav>

      <section id="problem" className="border-y border-white/10 bg-[#07111f] px-5 py-16 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.86fr_1.14fr]">
          <div>
            <Label tone="warm">The 2020 Problem</Label>
            <h2 className="mt-4 text-4xl font-semibold tracking-normal text-white md:text-5xl">A QA team could not listen to everything.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">Quality monitoring was fundamentally constrained by human attention. Reviewing a call took time, so the product problem was not simply “score calls with AI.”</p>
            <p className="mt-5 text-xl font-semibold leading-8 text-white">Which calls deserve a reviewer’s attention?</p>
            <p className="mt-5 text-sm leading-6 text-slate-400">In the product research and planning behind this work, manual QA was commonly framed as reviewing roughly 5% to 20% of calls.</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-[#050914] p-4 md:p-5">
            <p className="text-sm font-semibold text-slate-300">100 calls received</p>
            <p className="mt-1 text-3xl font-semibold text-white">{coverage} of 100 reviewed</p>
            <p className="text-sm text-slate-400">{100 - coverage} not reviewed in the manual sample</p>
            <label htmlFor="coverage" className="mt-6 block text-sm font-semibold text-slate-200">Manual QA coverage: {coverage}%</label>
            <input id="coverage" type="range" min="5" max="20" value={coverage} onChange={(event) => { setCoverage(Number(event.target.value)); setTriageRun(false); }} className="mt-3 w-full accent-cyan-300" />
            <div className="mt-5 grid grid-cols-10 gap-1.5" aria-label="Synthetic field of 100 calls">
              {Array.from({ length: 100 }, (_, index) => {
                const style = triageRun ? (index < 9 ? "border-rose-200/75 bg-rose-300/80" : index < 17 ? "border-violet-200/75 bg-violet-300/75" : index < 38 ? "border-cyan-200/70 bg-cyan-300/75" : "border-slate-500/40 bg-slate-500/45") : index < coverage ? "border-amber-200/70 bg-amber-300/70" : "border-slate-700/70 bg-slate-800/80";
                return <span key={index} className={`h-3 rounded-sm border transition-colors duration-300 motion-reduce:transition-none sm:h-4 ${style}`} />;
              })}
            </div>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              <Box title="How were calls selected?" body="Random sample · Call duration · Existing customer score" />
              <Box title="What happens in the calls nobody selected?" body="That question turned ASR and NLP from a capability demo into a product problem." />
            </div>
            <button type="button" onClick={runTriage} className="mt-5 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-cyan-300 px-5 text-sm font-semibold text-slate-950">Run AI-assisted triage <MousePointer2 className="h-4 w-4" /></button>
            <div aria-live="polite" className="mt-5 rounded-md border border-white/10 bg-white/[0.035] p-4">
              {triageRun ? <><Label>Illustrative synthetic result</Label><div className="mt-4 grid gap-3 md:grid-cols-4"><Stat value="62" label="Routine" /><Stat value="21" label="Review suggested" /><Stat value="9" label="High-priority signal" /><Stat value="8" label="Uncertain" /></div><p className="mt-4 text-lg font-semibold text-white">The model does not replace the reviewer here. It changes the queue.</p></> : <p className="text-sm leading-6 text-slate-400">Run the triage to see how a synthetic set of 100 calls becomes a smaller review queue.</p>}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div><Label tone="warm">The Product Decision</Label><h2 className="mt-4 text-4xl font-semibold tracking-normal text-white">We did not start with full automation.</h2><p className="mt-5 text-lg leading-8 text-slate-400">The broader vision included more ambitious contact-center automation. But a broad AI vision is not an MVP.</p><p className="mt-5 leading-7 text-slate-400">My bias was to find the first workflow where the AI capability could change an operating process, not just create an impressive demo.</p></div>
          <div className="rounded-lg border border-white/10 bg-white/[0.035] p-5"><Box title="Broad contact-center vision" body="Automatic answering · Outbound automation · Call classification · Monitoring and trends · Quality monitoring" /><div className="py-3 text-center text-2xl text-slate-500">↓</div><Box title="Customer and market learning" body="Stakeholder conversations · Benchmarking global product directions · Prototype exploration · Operational workflow analysis" /><div className="py-3 text-center text-2xl text-slate-500">↓</div><Box title="Initial focus: Quality monitoring" body="The pain already existed, the reviewer already had a job to do, and ASR/NLP capabilities could be inserted without requiring the entire contact center to change at once." /></div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#07111f] px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <Label>Interactive Reconstruction</Label><h2 className="mt-4 text-4xl font-semibold tracking-normal text-white md:text-5xl">A score was not a product.</h2><p className="mt-5 text-lg leading-8 text-slate-400">The reviewer still needed to hear the call, read the transcript, understand the context, and continue the QA workflow.</p>
          <div className="mt-8 rounded-lg border border-white/10 bg-[#050914]">
            <div className="border-b border-white/10 p-4 md:p-5"><Label>Quality review workspace</Label><p className="mt-1 text-sm text-slate-400">Modern reconstruction of the historic workflow logic</p></div>
            <div className="grid lg:grid-cols-[0.78fr_1.22fr]">
              <div className="border-b border-white/10 p-4 md:p-5 lg:border-b-0 lg:border-r"><h3 className="flex items-center gap-2 font-semibold text-white"><FileSearch className="h-5 w-5 text-cyan-200" />Review queue</h3><div className="mt-4 grid gap-3">{calls.map((call) => <button key={call.id} type="button" onClick={() => { setCallId(call.id); trackEvent(analyticsEvents.switchDemoTab, { demo: "ccai_workflow", tab: call.id }); }} className={`rounded-md border p-4 text-left ${callId === call.id ? "border-cyan-300/50 bg-cyan-300/10" : "border-white/10 bg-white/[0.035]"}`}><div className="flex justify-between"><span className="font-semibold text-white">{call.id}</span><span className="text-sm text-slate-400">{call.duration}</span></div><p className="mt-2 text-sm text-slate-300">{call.reason}</p><p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-200">{call.status}</p></button>)}</div></div>
              <div className="p-4 md:p-5"><div className="grid gap-4 xl:grid-cols-[1fr_0.75fr]"><div><div className="rounded-lg border border-white/10 bg-white/[0.035] p-4"><p className="font-semibold text-white">{selectedCall.summary}</p><p className="mt-1 text-sm text-slate-400">{selectedCall.date}</p><div className="mt-4 flex flex-wrap items-center gap-3"><button type="button" aria-label={`Start playback simulation for ${selectedCall.id}`} onClick={() => trackEvent(analyticsEvents.playDemo, { demo: "ccai_workflow", action: "playback_simulation", call_id: selectedCall.id })} className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-300 text-slate-950"><Play className="h-4 w-4 fill-current" /></button><Pause className="h-4 w-4 text-slate-500" /><div className="h-2 w-40 overflow-hidden rounded-full bg-white/10"><div className="h-full w-[54%] rounded-full bg-cyan-300" /></div><span className="text-sm text-slate-400">{selectedCall.duration}</span></div></div><div className="mt-4 rounded-lg border border-white/10 bg-white/[0.035] p-4"><h4 className="flex items-center gap-2 font-semibold text-white"><MessageSquareText className="h-5 w-5 text-cyan-200" />Transcript</h4>{selectedCall.transcript.map(([speaker, text]) => <div key={`${speaker}-${text}`} className="mt-3 rounded-md bg-[#050914] p-3"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-200">{speaker}</p><p className="mt-1 text-sm leading-6 text-slate-300">{text}</p></div>)}</div></div><div className="grid content-start gap-4"><Panel title="ASR or model-derived signals" items={selectedCall.signals} /><Box title="Reviewer workflow" body="Confirm review · Adjust score · Mark for follow-up · Continue QA form" /><Box title="The system helps with" body="Transcription · Initial scoring signals · Call prioritization · Topic or pattern extraction" /><Box title="The reviewer decides" body="Final QA assessment · Score adjustment · Follow-up need · Coaching or operational action" /></div></div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8"><div className="mx-auto max-w-7xl"><Label tone="warm">Product Decisions</Label><h2 className="mt-4 max-w-4xl text-4xl font-semibold tracking-normal text-white md:text-5xl">Three decisions mattered more than the model demo.</h2>{["Start with quality monitoring, not full automation", "Put AI inside the review flow", "Measure the operating workflow"].map((title, index) => <div key={title} className="mt-6 grid gap-4 border-t border-white/10 pt-6 md:grid-cols-[8rem_1fr]"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-100">Decision {String(index + 1).padStart(2, "0")}</p><div><h3 className="text-2xl font-semibold text-white">{title}</h3><p className="mt-3 max-w-3xl leading-7 text-slate-400">{index === 0 ? "Quality monitoring presented a sharper problem, an existing user, and a faster route to an MVP." : index === 1 ? "A score returned by an API was not enough. The reviewer needed playback, transcript, call context, score, and the next review step in one place." : "The product evidence had to move from model output to operating value."}</p></div></div>)}</div></section>

      <section className="border-y border-white/10 bg-white/[0.025] px-5 py-16 md:px-8"><div className="mx-auto max-w-7xl"><Label>Operating Evidence</Label><h2 className="mt-4 max-w-4xl text-4xl font-semibold tracking-normal text-white md:text-5xl">The product moved beyond a prototype.</h2><div className="mt-10 grid gap-4 md:grid-cols-3"><Metric value="18K+" label="Daily calls" detail="Handled through the ASR workflow" /><Metric value="35%" label="Review / reporting throughput" detail="Improvement in the operational workflow" /><Metric value="2.15x" label="Call-scoring accuracy" detail="Improvement" /></div><p className="mt-6 max-w-3xl text-sm leading-6 text-slate-500">These are historical operating signals from my documented product work. The interface on this page is a synthetic reconstruction, not the original production system.</p></div></section>

      <section id="rethink" className="px-5 py-16 md:px-8"><div className="mx-auto max-w-7xl"><Label>2020 → 2026</Label><h2 className="mt-4 text-4xl font-semibold tracking-normal text-white md:text-6xl">The model layer changed dramatically.</h2><p className="mt-5 text-3xl font-semibold text-cyan-100">The product question did not disappear.</p><p className="mt-6 text-lg leading-8 text-slate-400">In 2020, much of the work was about combining specialized ASR and NLP capabilities with a usable operational workflow. By 2026, modern models can interpret far more context, generate structured reasoning, use tools, and in some systems take actions across software.</p><div className="mt-10 rounded-lg border border-white/10 bg-white/[0.035] p-4"><div className="inline-flex rounded-md border border-white/10 bg-[#050914] p-1">{(["2020", "2026"] as Era[]).map((option) => <button key={option} type="button" onClick={() => { setEra(option); trackEvent(analyticsEvents.ccaiEraSwitch, { era: option }); }} className={`rounded px-4 py-2 text-sm font-semibold ${era === option ? "bg-cyan-300 text-slate-950" : "text-slate-300"}`}>{option} product logic</button>)}</div><div className="mt-6 grid gap-3 md:grid-cols-3 xl:grid-cols-6">{eraSteps[era].map((step, index) => <div key={step} className="rounded-md border border-white/10 bg-[#050914] p-4"><p className="text-sm font-semibold text-cyan-200">{String(index + 1).padStart(2, "0")}</p><p className="mt-2 text-sm leading-6 text-slate-300">{step}</p></div>)}</div><div className="mt-6 rounded-lg border border-amber-300/20 bg-amber-300/10 p-5"><p className="text-xl font-semibold text-white">One thing I would resist in 2026 is calling every intelligent workflow an agent.</p><p className="mt-3 leading-7 text-slate-300">If the system only classifies, scores, or summarizes, I would design it as a strong AI workflow. I would introduce agentic behavior only where tool use and multi-step action create real product value.</p></div></div></div></section>

      <section className="border-y border-white/10 bg-[#07111f] px-5 py-16 md:px-8"><div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.75fr_1.25fr]"><div><Label>What should the system be allowed to do?</Label><h2 className="mt-4 text-4xl font-semibold tracking-normal text-white">Modern AI capability does not imply universal autonomy.</h2><p className="mt-5 leading-7 text-slate-400">My current view is that autonomy should be designed around the consequence and reversibility of the action, not around how impressive the model looks.</p></div><div className="rounded-lg border border-white/10 bg-[#050914] p-4"><div className="grid gap-2 md:grid-cols-3">{(["observe", "recommend", "act"] as Mode[]).map((option) => <button key={option} type="button" onClick={() => { setMode(option); trackEvent(analyticsEvents.ccaiAutonomyMode, { mode: option }); }} className={`rounded-md border p-4 text-left ${mode === option ? "border-cyan-300/50 bg-cyan-300/10" : "border-white/10 bg-white/[0.035]"}`}>{modeCopy[option][0]}</button>)}</div><div className="mt-5 rounded-lg border border-white/10 bg-white/[0.035] p-5"><h3 className="text-2xl font-semibold text-white">{modeCopy[mode][0]}</h3><p className="mt-3 leading-7 text-slate-400">{modeCopy[mode][1]}</p><Panel title="The system may" items={modeCopy[mode][2]} />{mode === "act" && <div className="mt-4 grid gap-3 md:grid-cols-3"><Box title="Allowed automatically" body="Create low-risk review task" /><Box title="Needs review" body="Update final QA score" /><Box title="Blocked without explicit approval" body="Trigger sensitive employee or customer consequences" /></div>}</div></div></div></section>

      <section className="px-5 py-16 md:px-8"><div className="mx-auto max-w-7xl"><Label>If I Started Again Today</Label><h2 className="mt-4 max-w-4xl text-4xl font-semibold tracking-normal text-white md:text-5xl">I would keep the workflow focus. I would change the system around it.</h2><div className="mt-10 grid gap-5 md:grid-cols-2"><Box title="Evidence before summary" body="A confident sentence from a model is not the same as reviewable evidence." /><Box title="Evaluate the product decision" body="I would test whether the system surfaces the right calls and whether reviewers correct its suggestions." /><Box title="Use autonomy selectively" body="Classification, scoring, summarization, and recommendation do not automatically need an agent." /><Box title="Design the recovery path early" body="The workflow has to absorb mistakes." /></div></div></section>
      <section className="border-y border-white/10 bg-white/[0.025] px-5 py-16 md:px-8"><div className="mx-auto max-w-4xl"><Label tone="warm">Looking Back</Label><h2 className="mt-4 text-4xl font-semibold tracking-normal text-white md:text-5xl">This is one of the product problems that stayed with me.</h2><div className="mt-6 grid gap-5 text-lg leading-8 text-slate-400"><p>I started this work before LLMs became the default interface for AI products.</p><p>At the time, we were combining ASR and NLP capabilities with contact-center workflows. The model layer was difficult, but productizing it created a different set of questions.</p><p>Which workflow should we start with? What does the reviewer need to see? Where does the model output enter the job? What do we measure when the demo is over?</p><p className="text-2xl font-semibold leading-9 text-white">The model capability is the beginning. The product starts when it changes a real workflow.</p></div></div></section>
      <section className="px-5 py-16 md:px-8"><div className="mx-auto grid max-w-7xl gap-8 rounded-lg border border-white/10 bg-white/[0.035] p-6 md:p-8 lg:grid-cols-[1fr_0.55fr]"><div><Label>Related Thinking</Label><h2 className="mt-4 text-3xl font-semibold text-white">From model output to product system.</h2><p className="mt-4 leading-7 text-slate-400">My recent article, The Agentic AI Product Gap, looks at a more modern version of the same product tension.</p><blockquote className="mt-5 border-l-2 border-cyan-300 pl-4 text-lg font-semibold leading-8 text-white">“An agent is not ready when the model looks smart. It is ready when the workflow can absorb its mistakes.”</blockquote></div><TrackedLink href="/writing/the-agentic-ai-product-gap" name="read_agentic_ai_product_gap">Read The Agentic AI Product Gap <ArrowRight className="h-4 w-4" /></TrackedLink></div></section>
      <section className="px-5 pb-16 md:px-8"><div className="mx-auto max-w-5xl rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-6 md:p-8"><Label>Continue The Conversation</Label><h2 className="mt-4 text-4xl font-semibold tracking-normal text-white">The model layer changed. The product question did not.</h2><p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">How do you turn advanced AI capability into something people can trust inside real work?</p><p className="mt-3 max-w-3xl text-lg leading-8 text-slate-300">That is the kind of product problem I like working on.</p><div className="mt-7 flex flex-wrap gap-3"><TrackedLink href="/contact" name="discuss_this_work">Discuss this work <Mail className="h-4 w-4" /></TrackedLink><TrackedLink href="/projects" name="view_more_projects" variant="secondary">View more projects</TrackedLink><a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center justify-center rounded-md px-2 text-sm font-semibold text-cyan-100 hover:text-cyan-50">LinkedIn</a></div></div></section>
    </>
  );
}

function Label({ children, tone = "cool" }: { children: React.ReactNode; tone?: "cool" | "warm" }) {
  return <p className={`text-sm font-semibold uppercase tracking-[0.18em] ${tone === "warm" ? "text-amber-100" : "text-cyan-200"}`}>{children}</p>;
}

function TrackedLink({ href, name, children, variant = "primary" }: { href: string; name: string; children: React.ReactNode; variant?: "primary" | "secondary" | "quiet" }) {
  const className = variant === "primary" ? "inline-flex h-12 items-center justify-center gap-2 rounded-md bg-cyan-300 px-5 text-sm font-semibold text-slate-950 hover:bg-cyan-200" : variant === "secondary" ? "inline-flex h-12 items-center justify-center gap-2 rounded-md border border-cyan-300/25 px-5 text-sm font-semibold text-cyan-100 hover:bg-cyan-300/10" : "inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/15 px-5 text-sm font-semibold text-white hover:bg-cyan-300/10";
  return <Link href={href} onClick={() => trackEvent(analyticsEvents.clickPrimaryCta, { cta_name: name, cta_location: "ccai_v2", destination: href })} className={className}>{children}</Link>;
}

function Box({ title, body }: { title: string; body: string }) {
  return <div className="rounded-lg border border-white/10 bg-white/[0.035] p-4"><h3 className="font-semibold text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{body}</p></div>;
}

function Stat({ value, label }: { value: string; label: string }) {
  return <div><p className="text-2xl font-semibold text-white">{value}</p><p className="text-sm text-slate-400">{label}</p></div>;
}

function Panel({ title, items }: { title: string; items: readonly string[] }) {
  return <div className="mt-4 rounded-lg border border-white/10 bg-white/[0.035] p-4"><h4 className="font-semibold text-white">{title}</h4><div className="mt-3 grid gap-2">{items.map((item) => <span key={item} className="flex items-start gap-2 text-sm leading-6 text-slate-400"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-cyan-200" />{item}</span>)}</div></div>;
}

function Metric({ value, label, detail }: { value: string; label: string; detail: string }) {
  return <div className="rounded-lg border border-white/10 bg-[#050914] p-5"><p className="text-4xl font-semibold text-white">{value}</p><p className="mt-3 text-sm font-semibold uppercase tracking-[0.16em] text-cyan-200">{label}</p><p className="mt-3 leading-7 text-slate-400">{detail}</p></div>;
}

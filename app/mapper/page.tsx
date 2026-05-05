"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactElement } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Eye, RotateCcw, Save, Sparkles } from "lucide-react";
import { AutonomyBoundaryMap } from "@/components/AutonomyBoundaryMap";
import { BriefPreview } from "@/components/BriefPreview";
import { ExportGate } from "@/components/ExportGate";
import { HealthSignalsDashboard } from "@/components/HealthSignalsDashboard";
import { ProgressStepper } from "@/components/ProgressStepper";
import { RiskShapeMatrix } from "@/components/RiskShapeMatrix";
import { StackDiagram } from "@/components/StackDiagram";
import { WizardLayout } from "@/components/WizardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { domainTemplates, emptyState, sampleSupportRefundAgent } from "@/data/templates";
import { generateBrief } from "@/lib/briefGenerator";
import { asList } from "@/lib/utils";
import type { AutonomyLevel, Facing, MapperState } from "@/types";

const storageKey = "agentic-product-stack-mapper-state-v1";

const steps = [
  { id: "quick", label: "Quick Start" },
  { id: "brief", label: "Brief Preview" },
  { id: "workflow", label: "Workflow Fit" },
  { id: "risk", label: "Risk Shape" },
  { id: "actions", label: "Action Surface" },
  { id: "autonomy", label: "Autonomy" },
  { id: "evals", label: "Evaluation Gates" },
  { id: "human", label: "Human Control" },
  { id: "health", label: "Health Signals" },
  { id: "rollback", label: "Rollback" },
  { id: "governance", label: "Governance" },
  { id: "value", label: "Value Loop" },
  { id: "export", label: "Export" }
];

const autonomyLevels: AutonomyLevel[] = [
  "Agent can do alone",
  "Agent can draft, human confirms",
  "Agent can recommend, human approves",
  "Agent must escalate",
  "Agent must never do this"
];

function updateList(value: string) {
  return asList(value);
}

function TextList({
  label,
  value,
  placeholder,
  onChange,
  suggestion
}: {
  label: string;
  value: string[];
  placeholder: string;
  onChange: (value: string[]) => void;
  suggestion?: string[];
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <Label>{label}</Label>
        {suggestion && (
          <Button type="button" size="sm" variant="ghost" onClick={() => onChange(suggestion)}>
            Use suggested answer
          </Button>
        )}
      </div>
      <Textarea value={value.join("\n")} onChange={(event) => onChange(updateList(event.target.value))} placeholder={placeholder} />
      <p className="text-xs text-muted-foreground">Add one per line or separate with commas.</p>
    </div>
  );
}

function Chips({
  options,
  selected,
  onChange
}: {
  options: string[];
  selected: string[];
  onChange: (value: string[]) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const active = selected.includes(option);
        return (
          <button
            type="button"
            key={option}
            onClick={() => onChange(active ? selected.filter((item) => item !== option) : [...selected, option])}
            className={`rounded-full border px-3 py-1.5 text-sm font-semibold transition ${
              active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:bg-muted"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

function ModuleActions({
  current,
  onComplete,
  onNext
}: {
  current: string;
  onComplete: (id: string) => void;
  onNext: () => void;
}) {
  return (
    <div className="mt-6 flex flex-wrap gap-2">
      <Button
        type="button"
        onClick={() => {
          onComplete(current);
          onNext();
        }}
      >
        Save and continue
        <ArrowRight className="h-4 w-4" />
      </Button>
      <Button type="button" variant="outline" onClick={onNext}>
        Skip for now
      </Button>
    </div>
  );
}

export default function MapperPage() {
  const [state, setState] = useState<MapperState>(emptyState);
  const [activeStep, setActiveStep] = useState("quick");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("sample") === "refund") {
      setState(sampleSupportRefundAgent);
      setActiveStep("brief");
      setLoaded(true);
      return;
    }
    const stored = window.localStorage.getItem(storageKey);
    if (stored) {
      try {
        setState(JSON.parse(stored));
      } catch {
        setState(emptyState);
      }
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) window.localStorage.setItem(storageKey, JSON.stringify(state));
  }, [state, loaded]);

  const brief = useMemo(() => generateBrief(state), [state]);
  const currentIndex = steps.findIndex((step) => step.id === activeStep);
  const template = domainTemplates[state.quickStart.workflowDomain as keyof typeof domainTemplates] || domainTemplates.other;

  function patch(patchState: Partial<MapperState>) {
    setState((current) => ({ ...current, ...patchState }));
  }

  function complete(id: string) {
    setState((current) => ({
      ...current,
      completedModules: current.completedModules.includes(id)
        ? current.completedModules
        : [...current.completedModules, id]
    }));
  }

  function next() {
    setActiveStep(steps[Math.min(currentIndex + 1, steps.length - 1)].id);
  }

  function previous() {
    setActiveStep(steps[Math.max(currentIndex - 1, 0)].id);
  }

  function reset() {
    window.localStorage.removeItem(storageKey);
    setState(emptyState);
    setActiveStep("quick");
  }

  const livePreview = (
    <Card className="shadow-none">
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <div>
            <CardTitle className="flex items-center gap-2 text-base">
              <Eye className="h-4 w-4 text-primary" />
              Live brief signal
            </CardTitle>
            <CardDescription>You can start simple. More detail will make the brief more precise.</CardDescription>
          </div>
          <Badge>{brief.recommendation}</Badge>
        </div>
      </CardHeader>
      <CardContent className="grid gap-3 md:grid-cols-3">
        {brief.sections.slice(0, 3).map((section) => (
          <div key={section.title} className="rounded-md bg-muted/65 p-3">
            <p className="text-sm font-semibold">{section.title}</p>
            <p className="mt-1 line-clamp-3 text-xs leading-5 text-muted-foreground">{section.body}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  const stepContent = {
    quick: (
      <WizardLayout
        title="Quick Start Mode"
        description="Capture the minimum inputs and get a useful first draft in 3 to 5 minutes."
        step="Agent Idea"
        preview={livePreview}
      >
        <div className="mb-5 flex flex-wrap gap-2">
          <Button type="button" variant="accent" onClick={() => setState(sampleSupportRefundAgent)}>
            <Sparkles className="h-4 w-4" />
            Try with sample support refund agent
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              const suggested = domainTemplates[state.quickStart.workflowDomain as keyof typeof domainTemplates] || domainTemplates.other;
              patch({
                quickStart: {
                  ...state.quickStart,
                  systemsTouched: suggested.systems,
                  mainJob: suggested.jobs[0],
                  biggestRisk: suggested.risks[0]
                }
              });
            }}
          >
            Use domain suggestions
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Agent name</Label>
            <Input
              value={state.quickStart.agentName}
              onChange={(event) => patch({ quickStart: { ...state.quickStart, agentName: event.target.value } })}
              placeholder="Refund Resolution Copilot"
            />
          </div>
          <div className="space-y-2">
            <Label>Workflow domain</Label>
            <Select
              value={state.quickStart.workflowDomain}
              onChange={(event) =>
                patch({ quickStart: { ...state.quickStart, workflowDomain: event.target.value } })
              }
            >
              {Object.entries(domainTemplates).map(([key, item]) => (
                <option value={key} key={key}>
                  {item.label}
                </option>
              ))}
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Primary user</Label>
            <Input
              value={state.quickStart.primaryUser}
              onChange={(event) => patch({ quickStart: { ...state.quickStart, primaryUser: event.target.value } })}
              placeholder="Support specialist, account executive, finance analyst"
            />
          </div>
          <div className="space-y-2">
            <Label>Audience</Label>
            <Select
              value={state.quickStart.facing}
              onChange={(event) =>
                patch({ quickStart: { ...state.quickStart, facing: event.target.value as Facing } })
              }
            >
              <option>Internal</option>
              <option>Customer-facing</option>
              <option>Both</option>
            </Select>
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Main job the agent should do</Label>
            <Input
              value={state.quickStart.mainJob}
              onChange={(event) => patch({ quickStart: { ...state.quickStart, mainJob: event.target.value } })}
              placeholder={template.jobs[0]}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Systems or tools it may touch</Label>
            <Chips
              options={template.systems}
              selected={state.quickStart.systemsTouched}
              onChange={(value) => patch({ quickStart: { ...state.quickStart, systemsTouched: value } })}
            />
            <Input
              className="mt-2"
              value={state.quickStart.systemsTouched.join(", ")}
              onChange={(event) =>
                patch({ quickStart: { ...state.quickStart, systemsTouched: updateList(event.target.value) } })
              }
              placeholder="CRM, billing, data warehouse"
            />
          </div>
          <div className="space-y-2">
            <Label>Biggest perceived risk</Label>
            <Input
              value={state.quickStart.biggestRisk}
              onChange={(event) => patch({ quickStart: { ...state.quickStart, biggestRisk: event.target.value } })}
              placeholder={template.risks[0]}
            />
          </div>
          <div className="space-y-2">
            <Label>Desired business outcome</Label>
            <Input
              value={state.quickStart.desiredOutcome}
              onChange={(event) => patch({ quickStart: { ...state.quickStart, desiredOutcome: event.target.value } })}
              placeholder="Reduce cycle time by 30% while keeping wrong actions below 1%"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Short description</Label>
            <Textarea
              value={state.quickStart.shortDescription}
              onChange={(event) =>
                patch({ quickStart: { ...state.quickStart, shortDescription: event.target.value } })
              }
              placeholder="One or two sentences. Keep confidential and customer-identifying data out."
            />
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <Button
            type="button"
            onClick={() => {
              complete("quick");
              setActiveStep("brief");
            }}
          >
            Generate first draft brief
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </WizardLayout>
    ),
    brief: (
      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        <aside className="no-print space-y-4">
          <Card className="shadow-editorial">
            <CardHeader>
              <CardTitle>Deepen this brief</CardTitle>
              <CardDescription>Pick only the modules that matter now. Every module updates the same brief.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {steps.slice(2, 12).map((step) => (
                <Button key={step.id} type="button" variant="outline" className="w-full justify-start" onClick={() => setActiveStep(step.id)}>
                  {step.label}
                </Button>
              ))}
            </CardContent>
          </Card>
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle className="text-base">Stack progress</CardTitle>
            </CardHeader>
            <CardContent>
              <StackDiagram completed={state.completedModules} />
            </CardContent>
          </Card>
        </aside>
        <div className="space-y-5">
          <BriefPreview brief={brief} />
          <div className="no-print flex flex-wrap gap-2">
            <Button type="button" onClick={() => setActiveStep("export")}>
              Continue to export
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button type="button" variant="outline" onClick={() => setActiveStep("workflow")}>
              Deepen this brief
            </Button>
          </div>
        </div>
      </div>
    ),
    workflow: (
      <WizardLayout title="Refine Workflow Fit" description="Find where autonomy creates value and where deterministic automation is enough." step="Workflow Fit" preview={livePreview}>
        <div className="grid gap-4 md:grid-cols-2">
          <TextList label="Current workflow steps" value={state.workflowFit.currentSteps} onChange={(value) => patch({ workflowFit: { ...state.workflowFit, currentSteps: value } })} placeholder="Receive request, verify data, apply policy" suggestion={["Receive request", "Gather context", "Check policy", "Decide next action", "Update system", "Notify user"]} />
          <TextList label="Pain points" value={state.workflowFit.painPoints} onChange={(value) => patch({ workflowFit: { ...state.workflowFit, painPoints: value } })} placeholder="Context switching, slow approvals" suggestion={["Context switching", "Policy ambiguity", "Slow approvals"]} />
          <TextList label="Repetitive steps" value={state.workflowFit.repetitiveSteps} onChange={(value) => patch({ workflowFit: { ...state.workflowFit, repetitiveSteps: value } })} placeholder="Lookup, summarize, draft" suggestion={["Lookup records", "Summarize context", "Draft response"]} />
          <TextList label="Ambiguous steps" value={state.workflowFit.ambiguousSteps} onChange={(value) => patch({ workflowFit: { ...state.workflowFit, ambiguousSteps: value } })} placeholder="Exceptions, judgment calls" />
          <TextList label="Decision points" value={state.workflowFit.decisionPoints} onChange={(value) => patch({ workflowFit: { ...state.workflowFit, decisionPoints: value } })} placeholder="Approve, reject, escalate" />
          <TextList label="Human judgment points" value={state.workflowFit.humanJudgmentPoints} onChange={(value) => patch({ workflowFit: { ...state.workflowFit, humanJudgmentPoints: value } })} placeholder="Trust impact, edge cases, high-value customers" />
          <TextList label="Systems involved" value={state.workflowFit.systemsInvolved} onChange={(value) => patch({ workflowFit: { ...state.workflowFit, systemsInvolved: value } })} placeholder="CRM, ticketing, billing" suggestion={state.quickStart.systemsTouched} />
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label>Cost of delay</Label>
              <Input value={state.workflowFit.costOfDelay} onChange={(event) => patch({ workflowFit: { ...state.workflowFit, costOfDelay: event.target.value } })} placeholder="Repeat contact, SLA breach, lost conversion" />
            </div>
            <div className="space-y-2">
              <Label>Cost of error</Label>
              <Input value={state.workflowFit.costOfError} onChange={(event) => patch({ workflowFit: { ...state.workflowFit, costOfError: event.target.value } })} placeholder="Customer harm, rework, compliance review" />
            </div>
          </div>
        </div>
        <ModuleActions current="workflow" onComplete={complete} onNext={next} />
      </WizardLayout>
    ),
    risk: (
      <WizardLayout title="Map Risk Shape" description="Separate severity, reversibility, detection, and ownership so risk is actionable." step="Risk Shape" preview={<RiskShapeMatrix state={state} />}>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["Customer impact", "customerImpact"],
            ["Financial impact", "financialImpact"],
            ["Operational impact", "operationalImpact"],
            ["Legal or compliance impact", "legalImpact"],
            ["Trust impact", "trustImpact"]
          ].map(([label, key]) => (
            <div className="space-y-2" key={key}>
              <Label>{label}</Label>
              <Select value={state.riskShape[key as keyof typeof state.riskShape] as string} onChange={(event) => patch({ riskShape: { ...state.riskShape, [key]: event.target.value } })}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </Select>
            </div>
          ))}
          <div className="space-y-2">
            <Label>Data sensitivity</Label>
            <Select value={state.riskShape.dataSensitivity} onChange={(event) => patch({ riskShape: { ...state.riskShape, dataSensitivity: event.target.value } })}>
              <option>Public data</option>
              <option>Internal business data</option>
              <option>Customer personal data</option>
              <option>Regulated or confidential data</option>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Reversibility</Label>
            <Select value={state.riskShape.reversibility} onChange={(event) => patch({ riskShape: { ...state.riskShape, reversibility: event.target.value } })}>
              <option>Fully reversible</option>
              <option>Partially reversible</option>
              <option>Hard to reverse</option>
              <option>Irreversible</option>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Detection speed</Label>
            <Select value={state.riskShape.detectionSpeed} onChange={(event) => patch({ riskShape: { ...state.riskShape, detectionSpeed: event.target.value } })}>
              <option>Immediate</option>
              <option>Same day</option>
              <option>Weekly</option>
              <option>After customer complaint</option>
            </Select>
          </div>
          <div className="space-y-2 md:col-span-3">
            <Label>Owner of failure</Label>
            <Input value={state.riskShape.failureOwner} onChange={(event) => patch({ riskShape: { ...state.riskShape, failureOwner: event.target.value } })} placeholder="Support operations manager, compliance owner, product lead" />
          </div>
        </div>
        <ModuleActions current="risk" onComplete={complete} onNext={next} />
      </WizardLayout>
    ),
    actions: (
      <WizardLayout title="Define Action Surface" description="Map what the agent can read, write, call, send, and change." step="Action Surface" preview={livePreview}>
        <div className="grid gap-4 md:grid-cols-2">
          <TextList label="Read systems" value={state.actionSurface.readSystems} onChange={(value) => patch({ actionSurface: { ...state.actionSurface, readSystems: value } })} placeholder="CRM, ticketing, docs" suggestion={state.quickStart.systemsTouched} />
          <TextList label="Write systems" value={state.actionSurface.writeSystems} onChange={(value) => patch({ actionSurface: { ...state.actionSurface, writeSystems: value } })} placeholder="Ticketing only, task tracker" />
          <TextList label="Tools the agent can call" value={state.actionSurface.tools} onChange={(value) => patch({ actionSurface: { ...state.actionSurface, tools: value } })} placeholder="Policy lookup, calculator, summarizer" suggestion={["Knowledge retrieval", "Checklist validation", "Draft generation", "Escalation router"]} />
          <div className="space-y-2">
            <Label>Action abilities</Label>
            {[
              ["External communication ability", "externalCommunication"],
              ["Record update ability", "recordUpdates"],
              ["Financial action ability", "financialActions"],
              ["Customer-facing action ability", "customerFacingActions"]
            ].map(([label, key]) => (
              <label key={key} className="flex items-center gap-3 rounded-md border border-border bg-card p-3 text-sm">
                <input type="checkbox" checked={Boolean(state.actionSurface[key as keyof typeof state.actionSurface])} onChange={(event) => patch({ actionSurface: { ...state.actionSurface, [key]: event.target.checked } })} />
                {label}
              </label>
            ))}
          </div>
        </div>
        <ModuleActions current="actions" onComplete={complete} onNext={next} />
      </WizardLayout>
    ),
    autonomy: (
      <WizardLayout title="Define Autonomy Boundaries" description="Classify actions one by one so autonomy is explicit and reviewable." step="Autonomy Boundaries" preview={<AutonomyBoundaryMap actions={state.autonomyBoundaries} />}>
        <div className="space-y-4">
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              patch({
                autonomyBoundaries: [
                  ...state.autonomyBoundaries,
                  { id: crypto.randomUUID(), action: "", level: "Agent can recommend, human approves", rationale: "" }
                ]
              })
            }
          >
            Add action
          </Button>
          {state.autonomyBoundaries.length === 0 && (
            <Button
              type="button"
              variant="ghost"
              onClick={() =>
                patch({
                  autonomyBoundaries: [
                    { id: "recommend", action: "Recommend next action", level: "Agent can do alone", rationale: "Low impact recommendation only." },
                    { id: "draft", action: "Draft user-facing message", level: "Agent can draft, human confirms", rationale: "Human reviews tone and accuracy." },
                    { id: "update", action: "Update system of record", level: "Agent can recommend, human approves", rationale: "Write action needs approval." },
                    { id: "exception", action: "Handle policy exception", level: "Agent must escalate", rationale: "Exception ownership belongs to a human." }
                  ]
                })
              }
            >
              Use suggested action set
            </Button>
          )}
          <div className="space-y-3">
            {state.autonomyBoundaries.map((item, index) => (
              <Card key={item.id} className="shadow-none">
                <CardContent className="grid gap-3 p-4 md:grid-cols-[1fr_260px]">
                  <Input value={item.action} onChange={(event) => {
                    const nextActions = [...state.autonomyBoundaries];
                    nextActions[index] = { ...item, action: event.target.value };
                    patch({ autonomyBoundaries: nextActions });
                  }} placeholder="Action" />
                  <Select value={item.level} onChange={(event) => {
                    const nextActions = [...state.autonomyBoundaries];
                    nextActions[index] = { ...item, level: event.target.value as AutonomyLevel };
                    patch({ autonomyBoundaries: nextActions });
                  }}>
                    {autonomyLevels.map((level) => <option key={level}>{level}</option>)}
                  </Select>
                  <Input className="md:col-span-2" value={item.rationale} onChange={(event) => {
                    const nextActions = [...state.autonomyBoundaries];
                    nextActions[index] = { ...item, rationale: event.target.value };
                    patch({ autonomyBoundaries: nextActions });
                  }} placeholder="Rationale" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <ModuleActions current="autonomy" onComplete={complete} onNext={next} />
      </WizardLayout>
    ),
    evals: (
      <WizardLayout title="Build Evaluation Gates" description="Define the proof needed before the agent gains more autonomy." step="Evaluation Gates" preview={livePreview}>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <Label>Definition of good outcome</Label>
            <Textarea value={state.evaluationGates.goodOutcome} onChange={(event) => patch({ evaluationGates: { ...state.evaluationGates, goodOutcome: event.target.value } })} placeholder="Correct decision, accurate rationale, no unauthorized action, clear user communication." />
          </div>
          <TextList label="Known edge cases" value={state.evaluationGates.edgeCases} onChange={(value) => patch({ evaluationGates: { ...state.evaluationGates, edgeCases: value } })} placeholder="Missing data, policy conflict, high-value customer" suggestion={["Missing data", "Policy conflict", "Low confidence", "High-value customer"]} />
          <TextList label="Unacceptable failures" value={state.evaluationGates.unacceptableFailures} onChange={(value) => patch({ evaluationGates: { ...state.evaluationGates, unacceptableFailures: value } })} placeholder="Unauthorized action, data leak, invented policy" suggestion={["Unauthorized action", "Personal data leak", "Invented policy", "Missed escalation"]} />
          <div className="space-y-2">
            <Label>Test data availability</Label>
            <Input value={state.evaluationGates.testDataAvailability} onChange={(event) => patch({ evaluationGates: { ...state.evaluationGates, testDataAvailability: event.target.value } })} placeholder="Historical tickets, labeled cases, synthetic edge cases" />
          </div>
          <div className="space-y-2">
            <Label>Reviewer role</Label>
            <Input value={state.evaluationGates.reviewerRole} onChange={(event) => patch({ evaluationGates: { ...state.evaluationGates, reviewerRole: event.target.value } })} placeholder="QA lead, compliance owner, product manager" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Business metric to improve</Label>
            <Input value={state.evaluationGates.businessMetric} onChange={(event) => patch({ evaluationGates: { ...state.evaluationGates, businessMetric: event.target.value } })} placeholder="Cycle time, rework rate, cost per task, customer satisfaction" />
          </div>
        </div>
        <ModuleActions current="evals" onComplete={complete} onNext={next} />
      </WizardLayout>
    ),
    human: (
      <WizardLayout title="Design Human Control" description="Decide where people review, approve, override, escalate, and resolve disputes." step="Human Control Design" preview={livePreview}>
        <div className="grid gap-4 md:grid-cols-2">
          <TextList label="Review points" value={state.humanControl.reviewPoints} onChange={(value) => patch({ humanControl: { ...state.humanControl, reviewPoints: value } })} placeholder="Before customer reply, before write action" suggestion={["Before customer impact", "Before financial action", "Before record changes"]} />
          <TextList label="Approval owners" value={state.humanControl.approvalOwners} onChange={(value) => patch({ humanControl: { ...state.humanControl, approvalOwners: value } })} placeholder="Manager, specialist, compliance" />
          <TextList label="Escalation triggers" value={state.humanControl.escalationTriggers} onChange={(value) => patch({ humanControl: { ...state.humanControl, escalationTriggers: value } })} placeholder="Low confidence, VIP, legal threat" suggestion={["Low confidence", "High impact", "Policy conflict", "Customer complaint"]} />
          <TextList label="Override options" value={state.humanControl.overrideOptions} onChange={(value) => patch({ humanControl: { ...state.humanControl, overrideOptions: value } })} placeholder="Edit, reject, escalate, pause" suggestion={["Edit", "Reject", "Escalate", "Pause agent for case"]} />
          <div className="space-y-2 md:col-span-2">
            <Label>Dispute handling</Label>
            <Textarea value={state.humanControl.disputeHandling} onChange={(event) => patch({ humanControl: { ...state.humanControl, disputeHandling: event.target.value } })} placeholder="Where contested outcomes go, who reviews them, and what evidence must be attached." />
          </div>
        </div>
        <ModuleActions current="human" onComplete={complete} onNext={next} />
      </WizardLayout>
    ),
    health: (
      <WizardLayout title="Add Runtime Health Signals" description="Choose the metrics that tell you if autonomy is helping, drifting, or causing damage." step="Runtime Health Signals" preview={<HealthSignalsDashboard signals={state.healthSignals} />}>
        <div className="grid gap-3 md:grid-cols-2">
          {state.healthSignals.map((signal, index) => (
            <div key={signal.id} className="rounded-md border border-border bg-card p-3">
              <label className="flex items-center gap-3 text-sm font-semibold">
                <input type="checkbox" checked={signal.selected} onChange={(event) => {
                  const nextSignals = [...state.healthSignals];
                  nextSignals[index] = { ...signal, selected: event.target.checked };
                  patch({ healthSignals: nextSignals });
                }} />
                {signal.label}
              </label>
              <Input className="mt-2" value={signal.threshold} onChange={(event) => {
                const nextSignals = [...state.healthSignals];
                nextSignals[index] = { ...signal, threshold: event.target.value };
                patch({ healthSignals: nextSignals });
              }} />
            </div>
          ))}
        </div>
        <ModuleActions current="health" onComplete={complete} onNext={next} />
      </WizardLayout>
    ),
    rollback: (
      <WizardLayout title="Add Damage Control and Rollback" description="Plan how the system pauses, reverses, corrects, communicates, and learns from failures." step="Damage Control and Rollback" preview={livePreview}>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Reversibility mechanism</Label>
            <Textarea value={state.damageControl.reversibilityMechanism} onChange={(event) => patch({ damageControl: { ...state.damageControl, reversibilityMechanism: event.target.value } })} placeholder="How actions are reversed or corrected." />
          </div>
          <div className="space-y-2">
            <Label>Kill switch owner</Label>
            <Input value={state.damageControl.killSwitchOwner} onChange={(event) => patch({ damageControl: { ...state.damageControl, killSwitchOwner: event.target.value } })} placeholder="Named operational owner" />
          </div>
          <TextList label="Pause conditions" value={state.damageControl.pauseConditions} onChange={(value) => patch({ damageControl: { ...state.damageControl, pauseConditions: value } })} placeholder="Wrong-action spike, tool outage" suggestion={["Wrong-action rate above threshold", "Policy retrieval outage", "Spike in complaints"]} />
          <div className="space-y-2">
            <Label>Customer notification path</Label>
            <Textarea value={state.damageControl.customerNotificationPath} onChange={(event) => patch({ damageControl: { ...state.damageControl, customerNotificationPath: event.target.value } })} placeholder="Who approves customer notices and when." />
          </div>
          <div className="space-y-2">
            <Label>Incident review process</Label>
            <Textarea value={state.damageControl.incidentReviewProcess} onChange={(event) => patch({ damageControl: { ...state.damageControl, incidentReviewProcess: event.target.value } })} placeholder="Review cadence, severity owner, evidence required." />
          </div>
          <div className="space-y-2">
            <Label>Compensation or correction path</Label>
            <Textarea value={state.damageControl.correctionPath} onChange={(event) => patch({ damageControl: { ...state.damageControl, correctionPath: event.target.value } })} placeholder="Correct record, notify user, add eval case, update policy." />
          </div>
        </div>
        <ModuleActions current="rollback" onComplete={complete} onNext={next} />
      </WizardLayout>
    ),
    governance: (
      <WizardLayout title="Add Governance Evidence" description="Make the product reviewable through logs, versions, eval records, and approvals." step="Governance Evidence" preview={livePreview}>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Customer-facing status</Label>
            <Select value={state.governanceEvidence.customerFacingStatus} onChange={(event) => patch({ governanceEvidence: { ...state.governanceEvidence, customerFacingStatus: event.target.value } })}>
              <option>Not customer-facing</option>
              <option>Customer-impacting, human mediated</option>
              <option>Directly customer-facing</option>
            </Select>
          </div>
          {[
            ["Personal data involvement", "personalData"],
            ["High-impact domain involvement", "highImpactDomain"],
            ["Version tracking", "versionTracking"],
            ["Eval result storage", "evalStorage"],
            ["Approval logging", "approvalLogging"],
            ["Data access logging", "dataAccessLogging"]
          ].map(([label, key]) => (
            <label key={key} className="flex items-center gap-3 rounded-md border border-border bg-card p-3 text-sm">
              <input type="checkbox" checked={Boolean(state.governanceEvidence[key as keyof typeof state.governanceEvidence])} onChange={(event) => patch({ governanceEvidence: { ...state.governanceEvidence, [key]: event.target.checked } })} />
              {label}
            </label>
          ))}
        </div>
        <ModuleActions current="governance" onComplete={complete} onNext={next} />
      </WizardLayout>
    ),
    value: (
      <WizardLayout title="Add Business Value Loop" description="Estimate value through task volume, cost, review rate, automation rate, rework, and measurable impact." step="Business Value Loop" preview={livePreview}>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["Monthly task volume", "monthlyTaskVolume"],
            ["Current handling time, minutes", "currentHandlingTime"],
            ["Current cost per task", "currentCostPerTask"],
            ["Expected automation rate", "expectedAutomationRate"],
            ["Expected human review rate", "expectedHumanReviewRate"],
            ["Estimated AI cost per task", "estimatedAiCost"],
            ["Estimated failure or rework cost", "estimatedFailureCost"],
            ["Expected cycle-time reduction", "cycleTimeReduction"],
            ["Expected quality improvement", "qualityImprovement"]
          ].map(([label, key]) => (
            <div className="space-y-2" key={key}>
              <Label>{label}</Label>
              <Input type="number" value={state.businessValueLoop[key as keyof typeof state.businessValueLoop] as number} onChange={(event) => patch({ businessValueLoop: { ...state.businessValueLoop, [key]: Number(event.target.value) } })} />
            </div>
          ))}
          <div className="space-y-2 md:col-span-3">
            <Label>Expected revenue, retention, or cost impact</Label>
            <Textarea value={state.businessValueLoop.valueImpact} onChange={(event) => patch({ businessValueLoop: { ...state.businessValueLoop, valueImpact: event.target.value } })} placeholder="Explain the loop from agent behavior to business outcome." />
          </div>
        </div>
        <ModuleActions current="value" onComplete={complete} onNext={() => setActiveStep("brief")} />
      </WizardLayout>
    ),
    export: (
      <div className="mx-auto max-w-5xl space-y-6">
        <ExportGate state={state} brief={brief} />
        <BriefPreview brief={brief} />
      </div>
    )
  } as Record<string, ReactElement>;

  return (
    <main className="min-h-screen px-5 py-5 md:px-8">
      <div className="mx-auto max-w-7xl space-y-5">
        <div className="no-print flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary">
              <ArrowLeft className="h-4 w-4" />
              Back to landing
            </Link>
            <h1 className="mt-2 text-3xl font-semibold tracking-normal">Agentic Product Stack Mapper</h1>
            <p className="mt-1 text-muted-foreground">Local autosave is on. No login needed.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" onClick={() => setState(sampleSupportRefundAgent)}>
              <Sparkles className="h-4 w-4" />
              Load sample
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
            <Badge className="bg-primary/10 text-primary">
              <Save className="mr-1 h-3 w-3" />
              Saved locally
            </Badge>
          </div>
        </div>

        <ProgressStepper
          steps={steps}
          current={activeStep}
          completed={["quick", ...state.completedModules]}
          onSelect={setActiveStep}
        />

        {stepContent[activeStep]}

        {activeStep !== "brief" && activeStep !== "export" && (
          <div className="no-print flex justify-between">
            <Button type="button" variant="ghost" onClick={previous} disabled={currentIndex === 0}>
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <Button type="button" variant="ghost" onClick={() => setActiveStep("brief")}>
              View live brief
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}

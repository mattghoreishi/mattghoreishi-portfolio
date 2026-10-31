"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
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
import { analyticsEvents, trackEvent } from "@/lib/analytics";
import { generateBrief } from "@/lib/briefGenerator";
import { asList } from "@/lib/utils";
import { clearMapperDraft, persistMapperSession, readMapperDraft } from "@/lib/mapperStorage";
import type { MapperMode, MapperStorageStatus } from "@/lib/mapperStorage";
import type { AutonomyLevel, Facing, MapperState } from "@/types";

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
  const fieldId = useId();
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <Label htmlFor={fieldId}>{label}</Label>
        {suggestion && (
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => {
              trackEvent(analyticsEvents.expandRationale, {
                rationale_slug: label.toLowerCase().replaceAll(" ", "_"),
                demo_name: "agentic_product_stack_mapper",
                source: "suggested_answer"
              });
              onChange(suggestion);
            }}
          >
            Use suggested answer
          </Button>
        )}
      </div>
      <Textarea id={fieldId} aria-describedby={`${fieldId}-hint`} value={value.join("\n")} onChange={(event) => onChange(updateList(event.target.value))} placeholder={placeholder} />
      <p id={`${fieldId}-hint`} className="text-xs text-muted-foreground">Add one per line or separate with commas.</p>
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
            aria-pressed={active}
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
  const [mode, setMode] = useState<MapperMode>("draft");
  const [activeStep, setActiveStep] = useState("quick");
  const [loaded, setLoaded] = useState(false);
  const [storageStatus, setStorageStatus] = useState<"loading" | MapperStorageStatus>("loading");
  const [draftStorageAvailable, setDraftStorageAvailable] = useState<boolean | null>(null);
  const [recoveryNotice, setRecoveryNotice] = useState("");
  const personalDraft = useRef<MapperState>(emptyState);
  const moduleRef = useRef<HTMLElement>(null);
  const focusNextModule = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const draft = readMapperDraft();
    personalDraft.current = draft.state;
    setDraftStorageAvailable(draft.available);
    if (params.get("sample") === "refund") {
      setMode("sample");
      setState(structuredClone(sampleSupportRefundAgent));
      setStorageStatus("sample");
      setActiveStep("brief");
      trackEvent(analyticsEvents.playDemo, {
        demo_name: "agentic_product_stack_mapper",
        sample_name: "support_refund_agent",
        source: "url_param"
      });
      setLoaded(true);
      return;
    }
    setState(draft.state);
    setStorageStatus(draft.available ? "saved" : "unavailable");
    if (draft.recovered) setRecoveryNotice("The saved draft could not be read. A fresh draft is ready.");
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const result = persistMapperSession(state, mode);
    if (mode === "draft") {
      personalDraft.current = state;
      setDraftStorageAvailable(result === "saved");
    }
    setStorageStatus(result);
  }, [state, loaded, mode]);

  useEffect(() => {
    if (focusNextModule.current) {
      moduleRef.current?.focus();
      focusNextModule.current = false;
    }
  }, [activeStep]);

  const brief = useMemo(() => generateBrief(state), [state]);
  const currentIndex = steps.findIndex((step) => step.id === activeStep);
  const template = domainTemplates[state.quickStart.workflowDomain as keyof typeof domainTemplates] || domainTemplates.other;

  function selectStep(stepId: string, source = "mapper") {
    if (stepId !== activeStep) focusNextModule.current = true;
    setActiveStep(stepId);
    trackEvent(analyticsEvents.switchDemoTab, {
      demo_name: "agentic_product_stack_mapper",
      tab_id: stepId,
      tab_label: steps.find((step) => step.id === stepId)?.label || stepId,
      previous_tab_id: activeStep,
      source
    });
  }

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
    selectStep(steps[Math.min(currentIndex + 1, steps.length - 1)].id, "next_button");
  }

  function previous() {
    selectStep(steps[Math.max(currentIndex - 1, 0)].id, "previous_button");
  }

  function setSampleLocation(sample: boolean) {
    const url = new URL(window.location.href);
    if (sample) url.searchParams.set("sample", "refund");
    else url.searchParams.delete("sample");
    window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
  }

  function openSample(source: string) {
    // Keep the latest edit even if storage is blocked or its effect has not run.
    if (mode === "draft") {
      personalDraft.current = state;
      setDraftStorageAvailable(persistMapperSession(state, "draft") === "saved");
    }
    setMode("sample");
    setState(structuredClone(sampleSupportRefundAgent));
    setStorageStatus("sample");
    setRecoveryNotice("");
    setSampleLocation(true);
    selectStep("brief", "open_sample");
    trackEvent(analyticsEvents.playDemo, {
      demo_name: "agentic_product_stack_mapper",
      sample_name: "support_refund_agent",
      source,
    });
  }

  function resumeDraft() {
    setMode("draft");
    setState(structuredClone(personalDraft.current));
    setSampleLocation(false);
    setRecoveryNotice("Your draft is back. The example did not change it.");
    selectStep("quick", "resume_draft");
  }

  function reset() {
    if (mode === "sample") {
      setState(structuredClone(sampleSupportRefundAgent));
      setRecoveryNotice("Refund example reset. Your draft is unchanged.");
      selectStep("brief", "reset_sample");
      return;
    }
    clearMapperDraft();
    setRecoveryNotice("Draft reset.");
    setState(structuredClone(emptyState));
    selectStep("quick", "reset");
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
          <Button
            type="button"
            variant="accent"
            disabled={!loaded}
            onClick={() => openSample("quick_start")}
          >
            <Sparkles className="h-4 w-4" />
            {mode === "sample" ? "Reload refund example" : "Try the refund example"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              const suggested = domainTemplates[state.quickStart.workflowDomain as keyof typeof domainTemplates] || domainTemplates.other;
              trackEvent(analyticsEvents.expandRationale, {
                rationale_slug: "domain_suggestions",
                demo_name: "agentic_product_stack_mapper",
                workflow_domain: state.quickStart.workflowDomain,
                source: "quick_start"
              });
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
            <Label htmlFor="mapper-agent-name">Agent name</Label>
            <Input id="mapper-agent-name"
              value={state.quickStart.agentName}
              onChange={(event) => patch({ quickStart: { ...state.quickStart, agentName: event.target.value } })}
              placeholder="Refund Resolution Copilot"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mapper-workflow-domain">Workflow domain</Label>
            <Select id="mapper-workflow-domain"
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
            <Label htmlFor="mapper-primary-user">Primary user</Label>
            <Input id="mapper-primary-user"
              value={state.quickStart.primaryUser}
              onChange={(event) => patch({ quickStart: { ...state.quickStart, primaryUser: event.target.value } })}
              placeholder="Support specialist, account executive, finance analyst"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mapper-audience">Audience</Label>
            <Select id="mapper-audience"
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
            <Label htmlFor="mapper-main-job-the-agent-should-do">Main job the agent should do</Label>
            <Input id="mapper-main-job-the-agent-should-do"
              value={state.quickStart.mainJob}
              onChange={(event) => patch({ quickStart: { ...state.quickStart, mainJob: event.target.value } })}
              placeholder={template.jobs[0]}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="mapper-systems-or-tools-it-may-touch">Systems or tools it may touch</Label>
            <Chips
              options={template.systems}
              selected={state.quickStart.systemsTouched}
              onChange={(value) => patch({ quickStart: { ...state.quickStart, systemsTouched: value } })}
            />
            <Input id="mapper-systems-or-tools-it-may-touch"
              className="mt-2"
              value={state.quickStart.systemsTouched.join(", ")}
              onChange={(event) =>
                patch({ quickStart: { ...state.quickStart, systemsTouched: updateList(event.target.value) } })
              }
              placeholder="CRM, billing, data warehouse"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mapper-biggest-perceived-risk">Biggest perceived risk</Label>
            <Input id="mapper-biggest-perceived-risk"
              value={state.quickStart.biggestRisk}
              onChange={(event) => patch({ quickStart: { ...state.quickStart, biggestRisk: event.target.value } })}
              placeholder={template.risks[0]}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mapper-desired-business-outcome">Desired business outcome</Label>
            <Input id="mapper-desired-business-outcome"
              value={state.quickStart.desiredOutcome}
              onChange={(event) => patch({ quickStart: { ...state.quickStart, desiredOutcome: event.target.value } })}
              placeholder="Reduce cycle time by 30% while keeping wrong actions below 1%"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="mapper-short-description">Short description</Label>
            <Textarea id="mapper-short-description"
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
              selectStep("brief", "generate_first_draft");
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
                <Button key={step.id} type="button" variant="outline" className="w-full justify-start" onClick={() => selectStep(step.id, "brief_module_picker")}>
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
            <Button type="button" onClick={() => selectStep("export", "continue_to_export")}>
              Continue to export
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                trackEvent(analyticsEvents.expandRationale, {
                  rationale_slug: "deepen_brief",
                  demo_name: "agentic_product_stack_mapper",
                  source: "brief_preview"
                });
                selectStep("workflow", "deepen_brief");
              }}
            >
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
              <Label htmlFor="mapper-cost-of-delay">Cost of delay</Label>
              <Input id="mapper-cost-of-delay" value={state.workflowFit.costOfDelay} onChange={(event) => patch({ workflowFit: { ...state.workflowFit, costOfDelay: event.target.value } })} placeholder="Repeat contact, SLA breach, lost conversion" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mapper-cost-of-error">Cost of error</Label>
              <Input id="mapper-cost-of-error" value={state.workflowFit.costOfError} onChange={(event) => patch({ workflowFit: { ...state.workflowFit, costOfError: event.target.value } })} placeholder="Customer harm, rework, compliance review" />
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
              <Label htmlFor={`risk-${key}`}>{label}</Label>
              <Select id={`risk-${key}`} value={state.riskShape[key as keyof typeof state.riskShape] as string} onChange={(event) => patch({ riskShape: { ...state.riskShape, [key]: event.target.value } })}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </Select>
            </div>
          ))}
          <div className="space-y-2">
            <Label htmlFor="mapper-data-sensitivity">Data sensitivity</Label>
            <Select id="mapper-data-sensitivity" value={state.riskShape.dataSensitivity} onChange={(event) => patch({ riskShape: { ...state.riskShape, dataSensitivity: event.target.value } })}>
              <option>Public data</option>
              <option>Internal business data</option>
              <option>Customer personal data</option>
              <option>Regulated or confidential data</option>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="mapper-reversibility">Reversibility</Label>
            <Select id="mapper-reversibility" value={state.riskShape.reversibility} onChange={(event) => patch({ riskShape: { ...state.riskShape, reversibility: event.target.value } })}>
              <option>Fully reversible</option>
              <option>Partially reversible</option>
              <option>Hard to reverse</option>
              <option>Irreversible</option>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="mapper-detection-speed">Detection speed</Label>
            <Select id="mapper-detection-speed" value={state.riskShape.detectionSpeed} onChange={(event) => patch({ riskShape: { ...state.riskShape, detectionSpeed: event.target.value } })}>
              <option>Immediate</option>
              <option>Same day</option>
              <option>Weekly</option>
              <option>After customer complaint</option>
            </Select>
          </div>
          <div className="space-y-2 md:col-span-3">
            <Label htmlFor="mapper-owner-of-failure">Owner of failure</Label>
            <Input id="mapper-owner-of-failure" value={state.riskShape.failureOwner} onChange={(event) => patch({ riskShape: { ...state.riskShape, failureOwner: event.target.value } })} placeholder="Support operations manager, compliance owner, product lead" />
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
            <p className="text-sm font-semibold">Action abilities</p>
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
                  <div className="space-y-2">
                  <Label htmlFor={`action-${item.id}`}>Action {index + 1}</Label>
                  <Input id={`action-${item.id}`} value={item.action} onChange={(event) => {
                    const nextActions = [...state.autonomyBoundaries];
                    nextActions[index] = { ...item, action: event.target.value };
                    patch({ autonomyBoundaries: nextActions });
                  }} placeholder="Action" />
                  </div>
                  <div className="space-y-2">
                  <Label htmlFor={`autonomy-${item.id}`}>Allowed autonomy</Label>
                  <Select id={`autonomy-${item.id}`} value={item.level} onChange={(event) => {
                    const nextActions = [...state.autonomyBoundaries];
                    nextActions[index] = { ...item, level: event.target.value as AutonomyLevel };
                    patch({ autonomyBoundaries: nextActions });
                  }}>
                    {autonomyLevels.map((level) => <option key={level}>{level}</option>)}
                  </Select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                  <Label htmlFor={`rationale-${item.id}`}>Reason for this boundary</Label>
                  <Input id={`rationale-${item.id}`} value={item.rationale} onChange={(event) => {
                    const nextActions = [...state.autonomyBoundaries];
                    nextActions[index] = { ...item, rationale: event.target.value };
                    patch({ autonomyBoundaries: nextActions });
                  }} placeholder="Rationale" />
                  </div>
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
            <Label htmlFor="mapper-definition-of-good-outcome">Definition of good outcome</Label>
            <Textarea id="mapper-definition-of-good-outcome" value={state.evaluationGates.goodOutcome} onChange={(event) => patch({ evaluationGates: { ...state.evaluationGates, goodOutcome: event.target.value } })} placeholder="Correct decision, accurate rationale, no unauthorized action, clear user communication." />
          </div>
          <TextList label="Known edge cases" value={state.evaluationGates.edgeCases} onChange={(value) => patch({ evaluationGates: { ...state.evaluationGates, edgeCases: value } })} placeholder="Missing data, policy conflict, high-value customer" suggestion={["Missing data", "Policy conflict", "Low confidence", "High-value customer"]} />
          <TextList label="Unacceptable failures" value={state.evaluationGates.unacceptableFailures} onChange={(value) => patch({ evaluationGates: { ...state.evaluationGates, unacceptableFailures: value } })} placeholder="Unauthorized action, data leak, invented policy" suggestion={["Unauthorized action", "Personal data leak", "Invented policy", "Missed escalation"]} />
          <div className="space-y-2">
            <Label htmlFor="mapper-test-data-availability">Test data availability</Label>
            <Input id="mapper-test-data-availability" value={state.evaluationGates.testDataAvailability} onChange={(event) => patch({ evaluationGates: { ...state.evaluationGates, testDataAvailability: event.target.value } })} placeholder="Historical tickets, labeled cases, synthetic edge cases" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mapper-reviewer-role">Reviewer role</Label>
            <Input id="mapper-reviewer-role" value={state.evaluationGates.reviewerRole} onChange={(event) => patch({ evaluationGates: { ...state.evaluationGates, reviewerRole: event.target.value } })} placeholder="QA lead, compliance owner, product manager" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="mapper-business-metric-to-improve">Business metric to improve</Label>
            <Input id="mapper-business-metric-to-improve" value={state.evaluationGates.businessMetric} onChange={(event) => patch({ evaluationGates: { ...state.evaluationGates, businessMetric: event.target.value } })} placeholder="Cycle time, rework rate, cost per task, customer satisfaction" />
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
            <Label htmlFor="mapper-dispute-handling">Dispute handling</Label>
            <Textarea id="mapper-dispute-handling" value={state.humanControl.disputeHandling} onChange={(event) => patch({ humanControl: { ...state.humanControl, disputeHandling: event.target.value } })} placeholder="Where contested outcomes go, who reviews them, and what evidence must be attached." />
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
              <Label htmlFor={`threshold-${signal.id}`} className="mt-3 block text-xs">Threshold for {signal.label.toLowerCase()}</Label>
              <Input id={`threshold-${signal.id}`} className="mt-2" value={signal.threshold} onChange={(event) => {
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
            <Label htmlFor="mapper-reversibility-mechanism">Reversibility mechanism</Label>
            <Textarea id="mapper-reversibility-mechanism" value={state.damageControl.reversibilityMechanism} onChange={(event) => patch({ damageControl: { ...state.damageControl, reversibilityMechanism: event.target.value } })} placeholder="How actions are reversed or corrected." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mapper-kill-switch-owner">Kill switch owner</Label>
            <Input id="mapper-kill-switch-owner" value={state.damageControl.killSwitchOwner} onChange={(event) => patch({ damageControl: { ...state.damageControl, killSwitchOwner: event.target.value } })} placeholder="Named operational owner" />
          </div>
          <TextList label="Pause conditions" value={state.damageControl.pauseConditions} onChange={(value) => patch({ damageControl: { ...state.damageControl, pauseConditions: value } })} placeholder="Wrong-action spike, tool outage" suggestion={["Wrong-action rate above threshold", "Policy retrieval outage", "Spike in complaints"]} />
          <div className="space-y-2">
            <Label htmlFor="mapper-customer-notification-path">Customer notification path</Label>
            <Textarea id="mapper-customer-notification-path" value={state.damageControl.customerNotificationPath} onChange={(event) => patch({ damageControl: { ...state.damageControl, customerNotificationPath: event.target.value } })} placeholder="Who approves customer notices and when." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mapper-incident-review-process">Incident review process</Label>
            <Textarea id="mapper-incident-review-process" value={state.damageControl.incidentReviewProcess} onChange={(event) => patch({ damageControl: { ...state.damageControl, incidentReviewProcess: event.target.value } })} placeholder="Review cadence, severity owner, evidence required." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mapper-compensation-or-correction-path">Compensation or correction path</Label>
            <Textarea id="mapper-compensation-or-correction-path" value={state.damageControl.correctionPath} onChange={(event) => patch({ damageControl: { ...state.damageControl, correctionPath: event.target.value } })} placeholder="Correct record, notify user, add eval case, update policy." />
          </div>
        </div>
        <ModuleActions current="rollback" onComplete={complete} onNext={next} />
      </WizardLayout>
    ),
    governance: (
      <WizardLayout title="Add Governance Evidence" description="Make the product reviewable through logs, versions, eval records, and approvals." step="Governance Evidence" preview={livePreview}>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="mapper-customer-facing-status">Customer-facing status</Label>
            <Select id="mapper-customer-facing-status" value={state.governanceEvidence.customerFacingStatus} onChange={(event) => patch({ governanceEvidence: { ...state.governanceEvidence, customerFacingStatus: event.target.value } })}>
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
            ["Current cost per task (USD)", "currentCostPerTask"],
            ["Expected automation rate (%)", "expectedAutomationRate"],
            ["Expected human review rate (%)", "expectedHumanReviewRate"],
            ["Estimated AI cost per task (USD)", "estimatedAiCost"],
            ["Estimated failure or rework cost (USD)", "estimatedFailureCost"],
            ["Expected cycle-time reduction", "cycleTimeReduction"],
            ["Expected quality improvement", "qualityImprovement"]
          ].map(([label, key]) => (
            <div className="space-y-2" key={key}>
              <Label htmlFor={`value-${key}`}>{label}</Label>
              <Input id={`value-${key}`} min={0} max={key === "expectedAutomationRate" || key === "expectedHumanReviewRate" || key === "cycleTimeReduction" || key === "qualityImprovement" ? 100 : undefined} step="any" type="number" value={state.businessValueLoop[key as keyof typeof state.businessValueLoop] as number} onChange={(event) => patch({ businessValueLoop: { ...state.businessValueLoop, [key]: Number(event.target.value) } })} />
            </div>
          ))}
          <div className="space-y-2 md:col-span-3">
            <Label htmlFor="mapper-expected-revenue-retention-or-cost-impact">Expected revenue, retention, or cost impact</Label>
            <Textarea id="mapper-expected-revenue-retention-or-cost-impact" value={state.businessValueLoop.valueImpact} onChange={(event) => patch({ businessValueLoop: { ...state.businessValueLoop, valueImpact: event.target.value } })} placeholder="Explain the loop from agent behavior to business outcome." />
          </div>
        </div>
        <ModuleActions current="value" onComplete={complete} onNext={() => selectStep("brief", "value_complete")} />
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
    <main id="main-content" tabIndex={-1} className="min-h-screen px-5 py-5 md:px-8">
      <div className="mx-auto max-w-7xl space-y-5">
        <div className="no-print flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary">
              <ArrowLeft className="h-4 w-4" />
              Back to Matt’s site
            </Link>
            <h1 className="mt-2 text-3xl font-semibold tracking-normal">Agentic Product Stack Mapper</h1>
            <p className="mt-1 text-muted-foreground">A working draft for your team. Inputs stay in your browser; downloads are free.</p>
            {recoveryNotice && <p role="status" className="mt-2 text-sm text-amber-100">{recoveryNotice}</p>}
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={!loaded || mode === "sample"}
              onClick={() => openSample("mapper_header")}
            >
              <Sparkles className="h-4 w-4" />
              {mode === "sample" ? "Example mode" : "Load example"}
            </Button>
            <Button type="button" variant="outline" disabled={!loaded} onClick={reset}>
              <RotateCcw className="h-4 w-4" />
              {mode === "sample" ? "Reset example" : "Reset your draft"}
            </Button>
            <Badge className="bg-primary/10 text-primary">
              <Save className="mr-1 h-3 w-3" aria-hidden="true" />
              {storageStatus === "sample" ? "Example edits are temporary" : storageStatus === "saved" ? "Saved in this browser" : storageStatus === "unavailable" ? "Autosave unavailable" : "Loading draft"}
            </Badge>
          </div>
        </div>

        {mode === "sample" && (
          <aside className="no-print flex flex-col gap-4 rounded-lg border border-primary/30 bg-primary/10 p-5 sm:flex-row sm:items-center sm:justify-between" aria-label="Example mode">
            <div>
              <p className="font-semibold">You’re exploring a fictional refund example.</p>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">Try changes and download the result. Example edits are temporary; refreshing restores the original example. Your personal draft is kept separate.</p>
              {draftStorageAvailable === false && <p role="status" className="mt-3 max-w-3xl text-sm leading-6 text-amber-100">Browser saving is unavailable. Any unsaved changes to your personal draft will be lost on refresh. Resume your draft and download a copy before leaving.</p>}
            </div>
            <Button type="button" variant="outline" onClick={resumeDraft} className="shrink-0">Resume your draft<ArrowRight className="h-4 w-4" aria-hidden="true" /></Button>
          </aside>
        )}

        {storageStatus === "unavailable" && <p role="status" className="no-print text-sm leading-6 text-amber-100">This browser cannot save your draft. You can still work here and download it before leaving.</p>}

        <ProgressStepper
          steps={steps}
          current={activeStep}
          completed={state.completedModules}
          onSelect={(stepId) => selectStep(stepId, "progress_stepper")}
        />

        <section ref={moduleRef} tabIndex={-1} aria-label={`${steps[currentIndex].label} module`}>
          {stepContent[activeStep]}
        </section>

        {activeStep !== "brief" && activeStep !== "export" && (
          <div className="no-print flex justify-between">
            <Button type="button" variant="ghost" onClick={previous} disabled={currentIndex === 0}>
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <Button type="button" variant="ghost" onClick={() => selectStep("brief", "view_live_brief")}>
              View live brief
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}

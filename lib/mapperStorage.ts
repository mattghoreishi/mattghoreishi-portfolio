import { domainTemplates, emptyState } from "@/data/templates";
import type { MapperState } from "@/types";

export const mapperStorageKey = "agentic-product-stack-mapper-state-v1";
export type MapperMode = "draft" | "sample";
export type MapperStorageStatus = "saved" | "unavailable" | "sample";

const autonomyLevels = new Set([
  "Agent can do alone",
  "Agent can draft, human confirms",
  "Agent can recommend, human approves",
  "Agent must escalate",
  "Agent must never do this",
]);

function matchesShape(value: unknown, example: unknown): boolean {
  if (Array.isArray(example)) {
    return Array.isArray(value) && value.every((item) => matchesShape(item, example[0] ?? ""));
  }
  if (example !== null && typeof example === "object") {
    if (value === null || typeof value !== "object" || Array.isArray(value)) return false;
    return Object.entries(example).every(([key, field]) =>
      matchesShape((value as Record<string, unknown>)[key], field),
    );
  }
  if (typeof example === "number") return typeof value === "number" && Number.isFinite(value);
  return typeof value === typeof example;
}

/** Validate saved data before it reaches the brief generator or controlled inputs. */
export function parseMapperDraft(raw: string | null): MapperState | null {
  if (!raw) return null;
  try {
    const value: unknown = JSON.parse(raw);
    const shape = {
      ...emptyState,
      autonomyBoundaries: [{ id: "", action: "", level: "", rationale: "" }],
    };
    if (!matchesShape(value, shape)) return null;
    const draft = value as MapperState;
    if (!["Internal", "Customer-facing", "Both"].includes(draft.quickStart.facing)) return null;
    if (!Object.hasOwn(domainTemplates, draft.quickStart.workflowDomain)) return null;
    if (!draft.autonomyBoundaries.every((item) => autonomyLevels.has(item.level))) return null;
    return draft;
  } catch {
    return null;
  }
}

export function readMapperDraft(): { state: MapperState; recovered: boolean; available: boolean } {
  try {
    const raw = window.localStorage.getItem(mapperStorageKey);
    const draft = parseMapperDraft(raw);
    return { state: draft ?? emptyState, recovered: raw !== null && draft === null, available: true };
  } catch {
    return { state: emptyState, recovered: false, available: false };
  }
}

export function saveMapperDraft(state: MapperState): boolean {
  try {
    window.localStorage.setItem(mapperStorageKey, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}

/** Example edits never write to or replace the visitor's personal draft. */
export function persistMapperSession(state: MapperState, mode: MapperMode): MapperStorageStatus {
  if (mode === "sample") return "sample";
  return saveMapperDraft(state) ? "saved" : "unavailable";
}

export function clearMapperDraft(): boolean {
  try {
    window.localStorage.removeItem(mapperStorageKey);
    return true;
  } catch {
    return false;
  }
}

import type { AgentProductBrief, MapperState } from "@/types";

export function exportBriefJson(brief: AgentProductBrief, state: MapperState) {
  return JSON.stringify(
    {
      brief,
      inputs: state,
      exportNote:
        "This file was generated locally from user-entered inputs. Scores are heuristic planning checks, not measurements of readiness or safety. Source cards are background reading, not validation of the inputs or calculations."
    },
    null,
    2
  );
}

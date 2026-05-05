import type { AgentProductBrief, MapperState } from "@/types";

export function exportBriefJson(brief: AgentProductBrief, state: MapperState) {
  return JSON.stringify(
    {
      brief,
      inputs: state,
      exportNote:
        "This file was generated locally from user-entered inputs. Source cards are curated evidence cards, not live AI search."
    },
    null,
    2
  );
}

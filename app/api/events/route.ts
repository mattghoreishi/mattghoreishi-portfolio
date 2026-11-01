import { retiredApiResponse } from "@/lib/retiredApi";

export const runtime = "edge";

export function POST() {
  return retiredApiResponse();
}

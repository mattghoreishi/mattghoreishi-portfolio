import { asList } from "@/lib/utils";

/** Keep the user's in-progress spacing when the parent echoes the parsed list. */
export function reconcileListText(text: string, values: string[], separator: string): string {
  const current = asList(text);
  return current.length === values.length && current.every((item, index) => item === values[index])
    ? text
    : values.join(separator);
}

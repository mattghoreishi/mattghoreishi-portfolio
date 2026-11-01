"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { reconcileListText } from "@/lib/listInput";
import { asList } from "@/lib/utils";

type ListInputProps = {
  value: string[];
  onChange: (value: string[]) => void;
  multiline?: boolean;
  id?: string;
  placeholder?: string;
  className?: string;
  "aria-describedby"?: string;
};

/** Separate editable text from parsed values so typing a space or Enter survives. */
export function ListInput({ value, onChange, multiline = true, ...props }: ListInputProps) {
  const separator = multiline ? "\n" : ", ";
  const [text, setText] = useState(() => value.join(separator));

  useEffect(() => {
    // Suggestions, sample changes, and resets replace the buffer. A parsed echo
    // of our own edit must preserve trailing separators and the cursor position.
    setText((current) => reconcileListText(current, value, separator));
  }, [value, separator]);

  function change(nextText: string) {
    setText(nextText);
    onChange(asList(nextText));
  }

  return multiline ? (
    <Textarea {...props} value={text} onChange={(event) => change(event.target.value)} />
  ) : (
    <Input {...props} value={text} onChange={(event) => change(event.target.value)} />
  );
}

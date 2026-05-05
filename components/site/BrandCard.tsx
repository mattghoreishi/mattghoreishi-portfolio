import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function BrandCard({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-white/10 bg-white/[0.055] shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur",
        className
      )}
    >
      {children}
    </div>
  );
}

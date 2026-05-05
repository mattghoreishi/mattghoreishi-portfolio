import { ReactNode } from "react";
import { EvidencePanel } from "@/components/EvidencePanel";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function WizardLayout({
  title,
  description,
  step,
  children,
  preview
}: {
  title: string;
  description: string;
  step: string;
  children: ReactNode;
  preview?: ReactNode;
}) {
  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div className="space-y-5">
        <Card className="shadow-editorial">
          <CardHeader>
            <CardTitle className="text-2xl">{title}</CardTitle>
            <CardDescription className="text-base">{description}</CardDescription>
          </CardHeader>
          <CardContent>{children}</CardContent>
        </Card>
        {preview}
      </div>
      <EvidencePanel step={step} />
    </div>
  );
}

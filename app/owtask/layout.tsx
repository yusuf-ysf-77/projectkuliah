"use client";

import { StoreProvider } from "@/lib/store";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function OwTaskLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </StoreProvider>
  );
}

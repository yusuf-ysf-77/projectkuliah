"use client";

import * as React from "react";
import { Switch as SwitchPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

function Switch({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "sm" | "default";
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer group/switch relative inline-flex shrink-0 items-center rounded-full border border-white/5 transition-all duration-300 outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-[size=default]:h-5.5 data-[size=default]:w-10.5 data-[size=sm]:h-4.5 data-[size=sm]:w-8.5 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:bg-linear-to-r data-checked:from-violet-500 data-checked:to-purple-500 data-checked:shadow-[0_0_12px_rgba(139,92,246,0.4)] data-checked:border-violet-400/30 data-unchecked:bg-white/8 data-unchecked:border-white/6 data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.3)] ring-0 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-data-[size=default]/switch:h-4 group-data-[size=default]/switch:w-4 group-data-[size=sm]/switch:h-3 group-data-[size=sm]/switch:w-3 group-data-[size=default]/switch:data-checked:translate-x-5.75 group-data-[size=sm]/switch:data-checked:translate-x-4.75 group-data-[size=default]/switch:data-unchecked:translate-x-0.75 group-data-[size=sm]/switch:data-unchecked:translate-x-0.75 group-data-[size=default]/switch:data-checked:shadow-[0_0_8px_rgba(255,255,255,0.3),0_1px_3px_rgba(0,0,0,0.2)]"
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };

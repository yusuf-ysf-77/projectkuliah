"use client";

import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type GradientPreset =
  "emerald" | "blue" | "purple" | "amber" | "rose" | "teal" | "orange";
type SizePreset = "sm" | "md" | "lg";

interface GlassIconProps {
  icon: LucideIcon;
  gradient?: GradientPreset;
  size?: SizePreset;
  className?: string;
  iconClassName?: string;
}

const gradients: Record<
  GradientPreset,
  { back: string; front: string; icon: string }
> = {
  emerald: {
    back: "from-emerald-400 to-teal-500",
    front: "from-emerald-100/80 to-teal-100/60",
    icon: "text-emerald-600",
  },
  blue: {
    back: "from-blue-400 to-indigo-500",
    front: "from-blue-100/80 to-indigo-100/60",
    icon: "text-blue-600",
  },
  purple: {
    back: "from-purple-400 to-violet-500",
    front: "from-purple-100/80 to-violet-100/60",
    icon: "text-purple-600",
  },
  amber: {
    back: "from-amber-400 to-orange-500",
    front: "from-amber-100/80 to-orange-100/60",
    icon: "text-amber-600",
  },
  rose: {
    back: "from-rose-400 to-pink-500",
    front: "from-rose-100/80 to-pink-100/60",
    icon: "text-rose-600",
  },
  teal: {
    back: "from-teal-400 to-cyan-500",
    front: "from-teal-100/80 to-cyan-100/60",
    icon: "text-teal-600",
  },
  orange: {
    back: "from-orange-400 to-red-500",
    front: "from-orange-100/80 to-red-100/60",
    icon: "text-orange-600",
  },
};

const sizes: Record<
  SizePreset,
  { container: string; icon: string; back: string; front: string }
> = {
  sm: {
    container: "w-10 h-10",
    icon: "h-4 w-4",
    back: "w-9 h-9",
    front: "w-8 h-8",
  },
  md: {
    container: "w-14 h-14",
    icon: "h-5 w-5",
    back: "w-12 h-12",
    front: "w-10 h-10",
  },
  lg: {
    container: "w-18 h-18",
    icon: "h-7 w-7",
    back: "w-16 h-16",
    front: "w-14 h-14",
  },
};

export function GlassIcon({
  icon: Icon,
  gradient = "emerald",
  size = "md",
  className,
  iconClassName,
}: GlassIconProps) {
  const g = gradients[gradient];
  const s = sizes[size];

  return (
    <div className={cn("relative", s.container, className)}>
      {/* Back frame - solid gradient with shadow */}
      <div
        className={cn(
          "absolute top-0.5 left-0 rounded-2xl bg-linear-to-br shadow-lg",
          g.back,
          s.back,
        )}
      />
      {/* Front frame - glass effect */}
      <div
        className={cn(
          "absolute bottom-0 right-0 rounded-2xl bg-linear-to-br backdrop-blur-sm border border-white/40 shadow-sm flex items-center justify-center",
          g.front,
          s.front,
        )}
      >
        <Icon className={cn(s.icon, g.icon, iconClassName)} />
      </div>
    </div>
  );
}

// Simplified icon wrapper for inline use
export function GradientIcon({
  icon: Icon,
  gradient = "emerald",
  className,
}: {
  icon: LucideIcon;
  gradient?: GradientPreset;
  className?: string;
}) {
  const g = gradients[gradient];
  return (
    <div
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br",
        g.back,
        className,
      )}
    >
      <Icon className="h-5 w-5 text-white" />
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  CheckSquare,
  MessageCircle,
  Calendar,
  StickyNote,
  User,
  Settings,
  HelpCircle,
} from "lucide-react";
import type { Role } from "@/lib/types";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  section?: string;
  badge?: number;
}

const leaderNav: NavItem[] = [
  {
    label: "Dashboard",
    href: "/owtask/dashboard",
    icon: LayoutDashboard,
    section: "MAIN",
  },
  {
    label: "Tasks",
    href: "/owtask/dashboard/leader/tasks",
    icon: CheckSquare,
    section: "MAIN",
    badge: 8,
  },
  {
    label: "Chat",
    href: "/owtask/dashboard/leader/chat",
    icon: MessageCircle,
    section: "MAIN",
    badge: 3,
  },
  {
    label: "Calendar",
    href: "/owtask/dashboard/leader/calendar",
    icon: Calendar,
    section: "MAIN",
  },
  {
    label: "Notes",
    href: "/owtask/dashboard/leader/notes",
    icon: StickyNote,
    section: "MAIN",
  },
  {
    label: "Profile",
    href: "/owtask/dashboard/leader/profile",
    icon: User,
    section: "ACCOUNT",
  },
  {
    label: "Settings",
    href: "/owtask/dashboard/leader/settings",
    icon: Settings,
    section: "ACCOUNT",
  },
  {
    label: "Help",
    href: "/owtask/dashboard/leader/help",
    icon: HelpCircle,
    section: "ACCOUNT",
  },
];

const workerNav: NavItem[] = [
  {
    label: "Dashboard",
    href: "/owtask/dashboard",
    icon: LayoutDashboard,
    section: "MAIN",
  },
  {
    label: "My Tasks",
    href: "/owtask/dashboard/worker/tasks",
    icon: CheckSquare,
    section: "MAIN",
    badge: 5,
  },
  {
    label: "Chat",
    href: "/owtask/dashboard/worker/chat",
    icon: MessageCircle,
    section: "MAIN",
    badge: 2,
  },
  {
    label: "Calendar",
    href: "/owtask/dashboard/worker/calendar",
    icon: Calendar,
    section: "MAIN",
  },
  {
    label: "Notes",
    href: "/owtask/dashboard/worker/notes",
    icon: StickyNote,
    section: "MAIN",
  },
  {
    label: "Profile",
    href: "/owtask/dashboard/worker/profile",
    icon: User,
    section: "ACCOUNT",
  },
  {
    label: "Settings",
    href: "/owtask/dashboard/worker/settings",
    icon: Settings,
    section: "ACCOUNT",
  },
  {
    label: "Help",
    href: "/owtask/dashboard/worker/help",
    icon: HelpCircle,
    section: "ACCOUNT",
  },
];

interface SidebarNavProps {
  role: Role;
  collapsed?: boolean;
}

export function SidebarNav({ role, collapsed }: SidebarNavProps) {
  const pathname = usePathname();
  const items = role === "leader" ? leaderNav : workerNav;

  const sections = items.reduce(
    (acc, item) => {
      const section = item.section || "OTHER";
      if (!acc[section]) acc[section] = [];
      acc[section].push(item);
      return acc;
    },
    {} as Record<string, NavItem[]>,
  );

  return (
    <nav className="flex flex-col gap-4 px-3 py-1">
      {Object.entries(sections).map(([section, sectionItems]) => (
        <div key={section}>
          {!collapsed && (
            <div className="px-3 mb-1.5 text-[8px] font-bold text-white/25 uppercase tracking-[0.15em]">
              {section}
            </div>
          )}
          <div className="space-y-0.5">
            {sectionItems.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href + item.label}
                  href={item.href}
                  className={cn(
                    "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-[11px] font-medium transition-all duration-200",
                    isActive
                      ? "bg-white/10 text-white shadow-lg shadow-black/10"
                      : "text-white/40 hover:bg-white/5 hover:text-white/70",
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full gradient-primary"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}

                  <item.icon
                    className={cn(
                      "h-4 w-4 shrink-0 transition-colors",
                      isActive
                        ? "text-violet-400"
                        : "text-white/30 group-hover:text-white/50",
                    )}
                  />

                  {!collapsed && (
                    <>
                      <span className="flex-1">{item.label}</span>
                      {item.badge && item.badge > 0 && (
                        <span
                          className={cn(
                            "flex h-4 min-w-4 items-center justify-center rounded-full text-[8px] font-bold px-1",
                            isActive
                              ? "bg-violet-500 text-white"
                              : "bg-white/10 text-white/50",
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}

                  {collapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 rounded-md bg-[#1a1a30] text-white text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 border border-white/10">
                      {item.label}
                      {item.badge && (
                        <span className="ml-1.5 text-violet-400">
                          ({item.badge})
                        </span>
                      )}
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}

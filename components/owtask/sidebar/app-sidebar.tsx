"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  LayoutDashboard,
  CheckSquare,
  MessageCircle,
  Calendar,
  StickyNote,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import type { Role } from "@/lib/types";

interface AppSidebarProps {
  role: Role;
  collapsed: boolean;
}

function MiniCalendar() {
  const [selected, setSelected] = useState(26);
  const year = 2026;
  const month = 5;
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const startOffset = firstDay === 0 ? 6 : firstDay - 1;

  return (
    <div className="px-3 py-2">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-semibold text-white/60">
          {monthNames[month]} {year}
        </span>
        <div className="flex gap-0.5">
          <button className="h-4 w-4 rounded flex items-center justify-center text-white/30 hover:text-white/60 hover:bg-white/5 transition-colors">
            <ChevronLeft className="h-2.5 w-2.5" />
          </button>
          <button className="h-4 w-4 rounded flex items-center justify-center text-white/30 hover:text-white/60 hover:bg-white/5 transition-colors">
            <ChevronRight className="h-2.5 w-2.5" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-0.5 text-center">
        {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
          <div key={d} className="text-[7px] text-white/20 font-medium py-0.5">
            {d}
          </div>
        ))}
        {Array.from({ length: startOffset }, (_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
          <button
            key={day}
            onClick={() => setSelected(day)}
            className={cn(
              "text-[8px] h-5 w-full rounded-md flex items-center justify-center transition-all",
              day === selected
                ? "bg-white text-[#0c0c1d] font-bold shadow-sm"
                : "text-white/40 hover:text-white/70 hover:bg-white/5",
            )}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
}

function UpcomingEvent() {
  return (
    <div className="mx-3 p-2.5 rounded-xl bg-white/4 border border-white/6">
      <div className="flex items-center gap-1.5 mb-1.5">
        <div className="h-1.5 w-1.5 rounded-full bg-violet-400" />
        <span className="text-[8px] text-white/40 font-medium">Upcoming</span>
      </div>
      <div className="text-[10px] font-semibold text-white/80 mb-0.5">
        Sprint Review
      </div>
      <div className="text-[8px] text-white/30">Today, 2:00 PM</div>
      <div className="flex items-center gap-1 mt-2">
        <div className="h-4 w-4 rounded-full bg-linear-to-br from-violet-400 to-purple-500 flex items-center justify-center text-[6px] text-white font-bold">
          A
        </div>
        <div className="h-4 w-4 rounded-full bg-linear-to-br from-pink-400 to-rose-500 flex items-center justify-center text-[6px] text-white font-bold -ml-1 border-2 border-[#16162a]">
          S
        </div>
        <div className="h-4 w-4 rounded-full bg-linear-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-[6px] text-white font-bold -ml-1 border-2 border-[#16162a]">
          B
        </div>
      </div>
    </div>
  );
}

function Categories({ role }: { role: Role }) {
  const { tasks } = useStore();
  const router = useRouter();
  const categories = [
    { name: "Engineering", color: "#a78bfa" },
    { name: "Marketing", color: "#34d399" },
    { name: "Design", color: "#f472b6" },
  ];
  return (
    <div className="px-3 py-2">
      <div className="text-[9px] font-semibold text-white/25 uppercase tracking-wider mb-2">
        Categories
      </div>
      {categories.map((cat) => {
        const count = tasks.filter((t) => t.division === cat.name).length;
        return (
          <div
            key={cat.name}
            onClick={() =>
              router.push(
                role === "leader"
                  ? `/owtask/dashboard/leader/tasks?division=${cat.name}`
                  : `/owtask/dashboard/worker/tasks?division=${cat.name}`,
              )
            }
            className="flex items-center justify-between py-1.5 group cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: cat.color }}
              />
              <span className="text-[10px] text-white/50 group-hover:text-white/70 transition-colors">
                {cat.name}
              </span>
            </div>
            <span className="text-[8px] text-white/25">{count}</span>
          </div>
        );
      })}
    </div>
  );
}

function HelpCenterCard({ role }: { role: Role }) {
  const router = useRouter();
  return (
    <div className="mx-3 mb-2">
      <div
        className="p-3 rounded-xl bg-linear-to-br from-violet-500 to-purple-600 text-white cursor-pointer hover:from-violet-600 hover:to-purple-700 transition-all shadow-lg shadow-violet-500/20"
        onClick={() =>
          router.push(
            role === "leader"
              ? "/owtask/dashboard/leader/help"
              : "/owtask/dashboard/worker/help",
          )
        }
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="h-6 w-6 rounded-lg bg-white/20 flex items-center justify-center">
            <HelpCircle className="h-3.5 w-3.5" />
          </div>
          <span className="text-[10px] font-semibold">Help center</span>
        </div>
        <p className="text-[8px] text-white/60 leading-relaxed mb-2">
          Find answers, learn how to use owTask, and get support.
        </p>
        <div className="text-[8px] text-white/40">Go to help center &rarr;</div>
      </div>
    </div>
  );
}

const leaderNav = [
  { label: "Dashboard", href: "/owtask/dashboard", icon: LayoutDashboard },
  {
    label: "Tasks",
    href: "/owtask/dashboard/leader/tasks",
    icon: CheckSquare,
    badge: 8,
  },
  {
    label: "Messages",
    href: "/owtask/dashboard/leader/chat",
    icon: MessageCircle,
    badge: 3,
  },
  {
    label: "Calendar",
    href: "/owtask/dashboard/leader/calendar",
    icon: Calendar,
  },
  { label: "Notes", href: "/owtask/dashboard/leader/notes", icon: StickyNote },
];

const workerNav = [
  { label: "Dashboard", href: "/owtask/dashboard", icon: LayoutDashboard },
  {
    label: "My Tasks",
    href: "/owtask/dashboard/worker/tasks",
    icon: CheckSquare,
    badge: 5,
  },
  {
    label: "Messages",
    href: "/owtask/dashboard/worker/chat",
    icon: MessageCircle,
    badge: 2,
  },
  {
    label: "Calendar",
    href: "/owtask/dashboard/worker/calendar",
    icon: Calendar,
  },
  { label: "Notes", href: "/owtask/dashboard/worker/notes", icon: StickyNote },
];

export function AppSidebar({ role, collapsed }: AppSidebarProps) {
  const { currentUser } = useStore();
  const router = useRouter();
  const pathname = usePathname();
  const navItems = role === "leader" ? leaderNav : workerNav;

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="h-full rounded-2xl bg-[#16162a] border border-white/6 shadow-sm flex flex-col overflow-hidden"
    >
      {/* Logo */}
      <div className="flex items-center px-4 py-4">
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex items-center gap-2.5"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary shadow-lg shadow-violet-500/20">
                <span className="text-sm font-bold text-white">o</span>
              </div>
              <span className="text-base font-bold text-white">owTask</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* User profile */}
      {!collapsed && (
        <div className="px-3 py-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-full flex items-center gap-2.5 p-2 rounded-xl bg-white/4 border border-white/6 hover:bg-white/6 transition-colors cursor-pointer">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-linear-to-br from-violet-400 to-purple-500 text-white text-xs font-bold rounded-xl">
                    {currentUser.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0 text-left">
                  <div className="text-xs font-semibold text-white truncate">
                    {currentUser.name}
                  </div>
                  <div className="text-[9px] text-white/40 truncate">
                    {currentUser.division}
                  </div>
                </div>
                <ChevronDown className="h-3 w-3 text-white/30" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              side="right"
              className="w-48 bg-[#1a1a30] border-white/8 shadow-xl rounded-xl"
            >
              <div className="p-2">
                <div className="flex items-center gap-2 p-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-linear-to-br from-violet-400 to-purple-500 text-white text-[10px] font-bold rounded-lg">
                      {currentUser.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-white">
                      {currentUser.name}
                    </span>
                    <span className="text-[9px] text-white/40">
                      {currentUser.email}
                    </span>
                  </div>
                </div>
              </div>
              <DropdownMenuSeparator className="bg-white/6" />
              <DropdownMenuItem
                onClick={() =>
                  router.push(
                    currentUser.role === "leader"
                      ? "/owtask/dashboard/leader/profile"
                      : "/owtask/dashboard/worker/profile",
                  )
                }
                className="gap-2 text-[11px] text-white/60 rounded-lg cursor-pointer"
              >
                <User className="h-3.5 w-3.5" /> Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  router.push(
                    currentUser.role === "leader"
                      ? "/owtask/dashboard/leader/settings"
                      : "/owtask/dashboard/worker/settings",
                  )
                }
                className="gap-2 text-[11px] text-white/60 rounded-lg cursor-pointer"
              >
                <Settings className="h-3.5 w-3.5" /> Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/6" />
              <DropdownMenuItem
                onClick={() => router.push("/owtask/login")}
                className="gap-2 text-[11px] text-red-400 rounded-lg cursor-pointer"
              >
                <LogOut className="h-3.5 w-3.5" /> Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-2 px-2 theme-scrollbar">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            const isDashboard = item.href === "/owtask/dashboard";
            return (
              <Link
                key={item.href + item.label}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[11px] font-medium transition-all duration-200",
                  isDashboard && isActive
                    ? "bg-violet-500/15 text-white shadow-sm border border-violet-500/20"
                    : isActive
                      ? "bg-white/10 text-white shadow-sm"
                      : "text-white/40 hover:text-white/70 hover:bg-white/5",
                )}
              >
                <item.icon
                  className={cn(
                    "h-4 w-4 shrink-0",
                    isDashboard && isActive
                      ? "text-violet-400"
                      : isActive
                        ? "text-violet-400"
                        : "text-white/25",
                  )}
                />
                {!collapsed && (
                  <>
                    <span className="flex-1 truncate">{item.label}</span>
                    {item.badge && item.badge > 0 && (
                      <span
                        className={cn(
                          "flex h-4 min-w-4 items-center justify-center rounded-full text-[8px] font-bold px-1 shrink-0",
                          isActive
                            ? "bg-violet-500/30 text-violet-300"
                            : "bg-white/6 text-white/30",
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Calendar + Events + Help (only when expanded) */}
      {!collapsed && (
        <div className="space-y-1 py-1">
          <MiniCalendar />
          <UpcomingEvent />
          <Categories role={role} />
          <HelpCenterCard role={role} />
        </div>
      )}

      {/* Collapsed help icon */}
      {collapsed && (
        <div className="p-3 flex justify-center">
          <button
            onClick={() =>
              router.push(
                role === "leader"
                  ? "/owtask/dashboard/leader/help"
                  : "/owtask/dashboard/worker/help",
              )
            }
            className="h-9 w-9 rounded-xl gradient-primary text-white flex items-center justify-center hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/20"
          >
            <HelpCircle className="h-4 w-4" />
          </button>
        </div>
      )}
    </motion.aside>
  );
}

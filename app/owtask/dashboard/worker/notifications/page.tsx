"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  CheckSquare,
  MessageCircle,
  Clock,
  X,
  CheckCheck,
  Trash2,
  AlertTriangle,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type: "task" | "chat" | "deadline" | "reminder" | "mention" | "system";
  title: string;
  description: string;
  time: string;
  group: "today" | "yesterday" | "earlier";
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "task",
    title: "New task assigned",
    description: "Andi assigned you 'Desain UI Dashboard v2'",
    time: "2 min ago",
    group: "today",
    read: false,
  },
  {
    id: "2",
    type: "deadline",
    title: "Deadline approaching",
    description: "API Authentication due in 2 days",
    time: "10 min ago",
    group: "today",
    read: false,
  },
  {
    id: "3",
    type: "mention",
    title: "You were mentioned",
    description: "Sari mentioned you in 'Sprint Planning': @Andi please review",
    time: "15 min ago",
    group: "today",
    read: false,
  },
  {
    id: "4",
    type: "chat",
    title: "New message from leader",
    description: "Andi: Meeting jam 3 sore ya",
    time: "1 hour ago",
    group: "today",
    read: false,
  },
  {
    id: "5",
    type: "task",
    title: "Task status updated",
    description: "Andi marked 'Landing Page' as completed",
    time: "3 hours ago",
    group: "today",
    read: true,
  },
  {
    id: "6",
    type: "reminder",
    title: "Weekly review",
    description: "Sprint review tomorrow at 10 AM",
    time: "5 hours ago",
    group: "today",
    read: true,
  },
  {
    id: "7",
    type: "system",
    title: "System update",
    description: "owTask has been updated to v2.1 with new features",
    time: "Yesterday",
    group: "yesterday",
    read: true,
  },
  {
    id: "8",
    type: "task",
    title: "Task deadline passed",
    description: "Video Tutorial was due yesterday",
    time: "2 days ago",
    group: "earlier",
    read: true,
  },
];

const typeConfig: Record<
  string,
  {
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    bg: string;
  }
> = {
  task: {
    icon: CheckSquare,
    color: "text-emerald-400",
    bg: "bg-emerald-500/15",
  },
  chat: { icon: MessageCircle, color: "text-blue-400", bg: "bg-blue-500/15" },
  deadline: {
    icon: AlertTriangle,
    color: "text-amber-400",
    bg: "bg-amber-500/15",
  },
  reminder: { icon: Clock, color: "text-violet-400", bg: "bg-violet-500/15" },
  mention: {
    icon: ({ className }: { className?: string }) => (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
      </svg>
    ),
    color: "text-rose-400",
    bg: "bg-rose-500/15",
  },
  system: { icon: FileText, color: "text-white/40", bg: "bg-white/5" },
};

export default function WorkerNotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<"all" | "unread" | "mentions">("all");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "unread") return !n.read;
    if (filter === "mentions") return n.type === "mention";
    return true;
  });

  const groupedNotifications = {
    today: filteredNotifications.filter((n) => n.group === "today"),
    yesterday: filteredNotifications.filter((n) => n.group === "yesterday"),
    earlier: filteredNotifications.filter((n) => n.group === "earlier"),
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const dismiss = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-violet-600 via-purple-600 to-indigo-700 p-6 text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-white/5 rounded-full translate-y-1/2" />
        <div className="relative z-10 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm shrink-0">
            <Bell className="h-7 w-7" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Notifications</h1>
            <p className="text-violet-100 text-sm mt-0.5">
              Stay updated on your tasks and assignments
            </p>
          </div>
          {unreadCount > 0 && (
            <Button
              onClick={markAllAsRead}
              className="bg-white/20 hover:bg-white/30 text-white border-white/20 gap-2 rounded-xl"
            >
              <CheckCheck className="h-4 w-4" /> Mark all read
            </Button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            label: "Total",
            value: notifications.length,
            icon: Bell,
            color: "text-violet-400",
            bg: "bg-violet-500/10",
          },
          {
            label: "Unread",
            value: unreadCount,
            icon: AlertTriangle,
            color: "text-amber-400",
            bg: "bg-amber-500/10",
          },
          {
            label: "Tasks",
            value: notifications.filter((n) => n.type === "task").length,
            icon: CheckSquare,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
          },
          {
            label: "Mentions",
            value: notifications.filter((n) => n.type === "mention").length,
            icon: MessageCircle,
            color: "text-blue-400",
            bg: "bg-blue-500/10",
          },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="bg-[#16162a] border-white/6 rounded-2xl">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.bg} shrink-0`}
                  >
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xl font-bold text-white">
                      {stat.value}
                    </div>
                    <div className="text-[10px] text-white/40">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1 p-1 rounded-xl bg-white/4 border border-white/6">
          {[
            { key: "all" as const, label: "All" },
            { key: "unread" as const, label: "Unread" },
            { key: "mentions" as const, label: "Mentions" },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                "flex-1 px-4 py-2 rounded-lg text-xs font-medium transition-all",
                filter === f.key
                  ? "bg-white/10 text-white shadow-sm"
                  : "text-white/40 hover:text-white/60 hover:bg-white/5",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs text-white/30 gap-1.5 hover:text-white/50 hover:bg-white/5"
          onClick={clearAll}
        >
          <Trash2 className="h-3 w-3" /> Clear all
        </Button>
      </div>

      {/* Notification list */}
      {notifications.length === 0 ? (
        <div className="text-center py-16">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 mx-auto mb-4">
            <Bell className="h-8 w-8 text-white/20" />
          </div>
          <h3 className="font-semibold text-white mb-1">No notifications</h3>
          <p className="text-sm text-white/40">You&apos;re all caught up!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedNotifications).map(([group, items]) => {
            if (items.length === 0) return null;
            return (
              <div key={group}>
                <div className="text-xs font-bold text-white/30 uppercase tracking-wider mb-3 px-1">
                  {group === "today"
                    ? "Today"
                    : group === "yesterday"
                      ? "Yesterday"
                      : "Earlier"}
                </div>
                <div className="space-y-2">
                  {items.map((notif) => {
                    const config = typeConfig[notif.type] || typeConfig.system;
                    const Icon = config.icon;
                    return (
                      <motion.div
                        key={notif.id}
                        layout
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={cn(
                          "relative flex gap-4 rounded-xl p-4 transition-all group cursor-pointer",
                          !notif.read
                            ? "bg-white/4 hover:bg-white/6 border border-white/6"
                            : "bg-white/2 hover:bg-white/4 border border-transparent",
                        )}
                        onClick={() => markAsRead(notif.id)}
                      >
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${config.bg}`}
                        >
                          <Icon className={`h-4.5 w-4.5 ${config.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span
                              className={cn(
                                "text-sm font-semibold text-white/80",
                                !notif.read && "text-white",
                              )}
                            >
                              {notif.title}
                            </span>
                            {!notif.read && (
                              <div className="h-1.5 w-1.5 rounded-full bg-violet-400 shrink-0" />
                            )}
                          </div>
                          <p className="text-xs text-white/40 line-clamp-2 leading-relaxed">
                            {notif.description}
                          </p>
                          <span className="text-[10px] text-white/25 mt-1.5 block">
                            {notif.time}
                          </span>
                        </div>
                        <div className="flex items-start opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-white/30 hover:text-white/60 hover:bg-white/5"
                            onClick={(e) => {
                              e.stopPropagation();
                              dismiss(notif.id);
                            }}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

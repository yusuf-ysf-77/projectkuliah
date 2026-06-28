"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  CheckSquare,
  MessageCircle,
  Clock,
  X,
  CheckCheck,
  Settings,
  Trash2,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { useStore } from "@/lib/store";
import { useRouter } from "next/navigation";
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
    type: "mention",
    title: "You were mentioned",
    description: "Sari mentioned you in 'Sprint Planning': @Andi please review",
    time: "10 min ago",
    group: "today",
    read: false,
  },
  {
    id: "3",
    type: "chat",
    title: "New message",
    description: "Sari: Meeting jam 3 sore ya",
    time: "15 min ago",
    group: "today",
    read: false,
  },
  {
    id: "4",
    type: "deadline",
    title: "Deadline approaching",
    description: "API Authentication due in 2 days",
    time: "1 hour ago",
    group: "today",
    read: false,
  },
  {
    id: "5",
    type: "task",
    title: "Task completed",
    description: "Budi completed 'Landing Page'",
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
    type: "chat",
    title: "New message",
    description: "Maya: Oke, saya fokus ke responsive",
    time: "Yesterday",
    group: "yesterday",
    read: true,
  },
  {
    id: "9",
    type: "task",
    title: "Task deadline passed",
    description: "Video Tutorial was due yesterday",
    time: "2 days ago",
    group: "earlier",
    read: true,
  },
  {
    id: "10",
    type: "mention",
    title: "You were mentioned",
    description: "Farhan mentioned you in 'Design Review'",
    time: "3 days ago",
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
  system: { icon: Settings, color: "text-white/40", bg: "bg-white/5" },
};

export function Notifications() {
  const { currentUser } = useStore();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<"all" | "unread" | "mentions">("all");
  const [showSettings, setShowSettings] = useState(false);

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
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="relative h-9 w-9 text-white/50 hover:text-white hover:bg-white/5"
        onClick={() => setOpen(!open)}
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 h-4 min-w-4 px-1 rounded-full gradient-primary text-white text-[9px] font-bold flex items-center justify-center"
          >
            {unreadCount}
          </motion.div>
        )}
      </Button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-full mt-2 w-105 rounded-2xl glass-strong border border-white/8 shadow-2xl shadow-black/40 z-50 overflow-hidden"
            >
              {/* Header */}
              <div className="p-5 border-b border-white/6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-base font-bold text-white">
                      Notifications
                    </h3>
                    {unreadCount > 0 && (
                      <Badge className="gradient-primary text-white border-0 text-[10px] px-2 py-0.5">
                        {unreadCount} new
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    {unreadCount > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-[11px] h-7 px-2.5 gap-1.5 text-white/50 hover:text-white hover:bg-white/5"
                        onClick={markAllAsRead}
                      >
                        <CheckCheck className="h-3 w-3" /> Mark all read
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-white/40 hover:text-white hover:bg-white/5"
                      onClick={() => setShowSettings(!showSettings)}
                    >
                      <Settings className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>

                {/* Filter tabs */}
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
                        "flex-1 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all",
                        filter === f.key
                          ? "bg-white/10 text-white shadow-sm"
                          : "text-white/40 hover:text-white/60 hover:bg-white/5",
                      )}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Settings panel */}
              <AnimatePresence>
                {showSettings && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-b border-white/6 overflow-hidden"
                  >
                    <div className="p-4 space-y-3">
                      <div className="flex items-center justify-between text-xs text-white/60">
                        <span>Push notifications</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between text-xs text-white/60">
                        <span>Email notifications</span>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between text-xs text-white/60">
                        <span>Sound</span>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Notification list */}
              <ScrollArea className="h-105">
                {notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16">
                    <div className="h-14 w-14 rounded-2xl bg-white/5 flex items-center justify-center mb-3">
                      <Bell className="h-6 w-6 text-white/20" />
                    </div>
                    <p className="text-sm font-medium text-white/60">
                      No notifications
                    </p>
                    <p className="text-xs text-white/30">
                      You&apos;re all caught up!
                    </p>
                  </div>
                ) : (
                  <div className="p-3 space-y-4">
                    {Object.entries(groupedNotifications).map(
                      ([group, items]) => {
                        if (items.length === 0) return null;
                        return (
                          <div key={group}>
                            <div className="px-2 pb-2 text-[10px] font-bold text-white/30 uppercase tracking-wider">
                              {group === "today"
                                ? "Today"
                                : group === "yesterday"
                                  ? "Yesterday"
                                  : "Earlier"}
                            </div>
                            <div className="space-y-1.5">
                              {items.map((notif) => {
                                const config =
                                  typeConfig[notif.type] || typeConfig.system;
                                const Icon = config.icon;
                                return (
                                  <motion.div
                                    key={notif.id}
                                    layout
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10, height: 0 }}
                                    className={cn(
                                      "relative flex gap-3.5 rounded-xl p-3.5 transition-all group cursor-pointer",
                                      !notif.read
                                        ? "bg-white/4 hover:bg-white/6 border border-white/6"
                                        : "hover:bg-white/3",
                                    )}
                                    onClick={() => markAsRead(notif.id)}
                                  >
                                    <div
                                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${config.bg}`}
                                    >
                                      <Icon
                                        className={`h-4.5 w-4.5 ${config.color}`}
                                      />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2 mb-0.5">
                                        <span
                                          className={cn(
                                            "text-[13px] font-semibold text-white/80",
                                            !notif.read && "text-white",
                                          )}
                                        >
                                          {notif.title}
                                        </span>
                                        {!notif.read && (
                                          <div className="h-1.5 w-1.5 rounded-full bg-violet-400 shrink-0" />
                                        )}
                                      </div>
                                      <p className="text-[12px] text-white/40 line-clamp-2 leading-relaxed">
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
                      },
                    )}
                  </div>
                )}
              </ScrollArea>

              {/* Footer */}
              <div className="p-3 border-t border-white/6 flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[11px] text-white/30 gap-1.5 hover:text-white/50 hover:bg-white/5"
                  onClick={clearAll}
                >
                  <Trash2 className="h-3 w-3" /> Clear all
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[11px] text-white/30 gap-1.5 hover:text-white/50 hover:bg-white/5"
                  onClick={() => {
                    setOpen(false);
                    router.push(
                      currentUser.role === "leader"
                        ? "/owtask/dashboard/leader/notifications"
                        : "/owtask/dashboard/worker/notifications",
                    );
                  }}
                >
                  View all notifications
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

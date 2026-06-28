"use client";

import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  CalendarDays,
  Search,
  Filter,
  List,
  LayoutGrid,
  X,
  Trash2,
  FileText,
  Check,
  AlertTriangle,
  Users,
  Star,
  ArrowRight,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

function QuickDateButtons({
  form,
  setForm,
}: {
  form: { date: string };
  setForm: (
    f: (prev: {
      title: string;
      description: string;
      type: string;
      date: string;
    }) => { title: string; description: string; type: string; date: string },
  ) => void;
}) {
  const today = new Date();
  const quickDates = [
    { label: "Today", date: today.toISOString().split("T")[0] },
    {
      label: "Tomorrow",
      date: new Date(today.getTime() + 86400000).toISOString().split("T")[0],
    },
    {
      label: "Next Week",
      date: new Date(today.getTime() + 7 * 86400000)
        .toISOString()
        .split("T")[0],
    },
  ];
  return (
    <div className="flex gap-2">
      {quickDates.map((q) => (
        <button
          key={q.label}
          type="button"
          onClick={() => setForm((prev) => ({ ...prev, date: q.date }))}
          className={cn(
            "px-3 py-1.5 rounded-lg text-xs font-medium border transition-all",
            form.date === q.date
              ? "bg-violet-500/15 border-violet-500/30 text-violet-400"
              : "border-white/8 text-white/50 hover:bg-white/4",
          )}
        >
          {q.label}
        </button>
      ))}
    </div>
  );
}

type ViewMode = "list" | "board" | "month";
type EventType = "holiday" | "deadline" | "plan" | "meeting";

const MONTHS = [
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
const DAYS_SHORT = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const TASK_COLORS = [
  "from-violet-400 to-purple-500",
  "from-blue-400 to-cyan-500",
  "from-emerald-400 to-teal-500",
  "from-amber-400 to-orange-500",
  "from-rose-400 to-pink-500",
  "from-indigo-400 to-violet-500",
  "from-teal-400 to-green-500",
  "from-pink-400 to-rose-500",
];

const EVENT_TYPES: {
  key: EventType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bg: string;
  activeBg: string;
}[] = [
  {
    key: "plan",
    label: "Plan",
    icon: Star,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    activeBg: "bg-emerald-500",
  },
  {
    key: "deadline",
    label: "Deadline",
    icon: AlertTriangle,
    color: "text-amber-600",
    bg: "bg-amber-50",
    activeBg: "bg-amber-500",
  },
  {
    key: "meeting",
    label: "Meeting",
    icon: Users,
    color: "text-blue-600",
    bg: "bg-blue-50",
    activeBg: "bg-blue-500",
  },
  {
    key: "holiday",
    label: "Holiday",
    icon: Zap,
    color: "text-red-600",
    bg: "bg-red-50",
    activeBg: "bg-red-500",
  },
];

const EVENT_COLORS: Record<
  EventType,
  { bg: string; text: string; dot: string }
> = {
  holiday: { bg: "bg-red-500/10", text: "text-red-400", dot: "bg-red-400" },
  deadline: {
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    dot: "bg-amber-400",
  },
  meeting: { bg: "bg-blue-500/10", text: "text-blue-400", dot: "bg-blue-400" },
  plan: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    dot: "bg-emerald-400",
  },
};

export default function CalendarPage() {
  const router = useRouter();
  const {
    calendarEvents,
    addCalendarEvent,
    deleteCalendarEvent,
    tasks,
    currentUser,
  } = useStore();
  const [viewMode, setViewMode] = useState<ViewMode>("month");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [showEventDetail, setShowEventDetail] = useState(false);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [monthViewDate, setMonthViewDate] = useState(new Date());

  const [eventDialogOpen, setEventDialogOpen] = useState(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "plan" as string,
    date: "",
  });
  const [formStep, setFormStep] = useState<1 | 2>(1);

  const weekStart = useMemo(() => {
    const d = new Date(currentDate);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    d.setDate(diff);
    return d;
  }, [currentDate]);

  const weekDays = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(weekStart);
      d.setDate(d.getDate() + i);
      return d;
    });
  }, [weekStart]);

  const monthGrid = useMemo(() => {
    const year = monthViewDate.getFullYear();
    const month = monthViewDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startOffset = firstDay === 0 ? 6 : firstDay - 1;
    const cells: (number | null)[] = [];
    for (let i = 0; i < startOffset; i++) cells.push(null);
    for (let i = 1; i <= daysInMonth; i++) cells.push(i);
    return cells;
  }, [monthViewDate]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [tasks, searchQuery]);

  const filteredEvents = useMemo(() => {
    return calendarEvents.filter((e) => {
      const matchSearch = e.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchType = filterType === "all" || e.type === filterType;
      return matchSearch && matchType;
    });
  }, [calendarEvents, searchQuery, filterType]);

  const getEventsForDate = useCallback(
    (d: Date) => {
      const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      return filteredEvents.filter((e) => e.date === dateStr);
    },
    [filteredEvents],
  );

  const getTasksForDate = useCallback(
    (d: Date) => {
      const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      return filteredTasks.filter(
        (t) => t.deadline === dateStr || t.createdAt === dateStr,
      );
    },
    [filteredTasks],
  );

  const navigateWeek = (dir: number) => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() + dir * 7);
    setCurrentDate(d);
  };

  const navigateMonth = (dir: number) => {
    const d = new Date(monthViewDate);
    d.setMonth(d.getMonth() + dir);
    setMonthViewDate(d);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setMonthViewDate(new Date());
  };

  const openAddDialog = (dateStr?: string) => {
    setEditingEventId(null);
    setForm({
      title: "",
      description: "",
      type: "plan",
      date: dateStr || new Date().toISOString().split("T")[0],
    });
    setFormStep(1);
    setEventDialogOpen(true);
  };

  const openEditDialog = (eventId: string) => {
    const event = calendarEvents.find((e) => e.id === eventId);
    if (!event) return;
    setEditingEventId(eventId);
    setForm({
      title: event.title,
      description: event.description || "",
      type: event.type,
      date: event.date,
    });
    setFormStep(1);
    setEventDialogOpen(true);
    setShowEventDetail(false);
  };

  const handleSaveEvent = () => {
    if (!form.title || !form.date) return;
    if (editingEventId) deleteCalendarEvent(editingEventId);
    addCalendarEvent({
      id: editingEventId || "e" + Date.now(),
      title: form.title,
      date: form.date,
      type: form.type as EventType,
      description: form.description,
      userId: currentUser.id,
    });
    setEventDialogOpen(false);
    setEditingEventId(null);
    setForm({ title: "", description: "", type: "plan", date: "" });
    setFormStep(1);
  };

  const handleDeleteEvent = (id: string) => {
    deleteCalendarEvent(id);
    setShowEventDetail(false);
    setSelectedEvent(null);
  };

  const handleDayClick = (d: Date) => {
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    openAddDialog(dateStr);
  };

  const handleEventClick = (eventId: string) => {
    setSelectedEvent(eventId);
    setShowEventDetail(true);
  };

  const selectedEventData = selectedEvent
    ? calendarEvents.find((e) => e.id === selectedEvent)
    : null;

  const isToday = (d: Date) => d.toDateString() === new Date().toDateString();

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Calendar</h1>
          <p className="text-white/40 text-sm mt-1">
            Track tasks, deadlines, and plans
          </p>
        </div>
        <Button
          size="sm"
          className="gradient-primary text-white gap-2 text-xs h-9 px-4 rounded-xl"
          onClick={() => openAddDialog()}
        >
          <Plus className="h-3.5 w-3.5" /> New Event
        </Button>
      </div>

      {/* View tabs + Controls */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-1 p-1 rounded-xl bg-white/4 border border-white/6">
          {[
            { key: "list" as ViewMode, label: "List", icon: List },
            { key: "board" as ViewMode, label: "Board", icon: LayoutGrid },
            { key: "month" as ViewMode, label: "Month", icon: CalendarDays },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setViewMode(tab.key)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all",
                viewMode === tab.key
                  ? "bg-white/10 text-white shadow-sm"
                  : "text-white/40 hover:text-white/60 hover:bg-white/5",
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/30" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-48 h-9 pl-9 text-xs bg-white/4 border-white/6 text-white placeholder:text-white/20 rounded-xl"
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-40 h-9 text-xs bg-white/4 border-white/6 text-white/60 rounded-xl hover:bg-white/6 transition-colors">
              <Filter className="h-3.5 w-3.5 mr-1.5 text-white/40" />
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a30] border-white/8 rounded-xl p-1.5">
              <SelectItem
                value="all"
                className="text-white/70 rounded-lg text-xs cursor-pointer focus:bg-white/8 focus:text-white/90"
              >
                <span className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-linear-to-r from-violet-400 to-purple-500" />
                  All Types
                </span>
              </SelectItem>
              {EVENT_TYPES.map((type) => (
                <SelectItem
                  key={type.key}
                  value={type.key}
                  className="text-white/70 rounded-lg text-xs cursor-pointer focus:bg-white/8 focus:text-white/90"
                >
                  <span className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${type.activeBg}`} />
                    {type.label}s
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-base font-bold text-white">
            {viewMode === "month"
              ? `${MONTHS[monthViewDate.getMonth()]} ${monthViewDate.getFullYear()}`
              : `${weekDays[0].getDate()} ${MONTHS[weekDays[0].getMonth()].slice(0, 3)} - ${weekDays[6].getDate()} ${MONTHS[weekDays[6].getMonth()].slice(0, 3)}`}
          </h2>
          <Button
            variant="outline"
            size="sm"
            className="text-xs h-7 px-3 border-white/8 text-white/50 hover:text-white hover:bg-white/4 rounded-lg"
            onClick={goToToday}
          >
            Today
          </Button>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-white/40 hover:text-white hover:bg-white/4 rounded-lg"
              onClick={() =>
                viewMode === "month" ? navigateMonth(-1) : navigateWeek(-1)
              }
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-white/40 hover:text-white hover:bg-white/4 rounded-lg"
              onClick={() =>
                viewMode === "month" ? navigateMonth(1) : navigateWeek(1)
              }
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-white/40">
          {EVENT_TYPES.map((t) => (
            <span key={t.key} className="flex items-center gap-1.5">
              <div className={`h-2.5 w-2.5 rounded-full ${t.activeBg}`} />
              {t.label}
            </span>
          ))}
        </div>
      </div>

      {/* Main content */}
      <AnimatePresence mode="wait">
        {viewMode === "month" ? (
          <motion.div
            key="month"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Card className="bg-[#16162a] border-white/6 overflow-hidden rounded-2xl">
              <CardContent className="p-0">
                <div className="grid grid-cols-7 border-b border-white/6">
                  {DAYS_SHORT.map((day) => (
                    <div
                      key={day}
                      className="p-3 text-center text-[11px] font-bold text-white/40 uppercase tracking-wider"
                    >
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7">
                  {monthGrid.map((day, i) => {
                    if (day === null)
                      return (
                        <div
                          key={`empty-${i}`}
                          className="h-32 border-b border-r border-white/4"
                        />
                      );
                    const d = new Date(
                      monthViewDate.getFullYear(),
                      monthViewDate.getMonth(),
                      day,
                    );
                    const dayEvents = getEventsForDate(d);
                    const dayTasks = getTasksForDate(d);
                    const today = isToday(d);
                    return (
                      <div
                        key={day}
                        className={cn(
                          "h-32 border-b border-r border-white/4 p-2.5 cursor-pointer hover:bg-white/2sition-colors",
                          today && "bg-violet-500/5",
                        )}
                        onClick={() => handleDayClick(d)}
                      >
                        <div
                          className={cn(
                            "text-xs font-semibold mb-2 w-6 h-6 flex items-center justify-center rounded-lg",
                            today
                              ? "bg-violet-500 text-white"
                              : "text-white/50",
                          )}
                        >
                          {day}
                        </div>
                        <div className="space-y-1">
                          {dayEvents.slice(0, 2).map((e) => {
                            const tc =
                              EVENT_COLORS[e.type as EventType] ||
                              EVENT_COLORS.plan;
                            return (
                              <div
                                key={e.id}
                                onClick={(ev) => {
                                  ev.stopPropagation();
                                  handleEventClick(e.id);
                                }}
                                className={cn(
                                  "text-[10px] px-2 py-1 rounded-md truncate cursor-pointer font-medium",
                                  tc.bg,
                                  tc.text,
                                )}
                              >
                                {e.title}
                              </div>
                            );
                          })}
                          {dayTasks.slice(0, 1).map((t) => (
                            <div
                              key={t.id}
                              onClick={(ev) => {
                                ev.stopPropagation();
                                router.push(
                                  `/owtask/dashboard/leader/tasks/${t.id}`,
                                );
                              }}
                              className="text-[10px] px-2 py-1 rounded-md truncate bg-blue-500/10 text-blue-400 cursor-pointer flex items-center gap-1 font-medium"
                            >
                              <FileText className="h-2.5 w-2.5" />
                              {t.title}
                            </div>
                          ))}
                          {dayEvents.length + dayTasks.length > 3 && (
                            <div className="text-[9px] text-white/30 font-medium">
                              +{dayEvents.length + dayTasks.length - 3} more
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : viewMode === "list" ? (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            <div className="text-xs font-bold text-white/30 uppercase tracking-wider mb-3 px-1">
              Events
            </div>
            {filteredEvents.map((event) => {
              const tc =
                EVENT_COLORS[event.type as EventType] || EVENT_COLORS.plan;
              return (
                <div
                  key={event.id}
                  onClick={() => handleEventClick(event.id)}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/2 border border-white/6 hover:border-white/12 transition-all cursor-pointer"
                >
                  <div
                    className={`h-2.5 w-2.5 rounded-full ${tc.dot} shrink-0`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-white/80">
                      {event.title}
                    </div>
                    <div className="text-xs text-white/40 mt-0.5">
                      {formatDate(event.date)}
                    </div>
                  </div>
                  <Badge
                    className={`${tc.bg} ${tc.text} border-0 text-[10px] px-2.5 py-0.5 rounded-lg`}
                  >
                    {event.type}
                  </Badge>
                </div>
              );
            })}
            <div className="text-xs font-bold text-white/30 uppercase tracking-wider mt-6 mb-3 px-1">
              Tasks with Deadlines
            </div>
            {filteredTasks.map((task, i) => (
              <div
                key={task.id}
                onClick={() =>
                  router.push(`/owtask/dashboard/leader/tasks/${task.id}`)
                }
                className="flex items-center gap-4 p-4 rounded-xl bg-white/2 border border-white/6 hover:border-white/12 transition-all cursor-pointer"
              >
                <div
                  className={cn(
                    "h-2.5 w-10 rounded-full bg-linear-to-r shrink-0",
                    TASK_COLORS[i % TASK_COLORS.length],
                  )}
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-white/80">
                    {task.title}
                  </div>
                  <div className="text-xs text-white/40 mt-0.5">
                    Deadline:{" "}
                    {new Date(task.deadline).toLocaleDateString("id-ID")}
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="text-[10px] border-white/10 text-white/50 rounded-lg"
                >
                  {task.status.replace("_", " ")}
                </Badge>
              </div>
            ))}
          </motion.div>
        ) : viewMode === "board" ? (
          <motion.div
            key="board"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {EVENT_TYPES.map((type) => {
                const typeEvents = filteredEvents.filter(
                  (e) => e.type === type.key,
                );
                return (
                  <div key={type.key}>
                    <div className="flex items-center gap-2.5 mb-3 px-1">
                      <div
                        className={`h-3 w-3 rounded-full ${type.activeBg}`}
                      />
                      <span className="text-xs font-bold text-white/70">
                        {type.label}s
                      </span>
                      <Badge
                        variant="secondary"
                        className="text-[10px] h-5 ml-auto bg-white/6 text-white/40 border-0 rounded-lg"
                      >
                        {typeEvents.length}
                      </Badge>
                    </div>
                    <div className="space-y-2.5 min-h-36 rounded-xl bg-white/2 p-3 border border-white/4">
                      {typeEvents.map((event) => (
                        <div
                          key={event.id}
                          onClick={() => handleEventClick(event.id)}
                          className="bg-white/4 rounded-xl p-3.5 cursor-pointer hover:bg-white/6 transition-colors border border-white/6"
                        >
                          <div className="text-xs font-semibold text-white/70 mb-1.5">
                            {event.title}
                          </div>
                          <div className="text-[10px] text-white/30">
                            {new Date(event.date).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "short",
                            })}
                          </div>
                        </div>
                      ))}
                      {typeEvents.length === 0 && (
                        <div className="text-center text-xs text-white/20 py-6">
                          No events
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* ADD/EDIT EVENT DIALOG */}
      <Dialog open={eventDialogOpen} onOpenChange={setEventDialogOpen}>
        <DialogContent className="max-w-md p-0 overflow-hidden rounded-2xl bg-[#1e1e3a] border border-white/8 [&>button]:hidden">
          <div className="gradient-primary p-4 text-white">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-white">
                {editingEventId ? "Edit Event" : "New Event"}
              </DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white hover:bg-white/20"
                onClick={() => setEventDialogOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <div
                className={`flex items-center gap-1.5 text-xs ${formStep === 1 ? "text-white" : "text-white/50"}`}
              >
                <div
                  className={`h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold ${formStep === 1 ? "bg-white text-emerald-600" : "bg-white/20"}`}
                >
                  1
                </div>
                Details
              </div>
              <div className="flex-1 h-px bg-white/20" />
              <div
                className={`flex items-center gap-1.5 text-xs ${formStep === 2 ? "text-white" : "text-white/50"}`}
              >
                <div
                  className={`h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold ${formStep === 2 ? "bg-white text-emerald-600" : "bg-white/20"}`}
                >
                  2
                </div>
                Schedule
              </div>
            </div>
          </div>

          <div className="p-5">
            <AnimatePresence mode="wait">
              {formStep === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label className="text-xs font-medium text-white/60">
                      Event Type
                    </Label>
                    <div className="grid grid-cols-2 gap-2">
                      {EVENT_TYPES.map((type) => (
                        <button
                          key={type.key}
                          type="button"
                          onClick={() => setForm({ ...form, type: type.key })}
                          className={cn(
                            "flex items-center gap-2 p-3 rounded-xl border-2 transition-all text-left",
                            form.type === type.key
                              ? `${type.bg} border-current ${type.color}`
                              : "border-white/8 hover:border-white/15",
                          )}
                        >
                          <div
                            className={cn(
                              "h-8 w-8 rounded-lg flex items-center justify-center",
                              form.type === type.key
                                ? type.activeBg
                                : "bg-white/6",
                            )}
                          >
                            <type.icon
                              className={cn(
                                "h-4 w-4",
                                form.type === type.key
                                  ? "text-white"
                                  : "text-white/40",
                              )}
                            />
                          </div>
                          <span
                            className={cn(
                              "text-sm font-medium",
                              form.type === type.key ? "" : "text-white/60",
                            )}
                          >
                            {type.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-medium text-white/60">
                      Title
                    </Label>
                    <Input
                      placeholder="What's the event?"
                      value={form.title}
                      onChange={(e) =>
                        setForm({ ...form, title: e.target.value })
                      }
                      className="h-10 bg-white/4 border-white/8 text-white placeholder:text-white/30"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-medium text-white/60">
                      Description{" "}
                      <span className="text-white/30">(optional)</span>
                    </Label>
                    <Textarea
                      placeholder="Add details..."
                      value={form.description}
                      onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                      }
                      rows={2}
                      className="bg-white/4 border-white/8 text-white placeholder:text-white/30 resize-none"
                    />
                  </div>

                  <Button
                    onClick={() => setFormStep(2)}
                    className="w-full gradient-primary text-white"
                    disabled={!form.title}
                  >
                    Next: Set Date & Time{" "}
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label className="text-xs font-medium text-white/60">
                      Date
                    </Label>
                    <Input
                      type="date"
                      value={form.date}
                      onChange={(e) =>
                        setForm({ ...form, date: e.target.value })
                      }
                      className="h-10 bg-white/4 border-white/8 text-white"
                    />
                  </div>

                  <QuickDateButtons form={form} setForm={setForm} />

                  <div className="rounded-xl bg-white/4 p-3 space-y-2 border border-white/6">
                    <div className="text-xs font-medium text-white/40">
                      Summary
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          "h-3 w-3 rounded-full",
                          EVENT_TYPES.find((t) => t.key === form.type)
                            ?.activeBg,
                        )}
                      />
                      <span className="text-sm font-medium text-white/80">
                        {form.title || "Untitled"}
                      </span>
                    </div>
                    <div className="text-xs text-white/40">
                      {form.date ? formatDate(form.date) : "No date selected"}{" "}
                      &middot; {form.type}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setFormStep(1)}
                      className="flex-1 border-white/8 text-white/60 hover:bg-white/4"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleSaveEvent}
                      className="flex-1 gradient-primary text-white gap-1.5"
                      disabled={!form.title || !form.date}
                    >
                      <Check className="h-4 w-4" />{" "}
                      {editingEventId ? "Update" : "Create"} Event
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </DialogContent>
      </Dialog>

      {/* EVENT DETAIL DIALOG */}
      <Dialog open={showEventDetail} onOpenChange={setShowEventDetail}>
        <DialogContent className="max-w-sm p-0 overflow-hidden rounded-2xl bg-[#1e1e3a] border border-white/8 [&>button]:hidden">
          {selectedEventData && (
            <>
              <div
                className={cn(
                  "p-4 text-white",
                  EVENT_TYPES.find((t) => t.key === selectedEventData.type)
                    ?.activeBg || "bg-emerald-500",
                )}
              >
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-white">
                    {selectedEventData.title}
                  </DialogTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-white hover:bg-white/20"
                    onClick={() => setShowEventDetail(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <Badge className="mt-2 bg-white/20 text-white border-0 text-xs capitalize rounded-lg">
                  {selectedEventData.type}
                </Badge>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <CalendarDays className="h-4 w-4 text-white/30" />
                  {formatDate(selectedEventData.date)}
                </div>
                {selectedEventData.description && (
                  <p className="text-sm text-white/50">
                    {selectedEventData.description}
                  </p>
                )}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-1.5 text-xs border-white/8 text-white/60 hover:bg-white/4"
                    onClick={() => openEditDialog(selectedEventData.id)}
                  >
                    <FileText className="h-3 w-3" /> Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-1.5 text-xs text-rose-400 border-rose-500/20 hover:bg-rose-500/10"
                    onClick={() => handleDeleteEvent(selectedEventData.id)}
                  >
                    <Trash2 className="h-3 w-3" /> Delete
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

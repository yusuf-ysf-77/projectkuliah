"use client";

import { motion } from "framer-motion";
import {
  MessageCircle,
  Paperclip,
  Clock,
  Hash,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getUserById } from "@/lib/mock-data";
import { useStore } from "@/lib/store";
import type { Task, TaskStatus } from "@/lib/types";

interface KanbanBoardProps {
  tasks: Task[];
  onTaskClick?: (task: Task) => void;
}

const columns: {
  status: TaskStatus;
  label: string;
  dot: string;
  cardBg: string;
  tagBg: string;
  tagText: string;
  progressFrom: string;
  progressTo: string;
  nextStatus?: TaskStatus;
}[] = [
  {
    status: "pending",
    label: "To Do",
    dot: "bg-violet-400",
    cardBg: "bg-[#1e1e3a]",
    tagBg: "bg-violet-500/15",
    tagText: "text-violet-300",
    progressFrom: "from-violet-400",
    progressTo: "to-purple-500",
    nextStatus: "in_progress",
  },
  {
    status: "in_progress",
    label: "In Progress",
    dot: "bg-blue-400",
    cardBg: "bg-[#1e1e3a]",
    tagBg: "bg-blue-500/15",
    tagText: "text-blue-300",
    progressFrom: "from-blue-400",
    progressTo: "to-cyan-500",
    nextStatus: "completed",
  },
  {
    status: "completed",
    label: "Done",
    dot: "bg-emerald-400",
    cardBg: "bg-[#1e1e3a]",
    tagBg: "bg-emerald-500/15",
    tagText: "text-emerald-300",
    progressFrom: "from-emerald-400",
    progressTo: "to-teal-500",
  },
  {
    status: "overdue",
    label: "Overdue",
    dot: "bg-rose-400",
    cardBg: "bg-[#1e1e3a]",
    tagBg: "bg-rose-500/15",
    tagText: "text-rose-300",
    progressFrom: "from-rose-400",
    progressTo: "to-pink-500",
    nextStatus: "in_progress",
  },
];

const tagColors = [
  { bg: "bg-violet-500/15", text: "text-violet-300" },
  { bg: "bg-amber-500/15", text: "text-amber-300" },
  { bg: "bg-cyan-500/15", text: "text-cyan-300" },
  { bg: "bg-pink-500/15", text: "text-pink-300" },
  { bg: "bg-lime-500/15", text: "text-lime-300" },
];

function TaskCard({
  task,
  col,
  onClick,
}: {
  task: Task;
  col: (typeof columns)[0];
  onClick?: () => void;
}) {
  const { updateTask } = useStore();
  const assignees = task.assigneeIds
    .map((id) => getUserById(id))
    .filter(Boolean);
  const progress =
    task.status === "completed"
      ? 100
      : task.status === "in_progress"
        ? 65
        : task.status === "overdue"
          ? 30
          : 15;
  const tags = task.division ? [task.division.toLowerCase()] : [];
  const tagColor =
    tagColors[Math.abs(task.title.charCodeAt(0)) % tagColors.length];

  const handleMoveForward = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (col.nextStatus) {
      updateTask(task.id, { status: col.nextStatus });
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="group"
    >
      <Card
        className={`${col.cardBg} border border-white/8 hover:border-white/15 hover:shadow-xl hover:shadow-violet-500/5 transition-all duration-300 cursor-pointer`}
        onClick={onClick}
      >
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {tags.map((tag, i) => (
              <span
                key={i}
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${tagColor.bg} ${tagColor.text}`}
              >
                <Hash className="h-2.5 w-2.5" />
                {tag}
              </span>
            ))}
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${col.tagBg} ${col.tagText}`}
            >
              {task.type === "group" ? "#team" : "#individual"}
            </span>
          </div>

          <h4 className="text-sm font-semibold text-white/90 mb-1.5 line-clamp-2 leading-snug">
            {task.title}
          </h4>
          <p className="text-xs text-white/50 line-clamp-2 mb-3 leading-relaxed">
            {task.description}
          </p>

          <div className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] text-white/40">Progress</span>
              <span className="text-[10px] font-semibold text-white/70">
                {progress}%
              </span>
            </div>
            <div className="h-2 rounded-full bg-white/6 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`h-full rounded-full bg-linear-to-r ${col.progressFrom} ${col.progressTo}`}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex -space-x-2">
              {assignees.slice(0, 3).map(
                (user, i) =>
                  user && (
                    <Avatar
                      key={user.id}
                      className="h-7 w-7 border-2 border-[#1e1e3a] ring-0"
                    >
                      <AvatarFallback
                        className="text-[9px] font-bold text-white"
                        style={{
                          background: `linear-gradient(135deg, ${
                            [
                              "#8b5cf6",
                              "#3b82f6",
                              "#10b981",
                              "#f59e0b",
                              "#ef4444",
                              "#ec4899",
                            ][i % 6]
                          }, ${
                            [
                              "#6366f1",
                              "#06b6d4",
                              "#14b8a6",
                              "#f97316",
                              "#f43f5e",
                              "#d946ef",
                            ][i % 6]
                          })`,
                        }}
                      >
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  ),
              )}
              {assignees.length > 3 && (
                <Avatar className="h-7 w-7 border-2 border-[#1e1e3a]">
                  <AvatarFallback className="bg-white/8 text-white/50 text-[9px] font-medium">
                    +{assignees.length - 3}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>

            <div className="flex items-center gap-2 text-[10px] text-white/40">
              {col.nextStatus && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-white/40 hover:text-white/70"
                  onClick={handleMoveForward}
                  title={`Move to ${columns.find((c) => c.status === col.nextStatus)?.label}`}
                >
                  <ArrowRight className="h-3 w-3" />
                </Button>
              )}
              {task.submissions.length > 0 && (
                <span className="flex items-center gap-1">
                  <MessageCircle className="h-3 w-3" />
                  {task.submissions.length}
                </span>
              )}
              {task.attachments.length > 0 && (
                <span className="flex items-center gap-1">
                  <Paperclip className="h-3 w-3" />
                  {task.attachments.length}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {new Date(task.deadline).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                })}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function KanbanBoard({ tasks, onTaskClick }: KanbanBoardProps) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "completed").length;

  return (
    <div className="bg-[#16162a] border border-white/6 overflow-hidden rounded-2xl h-[calc(100vh-221px)] flex flex-col">
      <div className="px-6 pt-5 pb-3 shrink-0 border-b border-white/4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white">Task Board</h3>
            <p className="text-[11px] text-white/30 mt-0.5">
              {totalTasks} total &middot; {completedTasks} selesai
            </p>
          </div>
          <div className="flex items-center gap-3 text-[10px] text-white/30">
            {columns.map((col) => {
              const count = tasks.filter((t) => t.status === col.status).length;
              return (
                <span key={col.status} className="flex items-center gap-1.5">
                  <div className={`h-2 w-2 rounded-full ${col.dot}`} />
                  {col.label} ({count})
                </span>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto min-h-0 p-5 theme-scrollbar">
        <div className="flex gap-4 h-full">
          {columns.map((col) => {
            const colTasks = tasks.filter((t) => t.status === col.status);
            return (
              <div key={col.status} className="flex-1 min-w-0">
                <div className="flex items-center gap-2.5 mb-3 px-1">
                  <div className={`h-3 w-3 rounded-full ${col.dot}`} />
                  <span className="text-sm font-bold text-white/90">
                    {col.label}
                  </span>
                  <Badge
                    variant="secondary"
                    className="ml-auto text-[10px] h-5 px-2 rounded-full font-semibold bg-white/6 text-white/50 border-0"
                  >
                    {colTasks.length}
                  </Badge>
                </div>

                <div className="space-y-3 min-h-60 rounded-2xl bg-white/2 p-3 border border-white/6">
                  {colTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      col={col}
                      onClick={() => onTaskClick?.(task)}
                    />
                  ))}

                  {colTasks.length === 0 && (
                    <div className="flex items-center justify-center h-32 text-xs text-white/20">
                      Belum ada tugas
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Search, LayoutGrid, List, CheckSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStore } from "@/lib/store";
import { getUserById } from "@/lib/mock-data";
import { KanbanBoard } from "@/components/owtask/task/kanban-board";
import type { TaskStatus } from "@/lib/types";

function WorkerTasksContent() {
  const { tasks, currentUser } = useStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const divisionParam = searchParams.get("division");
  const myTasks = tasks.filter((t) => t.assigneeIds.includes(currentUser.id));
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [divisionFilter, setDivisionFilter] = useState<string>(
    divisionParam || "all",
  );

  const filtered = myTasks.filter((t) => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || t.status === statusFilter;
    const matchDivision =
      divisionFilter === "all" || t.division === divisionFilter;
    return matchSearch && matchStatus && matchDivision;
  });

  const statusColor = (s: TaskStatus) => {
    switch (s) {
      case "completed":
        return "bg-emerald-500/10 text-emerald-400";
      case "in_progress":
        return "bg-blue-500/10 text-blue-400";
      case "overdue":
        return "bg-red-500/10 text-red-400";
      default:
        return "bg-amber-500/10 text-amber-400";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">My Tasks</h1>
        <p className="text-white/60 text-sm mt-1">
          View and manage your assigned tasks
        </p>
      </div>

      <Tabs defaultValue="kanban" className="w-full">
        <div className="flex items-center justify-between mb-5">
          <TabsList className="bg-white/4 border border-white/6 rounded-xl p-1">
            <TabsTrigger
              value="kanban"
              className="gap-2 rounded-lg data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/40"
            >
              <LayoutGrid className="h-4 w-4" /> Board
            </TabsTrigger>
            <TabsTrigger
              value="list"
              className="gap-2 rounded-lg data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/40"
            >
              <List className="h-4 w-4" /> List
            </TabsTrigger>
          </TabsList>

          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
              <Input
                placeholder="Search tasks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 w-50 bg-white/4 border-white/6 text-white placeholder:text-white/20 h-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32.5 bg-white/4 border-white/6 text-white/60 h-9">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a30] border-white/8">
                <SelectItem value="all" className="text-white/70">
                  All Status
                </SelectItem>
                <SelectItem value="pending" className="text-white/70">
                  Pending
                </SelectItem>
                <SelectItem value="in_progress" className="text-white/70">
                  In Progress
                </SelectItem>
                <SelectItem value="completed" className="text-white/70">
                  Completed
                </SelectItem>
                <SelectItem value="overdue" className="text-white/70">
                  Overdue
                </SelectItem>
              </SelectContent>
            </Select>
            <Select value={divisionFilter} onValueChange={setDivisionFilter}>
              <SelectTrigger className="w-32.5 bg-white/4 border-white/6 text-white/60 h-9">
                <SelectValue placeholder="Division" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a30] border-white/8">
                <SelectItem value="all" className="text-white/70">
                  All Divisions
                </SelectItem>
                <SelectItem value="Engineering" className="text-white/70">
                  Engineering
                </SelectItem>
                <SelectItem value="Marketing" className="text-white/70">
                  Marketing
                </SelectItem>
                <SelectItem value="Design" className="text-white/70">
                  Design
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="kanban">
          <KanbanBoard
            tasks={filtered}
            onTaskClick={(t) =>
              router.push(`/owtask/dashboard/worker/tasks/${t.id}`)
            }
          />
        </TabsContent>

        <TabsContent value="list">
          <div className="bg-[#16162a] border border-white/6 overflow-hidden rounded-2xl h-[calc(100vh-221px)] flex flex-col">
            <div className="px-6 pt-5 pb-3 shrink-0 border-b border-white/4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">My Tasks</h3>
                  <p className="text-[11px] text-white/30 mt-0.5">
                    {filtered.length} tugas
                  </p>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-white/30">
                  <span className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-amber-400" />{" "}
                    Pending
                  </span>
                  <span className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-blue-400" /> Active
                  </span>
                  <span className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-emerald-400" /> Done
                  </span>
                  <span className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-red-400" /> Overdue
                  </span>
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto min-h-0 p-5 theme-scrollbar">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((task, i) => {
                  const leader = getUserById(task.leaderId);
                  return (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <div
                        onClick={() =>
                          router.push(
                            `/owtask/dashboard/worker/tasks/${task.id}`,
                          )
                        }
                      >
                        <Card className="bg-[#1e1e3a] border-white/6 hover:border-white/12 hover:shadow-lg hover:shadow-violet-500/5 transition-all duration-300 hover:-translate-y-1 h-full rounded-2xl cursor-pointer">
                          <CardContent className="p-5">
                            <div className="flex items-start justify-between mb-3">
                              <Badge
                                className={`${statusColor(task.status)} border-0 text-xs rounded-lg`}
                              >
                                {task.status.replace("_", " ")}
                              </Badge>
                              <Badge
                                variant="outline"
                                className="text-xs capitalize border-white/10 text-white/50 rounded-lg"
                              >
                                {task.priority}
                              </Badge>
                            </div>
                            <h3 className="font-semibold text-white/90 mb-2 line-clamp-1">
                              {task.title}
                            </h3>
                            <p className="text-sm text-white/55 line-clamp-2 mb-4">
                              {task.description}
                            </p>
                            <div className="flex items-center justify-between text-xs text-white/45">
                              <span>From: {leader?.name}</span>
                              <span>
                                Due:{" "}
                                {new Date(task.deadline).toLocaleDateString(
                                  "id-ID",
                                )}
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {filtered.length === 0 && (
                <div className="text-center py-12">
                  <CheckSquare className="h-12 w-12 text-white/25 mx-auto mb-4" />
                  <p className="text-white/55">No tasks found</p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function WorkerTasksPage() {
  return (
    <Suspense>
      <WorkerTasksContent />
    </Suspense>
  );
}

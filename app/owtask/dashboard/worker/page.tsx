"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  CheckSquare,
  Clock,
  AlertTriangle,
  TrendingUp,
  ArrowRight,
  Calendar,
  Target,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { getUserById } from "@/lib/mock-data";
import Link from "next/link";
import {
  TaskDistributionChart,
  WeeklyProgressChart,
} from "@/components/owtask/dashboard/chart-components";

export default function WorkerDashboard() {
  const { tasks, currentUser } = useStore();
  const myTasks = tasks.filter((t) => t.assigneeIds.includes(currentUser.id));
  const now = useMemo(() => new Date(), []);

  const stats = [
    {
      label: "My Tasks",
      value: myTasks.length,
      icon: CheckSquare,
      color: "text-violet-400",
      bg: "bg-violet-500/10",
      change: "+3",
    },
    {
      label: "In Progress",
      value: myTasks.filter((t) => t.status === "in_progress").length,
      icon: Clock,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      change: "+1",
    },
    {
      label: "Completed",
      value: myTasks.filter((t) => t.status === "completed").length,
      icon: TrendingUp,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      change: "+2",
    },
    {
      label: "Overdue",
      value: myTasks.filter((t) => t.status === "overdue").length,
      icon: AlertTriangle,
      color: "text-red-400",
      bg: "bg-red-500/10",
      change: "-1",
    },
  ];

  const completionRate =
    myTasks.length > 0
      ? Math.round(
          (myTasks.filter((t) => t.status === "completed").length /
            myTasks.length) *
            100,
        )
      : 0;

  const upcomingTasks = myTasks
    .filter((t) => t.status !== "completed")
    .sort(
      (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime(),
    )
    .slice(0, 3);

  return (
    <div className="space-y-5">
      {/* Welcome banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-linear-to-br from-violet-600 to-purple-700 p-6 text-white"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="relative z-10">
          <h1 className="text-2xl font-bold mb-1">
            Hi, {currentUser.name.split(" ")[0]}! 👋
          </h1>
          <p className="text-violet-100">
            What do you want to{" "}
            <span className="text-white font-semibold">learn</span> today?
          </p>
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1.5 text-xs text-violet-200">
              <Target className="h-3.5 w-3.5" /> {completionRate}% completion
              rate
            </div>
            {upcomingTasks.length > 0 && (
              <div className="flex items-center gap-1.5 text-xs text-amber-200">
                <Calendar className="h-3.5 w-3.5" /> Next:{" "}
                {new Date(upcomingTasks[0].deadline).toLocaleDateString(
                  "id-ID",
                  { day: "numeric", month: "short" },
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="bg-[#16162a] border-white/6 hover:border-white/12 transition-all hover:shadow-lg hover:shadow-violet-500/5 rounded-2xl">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.bg}`}
                  >
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <Badge className="text-[10px] bg-violet-500/10 text-violet-400 border-0 rounded-lg">
                    {stat.change}
                  </Badge>
                </div>
                <div className="mt-4">
                  <div className="text-2xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/40">{stat.label}</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-5 lg:grid-cols-2">
        <WeeklyProgressChart />
        <TaskDistributionChart />
      </div>

      {/* Upcoming deadlines */}
      {upcomingTasks.length > 0 && (
        <Card className="bg-[#16162a] border-white/6 rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg text-white">
              Upcoming Deadlines
            </CardTitle>
            <Link href="/owtask/dashboard/worker/tasks">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 text-xs text-white/40 hover:text-white/70 hover:bg-white/5"
              >
                View all <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingTasks.map((task) => {
                const leader = getUserById(task.leaderId);
                const daysLeft = Math.ceil(
                  (new Date(task.deadline).getTime() - now.getTime()) /
                    (1000 * 60 * 60 * 24),
                );
                return (
                  <Link
                    key={task.id}
                    href={`/owtask/dashboard/worker/tasks/${task.id}`}
                    className="flex items-center justify-between rounded-xl border border-white/6 p-4 hover:bg-white/3 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-2.5 w-2.5 rounded-full ${daysLeft <= 3 ? "bg-red-400" : daysLeft <= 7 ? "bg-amber-400" : "bg-blue-400"}`}
                      />
                      <div>
                        <div className="text-sm font-semibold text-white/80">
                          {task.title}
                        </div>
                        <div className="text-xs text-white/30">
                          From: {leader?.name} &middot; Due:{" "}
                          {new Date(task.deadline).toLocaleDateString("id-ID")}
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant={daysLeft <= 3 ? "destructive" : "secondary"}
                      className="text-xs rounded-lg"
                    >
                      {daysLeft}d left
                    </Badge>
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* All my tasks */}
      <Card className="bg-[#16162a] border-white/6 rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg text-white">My Tasks</CardTitle>
          <Link href="/owtask/dashboard/worker/tasks">
            <Button
              variant="ghost"
              size="sm"
              className="gap-1 text-xs text-white/40 hover:text-white/70 hover:bg-white/5"
            >
              View all <ArrowRight className="h-3 w-3" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {myTasks.map((task) => {
              const leader = getUserById(task.leaderId);
              return (
                <Link
                  key={task.id}
                  href={`/owtask/dashboard/worker/tasks/${task.id}`}
                  className="flex items-center justify-between rounded-xl border border-white/6 p-4 hover:bg-white/3 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-2.5 w-2.5 rounded-full ${
                        task.status === "completed"
                          ? "bg-emerald-400"
                          : task.status === "in_progress"
                            ? "bg-blue-400"
                            : task.status === "overdue"
                              ? "bg-red-400"
                              : "bg-amber-400"
                      }`}
                    />
                    <div>
                      <div className="text-sm font-semibold text-white/80">
                        {task.title}
                      </div>
                      <div className="text-xs text-white/30">
                        From: {leader?.name} &middot; Due:{" "}
                        {new Date(task.deadline).toLocaleDateString("id-ID")}
                      </div>
                    </div>
                  </div>
                  <Badge
                    variant={
                      task.status === "completed"
                        ? "default"
                        : task.status === "overdue"
                          ? "destructive"
                          : "secondary"
                    }
                    className="text-xs rounded-lg"
                  >
                    {task.status.replace("_", " ")}
                  </Badge>
                </Link>
              );
            })}
            {myTasks.length === 0 && (
              <div className="text-center py-8 text-white/30">
                No tasks assigned yet
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

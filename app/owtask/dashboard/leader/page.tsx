"use client";

import { motion } from "framer-motion";
import {
  CheckSquare,
  Clock,
  AlertTriangle,
  TrendingUp,
  Users,
  ArrowRight,
  BarChart3,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useStore } from "@/lib/store";
import Link from "next/link";
import {
  TaskDistributionChart,
  WeeklyProgressChart,
  TeamPerformanceChart,
  ProductivityTrendChart,
  PriorityChart,
  DeadlineTimelineChart,
} from "@/components/owtask/dashboard/chart-components";

export default function LeaderDashboard() {
  const { tasks, users, currentUser } = useStore();
  const leaderTasks = tasks.filter((t) => t.leaderId === currentUser.id);
  const workers = users.filter((u) => u.role === "worker");

  const stats = [
    {
      label: "Total Tasks",
      value: leaderTasks.length,
      icon: CheckSquare,
      color: "text-violet-400",
      bg: "bg-violet-500/10",
      change: "+12%",
    },
    {
      label: "In Progress",
      value: leaderTasks.filter((t) => t.status === "in_progress").length,
      icon: Clock,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      change: "+5%",
    },
    {
      label: "Completed",
      value: leaderTasks.filter((t) => t.status === "completed").length,
      icon: TrendingUp,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      change: "+8%",
    },
    {
      label: "Overdue",
      value: leaderTasks.filter((t) => t.status === "overdue").length,
      icon: AlertTriangle,
      color: "text-red-400",
      bg: "bg-red-500/10",
      change: "-3%",
    },
  ];

  const completionRate =
    leaderTasks.length > 0
      ? Math.round(
          (leaderTasks.filter((t) => t.status === "completed").length /
            leaderTasks.length) *
            100,
        )
      : 0;

  const highPriorityCount = leaderTasks.filter(
    (t) => t.priority === "high" && t.status !== "completed",
  ).length;

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
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">
              Hi, {currentUser.name.split(" ")[0]}! 👋
            </h1>
            <p className="text-violet-100">
              What do you want to{" "}
              <span className="text-white font-semibold">learn</span> today?
            </p>
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1.5 text-xs text-violet-200">
                <BarChart3 className="h-3.5 w-3.5" /> {completionRate}%
                completion rate
              </div>
              {highPriorityCount > 0 && (
                <div className="flex items-center gap-1.5 text-xs text-amber-200">
                  <AlertTriangle className="h-3.5 w-3.5" /> {highPriorityCount}{" "}
                  high priority
                </div>
              )}
            </div>
          </div>
          <Link href="/owtask/dashboard/leader/tasks/new">
            <Button className="bg-white/20 hover:bg-white/30 text-white border-white/20 gap-2 rounded-xl shadow-lg">
              <CheckSquare className="h-4 w-4" /> New Task
            </Button>
          </Link>
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

      {/* Charts row 1 */}
      <div className="grid gap-5 lg:grid-cols-2">
        <WeeklyProgressChart />
        <TaskDistributionChart />
      </div>

      {/* Recent tasks + Team */}
      <div className="grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="bg-[#16162a] border-white/6 rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg text-white">Recent Tasks</CardTitle>
              <Link href="/owtask/dashboard/leader/tasks">
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
                {leaderTasks.slice(0, 5).map((task) => (
                  <Link
                    key={task.id}
                    href={`/owtask/dashboard/leader/tasks/${task.id}`}
                    className="flex items-center justify-between rounded-xl border border-white/6 p-3.5 hover:bg-white/3 transition-colors"
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
                          {task.division} &middot; {task.assigneeIds.length}{" "}
                          assignees
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
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
                      <span className="text-[10px] text-white/25 hidden sm:inline">
                        {new Date(task.deadline).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                        })}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-[#16162a] border-white/6 rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg text-white">Team</CardTitle>
            <Badge
              variant="secondary"
              className="text-xs bg-white/6 text-white/40 border-0 rounded-lg"
            >
              <Users className="h-3 w-3 mr-1" /> {workers.length}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {workers.slice(0, 6).map((user) => {
                const userTasks = tasks.filter((t) =>
                  t.assigneeIds.includes(user.id),
                );
                const completed = userTasks.filter(
                  (t) => t.status === "completed",
                ).length;
                return (
                  <div
                    key={user.id}
                    className="flex items-center gap-3 rounded-xl p-2.5 hover:bg-white/3 transition-colors"
                  >
                    <div className="relative">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-linear-to-br from-violet-400 to-purple-500 text-white text-xs rounded-xl">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-[#16162a]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-white/70 truncate">
                        {user.name}
                      </div>
                      <div className="text-xs text-white/30">
                        {user.division} &middot; {completed}/{userTasks.length}{" "}
                        done
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts row 2 */}
      <div className="grid gap-5 lg:grid-cols-3">
        <TeamPerformanceChart />
        <ProductivityTrendChart />
        <PriorityChart />
      </div>

      {/* Deadline timeline */}
      <DeadlineTimelineChart />
    </div>
  );
}

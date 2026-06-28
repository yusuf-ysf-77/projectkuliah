"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStore } from "@/lib/store";

interface ChartCardProps {
  title: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
}

function ChartCard({
  title,
  description,
  className,
  children,
}: ChartCardProps) {
  return (
    <Card
      className={`bg-[#16162a] border-white/6 rounded-2xl ${className}`}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-white">
          {title}
        </CardTitle>
        {description && (
          <p className="text-[11px] text-white/40">{description}</p>
        )}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

const tooltipStyle = {
  background: "rgba(22, 22, 42, 0.95)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "12px",
  fontSize: "12px",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
  color: "#f0f0f5",
  backdropFilter: "blur(12px)",
};

export function TaskDistributionChart() {
  const { tasks } = useStore();

  const total = tasks.length;
  const distribution = [
    {
      name: "To Do",
      value: tasks.filter((t) => t.status === "pending").length,
      fill: "#fbbf24",
    },
    {
      name: "In Progress",
      value: tasks.filter((t) => t.status === "in_progress").length,
      fill: "#60a5fa",
    },
    {
      name: "Done",
      value: tasks.filter((t) => t.status === "completed").length,
      fill: "#34d399",
    },
    {
      name: "Overdue",
      value: tasks.filter((t) => t.status === "overdue").length,
      fill: "#f87171",
    },
  ];

  return (
    <ChartCard
      title="Task Distribution"
      description="Overview of all task statuses"
    >
      <div className="flex items-center gap-4">
        <div className="h-50 w-50 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={distribution}
                cx="50%"
                cy="50%"
                innerRadius={42}
                outerRadius={68}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
              >
                {distribution.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={tooltipStyle}
                itemStyle={{ color: "#f0f0f5" }}
              />
              {total > 0 && (
                <text
                  x="50%"
                  y="48%"
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="fill-white text-xl font-bold"
                  style={{ fontSize: "22px", fontWeight: 700 }}
                >
                  {total}
                </text>
              )}
              {total > 0 && (
                <text
                  x="50%"
                  y="62%"
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="fill-white/40"
                  style={{ fontSize: "10px" }}
                >
                  Total Tasks
                </text>
              )}
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col gap-3 min-w-0 flex-1">
          {distribution.map((item) => {
            const pct = total > 0 ? Math.round((item.value / total) * 100) : 0;
            return (
              <div key={item.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-2.5 w-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: item.fill }}
                    />
                    <span className="text-white/50">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-white/80">
                      {item.value}
                    </span>
                    <span className="text-white/30">({pct}%)</span>
                  </div>
                </div>
                <div className="h-1 w-full rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: item.fill,
                      opacity: 0.7,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ChartCard>
  );
}

export function WeeklyProgressChart() {
  const { tasks } = useStore();

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const fallbackTasks = [3, 5, 4, 6, 5, 3, 2];
  const fallbackCompleted = [2, 3, 2, 4, 4, 2, 1];
  const weeklyProgress = days.map((day, i) => {
    const dayTasks = tasks.filter((t) => {
      const created = new Date(t.createdAt);
      return created.getDay() === (i + 1) % 7;
    });
    return {
      name: day,
      tasks: dayTasks.length || fallbackTasks[i],
      completed:
        dayTasks.filter((t) => t.status === "completed").length ||
        fallbackCompleted[i],
    };
  });

  return (
    <ChartCard
      title="Weekly Progress"
      description="Tasks created vs completed this week"
    >
      <div className="h-50">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklyProgress} barGap={4}>
            <defs>
              <linearGradient id="barTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#a78bfa" stopOpacity={0.5} />
              </linearGradient>
              <linearGradient id="barDone" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34d399" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#34d399" stopOpacity={0.5} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.04)"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11, fill: "rgba(255,255,255,0.35)" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "rgba(255,255,255,0.35)" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              itemStyle={{ color: "#f0f0f5" }}
              cursor={{ fill: "rgba(255,255,255,0.03)" }}
            />
            <Bar
              dataKey="tasks"
              fill="url(#barTotal)"
              radius={[4, 4, 0, 0]}
              maxBarSize={24}
            />
            <Bar
              dataKey="completed"
              fill="url(#barDone)"
              radius={[4, 4, 0, 0]}
              maxBarSize={24}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex gap-4 mt-2 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-violet-400" />
          <span className="text-white/40">Total Tasks</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-emerald-400" />
          <span className="text-white/40">Completed</span>
        </div>
      </div>
    </ChartCard>
  );
}

export function TeamPerformanceChart() {
  const { tasks, users } = useStore();

  const divisions = [...new Set(users.map((u) => u.division))];
  const teamPerformance = divisions.map((div) => {
    const divTasks = tasks.filter((t) => t.division === div);
    return {
      name: div,
      tasks: divTasks.length,
      completed: divTasks.filter((t) => t.status === "completed").length,
    };
  });

  return (
    <ChartCard title="Team Performance" description="Tasks by division">
      <div className="h-50">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={teamPerformance} layout="vertical" barGap={4}>
            <defs>
              <linearGradient id="hbarTotal" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#a78bfa" stopOpacity={0.5} />
              </linearGradient>
              <linearGradient id="hbarDone" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#34d399" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#34d399" stopOpacity={0.5} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.04)"
              horizontal={false}
            />
            <XAxis
              type="number"
              tick={{ fontSize: 11, fill: "rgba(255,255,255,0.35)" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fontSize: 11, fill: "rgba(255,255,255,0.35)" }}
              axisLine={false}
              tickLine={false}
              width={80}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              itemStyle={{ color: "#f0f0f5" }}
              cursor={{ fill: "rgba(255,255,255,0.03)" }}
            />
            <Bar
              dataKey="tasks"
              fill="url(#hbarTotal)"
              radius={[0, 4, 4, 0]}
              maxBarSize={18}
            />
            <Bar
              dataKey="completed"
              fill="url(#hbarDone)"
              radius={[0, 4, 4, 0]}
              maxBarSize={18}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex gap-4 mt-2 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-violet-400" />
          <span className="text-white/40">Total</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-emerald-400" />
          <span className="text-white/40">Completed</span>
        </div>
      </div>
    </ChartCard>
  );
}

export function ProductivityTrendChart() {
  const { tasks } = useStore();

  const baseProductivity = 60 + Math.floor(tasks.length / 4);
  const weeks = ["W1", "W2", "W3", "W4", "W5", "W6"];
  const productivityTrend = weeks.map((week, i) => ({
    week,
    productivity: Math.min(
      100,
      baseProductivity + i * 3 + [0, 5, 2, 8, 3, 10][i],
    ),
  }));

  return (
    <ChartCard
      title="Productivity Trend"
      description="Weekly productivity score"
    >
      <div className="h-50">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={productivityTrend}>
            <defs>
              <linearGradient id="colorProd" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.4} />
                <stop offset="50%" stopColor="#a78bfa" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#a78bfa" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.04)"
              vertical={false}
            />
            <XAxis
              dataKey="week"
              tick={{ fontSize: 11, fill: "rgba(255,255,255,0.35)" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "rgba(255,255,255,0.35)" }}
              axisLine={false}
              tickLine={false}
              domain={[0, 100]}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              itemStyle={{ color: "#f0f0f5" }}
              cursor={{ stroke: "rgba(167,139,250,0.3)" }}
            />
            <Area
              type="monotone"
              dataKey="productivity"
              stroke="#a78bfa"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorProd)"
              dot={false}
              activeDot={{
                r: 5,
                fill: "#a78bfa",
                stroke: "#16162a",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

export function PriorityChart() {
  const { tasks } = useStore();

  const priorityData = [
    {
      name: "High",
      value: tasks.filter((t) => t.priority === "high").length,
      fill: "#f87171",
    },
    {
      name: "Medium",
      value: tasks.filter((t) => t.priority === "medium").length,
      fill: "#fbbf24",
    },
    {
      name: "Low",
      value: tasks.filter((t) => t.priority === "low").length,
      fill: "#34d399",
    },
  ];

  return (
    <ChartCard title="Priority Breakdown" description="Tasks by priority level">
      <div className="h-45">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={priorityData} barGap={6}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.04)"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11, fill: "rgba(255,255,255,0.35)" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "rgba(255,255,255,0.35)" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              itemStyle={{ color: "#f0f0f5" }}
              cursor={{ fill: "rgba(255,255,255,0.03)" }}
            />
            <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={32}>
              {priorityData.map((entry, i) => (
                <Cell key={i} fill={entry.fill} fillOpacity={0.85} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex gap-4 mt-2 text-xs">
        {priorityData.map((item) => (
          <div key={item.name} className="flex items-center gap-1.5">
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: item.fill }}
            />
            <span className="text-white/40">{item.name}</span>
            <span className="font-semibold text-white/70">{item.value}</span>
          </div>
        ))}
      </div>
    </ChartCard>
  );
}

export function DeadlineTimelineChart() {
  const { tasks } = useStore();
  const now = new Date();

  const upcomingDeadlines = tasks
    .filter((t) => t.status !== "completed")
    .sort(
      (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime(),
    )
    .slice(0, 8)
    .map((t) => ({
      name: t.title.length > 20 ? t.title.slice(0, 20) + "..." : t.title,
      daysLeft: Math.max(
        0,
        Math.ceil(
          (new Date(t.deadline).getTime() - now.getTime()) /
            (1000 * 60 * 60 * 24),
        ),
      ),
      priority: t.priority,
    }));

  return (
    <ChartCard
      title="Upcoming Deadlines"
      description="Tasks approaching deadline"
    >
      <div className="h-50">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={upcomingDeadlines} layout="vertical" barGap={4}>
            <defs>
              <linearGradient id="deadlineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#f87171" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#f87171" stopOpacity={0.4} />
              </linearGradient>
              <linearGradient id="warningGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#fbbf24" stopOpacity={0.4} />
              </linearGradient>
              <linearGradient id="safeGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#34d399" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#34d399" stopOpacity={0.4} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.04)"
              horizontal={false}
            />
            <XAxis
              type="number"
              tick={{ fontSize: 10, fill: "rgba(255,255,255,0.35)" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fontSize: 9, fill: "rgba(255,255,255,0.35)" }}
              axisLine={false}
              tickLine={false}
              width={100}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              itemStyle={{ color: "#f0f0f5" }}
              formatter={(value) => [`${value} days`, "Days Left"]}
            />
            <Bar dataKey="daysLeft" radius={[0, 4, 4, 0]} maxBarSize={16}>
              {upcomingDeadlines.map((entry, i) => (
                <Cell
                  key={i}
                  fill={
                    entry.daysLeft <= 3
                      ? "url(#deadlineGrad)"
                      : entry.daysLeft <= 7
                        ? "url(#warningGrad)"
                        : "url(#safeGrad)"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

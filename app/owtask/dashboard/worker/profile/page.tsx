"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Camera,
  Building,
  Calendar,
  Save,
  User,
  CheckCircle2,
  Clock,
  TrendingUp,
  AlertTriangle,
  FileText,
  MessageCircle,
  CheckSquare,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useStore } from "@/lib/store";

export default function WorkerProfilePage() {
  const { currentUser, tasks } = useStore();
  const [form, setForm] = useState({
    name: currentUser.name,
    email: currentUser.email,
    phone: currentUser.phone,
    division: currentUser.division,
    joinDate: currentUser.joinDate,
    bio: "Dedicated team member focused on delivering quality work.",
    location: "Jakarta, Indonesia",
  });
  const [saved, setSaved] = useState(false);

  const myTasks = tasks.filter((t) => t.assigneeIds.includes(currentUser.id));
  const completedTasks = myTasks.filter((t) => t.status === "completed");
  const inProgressTasks = myTasks.filter((t) => t.status === "in_progress");
  const overdueTasks = myTasks.filter((t) => t.status === "overdue");
  const completionRate =
    myTasks.length > 0
      ? Math.round((completedTasks.length / myTasks.length) * 100)
      : 0;

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const activities = [
    {
      icon: CheckCircle2,
      text: "Completed 'Landing Page'",
      time: "3 hours ago",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      icon: MessageCircle,
      text: "Sent message in 'Desain UI'",
      time: "5 hours ago",
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      icon: FileText,
      text: "Submitted work for 'API Authentication'",
      time: "Yesterday",
      color: "text-violet-400",
      bg: "bg-violet-500/10",
    },
    {
      icon: Clock,
      text: "Updated task 'Testing' to In Progress",
      time: "2 days ago",
      color: "text-amber-400",
      bg: "bg-amber-500/10",
    },
    {
      icon: CheckSquare,
      text: "Joined team 'Engineering'",
      time: "3 days ago",
      color: "text-rose-400",
      bg: "bg-rose-500/10",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Cover + Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-2xl overflow-hidden"
      >
        <div className="h-40 bg-linear-to-r from-violet-600 via-purple-600 to-pink-600 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.15),transparent_50%)]" />
          <div className="absolute top-4 right-4">
            <Button
              size="sm"
              className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30 gap-1.5 text-xs rounded-xl"
            >
              <Camera className="h-3.5 w-3.5" /> Edit Cover
            </Button>
          </div>
        </div>

        <div className="relative px-6 pb-6 bg-[#16162a] border-t border-white/6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-12">
            <div className="relative">
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-linear-to-br from-violet-400 to-purple-500 text-white text-2xl font-bold border-4 border-[#16162a] shadow-lg">
                {currentUser.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <button className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#16162a] border border-white/6 shadow-md hover:bg-white/5 transition-colors">
                <Camera className="h-3.5 w-3.5 text-white/50" />
              </button>
            </div>

            <div className="flex-1 pt-2">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white">
                  {currentUser.name}
                </h1>
                <Badge className="gradient-primary text-white border-0 text-[10px] rounded-lg">
                  Member
                </Badge>
              </div>
              <p className="text-sm text-white/40">{currentUser.email}</p>
              <div className="flex items-center gap-3 mt-1 text-xs text-white/30">
                <span className="flex items-center gap-1">
                  <Building className="h-3 w-3" /> {currentUser.division}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> Joined{" "}
                  {new Date(currentUser.joinDate).toLocaleDateString("id-ID", {
                    month: "short",
                    year: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> Jakarta, Indonesia
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          {
            label: "My Tasks",
            value: myTasks.length,
            icon: CheckSquare,
            color: "text-violet-400",
            bg: "bg-violet-500/10",
          },
          {
            label: "In Progress",
            value: inProgressTasks.length,
            icon: Clock,
            color: "text-blue-400",
            bg: "bg-blue-500/10",
          },
          {
            label: "Completed",
            value: completedTasks.length,
            icon: TrendingUp,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
          },
          {
            label: "Overdue",
            value: overdueTasks.length,
            icon: AlertTriangle,
            color: "text-red-400",
            bg: "bg-red-500/10",
          },
          {
            label: "Completion",
            value: `${completionRate}%`,
            icon: TrendingUp,
            color: "text-amber-400",
            bg: "bg-amber-500/10",
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

      {/* Two Column Layout */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: Personal Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-[#16162a] border-white/6 rounded-2xl">
            <CardHeader className="px-6 pt-6 pb-4 border-b border-white/4">
              <CardTitle className="text-sm text-white flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-500/10 shrink-0">
                  <User className="h-4 w-4 text-violet-400" />
                </div>
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs text-white/40">Full Name</Label>
                  <Input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="h-10 text-sm bg-white/4 border-white/6 text-white rounded-xl"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-white/40">Email</Label>
                  <Input
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="h-10 text-sm bg-white/4 border-white/6 text-white rounded-xl"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs text-white/40">Phone</Label>
                  <Input
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    className="h-10 text-sm bg-white/4 border-white/6 text-white rounded-xl"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-white/40">Division</Label>
                  <Input
                    value={form.division}
                    disabled
                    className="h-10 text-sm bg-white/2 border-white/4 text-white/30 rounded-xl"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-white/40">Location</Label>
                <Input
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                  className="h-10 text-sm bg-white/4 border-white/6 text-white rounded-xl"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-white/40">Bio</Label>
                <Textarea
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  rows={3}
                  className="text-sm bg-white/4 border-white/6 text-white rounded-xl resize-none"
                />
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={handleSave}
                  className="gradient-primary text-white gap-1.5 text-xs rounded-xl"
                  size="sm"
                >
                  {saved ? (
                    <>
                      <CheckCircle2 className="h-3.5 w-3.5" /> Saved!
                    </>
                  ) : (
                    <>
                      <Save className="h-3.5 w-3.5" /> Save Changes
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Activity + Completion */}
        <div className="space-y-6">
          <Card className="bg-[#16162a] border-white/6 rounded-2xl">
            <CardHeader className="px-5 pt-5 pb-3 border-b border-white/4">
              <CardTitle className="text-sm text-white flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/10 shrink-0">
                  <TrendingUp className="h-4 w-4 text-emerald-400" />
                </div>
                Completion Rate
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5">
              <div className="flex items-center justify-center mb-4">
                <div className="relative h-28 w-28">
                  <svg className="h-28 w-28 -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="8"
                      className="text-white/5"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="url(#workerGradient)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${completionRate * 2.64} ${264 - completionRate * 2.64}`}
                    />
                    <defs>
                      <linearGradient
                        id="workerGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#a78bfa" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">
                        {completionRate}%
                      </div>
                      <div className="text-[10px] text-white/40">completed</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-xl bg-emerald-500/10 p-2.5">
                  <div className="text-lg font-bold text-emerald-400">
                    {completedTasks.length}
                  </div>
                  <div className="text-[10px] text-white/40">Done</div>
                </div>
                <div className="rounded-xl bg-blue-500/10 p-2.5">
                  <div className="text-lg font-bold text-blue-400">
                    {inProgressTasks.length}
                  </div>
                  <div className="text-[10px] text-white/40">Active</div>
                </div>
                <div className="rounded-xl bg-amber-500/10 p-2.5">
                  <div className="text-lg font-bold text-amber-400">
                    {myTasks.length -
                      completedTasks.length -
                      inProgressTasks.length}
                  </div>
                  <div className="text-[10px] text-white/40">Pending</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#16162a] border-white/6 rounded-2xl">
            <CardHeader className="px-5 pt-5 pb-3 border-b border-white/4">
              <CardTitle className="text-sm text-white flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-500/10 shrink-0">
                  <Clock className="h-4 w-4 text-blue-400" />
                </div>
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5">
              <div className="space-y-3">
                {activities.slice(0, 4).map((activity, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${activity.bg}`}
                    >
                      <activity.icon
                        className={`h-3.5 w-3.5 ${activity.color}`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-white/70 truncate">
                        {activity.text}
                      </div>
                      <div className="text-[10px] text-white/30 mt-0.5">
                        {activity.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

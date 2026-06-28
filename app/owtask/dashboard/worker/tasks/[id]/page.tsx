"use client";

import { use, useState, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  MessageCircle,
  Users,
  Calendar,
  FileText,
  Upload,
  Send,
  Paperclip,
  CheckCircle2,
  AlertCircle,
  Timer,
  TrendingUp,
  Clock,
  CircleDot,
  Download,
  Eye,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { useStore } from "@/lib/store";
import { getUserById } from "@/lib/mock-data";
import type { Submission } from "@/lib/types";

export default function WorkerTaskDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { tasks, currentUser, addSubmission } = useStore();
  const task = tasks.find((t) => t.id === id);
  const [submitText, setSubmitText] = useState("");
  const [files, setFiles] = useState<string[]>([]);
  const submissionCounter = useRef(0);

  const handleSubmit = () => {
    if (!submitText.trim() || !task) return;
    submissionCounter.current += 1;
    const submission: Submission = {
      id: `s-${task.id}-${submissionCounter.current}`,
      taskId: task.id,
      workerId: currentUser.id,
      content: submitText,
      attachments: [],
      submittedAt: new Date().toISOString(),
      status: "submitted",
    };
    addSubmission(task.id, submission);
    setSubmitText("");
    setFiles([]);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  if (!task) {
    return (
      <div className="text-center py-12">
        <p className="text-white/50">Task not found</p>
        <Link href="/owtask/dashboard/worker/tasks">
          <Button variant="link">Go back</Button>
        </Link>
      </div>
    );
  }

  const assignees = task.assigneeIds
    .map((id) => getUserById(id))
    .filter(Boolean);
  const leader = getUserById(task.leaderId);
  const mySubmission = task.submissions.find(
    (s) => s.workerId === currentUser.id,
  );

  const statusColor = (s: string) => {
    switch (s) {
      case "completed":
        return "bg-emerald-500/15 text-emerald-400";
      case "in_progress":
        return "bg-blue-500/15 text-blue-400";
      case "overdue":
        return "bg-rose-500/15 text-rose-400";
      default:
        return "bg-amber-500/15 text-amber-400";
    }
  };

  const statusIcon = (s: string) => {
    switch (s) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-emerald-400" />;
      case "in_progress":
        return <Timer className="h-4 w-4 text-blue-400" />;
      case "overdue":
        return <AlertCircle className="h-4 w-4 text-rose-400" />;
      default:
        return <CircleDot className="h-4 w-4 text-amber-400" />;
    }
  };

  const priorityConfig = {
    high: { color: "text-rose-400", bg: "bg-rose-500/15", label: "High" },
    medium: { color: "text-amber-400", bg: "bg-amber-500/15", label: "Medium" },
    low: { color: "text-emerald-400", bg: "bg-emerald-500/15", label: "Low" },
  };

  const deadline = new Date(task.deadline);
  const createdDate = new Date(task.createdAt);
  const daysLeft = Math.ceil(
    (deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
  );
  const daysElapsed = Math.ceil(
    (new Date().getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24),
  );
  const progressPercent =
    task.status === "completed"
      ? 100
      : task.status === "in_progress"
        ? 65
        : task.status === "overdue"
          ? 30
          : 15;

  const priority = priorityConfig[task.priority];

  const subStatusConfig = {
    approved: {
      color: "text-emerald-400",
      bg: "bg-emerald-500/15",
      icon: <CheckCircle2 className="h-3 w-3" />,
    },
    rejected: {
      color: "text-rose-400",
      bg: "bg-rose-500/15",
      icon: <AlertCircle className="h-3 w-3" />,
    },
    submitted: {
      color: "text-blue-400",
      bg: "bg-blue-500/15",
      icon: <CircleDot className="h-3 w-3" />,
    },
    reviewed: {
      color: "text-amber-400",
      bg: "bg-amber-500/15",
      icon: <Eye className="h-3 w-3" />,
    },
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/owtask/dashboard/worker/tasks">
          <Button
            variant="ghost"
            size="icon"
            className="text-white/50 hover:text-white/80"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-white">{task.title}</h1>
          <div className="flex items-center gap-2 mt-2">
            <Badge
              className={`${statusColor(task.status)} border-0 text-xs rounded-lg gap-1`}
            >
              {statusIcon(task.status)}
              {task.status.replace("_", " ")}
            </Badge>
            <Badge
              className={`${priority.bg} ${priority.color} border-0 text-xs rounded-lg`}
            >
              {priority.label} Priority
            </Badge>
            <Badge
              variant="outline"
              className="text-xs border-white/10 text-white/60 rounded-lg gap-1"
            >
              <FileText className="h-3 w-3" />
              {task.division}
            </Badge>
          </div>
        </div>
        <Link href={`/owtask/dashboard/worker/tasks/${task.id}/chat`}>
          <Button
            variant="outline"
            className="gap-2 bg-white/4 border-white/8 text-white/70 hover:bg-white/8"
          >
            <MessageCircle className="h-4 w-4" /> Message
          </Button>
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0 }}
        >
          <Card className="bg-[#1e1e3a] border-white/8">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-white/50">Progress</span>
                <TrendingUp className="h-4 w-4 text-violet-400" />
              </div>
              <div className="text-2xl font-bold text-white mb-2">
                {progressPercent}%
              </div>
              <Progress
                value={progressPercent}
                className="h-1.5 bg-white/6"
              />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <Card className="bg-[#1e1e3a] border-white/8">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-white/50">Deadline</span>
                <Calendar className="h-4 w-4 text-blue-400" />
              </div>
              <div
                className={`text-2xl font-bold ${daysLeft <= 3 ? "text-rose-400" : daysLeft <= 7 ? "text-amber-400" : "text-white"}`}
              >
                {task.status === "completed" ? "Done" : `${daysLeft}d`}
              </div>
              <p className="text-[10px] text-white/40 mt-1">
                {task.status === "completed"
                  ? "Completed"
                  : daysLeft <= 0
                    ? "Overdue"
                    : `${daysLeft} days remaining`}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-[#1e1e3a] border-white/8">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-white/50">My Status</span>
                {mySubmission ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                ) : (
                  <CircleDot className="h-4 w-4 text-amber-400" />
                )}
              </div>
              <div className="text-lg font-bold text-white">
                {mySubmission
                  ? mySubmission.status.charAt(0).toUpperCase() +
                    mySubmission.status.slice(1)
                  : "Not Submitted"}
              </div>
              <p className="text-[10px] text-white/40 mt-1">
                {mySubmission ? "You have submitted" : "Submit your work"}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <Card className="bg-[#1e1e3a] border-white/8">
              <CardHeader>
                <CardTitle className="text-lg text-white flex items-center gap-2">
                  <FileText className="h-5 w-5 text-violet-400" />
                  Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/60 whitespace-pre-wrap leading-relaxed">
                  {task.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Attachments */}
          {task.attachments.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-[#1e1e3a] border-white/8">
                <CardHeader>
                  <CardTitle className="text-lg text-white flex items-center gap-2">
                    <Paperclip className="h-5 w-5 text-blue-400" />
                    Attachments ({task.attachments.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {task.attachments.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center gap-3 p-3 rounded-xl bg-white/2 border border-white/6 hover:bg-white/4 transition-colors"
                      >
                        <div className="h-10 w-10 rounded-lg bg-violet-500/15 flex items-center justify-center">
                          <FileText className="h-5 w-5 text-violet-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white/80 truncate">
                            {file.name}
                          </p>
                          <p className="text-[10px] text-white/40">
                            {file.size}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-white/40 hover:text-white/70"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-white/40 hover:text-white/70"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Submit Work */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <Card className="bg-[#1e1e3a] border-white/8">
              <CardHeader>
                <CardTitle className="text-lg text-white flex items-center gap-2">
                  <Send className="h-5 w-5 text-emerald-400" />
                  {mySubmission ? "Your Submission" : "Submit Your Work"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {mySubmission ? (
                  <div className="space-y-3">
                    <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/20 p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Badge
                            className={`${subStatusConfig[mySubmission.status].bg} ${subStatusConfig[mySubmission.status].color} border-0 text-xs rounded-lg gap-1`}
                          >
                            {subStatusConfig[mySubmission.status].icon}
                            {mySubmission.status}
                          </Badge>
                        </div>
                        <span className="text-xs text-white/40">
                          {new Date(
                            mySubmission.submittedAt,
                          ).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <p className="text-sm text-white/70 leading-relaxed">
                        {mySubmission.content}
                      </p>
                    </div>
                    {mySubmission.status === "rejected" && (
                      <div className="rounded-xl bg-rose-500/5 border border-rose-500/20 p-4">
                        <p className="text-xs font-medium text-rose-400 mb-2">
                          Feedback from Leader
                        </p>
                        <p className="text-sm text-white/60">
                          Your submission has been rejected. Please review the
                          feedback and submit again.
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Describe your work completion, progress, or any notes for the leader..."
                      value={submitText}
                      onChange={(e) => setSubmitText(e.target.value)}
                      rows={4}
                      className="bg-white/4 border-white/8 text-white placeholder:text-white/30 focus:border-violet-500/50 resize-none"
                    />

                    {files.length > 0 && (
                      <div className="space-y-2">
                        {files.map((file, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/4 border border-white/6"
                          >
                            <Paperclip className="h-3.5 w-3.5 text-white/40" />
                            <span className="text-xs text-white/60 flex-1 truncate">
                              {file}
                            </span>
                            <button
                              onClick={() => removeFile(i)}
                              className="text-white/30 hover:text-rose-400 transition-colors"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 bg-white/4 border-white/8 text-white/60 hover:bg-white/8"
                      >
                        <Upload className="h-4 w-4" /> Attach File
                      </Button>
                      <Button
                        size="sm"
                        className="gradient-primary text-white gap-2 px-6"
                        onClick={handleSubmit}
                        disabled={!submitText.trim()}
                      >
                        <Send className="h-4 w-4" /> Submit Work
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-[#1e1e3a] border-white/8">
              <CardHeader>
                <CardTitle className="text-lg text-white flex items-center gap-2">
                  <Clock className="h-5 w-5 text-amber-400" />
                  Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative pl-6">
                  <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-violet-500 border-2 border-[#1e1e3a]" />
                  <div className="absolute left-1.25 top-4 w-0.5 h-full bg-white/6" />
                  <div className="pb-4">
                    <p className="text-xs font-medium text-white/70">
                      Task Created
                    </p>
                    <p className="text-[10px] text-white/40 mt-0.5">
                      {createdDate.toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                {task.status === "in_progress" && (
                  <div className="relative pl-6">
                    <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-blue-500 border-2 border-[#1e1e3a]" />
                    <div className="absolute left-1.25 top-4 w-0.5 h-full bg-white/6" />
                    <div className="pb-4">
                      <p className="text-xs font-medium text-white/70">
                        Work Started
                      </p>
                      <p className="text-[10px] text-white/40 mt-0.5">
                        {daysElapsed} days ago
                      </p>
                    </div>
                  </div>
                )}
                {mySubmission && (
                  <div className="relative pl-6">
                    <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#1e1e3a]" />
                    <div
                      className={
                        task.status !== "completed"
                          ? "absolute left-1.25 top-4 w-0.5 h-full bg-white/6"
                          : ""
                      }
                    />
                    <div className={task.status !== "completed" ? "pb-4" : ""}>
                      <p className="text-xs font-medium text-white/70">
                        Your Submission
                      </p>
                      <p className="text-[10px] text-white/40 mt-0.5">
                        {new Date(mySubmission.submittedAt).toLocaleDateString(
                          "id-ID",
                          { day: "numeric", month: "long" },
                        )}
                      </p>
                    </div>
                  </div>
                )}
                {task.status === "completed" && (
                  <div className="relative pl-6">
                    <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#1e1e3a]" />
                    <div>
                      <p className="text-xs font-medium text-emerald-400">
                        Completed
                      </p>
                      <p className="text-[10px] text-white/40 mt-0.5">
                        Task finished
                      </p>
                    </div>
                  </div>
                )}
                {task.status === "overdue" && (
                  <div className="relative pl-6">
                    <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-rose-500 border-2 border-[#1e1e3a]" />
                    <div>
                      <p className="text-xs font-medium text-rose-400">
                        Overdue
                      </p>
                      <p className="text-[10px] text-white/40 mt-0.5">
                        Past deadline
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <Card className="bg-[#1e1e3a] border-white/8">
              <CardHeader>
                <CardTitle className="text-lg text-white flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-400" />
                  Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-white/4">
                  <span className="text-sm text-white/50">Deadline</span>
                  <span className="text-sm font-medium text-white/80">
                    {deadline.toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-white/4">
                  <span className="text-sm text-white/50">Created</span>
                  <span className="text-sm font-medium text-white/80">
                    {createdDate.toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-white/50">Division</span>
                  <span className="text-sm font-medium text-white/80">
                    {task.division}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Leader */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-[#1e1e3a] border-white/8">
              <CardHeader>
                <CardTitle className="text-lg text-white flex items-center gap-2">
                  <Users className="h-5 w-5 text-pink-400" />
                  Leader
                </CardTitle>
              </CardHeader>
              <CardContent>
                {leader && (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/2 border border-white/6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-primary text-white text-xs font-bold">
                      {leader.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white/80">
                        {leader.name}
                      </p>
                      <p className="text-[10px] text-white/40">
                        {leader.division}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Team */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            <Card className="bg-[#1e1e3a] border-white/8">
              <CardHeader>
                <CardTitle className="text-lg text-white flex items-center gap-2">
                  <Users className="h-5 w-5 text-violet-400" />
                  Team ({assignees.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {assignees.map(
                  (user) =>
                    user && (
                      <div
                        key={user.id}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/2 transition-colors"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-full gradient-primary text-white text-[10px] font-bold">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white/80 truncate">
                            {user.name}
                          </p>
                          <p className="text-[10px] text-white/40">
                            {user.division}
                          </p>
                        </div>
                      </div>
                    ),
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

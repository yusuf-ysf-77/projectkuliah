"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Send, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useStore } from "@/lib/store";
import type { Task, TaskType, TaskPriority } from "@/lib/types";
import Link from "next/link";

export default function NewTaskPage() {
  const { users, addTask, currentUser } = useStore();
  const router = useRouter();
  const workers = users.filter((u) => u.role === "worker");

  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "individual" as TaskType,
    priority: "medium" as TaskPriority,
    deadline: "",
    assigneeIds: [] as string[],
    division: "",
  });

  const toggleAssignee = (id: string) => {
    setForm((prev) => ({
      ...prev,
      assigneeIds: prev.assigneeIds.includes(id)
        ? prev.assigneeIds.filter((a) => a !== id)
        : [...prev.assigneeIds, id],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const task: Task = {
      id: "t" + Date.now(),
      title: form.title,
      description: form.description,
      type: form.type,
      status: "pending",
      priority: form.priority,
      assigneeIds: form.assigneeIds,
      leaderId: currentUser.id,
      deadline: form.deadline,
      createdAt: new Date().toISOString(),
      attachments: [],
      submissions: [],
      division: form.division || currentUser.division,
    };
    addTask(task);
    router.push("/owtask/dashboard/leader/tasks");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/owtask/dashboard/leader/tasks">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Create New Task</h1>
          <p className="text-muted-foreground">
            Assign a new task to your team
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="glass border-border/50">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label>Task Title</Label>
                <Input
                  placeholder="Enter task title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  placeholder="Describe the task in detail..."
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Task Type</Label>
                  <Select
                    value={form.type}
                    onValueChange={(v) =>
                      setForm({ ...form, type: v as TaskType })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual</SelectItem>
                      <SelectItem value="group">Group</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select
                    value={form.priority}
                    onValueChange={(v) =>
                      setForm({ ...form, priority: v as TaskPriority })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Deadline</Label>
                  <Input
                    type="date"
                    value={form.deadline}
                    onChange={(e) =>
                      setForm({ ...form, deadline: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Division</Label>
                  <Select
                    value={form.division}
                    onValueChange={(v) => setForm({ ...form, division: v })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={currentUser.division} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Assign To ({form.assigneeIds.length} selected)</Label>
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto rounded-lg border border-border/50 p-3 theme-scrollbar">
                  {workers.map((worker) => (
                    <button
                      key={worker.id}
                      type="button"
                      onClick={() => toggleAssignee(worker.id)}
                      className={`flex items-center gap-2 rounded-lg p-2 text-left text-sm transition-colors ${
                        form.assigneeIds.includes(worker.id)
                          ? "bg-blue-500/10 border border-blue-500/50"
                          : "hover:bg-accent border border-transparent"
                      }`}
                    >
                      <div className="flex h-7 w-7 items-center justify-center rounded-full gradient-primary text-white text-[10px] font-medium shrink-0">
                        {worker.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium truncate">
                          {worker.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {worker.division}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Attachments (optional)</Label>
                <div className="flex items-center gap-2 rounded-lg border border-dashed border-border/50 p-4 text-center text-sm text-muted-foreground hover:bg-accent/50 cursor-pointer transition-colors">
                  <Paperclip className="h-4 w-4" />
                  <span>Click to upload files, images, videos, or audio</span>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Link href="/owtask/dashboard/leader/tasks">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </Link>
                <Button
                  type="submit"
                  className="gradient-primary text-white shadow-lg shadow-blue-500/25 gap-2"
                >
                  <Send className="h-4 w-4" /> Create Task
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

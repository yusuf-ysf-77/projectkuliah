"use client";

import { use, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatMessage } from "@/components/owtask/chat/chat-message";
import { ChatInput } from "@/components/owtask/chat/chat-input";
import { ExternalScroll } from "@/components/owtask/ui/external-scroll";
import { useStore } from "@/lib/store";
import { getUserById } from "@/lib/mock-data";
import type { Message } from "@/lib/types";

export default function LeaderTaskMessagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { tasks, messages, addMessage, currentUser } = useStore();
  const task = tasks.find((t) => t.id === id);
  const taskMessages = messages.filter((m) => m.taskId === id);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [taskMessages]);

  if (!task)
    return <div className="p-8 text-center text-white/50">Task not found</div>;

  const handleSend = (content: string) => {
    const msg: Message = {
      id: "m" + Date.now(),
      senderId: currentUser.id,
      content,
      timestamp: new Date().toISOString(),
      type: "text",
      taskId: id,
    };
    addMessage(msg);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 mb-4 shrink-0">
        <Link href={`/owtask/dashboard/leader/tasks/${id}`}>
          <Button
            variant="ghost"
            size="icon"
            className="text-white/50 hover:text-white/80"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-lg font-semibold text-white">
            {task.title} — Messages
          </h1>
          <p className="text-xs text-white/40">
            {task.assigneeIds.length} members
          </p>
        </div>
        <div className="flex -space-x-2 ml-auto">
          {task.assigneeIds.slice(0, 5).map((uid) => {
            const user = getUserById(uid);
            return user ? (
              <div
                key={uid}
                className="flex h-7 w-7 items-center justify-center rounded-full gradient-primary text-white text-[10px] font-medium border-2 border-[#16162a]"
              >
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
            ) : null;
          })}
        </div>
      </div>

      <div className="flex-1 rounded-xl border border-white/6 bg-[#16162a] overflow-hidden flex flex-col">
        <ExternalScroll className="flex-1 p-4" trackClassName="bg-white/[0.03]">
          <div className="space-y-3">
            {taskMessages.length === 0 && (
              <div className="text-center py-12 text-white/30 text-sm">
                No messages yet. Start the conversation!
              </div>
            )}
            {taskMessages.map((msg) => (
              <ChatMessage
                key={msg.id}
                message={msg}
                isOwn={msg.senderId === currentUser.id}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ExternalScroll>
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
}

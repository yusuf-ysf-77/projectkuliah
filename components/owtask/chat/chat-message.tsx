"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { getUserById } from "@/lib/mock-data";
import type { Message } from "@/lib/types";
import {
  FileText,
  Image as ImageIcon,
  Film,
  Mic,
  CheckCheck,
  Reply,
  Copy,
  Bookmark,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: Message;
  isOwn: boolean;
  showAvatar?: boolean;
  onReply?: (message: Message) => void;
}

export function ChatMessage({
  message,
  isOwn,
  showAvatar = true,
  onReply,
}: ChatMessageProps) {
  const [showActions, setShowActions] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const sender = getUserById(message.senderId);

  const typeConfig: Record<
    string,
    {
      icon: React.ComponentType<{ className?: string }>;
      color: string;
      bg: string;
      label: string;
    }
  > = {
    image: {
      icon: ImageIcon,
      color: "text-blue-300",
      bg: "bg-blue-500/20",
      label: "Foto",
    },
    video: {
      icon: Film,
      color: "text-purple-300",
      bg: "bg-purple-500/20",
      label: "Video",
    },
    audio: {
      icon: Mic,
      color: "text-emerald-300",
      bg: "bg-emerald-500/20",
      label: "Pesan Suara",
    },
    file: {
      icon: FileText,
      color: "text-amber-300",
      bg: "bg-amber-500/20",
      label: "Dokumen",
    },
  };

  const config = message.type !== "text" ? typeConfig[message.type] : null;
  const timeStr = new Date(message.timestamp).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("flex gap-2.5 group", isOwn ? "flex-row-reverse" : "")}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {!isOwn && showAvatar ? (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-violet-400 to-purple-500 text-white text-[10px] font-bold mt-1">
          {sender?.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
      ) : !isOwn ? (
        <div className="w-8 shrink-0" />
      ) : null}

      <div
        className={cn(
          "flex flex-col max-w-[75%]",
          isOwn ? "items-end" : "items-start",
        )}
      >
        {!isOwn && showAvatar && (
          <span className="text-[11px] font-medium text-white/60 mb-1 ml-1">
            {sender?.name}
          </span>
        )}

        <div className="relative">
          <div
            className={cn(
              "rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed",
              isOwn
                ? "bg-linear-to-br from-violet-500 to-purple-600 text-white rounded-br-md shadow-lg shadow-violet-500/15"
                : "bg-[#1e1e3a] border border-white/8 text-white/80 rounded-bl-md",
            )}
          >
            {config && (
              <div
                className={cn(
                  "flex items-center gap-2.5 mb-2 pb-2 border-b",
                  isOwn ? "border-white/15" : "border-white/6",
                )}
              >
                <div
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg",
                    config.bg,
                  )}
                >
                  <config.icon className={cn("h-4 w-4", config.color)} />
                </div>
                <div>
                  <div className="text-xs font-medium text-white/80">
                    {config.label}
                  </div>
                  <div className="text-[10px] text-white/40">
                    Klik untuk melihat
                  </div>
                </div>
              </div>
            )}
            <p className="text-white/85">{message.content}</p>
          </div>

          <div
            className={cn(
              "absolute top-1/2 -translate-y-1/2 flex items-center gap-0.5 transition-all duration-200",
              isOwn ? "-left-20" : "-right-20",
              showActions
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-2",
            )}
          >
            <div className="flex items-center gap-0.5 bg-[#1e1e3a] border border-white/8 rounded-lg shadow-xl p-0.5">
              {onReply && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-white/40 hover:text-white/80 hover:bg-white/6"
                  onClick={() => onReply(message)}
                >
                  <Reply className="h-3 w-3" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white/40 hover:text-white/80 hover:bg-white/6"
                onClick={() => setBookmarked(!bookmarked)}
              >
                <Bookmark
                  className={cn(
                    "h-3 w-3",
                    bookmarked && "fill-violet-400 text-violet-400",
                  )}
                />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white/40 hover:text-white/80 hover:bg-white/6"
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>

        <div
          className={cn(
            "flex items-center gap-1 mt-1 px-1",
            isOwn ? "flex-row-reverse" : "",
          )}
        >
          <span className="text-[10px] text-white/30">{timeStr}</span>
          {isOwn && <CheckCheck className="h-3 w-3 text-violet-400" />}
        </div>
      </div>
    </motion.div>
  );
}

export function TypingIndicator({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-violet-400 to-purple-500 text-white text-[10px] font-bold">
        {name
          .split(" ")
          .map((n) => n[0])
          .join("")}
      </div>
      <div className="bg-[#1e1e3a] border border-white/8 rounded-2xl rounded-bl-md px-4 py-3">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
              className="h-2 w-2 rounded-full bg-violet-400/50"
            />
          ))}
        </div>
      </div>
      <span className="text-[10px] text-white/30">
        {name} sedang mengetik...
      </span>
    </div>
  );
}

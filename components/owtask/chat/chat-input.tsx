"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Image,
  Film,
  Mic,
  Smile,
  Camera,
  FileText,
  X,
  Reply,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  onTyping?: () => void;
  replyTo?: { name: string; content: string } | null;
  onCancelReply?: () => void;
}

const EMOJI_QUICK = [
  "😀",
  "😂",
  "❤️",
  "🔥",
  "👍",
  "👏",
  "🎉",
  "💯",
  "✅",
  "⏰",
  "📌",
  "💪",
];

export function ChatInput({
  onSend,
  onTyping,
  replyTo,
  onCancelReply,
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [showAttach, setShowAttach] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (!message.trim()) return;
    onSend(message);
    setMessage("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const addEmoji = (emoji: string) => {
    setMessage((prev) => prev + emoji);
    inputRef.current?.focus();
  };

  return (
    <div className="border-t border-white/6 bg-[#12122a]">
      <AnimatePresence>
        {replyTo && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="flex items-center gap-2 px-4 py-2.5 bg-violet-500/5 border-b border-white/6">
              <Reply className="h-3.5 w-3.5 text-violet-400 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-medium text-violet-400">
                  {replyTo.name}
                </div>
                <div className="text-[10px] text-white/40 truncate">
                  {replyTo.content}
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5 text-white/30 hover:text-white/60"
                onClick={onCancelReply}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAttach && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/6">
              {[
                {
                  icon: Camera,
                  label: "Kamera",
                  color: "text-rose-400",
                  bg: "bg-rose-500/15",
                },
                {
                  icon: Image,
                  label: "Galeri",
                  color: "text-blue-400",
                  bg: "bg-blue-500/15",
                },
                {
                  icon: Film,
                  label: "Video",
                  color: "text-purple-400",
                  bg: "bg-purple-500/15",
                },
                {
                  icon: Mic,
                  label: "Suara",
                  color: "text-emerald-400",
                  bg: "bg-emerald-500/15",
                },
                {
                  icon: FileText,
                  label: "Dokumen",
                  color: "text-amber-400",
                  bg: "bg-amber-500/15",
                },
              ].map((item) => (
                <button
                  key={item.label}
                  className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-white/4 transition-colors min-w-14"
                >
                  <div
                    className={cn(
                      "h-10 w-10 rounded-full flex items-center justify-center",
                      item.bg,
                    )}
                  >
                    <item.icon className={cn("h-4 w-4", item.color)} />
                  </div>
                  <span className="text-[9px] text-white/40">{item.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-end gap-2.5 p-3">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "shrink-0 h-9 w-9 rounded-full transition-all text-white/40 hover:text-white/70 hover:bg-white/6",
            showAttach ? "bg-violet-500/15 text-violet-400 rotate-45" : "",
          )}
          onClick={() => {
            setShowAttach(!showAttach);
            setShowEmoji(false);
          }}
        >
          <Plus className="h-5 w-5" />
        </Button>

        <div className="flex-1 relative">
          <Input
            ref={inputRef}
            placeholder="Ketik pesan..."
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              onTyping?.();
            }}
            onKeyDown={handleKeyDown}
            className="pr-10 h-10 rounded-full bg-white/4 border-white/8 text-white placeholder:text-white/30 focus-visible:ring-violet-500/30 focus-visible:border-violet-500/30"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full text-white/30 hover:text-white/60 hover:bg-white/6"
            onClick={() => {
              setShowEmoji(!showEmoji);
              setShowAttach(false);
            }}
          >
            <Smile className="h-4 w-4" />
          </Button>
        </div>

        <AnimatePresence>
          {showEmoji && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute bottom-full left-0 right-0 mb-2 mx-4"
            >
              <div className="bg-[#1e1e3a] rounded-xl shadow-2xl border border-white/8 p-3">
                <div className="grid grid-cols-6 gap-1">
                  {EMOJI_QUICK.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => addEmoji(emoji)}
                      className="h-9 w-9 flex items-center justify-center rounded-lg hover:bg-white/6 text-lg transition-colors"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {message.trim() ? (
          <Button
            onClick={handleSend}
            className="shrink-0 gradient-primary text-white shadow-lg shadow-violet-500/20 h-10 w-10 rounded-full"
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "shrink-0 h-10 w-10 rounded-full text-white/40 hover:text-white/70 transition-all",
              isRecording
                ? "bg-rose-500 text-white animate-pulse hover:bg-rose-600 hover:text-white"
                : "",
            )}
            onClick={() => setIsRecording(!isRecording)}
          >
            <Mic className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
}

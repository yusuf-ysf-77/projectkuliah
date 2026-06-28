"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Users,
  Phone,
  Video,
  ArrowLeft,
  MessageSquare,
  Info,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ContactList } from "@/components/owtask/chat/contact-list";
import {
  ChatMessage,
  TypingIndicator,
} from "@/components/owtask/chat/chat-message";
import { ChatInput } from "@/components/owtask/chat/chat-input";
import { ExternalScroll } from "@/components/owtask/ui/external-scroll";
import { useStore } from "@/lib/store";
import { chatContacts, getUserById } from "@/lib/mock-data";
import type { Message } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function WorkerMessagePage() {
  const { messages, addMessage, currentUser } = useStore();
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [replyTo, setReplyTo] = useState<{
    name: string;
    content: string;
  } | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const universalMessages = messages.filter((m) => !m.taskId);
  const selectedUserObj = selectedUser ? getUserById(selectedUser) : null;

  const filteredUniversal = selectedUser
    ? universalMessages.filter(
        (m) => m.senderId === selectedUser || m.senderId === currentUser.id,
      )
    : universalMessages;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [filteredUniversal]);

  useEffect(() => {
    if (selectedUser) {
      const timer = setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 3000);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [selectedUser, filteredUniversal.length]);

  const handleSend = (content: string) => {
    addMessage({
      id: "m" + Date.now(),
      senderId: currentUser.id,
      content,
      timestamp: new Date().toISOString(),
      type: "text",
    });
    setReplyTo(null);
  };

  const handleReply = (message: Message) => {
    const sender = getUserById(message.senderId);
    setReplyTo({ name: sender?.name || "Unknown", content: message.content });
  };

  const groupedMessages = groupMessagesByDate(filteredUniversal);

  return (
    <div className="flex h-full rounded-2xl border border-white/6 bg-[#16162a] overflow-hidden">
      {/* Contact sidebar */}
      <div
        className={cn(
          "flex border-r border-white/6 transition-all duration-300 bg-[#12122a]",
          selectedUser ? "w-0 lg:w-80 hidden lg:flex" : "w-full lg:w-80",
        )}
      >
        <div className="flex-1 flex flex-col min-w-0 p-2">
          <div className="p-4 border-b border-white/6 shrink-0">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="font-bold text-white">Messages</h2>
                <p className="text-[10px] text-white/40">
                  {chatContacts.length} percakapan
                </p>
              </div>
              <Badge className="gradient-primary text-white border-0 text-[9px] px-2 py-0.5 rounded-lg">
                <Users className="h-3 w-3 mr-1" />{" "}
                {chatContacts.filter((c) => c.online).length} online
              </Badge>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/30" />
              <Input
                placeholder="Cari percakapan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 text-xs bg-white/4 border-white/8 text-white placeholder:text-white/30"
              />
            </div>
          </div>

          <ExternalScroll
            className="flex-1 p-2 theme-scrollbar"
            trackClassName="bg-white/[0.03]"
          >
            <ContactList
              contacts={chatContacts}
              selectedId={selectedUser || undefined}
              onSelect={setSelectedUser}
              searchQuery={searchQuery}
            />
          </ExternalScroll>
        </div>
      </div>

      {/* Message area */}
      <div
        className={cn(
          "flex-1 flex flex-col bg-[#16162a]",
          !selectedUser && "hidden lg:flex",
        )}
      >
        {selectedUser && selectedUserObj ? (
          <>
            <div className="flex items-center gap-3 border-b border-white/6 px-4 py-3 bg-[#1a1a30] shrink-0">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 lg:hidden text-white/50 hover:text-white/80"
                onClick={() => setSelectedUser(null)}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="relative cursor-pointer">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-violet-400 to-purple-500 text-white text-xs font-bold">
                  {selectedUserObj.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 border-2 border-[#1a1a30]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-white truncate">
                  {selectedUserObj.name}
                </div>
                <div className="text-[11px] text-white/40">
                  {selectedUserObj.division} &middot;{" "}
                  <span className="text-emerald-400">Online</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hidden sm:flex text-white/40 hover:text-white/70 hover:bg-white/6"
                >
                  <Phone className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hidden sm:flex text-white/40 hover:text-white/70 hover:bg-white/6"
                >
                  <Video className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white/40 hover:text-white/70 hover:bg-white/6"
                >
                  <Info className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <ExternalScroll
              className="flex-1 p-4 theme-scrollbar"
              trackClassName="bg-white/[0.03]"
            >
              <div className="space-y-2 p-2">
                {groupedMessages.map((group, gi) => (
                  <div key={gi}>
                    <div className="flex items-center justify-center my-4">
                      <div className="px-3 py-1 rounded-full bg-white/4 border border-white/6 text-[10px] text-white/40 font-medium">
                        {group.date}
                      </div>
                    </div>
                    <div className="space-y-2">
                      {group.messages.map((msg, mi) => {
                        const prevMsg = mi > 0 ? group.messages[mi - 1] : null;
                        const showAvatar =
                          !prevMsg || prevMsg.senderId !== msg.senderId;
                        return (
                          <ChatMessage
                            key={msg.id}
                            message={msg}
                            isOwn={msg.senderId === currentUser.id}
                            showAvatar={showAvatar}
                            onReply={handleReply}
                          />
                        );
                      })}
                    </div>
                  </div>
                ))}
                <AnimatePresence>
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                    >
                      <TypingIndicator name={selectedUserObj.name} />
                    </motion.div>
                  )}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>
            </ExternalScroll>

            <ChatInput
              onSend={handleSend}
              replyTo={replyTo}
              onCancelReply={() => setReplyTo(null)}
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-violet-500/10 border border-violet-500/20 mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-violet-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Pesan</h3>
              <p className="text-sm text-white/40 max-w-xs">
                Pilih kontak dari sidebar untuk memulai percakapan.
              </p>
              <div className="flex items-center justify-center gap-4 mt-6 text-xs text-white/30">
                <span className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-emerald-500" />{" "}
                  {chatContacts.filter((c) => c.online).length} online
                </span>
                <span>{chatContacts.length} kontak</span>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}

function groupMessagesByDate(
  messages: Message[],
): { date: string; messages: Message[] }[] {
  const groups: { date: string; messages: Message[] }[] = [];
  messages.forEach((msg) => {
    const date = new Date(msg.timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    let dateStr: string;
    if (date.toDateString() === today.toDateString()) dateStr = "Hari Ini";
    else if (date.toDateString() === yesterday.toDateString())
      dateStr = "Kemarin";
    else
      dateStr = date.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    const lastGroup = groups[groups.length - 1];
    if (lastGroup && lastGroup.date === dateStr) lastGroup.messages.push(msg);
    else groups.push({ date: dateStr, messages: [msg] });
  });
  return groups;
}

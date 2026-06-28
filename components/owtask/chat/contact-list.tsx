"use client";

import { getUserById } from "@/lib/mock-data";
import type { ChatContact } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface ContactListProps {
  contacts: ChatContact[];
  selectedId?: string;
  onSelect: (userId: string) => void;
  searchQuery?: string;
}

export function ContactList({
  contacts,
  selectedId,
  onSelect,
  searchQuery = "",
}: ContactListProps) {
  const filtered = contacts.filter((c) => {
    const user = getUserById(c.userId);
    if (!user) return false;
    if (searchQuery)
      return user.name.toLowerCase().includes(searchQuery.toLowerCase());
    return true;
  });

  const sorted = [...filtered].sort(
    (a, b) =>
      new Date(b.lastMessageTime).getTime() -
      new Date(a.lastMessageTime).getTime(),
  );

  return (
    <div className="space-y-0.5">
      {sorted.map((contact) => {
        const user = getUserById(contact.userId);
        if (!user) return null;
        const isSelected = selectedId === contact.userId;
        const hasUnread = contact.unread > 0;

        return (
          <button
            key={contact.id}
            onClick={() => onSelect(contact.userId)}
            className={cn(
              "flex w-full items-center gap-3 rounded-xl p-3 text-left transition-all duration-200",
              isSelected
                ? "bg-violet-500/10 border border-violet-500/20"
                : "hover:bg-white/3 border border-transparent",
            )}
          >
            <div className="relative shrink-0">
              <div
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-full text-white text-xs font-bold transition-all",
                  isSelected
                    ? "bg-linear-to-br from-violet-400 to-purple-500 shadow-lg shadow-violet-500/20"
                    : "bg-linear-to-br from-white/10 to-white/4",
                )}
              >
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              {contact.online && (
                <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-[#12122a]" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <span
                  className={cn(
                    "text-sm truncate",
                    hasUnread
                      ? "font-bold text-white"
                      : "font-medium text-white/80",
                  )}
                >
                  {user.name}
                </span>
                <span
                  className={cn(
                    "text-[10px] shrink-0 ml-2",
                    hasUnread ? "text-violet-400 font-medium" : "text-white/30",
                  )}
                >
                  {formatTime(contact.lastMessageTime)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 min-w-0">
                  {!contact.online && (
                    <Check className="h-3 w-3 text-white/20 shrink-0" />
                  )}
                  <span
                    className={cn(
                      "text-xs truncate",
                      hasUnread ? "text-white/70 font-medium" : "text-white/40",
                    )}
                  >
                    {contact.lastMessage}
                  </span>
                </div>
                {hasUnread && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full gradient-primary text-white text-[9px] font-bold shrink-0 ml-2 px-1">
                    {contact.unread}
                  </span>
                )}
              </div>
            </div>
          </button>
        );
      })}

      {sorted.length === 0 && (
        <div className="text-center py-8 text-white/30 text-xs">
          Tidak ada percakapan
        </div>
      )}
    </div>
  );
}

function formatTime(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0)
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  if (days === 1) return "Kemarin";
  if (days < 7) return date.toLocaleDateString("id-ID", { weekday: "short" });
  return date.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
}

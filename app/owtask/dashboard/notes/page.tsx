"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  StickyNote,
  Trash2,
  Edit3,
  Pin,
  PinOff,
  Grid,
  List,
  SortAsc,
  Bold,
  Italic,
  List as ListIcon,
  CheckSquare,
  X,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const NOTE_COLORS = [
  { name: "Emerald", value: "#059669", bg: "bg-emerald-500" },
  { name: "Blue", value: "#2563EB", bg: "bg-blue-500" },
  { name: "Purple", value: "#7C3AED", bg: "bg-purple-500" },
  { name: "Amber", value: "#D97706", bg: "bg-amber-500" },
  { name: "Rose", value: "#E11D48", bg: "bg-rose-500" },
  { name: "Teal", value: "#0D9488", bg: "bg-teal-500" },
  { name: "Orange", value: "#EA580C", bg: "bg-orange-500" },
  { name: "Slate", value: "#475569", bg: "bg-slate-500" },
];

const TAGS = ["Work", "Personal", "Ideas", "Meeting", "Important", "To-Do"];

export default function NotesPage() {
  const { notes, addNote, updateNote, deleteNote, currentUser } = useStore();
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"date" | "title" | "color">("date");
  const [filterTag, setFilterTag] = useState<string>("all");
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    content: "",
    color: NOTE_COLORS[0].value,
    tags: [] as string[],
    pinned: false,
  });

  const myNotes = notes.filter((n) => n.userId === currentUser.id);

  const filtered = useMemo(() => {
    let result = myNotes;

    // Search
    if (search) {
      result = result.filter(
        (n) =>
          n.title.toLowerCase().includes(search.toLowerCase()) ||
          n.content.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // Sort
    result = [...result].sort((a, b) => {
      if (sortBy === "date")
        return (
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      if (sortBy === "title") return a.title.localeCompare(b.title);
      return 0;
    });

    // Pinned first
    result = [...result].sort(
      (a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0),
    );

    return result;
  }, [myNotes, search, sortBy]);

  const noteStats = useMemo(
    () => ({
      total: myNotes.length,
      pinned: myNotes.filter((n) => n.pinned).length,
      thisWeek: myNotes.filter((n) => {
        const d = new Date(n.updatedAt);
        const now = new Date();
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return d >= weekAgo;
      }).length,
    }),
    [myNotes],
  );

  const handleSave = () => {
    if (!form.title) return;
    if (editId) {
      updateNote(editId, { ...form, updatedAt: new Date().toISOString() });
    } else {
      addNote({
        id: "n" + Date.now(),
        userId: currentUser.id,
        ...form,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
    setDialogOpen(false);
    setEditId(null);
    setForm({
      title: "",
      content: "",
      color: NOTE_COLORS[0].value,
      tags: [],
      pinned: false,
    });
  };

  const handleEdit = (note: (typeof notes)[0]) => {
    setEditId(note.id);
    setForm({
      title: note.title,
      content: note.content,
      color: note.color,
      tags: note.tags || [],
      pinned: note.pinned || false,
    });
    setDialogOpen(true);
  };

  const handlePreview = (noteId: string) => {
    setSelectedNote(noteId);
    setShowPreview(true);
  };

  const togglePin = (noteId: string) => {
    const note = myNotes.find((n) => n.id === noteId);
    if (note) {
      updateNote(noteId, { pinned: !note.pinned });
    }
  };

  const toggleTag = (tag: string) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const selectedNoteData = selectedNote
    ? myNotes.find((n) => n.id === selectedNote)
    : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl gradient-primary p-6 text-white">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-1/4 w-40 h-40 bg-white/5 rounded-full translate-y-1/2" />
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Notes</h1>
            <p className="text-violet-100 text-sm">
              {noteStats.total} notes &middot; {noteStats.pinned} pinned
              &middot; {noteStats.thisWeek} this week
            </p>
          </div>
          <Button
            className="bg-white/20 hover:bg-white/30 text-white border-white/20 gap-2"
            onClick={() => {
              setEditId(null);
              setForm({
                title: "",
                content: "",
                color: NOTE_COLORS[0].value,
                tags: [],
                pinned: false,
              });
              setDialogOpen(true);
            }}
          >
            <Plus className="h-4 w-4" /> New Note
          </Button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
            <Input
              placeholder="Search notes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-9 text-sm bg-white/4 border-white/6 text-white placeholder:text-white/20"
            />
          </div>
          <Select
            value={sortBy}
            onValueChange={(v) => setSortBy(v as "date" | "title" | "color")}
          >
            <SelectTrigger className="w-32.5 h-9 text-xs bg-white/4 border-white/6 text-white/60">
              <SortAsc className="h-3.5 w-3.5 mr-1.5" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a30] border-white/8">
              <SelectItem value="date" className="text-white/70">
                By Date
              </SelectItem>
              <SelectItem value="title" className="text-white/70">
                By Title
              </SelectItem>
              <SelectItem value="color" className="text-white/70">
                By Color
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5 p-1 rounded-xl bg-white/4 border border-white/6">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-7 w-7",
                viewMode === "grid" && "bg-white/10 shadow-sm text-white",
              )}
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-7 w-7",
                viewMode === "list" && "bg-white/10 shadow-sm text-white",
              )}
              onClick={() => setViewMode("list")}
            >
              <List className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Color filter */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-white/30">Colors:</span>
        <button
          onClick={() => setFilterTag("all")}
          className={cn(
            "h-5 w-5 rounded-full border-2 transition-all",
            filterTag === "all" ? "border-white scale-110" : "border-white/20",
          )}
        >
          <div className="h-full w-full rounded-full bg-linear-to-br from-violet-400 via-pink-400 to-emerald-400" />
        </button>
        {NOTE_COLORS.map((color) => (
          <button
            key={color.value}
            onClick={() => setFilterTag(color.value)}
            className={cn(
              "h-5 w-5 rounded-full transition-all",
              filterTag === color.value
                ? "ring-2 ring-offset-2 ring-white/20 scale-110"
                : "hover:scale-110",
            )}
            style={{ backgroundColor: color.value }}
          />
        ))}
      </div>

      {/* Notes grid/list */}
      {viewMode === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((note, i) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              layout
            >
              <Card className="group glass-card border-white/6 hover:border-white/12 hover:shadow-lg hover:shadow-violet-500/5 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                <div
                  className="h-2 rounded-t-xl"
                  style={{ backgroundColor: note.color }}
                />
                <CardContent className="p-4 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      {note.pinned && (
                        <Pin className="h-3 w-3 text-amber-400 fill-amber-400" />
                      )}
                      <h3 className="font-semibold text-sm text-white/80 line-clamp-1">
                        {note.title}
                      </h3>
                    </div>
                    <div className="flex gap-0.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-white/40 hover:text-white hover:bg-white/5"
                        onClick={() => handlePreview(note.id)}
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-white/40 hover:text-white hover:bg-white/5"
                        onClick={() => togglePin(note.id)}
                      >
                        {note.pinned ? (
                          <PinOff className="h-3 w-3" />
                        ) : (
                          <Pin className="h-3 w-3" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-white/40 hover:text-white hover:bg-white/5"
                        onClick={() => handleEdit(note)}
                      >
                        <Edit3 className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-red-400/60 hover:text-red-400 hover:bg-red-500/10"
                        onClick={() => deleteNote(note.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <p className="text-xs text-white/40 line-clamp-4 whitespace-pre-wrap flex-1">
                    {note.content}
                  </p>

                  {note.tags && note.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {note.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-[8px] px-1.5 py-0 h-4 bg-white/6 text-white/40 border-0"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="mt-3 pt-2 border-t border-white/6 flex items-center justify-between text-[10px] text-white/30">
                    <span>
                      {new Date(note.updatedAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                    <span>{note.content.split(" ").length} words</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((note, i) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <Card
                className="glass-card border-border/30 hover:shadow-md transition-all cursor-pointer"
                onClick={() => handlePreview(note.id)}
              >
                <CardContent className="p-3 flex items-center gap-3">
                  <div
                    className="h-10 w-1 rounded-full shrink-0"
                    style={{ backgroundColor: note.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      {note.pinned && (
                        <Pin className="h-3 w-3 text-amber-500 fill-amber-500" />
                      )}
                      <span className="text-sm font-medium truncate">
                        {note.title}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {note.content}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {note.tags &&
                      note.tags.slice(0, 2).map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-[8px] px-1.5 py-0 h-4"
                        >
                          {tag}
                        </Badge>
                      ))}
                    <span className="text-[10px] text-muted-foreground">
                      {new Date(note.updatedAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-16">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted mx-auto mb-4">
            <StickyNote className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="font-semibold mb-1">No notes found</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {search
              ? "Try a different search term"
              : "Create your first note to get started"}
          </p>
          {!search && (
            <Button
              className="gradient-primary text-white gap-2"
              onClick={() => {
                setEditId(null);
                setForm({
                  title: "",
                  content: "",
                  color: NOTE_COLORS[0].value,
                  tags: [],
                  pinned: false,
                });
                setDialogOpen(true);
              }}
            >
              <Plus className="h-4 w-4" /> New Note
            </Button>
          )}
        </div>
      )}

      {/* ===== NOTE EDITOR DIALOG ===== */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="glass-strong max-w-lg p-0 overflow-hidden [&>button]:hidden">
          {/* Color bar */}
          <div className="h-2" style={{ backgroundColor: form.color }} />

          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-4">
            <DialogTitle className="text-lg">
              {editId ? "Edit Note" : "New Note"}
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => setDialogOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="px-5 pb-5 space-y-4">
            {/* Title */}
            <Input
              placeholder="Note title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="text-lg font-semibold border-0 px-0 h-auto focus-visible:ring-0"
            />

            {/* Formatting toolbar */}
            <div className="flex items-center gap-1 p-1 rounded-lg bg-muted/50">
              {[Bold, Italic, ListIcon, CheckSquare].map((Icon, i) => (
                <Button key={i} variant="ghost" size="icon" className="h-7 w-7">
                  <Icon className="h-3.5 w-3.5" />
                </Button>
              ))}
              <Separator orientation="vertical" className="h-5 mx-1" />
              <span className="text-[10px] text-muted-foreground px-2">
                {form.content.split(" ").filter(Boolean).length} words
              </span>
            </div>

            {/* Content */}
            <Textarea
              placeholder="Start writing..."
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows={8}
              className="border-0 px-0 focus-visible:ring-0 resize-none text-sm"
            />

            {/* Tags */}
            <div className="space-y-2">
              <Label className="text-xs font-medium">Tags</Label>
              <div className="flex flex-wrap gap-1.5">
                {TAGS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={cn(
                      "px-2.5 py-1 rounded-full text-xs font-medium border transition-all",
                      form.tags.includes(tag)
                        ? "bg-amber-500 text-white border-amber-500"
                        : "border-border/30 hover:border-border/60",
                    )}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div className="space-y-2">
              <Label className="text-xs font-medium">Color</Label>
              <div className="flex gap-2">
                {NOTE_COLORS.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setForm({ ...form, color: color.value })}
                    className={cn(
                      "h-7 w-7 rounded-full transition-all",
                      form.color === color.value
                        ? "ring-2 ring-offset-2 ring-foreground/20 scale-110"
                        : "hover:scale-110",
                    )}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setForm({ ...form, pinned: !form.pinned })}
                >
                  {form.pinned ? (
                    <PinOff className="h-4 w-4 text-amber-500" />
                  ) : (
                    <Pin className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  className="gradient-primary text-white gap-1.5"
                  onClick={handleSave}
                  disabled={!form.title}
                >
                  <CheckSquare className="h-3.5 w-3.5" />{" "}
                  {editId ? "Update" : "Save"}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* ===== NOTE PREVIEW DIALOG ===== */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="glass-strong max-w-lg p-0 overflow-hidden [&>button]:hidden">
          {selectedNoteData && (
            <>
              <div
                className="h-3"
                style={{ backgroundColor: selectedNoteData.color }}
              />
              <div className="flex items-center justify-between px-5 pt-4">
                <div className="flex items-center gap-2">
                  {selectedNoteData.pinned && (
                    <Pin className="h-4 w-4 text-amber-500 fill-amber-500" />
                  )}
                  <DialogTitle className="text-lg">
                    {selectedNoteData.title}
                  </DialogTitle>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => {
                      handleEdit(selectedNoteData);
                      setShowPreview(false);
                    }}
                  >
                    <Edit3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => setShowPreview(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="px-5 pb-5">
                {selectedNoteData.tags && selectedNoteData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {selectedNoteData.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
                <div className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
                  {selectedNoteData.content}
                </div>
                <Separator className="my-4" />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    Created:{" "}
                    {new Date(selectedNoteData.createdAt).toLocaleDateString(
                      "id-ID",
                      {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      },
                    )}
                  </span>
                  <span>
                    Updated:{" "}
                    {new Date(selectedNoteData.updatedAt).toLocaleDateString(
                      "id-ID",
                      {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      },
                    )}
                  </span>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

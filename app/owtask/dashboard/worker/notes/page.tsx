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
  { name: "Ungu", value: "#7C3AED" },
  { name: "Biru", value: "#2563EB" },
  { name: "Hijau", value: "#059669" },
  { name: "Kuning", value: "#D97706" },
  { name: "Merah", value: "#E11D48" },
  { name: "Teal", value: "#0D9488" },
  { name: "Oranye", value: "#EA580C" },
  { name: "Abu", value: "#475569" },
];

const TAGS = ["Kerja", "Pribadi", "Ide", "Meeting", "Penting", "Todo"];

export default function WorkerNotesPage() {
  const { notes, addNote, updateNote, deleteNote, currentUser } = useStore();
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"date" | "title">("date");
  const [showPreview, setShowPreview] = useState(false);
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
  const selectedNoteData = editId ? myNotes.find((n) => n.id === editId) : null;

  const filtered = useMemo(() => {
    let result = [...myNotes];
    if (search)
      result = result.filter(
        (n) =>
          n.title.toLowerCase().includes(search.toLowerCase()) ||
          n.content.toLowerCase().includes(search.toLowerCase()),
      );
    result.sort((a, b) =>
      sortBy === "date"
        ? new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        : a.title.localeCompare(b.title),
    );
    result.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));
    return result;
  }, [myNotes, search, sortBy]);

  const [weekAgo] = useState(() => new Date(Date.now() - 7 * 86400000));

  const stats = useMemo(
    () => ({
      total: myNotes.length,
      pinned: myNotes.filter((n) => n.pinned).length,
      week: myNotes.filter(
        (n) => new Date(n.updatedAt) >= weekAgo,
      ).length,
    }),
    [myNotes, weekAgo],
  );

  const handleSave = () => {
    if (!form.title.trim()) return;
    const now = new Date().toISOString();
    if (editId) updateNote(editId, { ...form, updatedAt: now });
    else
      addNote({
        id: "n" + Date.now(),
        userId: currentUser.id,
        ...form,
        createdAt: now,
        updatedAt: now,
      });
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

  const openEditor = (note?: (typeof notes)[0]) => {
    if (note) {
      setEditId(note.id);
      setForm({
        title: note.title,
        content: note.content,
        color: note.color,
        tags: note.tags || [],
        pinned: note.pinned || false,
      });
    } else {
      setEditId(null);
      setForm({
        title: "",
        content: "",
        color: NOTE_COLORS[0].value,
        tags: [],
        pinned: false,
      });
    }
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl gradient-primary p-6 text-white">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-1/4 w-40 h-40 bg-white/5 rounded-full translate-y-1/2" />
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Catatan</h1>
            <p className="text-violet-100 text-sm">
              {stats.total} catatan &middot; {stats.pinned} dipin &middot;{" "}
              {stats.week} minggu ini
            </p>
          </div>
          <Button
            className="bg-white/20 hover:bg-white/30 text-white border-white/20 gap-2"
            onClick={() => openEditor()}
          >
            <Plus className="h-4 w-4" /> Catatan Baru
          </Button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
            <Input
              placeholder="Cari catatan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-9 text-sm bg-white/4 border-white/6 text-white placeholder:text-white/20"
            />
          </div>
          <Select
            value={sortBy}
            onValueChange={(v) => setSortBy(v as "date" | "title")}
          >
            <SelectTrigger className="w-32.5 h-9 text-xs bg-white/4 border-white/6 text-white/60">
              <SortAsc className="h-3.5 w-3.5 mr-1.5" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a30] border-white/8">
              <SelectItem value="date" className="text-white/70">
                Tanggal
              </SelectItem>
              <SelectItem value="title" className="text-white/70">
                Judul
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
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

      {/* Notes */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/4 mx-auto mb-4">
            <StickyNote className="h-8 w-8 text-white/20" />
          </div>
          <h3 className="font-semibold text-white mb-1">
            {search ? "Tidak ditemukan" : "Belum ada catatan"}
          </h3>
          <p className="text-sm text-white/40 mb-4">
            {search ? "Coba kata kunci lain" : "Buat catatan pertama kamu"}
          </p>
          {!search && (
            <Button
              className="gradient-primary text-white gap-2"
              onClick={() => openEditor()}
            >
              <Plus className="h-4 w-4" /> Catatan Baru
            </Button>
          )}
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((note, i) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              layout
            >
              <Card
                className="group glass-card border-white/6 hover:border-white/12 hover:shadow-lg hover:shadow-violet-500/5 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col cursor-pointer"
                onClick={() => openEditor(note)}
              >
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
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditor(note);
                        }}
                      >
                        <Edit3 className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-white/40 hover:text-white hover:bg-white/5"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateNote(note.id, { pinned: !note.pinned });
                        }}
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
                        className="h-6 w-6 text-red-400/60 hover:text-red-400 hover:bg-red-500/10"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNote(note.id);
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-white/40 line-clamp-3 whitespace-pre-wrap flex-1">
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
                    <span>
                      {note.content.split(" ").filter(Boolean).length} kata
                    </span>
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
                className="glass-card border-white/6 hover:border-white/12 hover:shadow-md transition-all cursor-pointer"
                onClick={() => openEditor(note)}
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
                      <span className="text-sm font-medium truncate text-white/80">
                        {note.title}
                      </span>
                    </div>
                    <p className="text-xs text-white/40 truncate">
                      {note.content}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {note.tags?.slice(0, 2).map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-[8px] px-1.5 py-0 h-4 bg-white/6 text-white/40 border-0"
                      >
                        {tag}
                      </Badge>
                    ))}
                    <span className="text-[10px] text-white/30">
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

      {/* Editor Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg p-0 overflow-hidden rounded-2xl bg-[#1e1e3a] border border-white/8 [&>button]:hidden">
          <div className="h-2" style={{ backgroundColor: form.color }} />
          <div className="flex items-center justify-between px-5 pt-4">
            <DialogTitle className="text-lg text-white">
              {editId ? "Edit Catatan" : "Catatan Baru"}
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
            <Input
              placeholder="Judul catatan"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="text-lg font-semibold border-0 px-0 h-auto focus-visible:ring-0 text-white bg-transparent"
            />
            <div className="flex items-center gap-1 p-1 rounded-lg bg-white/4">
              {[Bold, Italic, ListIcon, CheckSquare].map((Icon, i) => (
                <Button
                  key={i}
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-white/40"
                >
                  <Icon className="h-3.5 w-3.5" />
                </Button>
              ))}
              <Separator
                orientation="vertical"
                className="h-5 mx-1 bg-white/6"
              />
              <span className="text-[10px] text-white/30 px-2">
                {form.content.split(" ").filter(Boolean).length} kata
              </span>
            </div>
            <Textarea
              placeholder="Mulai menulis..."
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows={8}
              className="border-0 px-0 focus-visible:ring-0 resize-none text-sm bg-transparent text-white placeholder:text-white/30"
            />
            <div className="space-y-2">
              <Label className="text-xs font-medium text-white/50">Tag</Label>
              <div className="flex flex-wrap gap-1.5">
                {TAGS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,
                        tags: prev.tags.includes(tag)
                          ? prev.tags.filter((t) => t !== tag)
                          : [...prev.tags, tag],
                      }))
                    }
                    className={cn(
                      "px-2.5 py-1 rounded-full text-xs font-medium border transition-all",
                      form.tags.includes(tag)
                        ? "bg-violet-500 text-white border-violet-500"
                        : "border-white/8 text-white/50 hover:border-white/20",
                    )}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-white/50">Warna</Label>
              <div className="flex gap-2">
                {NOTE_COLORS.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setForm({ ...form, color: color.value })}
                    className={cn(
                      "h-7 w-7 rounded-full transition-all",
                      form.color === color.value
                        ? "ring-2 ring-offset-2 ring-[#1e1e3a] scale-110"
                        : "hover:scale-110",
                    )}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between pt-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setForm({ ...form, pinned: !form.pinned })}
              >
                {form.pinned ? (
                  <PinOff className="h-4 w-4 text-amber-400" />
                ) : (
                  <Pin className="h-4 w-4 text-white/40" />
                )}
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDialogOpen(false)}
                  className="border-white/8 text-white/50 hover:text-white"
                >
                  Batal
                </Button>
                <Button
                  size="sm"
                  className="gradient-primary text-white gap-1.5"
                  onClick={handleSave}
                  disabled={!form.title.trim()}
                >
                  <CheckSquare className="h-3.5 w-3.5" />{" "}
                  {editId ? "Perbarui" : "Simpan"}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-lg p-0 overflow-hidden rounded-2xl bg-[#1e1e3a] border border-white/8 [&>button]:hidden">
          {selectedNoteData && (
            <>
              <div
                className="h-3"
                style={{ backgroundColor: selectedNoteData.color }}
              />
              <div className="flex items-center justify-between px-5 pt-4">
                <div className="flex items-center gap-2">
                  {selectedNoteData.pinned && (
                    <Pin className="h-4 w-4 text-amber-400 fill-amber-400" />
                  )}
                  <DialogTitle className="text-lg text-white">
                    {selectedNoteData.title}
                  </DialogTitle>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => {
                      openEditor(selectedNoteData);
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
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-xs bg-white/6 text-white/50 border-0"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
                <div className="text-sm text-white/60 whitespace-pre-wrap leading-relaxed">
                  {selectedNoteData.content}
                </div>
                <Separator className="my-4 bg-white/6" />
                <div className="flex items-center justify-between text-xs text-white/30">
                  <span>
                    Dibuat:{" "}
                    {new Date(selectedNoteData.createdAt).toLocaleDateString(
                      "id-ID",
                      { day: "numeric", month: "long", year: "numeric" },
                    )}
                  </span>
                  <span>
                    Diperbarui:{" "}
                    {new Date(selectedNoteData.updatedAt).toLocaleDateString(
                      "id-ID",
                      { day: "numeric", month: "long", year: "numeric" },
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

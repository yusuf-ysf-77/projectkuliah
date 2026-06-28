"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Menu,
  Command,
  LayoutDashboard,
  CheckSquare,
  MessageCircle,
  Calendar,
  StickyNote,
  ArrowRight,
  User,
  Settings,
  HelpCircle,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AppSidebar } from "@/components/owtask/sidebar/app-sidebar";
import { Notifications } from "@/components/owtask/dashboard/notifications";
import { CalendarProvider } from "@/lib/calendar-context";
import { useStore } from "@/lib/store";
import { RoleGuard } from "@/components/owtask/auth/role-guard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUser } = useStore();
  const pathname = usePathname();
  const [sidebarCollapsed] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const breadcrumbs = pathname
    .split("/")
    .filter(Boolean)
    .map((segment, i, arr) => ({
      label:
        segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " "),
      href: "/" + arr.slice(0, i + 1).join("/"),
      isLast: i === arr.length - 1,
    }))
    .filter((b) => b.label !== "Owtask" || b.isLast);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") setSearchOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const quickLinks = [
    { label: "Dashboard", href: "/owtask/dashboard", icon: LayoutDashboard },
    {
      label: "Tasks",
      href:
        currentUser.role === "leader"
          ? "/owtask/dashboard/leader/tasks"
          : "/owtask/dashboard/worker/tasks",
      icon: CheckSquare,
    },
    {
      label: "Messages",
      href:
        currentUser.role === "leader"
          ? "/owtask/dashboard/leader/chat"
          : "/owtask/dashboard/worker/chat",
      icon: MessageCircle,
    },
    {
      label: "Calendar",
      href:
        currentUser.role === "leader"
          ? "/owtask/dashboard/leader/calendar"
          : "/owtask/dashboard/worker/calendar",
      icon: Calendar,
    },
    {
      label: "Notes",
      href:
        currentUser.role === "leader"
          ? "/owtask/dashboard/leader/notes"
          : "/owtask/dashboard/worker/notes",
      icon: StickyNote,
    },
    {
      label: "Profile",
      href:
        currentUser.role === "leader"
          ? "/owtask/dashboard/leader/profile"
          : "/owtask/dashboard/worker/profile",
      icon: User,
    },
    {
      label: "Settings",
      href:
        currentUser.role === "leader"
          ? "/owtask/dashboard/leader/settings"
          : "/owtask/dashboard/worker/settings",
      icon: Settings,
    },
    {
      label: "Help",
      href:
        currentUser.role === "leader"
          ? "/owtask/dashboard/leader/help"
          : "/owtask/dashboard/worker/help",
      icon: HelpCircle,
    },
    {
      label: "Notifications",
      href:
        currentUser.role === "leader"
          ? "/owtask/dashboard/leader/notifications"
          : "/owtask/dashboard/worker/notifications",
      icon: Bell,
    },
  ];

  const filteredLinks = quickLinks.filter((l) =>
    l.label.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <CalendarProvider>
      <div className="min-h-screen bg-[#0c0c1d] relative overflow-hidden">
        {/* Background decoration */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-violet-500/8 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl" />
          <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl" />
        </div>

        {/* Main container - floating */}
        <div className="min-h-screen p-3 lg:p-4 relative z-10">
          <div className="flex gap-4 h-[calc(100vh-2rem)]">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block shrink-0 h-full">
              <AppSidebar
                role={currentUser.role}
                collapsed={sidebarCollapsed}
              />
            </div>

            {/* Mobile Sidebar */}
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="fixed top-5 left-5 z-50 bg-[#16162a] border border-white/6 h-10 w-10 rounded-xl text-white/70"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="w-65 p-0 bg-[#12122a] border-white/6"
                >
                  <AppSidebar role={currentUser.role} collapsed={false} />
                </SheetContent>
              </Sheet>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col gap-3 min-w-0 h-full">
              {/* Top Bar */}
              <header className="h-14 rounded-2xl bg-[#16162a] border border-white/6 shadow-sm flex items-center justify-between px-5 shrink-0">
                {/* Left: Breadcrumbs */}
                <div className="flex items-center gap-2 text-sm">
                  {breadcrumbs.map((b, i) => (
                    <span key={b.href} className="flex items-center gap-1.5">
                      {i > 0 && <span className="text-white/20">/</span>}
                      {b.isLast ? (
                        <span className="text-white font-semibold">
                          {b.label}
                        </span>
                      ) : (
                        <Link
                          href={b.href}
                          className="text-white/40 hover:text-white/70 transition-colors"
                        >
                          {b.label}
                        </Link>
                      )}
                    </span>
                  ))}
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2 h-9 px-3 text-xs text-white/40 bg-white/4 border border-white/6 rounded-xl hover:bg-white/6"
                    onClick={() => setSearchOpen(true)}
                  >
                    <Search className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Search</span>
                    <kbd className="hidden sm:inline-flex h-5 items-center gap-0.5 rounded-md bg-white/6 px-1.5 font-mono text-[10px] text-white/30">
                      <Command className="h-2.5 w-2.5" />K
                    </kbd>
                  </Button>

                  <Notifications />
                </div>
              </header>

              {/* Page Content */}
              <main className="flex-1 overflow-y-auto rounded-2xl bg-[#16162a] border border-white/6 shadow-sm p-5 lg:p-6 theme-scrollbar">
                <RoleGuard>{children}</RoleGuard>
              </main>
            </div>
          </div>
        </div>

        {/* Search Modal */}
        <AnimatePresence>
          {searchOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-100 bg-black/40 backdrop-blur-sm"
                onClick={() => setSearchOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                className="fixed top-[15%] left-1/2 -translate-x-1/2 z-101 w-full max-w-lg"
              >
                <div className="bg-[#1a1a30] rounded-2xl shadow-2xl border border-white/8 overflow-hidden">
                  <div className="flex items-center gap-3 px-5 py-4 border-b border-white/6">
                    <Search className="h-5 w-5 text-white/30" />
                    <input
                      autoFocus
                      placeholder="Search pages, actions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 bg-transparent outline-none text-sm text-white placeholder:text-white/30"
                    />
                    <kbd className="flex h-5 items-center gap-0.5 rounded-md bg-white/6 px-1.5 font-mono text-[10px] text-white/30">
                      ESC
                    </kbd>
                  </div>
                  <div className="max-h-75 overflow-y-auto p-2 theme-scrollbar">
                    {filteredLinks.length === 0 ? (
                      <div className="text-center py-8 text-sm text-white/30">
                        No results found
                      </div>
                    ) : (
                      filteredLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setSearchOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors"
                        >
                          <link.icon className="h-4 w-4 text-white/30" />
                          <span className="text-sm text-white/60">
                            {link.label}
                          </span>
                          <ArrowRight className="h-3 w-3 text-white/20 ml-auto" />
                        </Link>
                      ))
                    )}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </CalendarProvider>
  );
}

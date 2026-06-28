"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  CheckSquare,
  Users,
  MessageCircle,
  Calendar,
  StickyNote,
  Zap,
  LayoutDashboard,
  BarChart3,
  Clock,
  FileText,
  BookOpen,
  HelpCircle,
  MessageSquare,
  Newspaper,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavChild {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  desc: string;
}

interface NavLink {
  label: string;
  href: string;
  children?: NavChild[];
}

const navLinks: NavLink[] = [
  {
    label: "Product",
    href: "#features",
    children: [
      {
        label: "Dashboard",
        href: "#features",
        icon: LayoutDashboard,
        desc: "Overview of your team's work",
      },
      {
        label: "Task Management",
        href: "#features",
        icon: CheckSquare,
        desc: "Kanban boards and task tracking",
      },
      {
        label: "Team Chat",
        href: "#features",
        icon: MessageCircle,
        desc: "Real-time messaging with files",
      },
      {
        label: "Calendar & Gantt",
        href: "#features",
        icon: Calendar,
        desc: "Timeline and schedule views",
      },
      {
        label: "Notes",
        href: "#features",
        icon: StickyNote,
        desc: "Organized knowledge base",
      },
      {
        label: "Analytics",
        href: "#features",
        icon: BarChart3,
        desc: "Insights and reporting",
      },
    ],
  },
  {
    label: "Features",
    href: "#features",
    children: [
      {
        label: "Kanban Boards",
        href: "#features",
        icon: CheckSquare,
        desc: "Drag-and-drop task management",
      },
      {
        label: "Real-time Chat",
        href: "#features",
        icon: MessageCircle,
        desc: "WhatsApp-like messaging",
      },
      {
        label: "Gantt Charts",
        href: "#features",
        icon: Clock,
        desc: "Visual project timelines",
      },
      {
        label: "Team Collaboration",
        href: "#features",
        icon: Users,
        desc: "Work together seamlessly",
      },
      {
        label: "File Sharing",
        href: "#features",
        icon: FileText,
        desc: "Share images, videos, docs",
      },
      {
        label: "Notifications",
        href: "#features",
        icon: Zap,
        desc: "Stay updated on everything",
      },
    ],
  },
  { label: "Pricing", href: "#pricing" },
  {
    label: "Resources",
    href: "#",
    children: [
      {
        label: "Documentation",
        href: "#",
        icon: BookOpen,
        desc: "Learn how to use owTask",
      },
      {
        label: "Help Center",
        href: "#",
        icon: HelpCircle,
        desc: "Get support when you need it",
      },
      {
        label: "Community",
        href: "#",
        icon: MessageSquare,
        desc: "Join our community forum",
      },
      {
        label: "Blog",
        href: "#",
        icon: Newspaper,
        desc: "Tips, updates, and stories",
      },
      {
        label: "API Reference",
        href: "#",
        icon: FileText,
        desc: "Build integrations",
      },
    ],
  },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass-strong shadow-lg shadow-black/20 border-b border-white/6"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/owtask" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
            <span className="text-sm font-bold text-white">o</span>
          </div>
          <span className="text-xl font-bold text-white">owTask</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() =>
                link.children && setActiveDropdown(link.label)
              }
              onMouseLeave={() => link.children && setActiveDropdown(null)}
            >
              <a
                href={link.href}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-white/50 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              >
                {link.label}
                {link.children && (
                  <ChevronDown
                    className={`h-3 w-3 transition-transform ${activeDropdown === link.label ? "rotate-180" : ""}`}
                  />
                )}
              </a>

              <AnimatePresence>
                {link.children && activeDropdown === link.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 w-80 glass-strong rounded-xl shadow-xl border border-white/8 p-2 mt-1"
                  >
                    {link.children.map((child) => (
                      <a
                        key={child.label}
                        href={child.href}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                      >
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/10 group-hover:bg-violet-500/20 transition-colors shrink-0">
                          <child.icon className="h-4 w-4 text-violet-400" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white/80 group-hover:text-white">
                            {child.label}
                          </div>
                          <div className="text-xs text-white/40">
                            {child.desc}
                          </div>
                        </div>
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link href="/owtask/login">
            <Button
              variant="ghost"
              className="text-sm text-white/60 hover:text-white hover:bg-white/5"
            >
              Masuk
            </Button>
          </Link>
          <Link href="/owtask/register">
            <Button className="gradient-primary text-white shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 transition-shadow text-sm gap-1.5">
              <Zap className="h-3.5 w-3.5" /> Daftar Gratis
            </Button>
          </Link>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-white/60"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-strong border-t border-white/6 max-h-[70vh] overflow-y-auto theme-scrollbar"
          >
            <div className="flex flex-col gap-1 p-4">
              {navLinks.map((link) => (
                <div key={link.label}>
                  <button
                    className="flex items-center justify-between w-full rounded-lg px-3 py-2.5 text-sm font-medium text-white/50 hover:bg-white/5 hover:text-white transition-colors"
                    onClick={() => {
                      if (link.children) {
                        setMobileExpanded(
                          mobileExpanded === link.label ? null : link.label,
                        );
                      } else {
                        setMobileOpen(false);
                      }
                    }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => {
                        if (!link.children) setMobileOpen(false);
                        else e.preventDefault();
                      }}
                    >
                      {link.label}
                    </a>
                    {link.children && (
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${mobileExpanded === link.label ? "rotate-180" : ""}`}
                      />
                    )}
                  </button>

                  <AnimatePresence>
                    {link.children && mobileExpanded === link.label && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-4"
                      >
                        {link.children.map((child) => (
                          <a
                            key={child.label}
                            href={child.href}
                            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs text-white/40 hover:bg-white/5 hover:text-white"
                            onClick={() => setMobileOpen(false)}
                          >
                            <child.icon className="h-3.5 w-3.5 text-violet-400" />
                            <div>
                              <div className="font-medium">{child.label}</div>
                              <div className="text-[10px] text-white/30">
                                {child.desc}
                              </div>
                            </div>
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-white/6">
                <Link href="/owtask/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="ghost" className="w-full text-white/60">
                    Masuk
                  </Button>
                </Link>
                <Link
                  href="/owtask/register"
                  onClick={() => setMobileOpen(false)}
                >
                  <Button className="w-full gradient-primary text-white gap-1.5">
                    <Zap className="h-3.5 w-3.5" /> Daftar Gratis
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

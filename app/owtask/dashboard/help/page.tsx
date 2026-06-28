"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  Search,
  BookOpen,
  MessageCircle,
  Video,
  FileText,
  ChevronDown,
  Mail,
  Phone,
  Clock,
  CheckSquare,
  Calendar,
  Users,
  StickyNote,
  Zap,
  Send,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const faqCategories = [
  {
    icon: CheckSquare,
    title: "Task Management",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    questions: [
      {
        q: "How do I create a new task?",
        a: "Click the 'New Task' button on the Tasks page. Fill in the title, description, assignees, and deadline. You can also attach files and set priority levels.",
      },
      {
        q: "Can I assign tasks to multiple people?",
        a: "Yes! When creating or editing a task, you can select multiple assignees. Tasks can be set as 'Individual' or 'Group' type.",
      },
      {
        q: "How do I change task status?",
        a: "Click on a task to open its details. Use the status dropdown to change between Pending, In Progress, Completed, or Overdue.",
      },
      {
        q: "Can I set recurring tasks?",
        a: "Currently, recurring tasks need to be created manually. We're working on automating this feature for a future update.",
      },
    ],
  },
  {
    icon: MessageCircle,
    title: "Chat & Communication",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    questions: [
      {
        q: "How does the universal chat work?",
        a: "Universal chat allows all team members across divisions to communicate. Select a contact from the sidebar to start a conversation.",
      },
      {
        q: "Can I send files in chat?",
        a: "Yes! Click the + button next to the message input to access file sharing options including images, videos, audio, and documents.",
      },
      {
        q: "How do task-specific chats work?",
        a: "Each task has its own chat channel. Open a task and click the Chat button to discuss that specific task with assigned members.",
      },
    ],
  },
  {
    icon: Calendar,
    title: "Calendar & Scheduling",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    questions: [
      {
        q: "How do I add events to the calendar?",
        a: "Click 'New Event' or click on any date in the month view. Choose the event type (Plan, Deadline, Meeting, Holiday) and fill in the details.",
      },
      {
        q: "Can I view tasks on the calendar?",
        a: "Yes! Task deadlines automatically appear on the calendar alongside your events.",
      },
      {
        q: "How do I switch between views?",
        a: "Use the view tabs at the top: List, Board, or Month. Each view shows your events and tasks differently.",
      },
    ],
  },
  {
    icon: Users,
    title: "Team Management",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    questions: [
      {
        q: "How do I invite team members?",
        a: "Go to Settings > Team and click 'Invite Member'. Share the invite link or enter their email directly.",
      },
      {
        q: "What's the difference between Leader and Worker?",
        a: "Leaders can create tasks, manage the team, and access all features. Workers can view assigned tasks, submit work, and collaborate.",
      },
      {
        q: "Can I change someone's role?",
        a: "Only leaders can change roles. Go to Team settings, find the member, and update their role.",
      },
    ],
  },
  {
    icon: StickyNote,
    title: "Notes & Documents",
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    questions: [
      {
        q: "How do I create notes?",
        a: "Go to the Notes page and click 'New Note'. Add a title, content, and choose a color for organization.",
      },
      {
        q: "Can I share notes with my team?",
        a: "Notes are currently personal. Shared notes feature is coming soon.",
      },
    ],
  },
];

const quickLinks = [
  {
    icon: BookOpen,
    title: "Documentation",
    desc: "Complete guide to using owTask",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    hoverBg: "hover:bg-blue-500/15",
  },
  {
    icon: Video,
    title: "Video Tutorials",
    desc: "Step-by-step video guides",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    hoverBg: "hover:bg-violet-500/15",
  },
  {
    icon: MessageCircle,
    title: "Community Forum",
    desc: "Ask questions and share tips",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    hoverBg: "hover:bg-emerald-500/15",
  },
  {
    icon: FileText,
    title: "Release Notes",
    desc: "What's new in owTask",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    hoverBg: "hover:bg-amber-500/15",
  },
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [contactForm, setContactForm] = useState({ subject: "", message: "" });
  const [contactSent, setContactSent] = useState(false);

  const filteredFaqs = faqCategories
    .map((cat) => ({
      ...cat,
      questions: cat.questions.filter(
        (q) =>
          q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.a.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((cat) => cat.questions.length > 0 || searchQuery === "");

  const handleContactSubmit = () => {
    if (!contactForm.subject || !contactForm.message) return;
    setContactSent(true);
    setTimeout(() => setContactSent(false), 3000);
    setContactForm({ subject: "", message: "" });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-violet-600 via-purple-600 to-indigo-700 p-6 text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-white/5 rounded-full translate-y-1/2" />
        <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-white/5 rounded-full" />
        <div className="relative z-10 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm shrink-0">
            <HelpCircle className="h-7 w-7" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Help Center</h1>
            <p className="text-violet-100 text-sm mt-0.5">
              Find answers, learn how to use owTask, and get support
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/30" />
        <Input
          placeholder="Search for help topics..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 h-12 text-sm bg-[#16162a] border-white/6 text-white placeholder:text-white/30 rounded-2xl"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
          >
            <span className="text-xs bg-white/10 px-2 py-1 rounded-md">
              Clear
            </span>
          </button>
        )}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickLinks.map((link, i) => (
          <motion.div
            key={link.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card
              className={cn(
                "bg-[#16162a] border-white/6 hover:border-white/12 transition-all cursor-pointer group rounded-2xl h-full",
                link.hoverBg,
              )}
            >
              <CardContent className="p-5 flex flex-col items-center text-center h-full">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${link.bg} mb-3 group-hover:scale-110 transition-transform shrink-0`}
                >
                  <link.icon className={`h-5 w-5 ${link.color}`} />
                </div>
                <div className="text-sm font-semibold text-white mb-1">
                  {link.title}
                </div>
                <div className="text-[11px] text-white/40 mb-3 flex-1">
                  {link.desc}
                </div>
                <div className="flex items-center gap-1 text-[10px] text-white/30 group-hover:text-white/50 transition-colors">
                  <span>Learn more</span>
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <Tabs defaultValue="faq" className="space-y-6">
        <TabsList className="bg-white/4 border border-white/6 rounded-xl p-1 w-fit">
          <TabsTrigger
            value="faq"
            className="gap-1.5 rounded-lg data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/40"
          >
            <HelpCircle className="h-3.5 w-3.5" /> FAQ
          </TabsTrigger>
          <TabsTrigger
            value="contact"
            className="gap-1.5 rounded-lg data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/40"
          >
            <Mail className="h-3.5 w-3.5" /> Contact Us
          </TabsTrigger>
          <TabsTrigger
            value="status"
            className="gap-1.5 rounded-lg data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/40"
          >
            <Zap className="h-3.5 w-3.5" /> System Status
          </TabsTrigger>
        </TabsList>

        {/* FAQ Tab */}
        <TabsContent value="faq">
          <div className="space-y-4">
            {filteredFaqs.map((cat, ci) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: ci * 0.05 }}
              >
                <Card className="bg-[#16162a] border-white/6 rounded-2xl overflow-hidden">
                  <CardHeader className="pb-3 pt-4 px-4 border-b border-white/4">
                    <CardTitle className="text-sm flex items-center gap-2.5 text-white">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-xl ${cat.bg} shrink-0`}
                      >
                        <cat.icon className={`h-4 w-4 ${cat.color}`} />
                      </div>
                      <span className="flex-1">{cat.title}</span>
                      <Badge
                        variant="secondary"
                        className="text-[9px] bg-white/6 text-white/40 border-0 rounded-lg h-5 shrink-0"
                      >
                        {cat.questions.length}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 space-y-2">
                    {cat.questions.map((faq, qi) => {
                      const faqId = `${ci}-${qi}`;
                      const isExpanded = expandedFaq === faqId;
                      return (
                        <div
                          key={qi}
                          className={cn(
                            "border rounded-xl overflow-hidden transition-colors",
                            isExpanded
                              ? "border-white/12 bg-white/2"
                              : "border-white/6",
                          )}
                        >
                          <button
                            onClick={() =>
                              setExpandedFaq(isExpanded ? null : faqId)
                            }
                            className="flex items-center gap-3 w-full p-4 text-left hover:bg-white/2 transition-colors"
                          >
                            <div className="h-1.5 w-1.5 rounded-full bg-violet-400/50 shrink-0" />
                            <span className="text-sm font-medium text-white/80 flex-1">
                              {faq.q}
                            </span>
                            <ChevronDown
                              className={cn(
                                "h-4 w-4 text-white/30 shrink-0 transition-transform duration-200",
                                isExpanded && "rotate-180",
                              )}
                            />
                          </button>
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="px-4 pb-4 pl-8 text-sm text-white/50 border-t border-white/4">
                                  <p className="pt-3 leading-relaxed">
                                    {faq.a}
                                  </p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
            {searchQuery && filteredFaqs.length === 0 && (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-white/20 mx-auto mb-4" />
                <p className="text-white/50 text-sm">
                  No results found for &quot;{searchQuery}&quot;
                </p>
                <p className="text-white/30 text-xs mt-1">
                  Try different keywords or browse the categories below
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Contact Tab */}
        <TabsContent value="contact">
          <div className="grid gap-6 lg:grid-cols-5">
            <Card className="bg-[#16162a] border-white/6 rounded-2xl lg:col-span-3">
              <CardHeader className="px-6 pt-6 pb-4 border-b border-white/4">
                <CardTitle className="text-sm text-white">
                  Send us a message
                </CardTitle>
                <p className="text-xs text-white/40">
                  We&apos;ll get back to you as soon as possible
                </p>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {contactSent ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 mx-auto mb-4">
                      <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                    </div>
                    <h3 className="font-semibold text-white mb-1">
                      Message Sent!
                    </h3>
                    <p className="text-sm text-white/40">
                      We&apos;ll get back to you within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label className="text-xs text-white/50 font-medium">
                        Subject
                      </Label>
                      <Input
                        placeholder="How can we help?"
                        value={contactForm.subject}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            subject: e.target.value,
                          })
                        }
                        className="bg-white/4 border-white/6 text-white placeholder:text-white/20 h-11 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs text-white/50 font-medium">
                        Message
                      </Label>
                      <Textarea
                        placeholder="Describe your issue or question..."
                        value={contactForm.message}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            message: e.target.value,
                          })
                        }
                        rows={5}
                        className="bg-white/4 border-white/6 text-white placeholder:text-white/20 rounded-xl resize-none"
                      />
                    </div>
                    <Button
                      onClick={handleContactSubmit}
                      className="gradient-primary text-white gap-1.5 rounded-xl h-11 w-full"
                      disabled={!contactForm.subject || !contactForm.message}
                    >
                      <Send className="h-4 w-4" /> Send Message
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>

            <div className="space-y-4 lg:col-span-2">
              <Card className="bg-[#16162a] border-white/6 rounded-2xl">
                <CardContent className="p-5">
                  <h3 className="text-sm font-semibold text-white mb-4">
                    Contact Information
                  </h3>
                  <div className="space-y-3">
                    {[
                      {
                        icon: Mail,
                        label: "Email",
                        value: "support@owtask.app",
                        color: "text-blue-400",
                        bg: "bg-blue-500/10",
                      },
                      {
                        icon: Phone,
                        label: "Phone",
                        value: "+62 123 456 789",
                        color: "text-emerald-400",
                        bg: "bg-emerald-500/10",
                      },
                      {
                        icon: Clock,
                        label: "Support Hours",
                        value: "Mon-Fri, 9AM-6PM WIB",
                        color: "text-amber-400",
                        bg: "bg-amber-500/10",
                      },
                      {
                        icon: MessageCircle,
                        label: "Live Chat",
                        value: "Available 24/7",
                        color: "text-violet-400",
                        bg: "bg-violet-500/10",
                      },
                    ].map((info, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/2 transition-colors"
                      >
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-xl ${info.bg} shrink-0`}
                        >
                          <info.icon className={`h-4 w-4 ${info.color}`} />
                        </div>
                        <div className="min-w-0">
                          <div className="text-[10px] text-white/40 uppercase tracking-wider">
                            {info.label}
                          </div>
                          <div className="text-sm font-medium text-white/80 truncate">
                            {info.value}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#16162a] border-white/6 rounded-2xl">
                <CardContent className="p-5">
                  <h3 className="text-sm font-semibold text-white mb-2">
                    Quick Response
                  </h3>
                  <p className="text-xs text-white/40 mb-4">
                    Average response time for support tickets
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "85%" }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-linear-to-r from-violet-400 to-purple-500 rounded-full"
                      />
                    </div>
                    <span className="text-xs font-semibold text-white/60 shrink-0">
                      {"< 2h"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Status Tab */}
        <TabsContent value="status">
          <Card className="bg-[#16162a] border-white/6 rounded-2xl overflow-hidden">
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 shrink-0">
                  <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-white">
                    All Systems Operational
                  </h3>
                  <p className="text-xs text-white/40">
                    Last checked: 2 minutes ago
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  {
                    name: "Web Application",
                    status: "operational",
                    uptime: "99.99%",
                  },
                  {
                    name: "API Services",
                    status: "operational",
                    uptime: "99.98%",
                  },
                  {
                    name: "Real-time Chat",
                    status: "operational",
                    uptime: "99.97%",
                  },
                  {
                    name: "File Storage",
                    status: "operational",
                    uptime: "99.99%",
                  },
                  {
                    name: "Email Notifications",
                    status: "operational",
                    uptime: "99.95%",
                  },
                ].map((service, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 rounded-xl border border-white/6 hover:border-white/12 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50 shrink-0" />
                      <span className="text-sm font-medium text-white/80 truncate">
                        {service.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <span className="text-xs text-white/40 hidden sm:inline">
                        Uptime: {service.uptime}
                      </span>
                      <Badge className="bg-emerald-500/10 text-emerald-400 border-0 text-[10px] rounded-lg px-2.5 py-0.5">
                        Operational
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="bg-white/6" />

              <div>
                <h4 className="text-sm font-semibold text-white mb-3">
                  Recent Incidents
                </h4>
                <div className="text-center py-8 rounded-xl bg-white/2 border border-white/4">
                  <CheckCircle2 className="h-10 w-10 mx-auto mb-3 text-emerald-400/50" />
                  <p className="text-white/40 text-sm">No recent incidents</p>
                  <p className="text-white/25 text-xs mt-1">
                    Everything is running smoothly!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

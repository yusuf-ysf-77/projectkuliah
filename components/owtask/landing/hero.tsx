"use client";

import { useRef, type MutableRefObject } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";
import {
  ArrowRight,
  Play,
  CheckCircle2,
  Zap,
  Clock,
  Star,
  ClipboardCheck,
  CheckCircle,
  Users,
  Bell,
  LayoutDashboard,
  CheckSquare,
  MessageCircle,
  Calendar,
  StickyNote,
  TrendingUp,
  MoreHorizontal,
  Paperclip,
  Rocket,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  GradientOrbs,
  FloatingShapes,
  ParticleField,
  DotGrid,
} from "@/components/owtask/shared/animated-bg";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/owtask/shared/scroll-reveal";

function MouseGlow() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const glowX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const glowY = useSpring(mouseY, { stiffness: 300, damping: 30 });
  const background = useMotionTemplate`radial-gradient(600px circle at ${glowX}px ${glowY}px, rgba(167, 139, 250, 0.06), transparent 80%)`;

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none z-0"
      style={{ background }}
      onMouseMove={handleMouseMove}
    />
  );
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef as MutableRefObject<HTMLDivElement>,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden gradient-hero noise-overlay"
    >
      <ParticleField />
      <GradientOrbs />
      <FloatingShapes />
      <DotGrid />
      <MouseGlow />

      <div className="mx-auto max-w-7xl px-6 pt-24 pb-16 relative z-10">
        <motion.div
          style={{ opacity, scale }}
          className="grid gap-12 lg:grid-cols-2 lg:items-center"
        >
          {/* Left: Text content */}
          <motion.div style={{ y: y1 }}>
            <StaggerChildren staggerDelay={0.15}>
              <StaggerItem>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex"
                >
                  <Badge className="mb-6 gradient-primary text-white border-0 px-4 py-1.5 gap-1.5 shadow-lg shadow-violet-500/20">
                    <Zap className="h-3 w-3" />
                    <span className="font-semibold">owTask 2.0</span>
                    <span className="text-violet-100">sudah tersedia</span>
                  </Badge>
                </motion.div>
              </StaggerItem>

              <StaggerItem>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl leading-[1.1] text-white">
                  The All-in-One Platform for{" "}
                  <span className="gradient-text-animated">Teams</span>
                </h1>
              </StaggerItem>

              <StaggerItem>
                <p className="mt-6 text-lg text-white/50 max-w-lg leading-relaxed">
                  Plan, schedule, collaborate, and manage tasks — all in one
                  powerful platform. Boost your team&apos;s productivity with
                  real-time insights.
                </p>
              </StaggerItem>

              <StaggerItem>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href="/owtask/register">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        size="lg"
                        className="gradient-primary text-white shadow-xl shadow-violet-500/25 hover:shadow-violet-500/40 transition-all gap-2 h-12 px-8 text-base font-semibold"
                      >
                        <Rocket className="h-4 w-4" />
                        Start Free Trial
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  </Link>
                  <Link href="/owtask/login">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        size="lg"
                        variant="outline"
                        className="glass-card border-white/10 text-white/70 gap-2 h-12 px-8 text-base font-semibold hover:bg-white/5 hover:text-white"
                      >
                        <Play className="h-4 w-4 fill-violet-400 text-violet-400" />
                        Watch Demo
                      </Button>
                    </motion.div>
                  </Link>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="mt-8 flex flex-wrap gap-6 text-sm text-white/40">
                  {[
                    { icon: CheckCircle2, text: "Tanpa kartu kredit" },
                    { icon: CheckCircle2, text: "14 hari gratis" },
                    { icon: CheckCircle2, text: "Batalkan kapan saja" },
                  ].map((item, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 + i * 0.1 }}
                      className="flex items-center gap-1.5"
                    >
                      <item.icon className="h-4 w-4 text-violet-400" />
                      {item.text}
                    </motion.span>
                  ))}
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="mt-10 flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {["AP", "SD", "BS", "MP", "RF"].map((initials, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.5 + i * 0.1 }}
                      >
                        <Avatar className="h-9 w-9 border-2 border-[#0c0c1d] shadow-md">
                          <AvatarFallback className="gradient-primary text-white text-[10px] font-bold">
                            {initials}
                          </AvatarFallback>
                        </Avatar>
                      </motion.div>
                    ))}
                  </div>
                  <div className="text-sm">
                    <div className="flex items-center gap-1 text-violet-400">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 1.8 + i * 0.08, type: "spring" }}
                        >
                          <Star className="h-3.5 w-3.5 fill-current" />
                        </motion.div>
                      ))}
                    </div>
                    <span className="text-white/40">
                      Digunakan{" "}
                      <strong className="text-white/60">2.000+</strong> tim
                    </span>
                  </div>
                </div>
              </StaggerItem>
            </StaggerChildren>
          </motion.div>

          {/* Right: Dashboard preview */}
          <motion.div style={{ y: y2 }} className="relative">
            <motion.div
              initial={{ opacity: 0, x: 40, rotateY: -5 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="relative rounded-2xl shadow-2xl shadow-violet-500/10 overflow-hidden border border-white/8"
              style={{ perspective: "1200px" }}
            >
              {/* Window chrome */}
              <div className="bg-[#16162a]/90 backdrop-blur-sm border-b border-white/6 px-4 py-2.5 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-400/80 hover:bg-red-400 transition-colors cursor-pointer" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/80 hover:bg-yellow-400 transition-colors cursor-pointer" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-400/80 hover:bg-green-400 transition-colors cursor-pointer" />
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <div className="bg-white/5 rounded-md px-3 py-0.5 text-[10px] text-white/40 font-mono">
                    owtask.app/dashboard
                  </div>
                </div>
              </div>

              {/* Dashboard content */}
              <div className="bg-[#12122a] flex">
                {/* Mini sidebar */}
                <div className="w-12 bg-[#0c0c1d] flex flex-col items-center py-3 gap-3">
                  <div className="h-6 w-6 rounded-lg gradient-primary flex items-center justify-center shadow-lg shadow-violet-500/30">
                    <span className="text-[8px] font-bold text-white">o</span>
                  </div>
                  {[
                    { icon: LayoutDashboard, active: true },
                    { icon: CheckSquare, active: false },
                    { icon: MessageCircle, active: false },
                    { icon: Calendar, active: false },
                    { icon: StickyNote, active: false },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      className={`h-7 w-7 rounded-lg flex items-center justify-center transition-all cursor-pointer ${item.active ? "bg-white/10 shadow-inner" : "hover:bg-white/5"}`}
                    >
                      <item.icon
                        className={`h-3.5 w-3.5 ${item.active ? "text-violet-400" : "text-white/30"}`}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Main content */}
                <div className="flex-1 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      <div className="text-xs font-bold text-white">
                        Welcome back, Andi
                      </div>
                      <div className="text-[9px] text-white/40">
                        Here&apos;s your team overview
                      </div>
                    </motion.div>
                    <div className="flex items-center gap-1.5">
                      <div className="relative">
                        <Bell className="h-3 w-3 text-white/40" />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-red-500"
                        />
                      </div>
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="gradient-primary text-white text-[7px]">
                          AP
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    {[
                      {
                        label: "Total",
                        value: "24",
                        icon: ClipboardCheck,
                        color: "text-violet-400",
                        bg: "bg-violet-500/10",
                      },
                      {
                        label: "Active",
                        value: "12",
                        icon: Clock,
                        color: "text-blue-400",
                        bg: "bg-blue-500/10",
                      },
                      {
                        label: "Done",
                        value: "8",
                        icon: CheckCircle,
                        color: "text-emerald-400",
                        bg: "bg-emerald-500/10",
                      },
                      {
                        label: "Team",
                        value: "6",
                        icon: Users,
                        color: "text-pink-400",
                        bg: "bg-pink-500/10",
                      },
                    ].map((stat, i) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 + i * 0.1 }}
                        className={`${stat.bg} rounded-lg p-2 hover:scale-105 transition-transform cursor-pointer`}
                      >
                        <stat.icon className={`h-3 w-3 ${stat.color} mb-1`} />
                        <div className={`text-sm font-bold ${stat.color}`}>
                          {stat.value}
                        </div>
                        <div className="text-[8px] text-white/30">
                          {stat.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Gantt mini preview */}
                  <div className="bg-white/3 rounded-xl p-2.5 mb-3 border border-white/6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[9px] font-bold text-white/60">
                        Task Timeline
                      </span>
                      <MoreHorizontal className="h-2.5 w-2.5 text-white/30" />
                    </div>
                    <div className="space-y-1.5">
                      {[
                        {
                          name: "Design UI",
                          color: "from-violet-400 to-purple-500",
                          width: "70%",
                          start: "5%",
                        },
                        {
                          name: "API Auth",
                          color: "from-blue-400 to-cyan-500",
                          width: "50%",
                          start: "15%",
                        },
                        {
                          name: "Testing",
                          color: "from-amber-400 to-orange-500",
                          width: "40%",
                          start: "30%",
                        },
                        {
                          name: "Landing",
                          color: "from-emerald-400 to-teal-500",
                          width: "60%",
                          start: "10%",
                        },
                      ].map((task, i) => (
                        <div
                          key={task.name}
                          className="flex items-center gap-2"
                        >
                          <span className="text-[8px] text-white/30 w-10 truncate">
                            {task.name}
                          </span>
                          <div className="flex-1 h-2 bg-white/5 rounded-full relative overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: task.width }}
                              transition={{
                                duration: 1.2,
                                delay: 1.2 + i * 0.15,
                                ease: "easeOut",
                              }}
                              className={`absolute h-full rounded-full bg-linear-to-r ${task.color}`}
                              style={{ left: task.start }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Task cards */}
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      {
                        title: "Desain UI Dashboard",
                        status: "In Progress",
                        color: "bg-blue-500/15 text-blue-400",
                        progress: 65,
                      },
                      {
                        title: "API Authentication",
                        status: "To Do",
                        color: "bg-amber-500/15 text-amber-400",
                        progress: 15,
                      },
                      {
                        title: "Landing Page",
                        status: "Done",
                        color: "bg-emerald-500/15 text-emerald-400",
                        progress: 100,
                      },
                      {
                        title: "Chat Feature",
                        status: "In Progress",
                        color: "bg-blue-500/15 text-blue-400",
                        progress: 45,
                      },
                    ].map((task, i) => (
                      <motion.div
                        key={task.title}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5 + i * 0.1 }}
                        className="bg-white/3 rounded-lg p-2 border border-white/6 hover:shadow-md transition-shadow cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[8px] font-semibold text-white/60 line-clamp-1">
                            {task.title}
                          </span>
                          <Badge
                            className={`${task.color} border-0 text-[7px] px-1 py-0 h-3.5`}
                          >
                            {task.status}
                          </Badge>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${task.progress}%` }}
                            transition={{
                              duration: 1.2,
                              delay: 1.8 + i * 0.15,
                              ease: "easeOut",
                            }}
                            className="h-full rounded-full bg-linear-to-r from-violet-400 to-purple-500"
                          />
                        </div>
                        <div className="flex items-center justify-between mt-1.5">
                          <div className="flex -space-x-1">
                            {[0, 1].map((j) => (
                              <div
                                key={j}
                                className="h-3.5 w-3.5 rounded-full bg-linear-to-br from-violet-400 to-purple-500 border border-[#12122a] text-[5px] text-white flex items-center justify-center font-bold"
                              >
                                {["A", "B"][j]}
                              </div>
                            ))}
                          </div>
                          <div className="flex items-center gap-1 text-[7px] text-white/30">
                            <Paperclip className="h-2 w-2" /> 2
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 rounded-xl glass-card p-3 shadow-xl border border-white/6 cursor-pointer hover:scale-105 transition-transform"
            >
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary shadow-lg shadow-violet-500/20">
                  <TrendingUp className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">+23%</div>
                  <div className="text-[9px] text-white/40">Productivity</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 rounded-xl glass-card p-3 shadow-xl border border-white/6 cursor-pointer hover:scale-105 transition-transform"
            >
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-emerald-400 to-teal-500 shadow-lg shadow-emerald-500/20">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">8 Done</div>
                  <div className="text-[9px] text-white/40">This week</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -6, 0], x: [0, 4, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 -right-6 rounded-xl glass-card p-2.5 shadow-lg border border-white/6"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-linear-to-br from-violet-400 to-purple-500 shadow-lg shadow-violet-500/20">
                  <Target className="h-3.5 w-3.5 text-white" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-white">92%</div>
                  <div className="text-[8px] text-white/40">On Track</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

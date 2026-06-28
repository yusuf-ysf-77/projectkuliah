"use client";

import { motion } from "framer-motion";
import {
  CheckSquare,
  Users,
  MessageCircle,
  Calendar,
  StickyNote,
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  Globe,
  Lock,
  Layers,
  Star,
  Quote,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  ScrollReveal,
  StaggerChildren,
  StaggerItem,
} from "@/components/owtask/shared/scroll-reveal";
import { AnimatedCounter } from "@/components/owtask/shared/animated-counter";

const features = [
  {
    icon: CheckSquare,
    title: "Manajemen Tugas",
    desc: "Atur tugas dengan papan Kanban, pantau progres, tetapkan deadline, dan prioritaskan pekerjaan.",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    gradient: "from-violet-400 to-purple-500",
  },
  {
    icon: Users,
    title: "Kolaborasi Tim",
    desc: "Bekerja sama real-time, beri umpan balik, tugaskan anggota, dan selesaikan pekerjaan lebih cepat.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    gradient: "from-emerald-400 to-teal-500",
  },
  {
    icon: MessageCircle,
    title: "Chat Pintar",
    desc: "Komunikasi via chat tugas dan umum dengan berbagi file, gambar, video, dan dokumen.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    gradient: "from-blue-400 to-cyan-500",
  },
  {
    icon: Calendar,
    title: "Kalender & Jadwal",
    desc: "Pantau deadline, libur, dan rencana dengan tampilan kalender bulanan dan mingguan.",
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    gradient: "from-pink-400 to-rose-500",
  },
  {
    icon: StickyNote,
    title: "Catatan & Ide",
    desc: "Tangkap ide, notulensi rapat, dan informasi penting dalam catatan berwarna dan bertag.",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    gradient: "from-amber-400 to-orange-500",
  },
  {
    icon: Globe,
    title: "Akses Lintas Tim",
    desc: "Hubungkan divisi berbeda, bagikan update, dan jaga visibilitas seluruh perusahaan.",
    color: "text-teal-400",
    bg: "bg-teal-500/10",
    gradient: "from-teal-400 to-emerald-500",
  },
];

const stats = [
  { value: 2000, suffix: "+", label: "Tim menggunakan owTask", icon: Users },
  { value: 50, suffix: "rb+", label: "Tugas diselesaikan", icon: CheckSquare },
  { value: 99, suffix: ".9%", label: "Uptime terjamin", icon: Shield },
  { value: 24, suffix: "/7", label: "Dukungan tersedia", icon: Zap },
];

const steps = [
  {
    step: "1",
    title: "Buat Akun",
    description: "Daftar sebagai host dan pilih paket",
    icon: Layers,
  },
  {
    step: "2",
    title: "Undang Tim",
    description: "Bagikan kode — tim bergabung gratis",
    icon: Users,
  },
  {
    step: "3",
    title: "Buat Tugas",
    description: "Buat tugas, atur deadline, tugaskan anggota",
    icon: CheckSquare,
  },
  {
    step: "4",
    title: "Berkolaborasi",
    description: "Chat, berbagi file, dan pantau progres",
    icon: MessageCircle,
  },
];

const testimonials = [
  {
    name: "Andi Pratama",
    role: "Engineering Lead",
    company: "TechCorp",
    avatar: "AP",
    text: "owTask mengubah cara tim kami bekerja. Produktivitas meningkat 40% dalam 2 bulan pertama.",
    rating: 5,
  },
  {
    name: "Sari Dewi",
    role: "Marketing Manager",
    company: "BrandLab",
    avatar: "SD",
    text: "Fitur kalender dan chat sangat membantu koordinasi antar divisi. Sangat recommended!",
    rating: 5,
  },
  {
    name: "Budi Santoso",
    role: "Project Manager",
    company: "DevStudio",
    avatar: "BS",
    text: "Manajemen tugas jadi jauh lebih mudah. Semua terorganisir dalam satu platform.",
    rating: 5,
  },
];

const logos = [
  "Google",
  "Microsoft",
  "Spotify",
  "Slack",
  "Notion",
  "Figma",
  "Vercel",
  "Linear",
];

function FeatureCard({ feature }: { feature: (typeof features)[0] }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className="group h-full glass-card border-white/6 hover:border-white/12 hover:shadow-xl hover:shadow-violet-500/5 transition-all duration-500 cursor-pointer overflow-hidden relative">
        <div
          className={`absolute top-0 left-0 right-0 h-1 bg-linear-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        />
        <CardContent className="p-6 relative">
          <div
            className={`absolute top-0 right-0 w-32 h-32 bg-linear-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-full blur-3xl transition-opacity duration-500`}
          />
          <motion.div
            whileHover={{ rotate: 5, scale: 1.1 }}
            className={`relative flex h-14 w-14 items-center justify-center rounded-2xl ${feature.bg} mb-5 transition-all duration-300 group-hover:shadow-lg`}
          >
            <feature.icon className={`h-7 w-7 ${feature.color}`} />
          </motion.div>
          <h3 className="text-lg font-bold mb-2 text-white group-hover:text-white transition-colors">
            {feature.title}
          </h3>
          <p className="text-sm text-white/40 mb-4 leading-relaxed">
            {feature.desc}
          </p>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet-400 group-hover:gap-2.5 transition-all duration-300">
            Pelajari lebih lanjut{" "}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function MarqueeTicker() {
  return (
    <div className="overflow-hidden py-6 border-y border-white/6 relative">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-linear-to-r from-[#0c0c1d] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-linear-to-l from-[#0c0c1d] to-transparent z-10" />
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex gap-12 whitespace-nowrap"
      >
        {[...logos, ...logos].map((logo, i) => (
          <div
            key={i}
            className="flex items-center gap-2 text-white/15 hover:text-white/30 transition-colors"
          >
            <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center">
              <span className="text-xs font-bold">{logo[0]}</span>
            </div>
            <span className="text-sm font-semibold">{logo}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function FloatingTestimonial({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      whileHover={{ y: -5, scale: 1.02 }}
    >
      <Card className="glass-card border-white/6 hover:border-white/12 hover:shadow-xl hover:shadow-violet-500/5 transition-all duration-300 h-full">
        <CardContent className="p-6">
          <div className="flex items-center gap-1 mb-4">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
            ))}
          </div>
          <Quote className="h-6 w-6 text-violet-400/30 mb-3" />
          <p className="text-sm text-white/60 leading-relaxed mb-6">
            {testimonial.text}
          </p>
          <div className="flex items-center gap-3 pt-4 border-t border-white/6">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="gradient-primary text-white text-xs font-bold">
                {testimonial.avatar}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="text-sm font-semibold text-white">
                {testimonial.name}
              </div>
              <div className="text-xs text-white/40">
                {testimonial.role} &middot; {testimonial.company}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function Features() {
  return (
    <>
      {/* Stats bar */}
      <section className="py-16 px-6 border-y border-white/6 relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh" />
        <div className="mx-auto max-w-5xl relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.1} direction="up">
                <div className="text-center group cursor-pointer">
                  <div className="flex justify-center mb-3">
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      className="h-12 w-12 rounded-2xl bg-violet-500/10 flex items-center justify-center transition-transform"
                    >
                      <stat.icon className="h-5 w-5 text-violet-400" />
                    </motion.div>
                  </div>
                  <div className="text-3xl font-bold gradient-text">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-white/40 mt-1">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted by logos */}
      <section className="py-12 px-6">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <p className="text-center text-xs text-white/30 mb-6 uppercase tracking-widest">
              Dipercaya oleh tim-tim terbaik
            </p>
          </ScrollReveal>
          <MarqueeTicker />
        </div>
      </section>

      {/* Features grid */}
      <section id="features" className="py-28 px-6 relative">
        <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />
        <div className="mx-auto max-w-7xl relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <Badge className="mb-4 gradient-primary text-white border-0 px-4 py-1.5 gap-1 shadow-lg shadow-violet-500/20">
                <Sparkles className="h-3 w-3" /> FITUR
              </Badge>
              <h2 className="text-3xl font-bold sm:text-5xl text-white">
                Semua yang Kamu Butuhkan untuk{" "}
                <span className="gradient-text">Berhasil</span>
              </h2>
              <p className="mt-4 text-lg text-white/40 max-w-2xl mx-auto">
                Fitur powerful untuk memperlancar workflow dan menghasilkan
                nyata.
              </p>
            </div>
          </ScrollReveal>

          <StaggerChildren
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            staggerDelay={0.1}
          >
            {features.map((feature) => (
              <StaggerItem key={feature.title}>
                <FeatureCard feature={feature} />
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="py-28 px-6 relative overflow-hidden"
      >
        <div className="absolute inset-0 gradient-mesh opacity-50" />
        <div className="mx-auto max-w-5xl relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-violet-500/10 text-violet-400 border-0 px-4 py-1.5 gap-1">
                <Zap className="h-3 w-3" /> CARA KERJA
              </Badge>
              <h2 className="text-3xl font-bold sm:text-5xl text-white">
                Mulai dalam <span className="gradient-text">4 Langkah</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid gap-8 md:grid-cols-4">
            {steps.map((step, i) => (
              <ScrollReveal key={step.step} delay={i * 0.15} direction="up">
                <div className="text-center relative group">
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px">
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.5 + i * 0.2 }}
                        className="h-full bg-linear-to-r from-violet-500/30 to-transparent origin-left"
                      />
                    </div>
                  )}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="relative z-10"
                  >
                    <div className="flex h-20 w-20 items-center justify-center rounded-3xl gradient-primary text-white text-2xl font-bold mx-auto mb-5 shadow-xl shadow-violet-500/25 group-hover:shadow-violet-500/40 transition-shadow">
                      <step.icon className="h-8 w-8" />
                    </div>
                  </motion.div>
                  <h3 className="font-bold text-lg mb-1 text-white">
                    {step.title}
                  </h3>
                  <p className="text-sm text-white/40">{step.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-28 px-6 relative">
        <div className="mx-auto max-w-6xl relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-violet-500/10 text-violet-400 border-0 px-4 py-1.5 gap-1">
                <Star className="h-3 w-3" /> TESTIMONI
              </Badge>
              <h2 className="text-3xl font-bold sm:text-5xl text-white">
                Kata Mereka tentang{" "}
                <span className="gradient-text">owTask</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <FloatingTestimonial key={t.name} testimonial={t} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust section */}
      <section className="py-28 px-6">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="glass-card rounded-3xl p-12 text-center border border-white/6 relative overflow-hidden"
            >
              <div className="absolute inset-0 gradient-mesh opacity-30" />
              <div className="relative z-10">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Shield className="h-14 w-14 text-emerald-400 mx-auto mb-5" />
                </motion.div>
                <h2 className="text-2xl font-bold mb-3 text-white">
                  Dipercaya tim di seluruh dunia
                </h2>
                <p className="text-white/40 max-w-xl mx-auto mb-8">
                  Keamanan kelas enterprise, uptime 99.9%, dan kepatuhan GDPR.
                  Data kamu aman bersama kami.
                </p>
                <div className="flex flex-wrap justify-center gap-8 text-sm text-white/40">
                  {[
                    {
                      icon: Shield,
                      text: "SSL Encrypted",
                      color: "text-emerald-400",
                    },
                    { icon: Globe, text: "Global CDN", color: "text-blue-400" },
                    { icon: Zap, text: "Auto Backup", color: "text-amber-400" },
                    { icon: Lock, text: "SOC 2", color: "text-violet-400" },
                  ].map((item, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-2"
                    >
                      <item.icon className={`h-4 w-4 ${item.color}`} />{" "}
                      {item.text}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

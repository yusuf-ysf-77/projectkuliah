"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Crown,
  Briefcase,
  ArrowRight,
  Shield,
  CheckSquare,
  MessageCircle,
  Calendar,
  Leaf,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useStore } from "@/lib/store";
import { GradientOrbs } from "@/components/owtask/shared/animated-bg";
import type { Role } from "@/lib/types";

export default function SelectRolePage() {
  const { setCurrentUser, currentUser } = useStore();
  const router = useRouter();

  const selectAndGo = (role: Role) => {
    const user = { ...currentUser, role, isNew: true };
    setCurrentUser(user);
    router.push("/owtask/onboarding");
  };

  const roles = [
    {
      role: "leader" as Role,
      icon: Crown,
      title: "Team Leader",
      subtitle: "Pimpin & Kelola Tim",
      description:
        "Buat tugas, kelola anggota tim, atur deadline, dan pantau seluruh progress proyek.",
      features: [
        "Buat & kelola tugas",
        "Undang anggota tim",
        "Pantau progress",
        "Review pekerjaan",
      ],
      color: "text-violet-400",
      bg: "bg-violet-500/10",
      border: "hover:border-violet-500/50 hover:shadow-violet-500/10",
      accent: "from-violet-500 to-purple-600",
    },
    {
      role: "worker" as Role,
      icon: Briefcase,
      title: "Team Member",
      subtitle: "Kerja & Berkolaborasi",
      description:
        "Lihat tugas yang ditugaskan, kirim hasil kerja, dan berkolaborasi dengan rekan tim.",
      features: [
        "Lihat tugas assigned",
        "Submit hasil kerja",
        "Chat dengan tim",
        "Pantau deadline",
      ],
      color: "text-pink-400",
      bg: "bg-pink-500/10",
      border: "hover:border-pink-500/50 hover:shadow-pink-500/10",
      accent: "from-pink-500 to-rose-600",
    },
  ];

  return (
    <div className="min-h-screen flex gradient-hero relative overflow-hidden">
      <GradientOrbs />
      <div className="absolute inset-0 dot-pattern opacity-20" />

      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center">
        <div className="absolute inset-0 bg-linear-to-br from-[#12122a]/95 to-[#0c0c1d]/95" />
        <div className="relative z-10 text-white px-12 max-w-md">
          <Link href="/owtask" className="inline-flex items-center gap-2 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl gradient-primary shadow-lg shadow-violet-500/20">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold">owTask</span>
          </Link>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold mb-4 leading-tight"
          >
            Mulai kelola tim{" "}
            <span className="text-violet-400">dengan mudah</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white/40 text-lg mb-8 leading-relaxed"
          >
            Pilih peran kamu untuk memulai. Semua fitur siap digunakan sesuai
            kebutuhanmu.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-3"
          >
            {[
              { icon: CheckSquare, text: "Manajemen tugas & deadline" },
              { icon: MessageCircle, text: "Chat real-time antar anggota" },
              { icon: Calendar, text: "Kalender & jadwal bersama" },
              { icon: Shield, text: "Keamanan data terjamin" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5">
                  <item.icon className="h-4 w-4 text-violet-400" />
                </div>
                <span className="text-sm text-white/50">{item.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Right side - role selection */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-lg"
        >
          {/* Mobile logo */}
          <div className="text-center mb-8 lg:hidden">
            <Link
              href="/owtask"
              className="inline-flex items-center gap-2 mb-4"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl gradient-primary shadow-lg shadow-violet-500/20">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">owTask</span>
            </Link>
          </div>

          <div className="text-center mb-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-medium mb-4"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
              Langkah 1 dari 2
            </motion.div>
            <h1 className="text-3xl font-bold mb-2 text-white">
              Pilih Peran Kamu
            </h1>
            <p className="text-white/40">
              Tentukan bagaimana kamu akan menggunakan owTask
            </p>
          </div>

          <div className="space-y-4">
            {roles.map((r, i) => (
              <motion.div
                key={r.role}
                initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.15 }}
              >
                <Card
                  onClick={() => selectAndGo(r.role)}
                  className={`cursor-pointer glass-card border-white/6 ${r.border} transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group overflow-hidden`}
                >
                  <CardContent className="p-0">
                    <div className={`h-1 bg-linear-to-r ${r.accent}`} />
                    <div className="p-6 flex items-start gap-5">
                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-2xl ${r.bg} shrink-0 group-hover:scale-110 transition-transform`}
                      >
                        <r.icon className={`h-7 w-7 ${r.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-bold text-white">
                            {r.title}
                          </h3>
                        </div>
                        <p className="text-xs text-white/30 mb-2">
                          {r.subtitle}
                        </p>
                        <p className="text-sm text-white/40 mb-3">
                          {r.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {r.features.map((f, fi) => (
                            <span
                              key={fi}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/4 text-[10px] text-white/40 border border-white/4"
                            >
                              <CheckSquare className="h-2.5 w-2.5" /> {f}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/4 group-hover:bg-white/8 transition-colors shrink-0">
                        <ArrowRight className="h-4 w-4 text-white/30 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center text-xs text-white/20 mt-6"
          >
            Kamu bisa mengubah peran ini nanti dari pengaturan akun
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}

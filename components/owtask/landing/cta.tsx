"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Rocket,
  Star,
  Users,
  CheckCircle2,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/owtask/shared/scroll-reveal";

export function CTA() {
  return (
    <section className="py-28 px-6 relative overflow-hidden">
      <ScrollReveal>
        <div className="mx-auto max-w-4xl relative">
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="rounded-3xl gradient-primary p-12 sm:p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-violet-500/20"
          >
            <div className="absolute top-0 left-0 h-full w-full bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15),transparent_50%)]" />
            <div className="absolute bottom-0 right-0 h-full w-full bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.05),transparent_50%)]" />

            {/* Animated rotating circles */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-6 left-6 opacity-20"
            >
              <svg width="80" height="80" viewBox="0 0 80 80">
                <circle
                  cx="40"
                  cy="40"
                  r="38"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  strokeDasharray="4 8"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="28"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  strokeDasharray="6 4"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              </svg>
            </motion.div>

            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-6 right-6 opacity-20"
            >
              <svg width="60" height="60" viewBox="0 0 60 60">
                <polygon
                  points="30,5 55,50 5,50"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
                <polygon
                  points="30,15 45,45 15,45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              </svg>
            </motion.div>

            {/* Floating stars */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -15, 0],
                  opacity: [0.2, 0.5, 0.2],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3 + i * 0.7,
                  repeat: Infinity,
                  delay: i * 0.4,
                }}
                className="absolute"
                style={{
                  top: `${10 + ((i * 11) % 80)}%`,
                  left: `${5 + ((i * 13) % 90)}%`,
                }}
              >
                <Star className="h-3 w-3 fill-white/20 text-white/20" />
              </motion.div>
            ))}

            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/10 text-sm backdrop-blur-sm border border-white/10"
              >
                <Sparkles className="h-4 w-4" />
                <span>Mulai perjalananmu</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl font-bold sm:text-5xl mb-4 leading-tight"
              >
                Kelola Tim Kamu Mulai Sekarang
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-white/70 text-lg mb-10 max-w-xl mx-auto"
              >
                Bergabung dengan ribuan tim yang sudah menggunakan owTask untuk
                meningkatkan produktivitas.
              </motion.p>

              {/* Stats row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 }}
                className="flex items-center justify-center gap-8 mb-10"
              >
                {[
                  { icon: Users, label: "2.000+ Tim" },
                  { icon: CheckCircle2, label: "50rb+ Tugas" },
                  { icon: Zap, label: "99.9% Uptime" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-sm text-white/60"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Link href="/owtask/register">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="lg"
                      className="bg-white text-violet-900 hover:bg-white/90 shadow-xl gap-2 text-base px-10 h-14 font-semibold"
                    >
                      <Rocket className="h-5 w-5" />
                      Daftar Gratis
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </ScrollReveal>
    </section>
  );
}

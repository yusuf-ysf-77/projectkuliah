"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Check,
  Zap,
  Crown,
  Users,
  Sparkles,
  ArrowRight,
  Shield,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    desc: "Tim kecil",
    price: "Gratis",
    period: "",
    members: 5,
    features: [
      "5 anggota tim",
      "3 proyek aktif",
      "Manajemen tugas dasar",
      "Chat teks",
      "Kalender",
    ],
    icon: Zap,
    popular: false,
    badge: "FREE",
  },
  {
    name: "Small",
    desc: "Tim kecil menengah",
    price: "Rp99rb",
    period: "/bulan",
    members: 25,
    features: [
      "25 anggota tim",
      "Tugas unlimited",
      "Chat & kolaborasi",
      "Kalender + reminder",
      "1GB storage",
    ],
    icon: Users,
    popular: false,
    badge: null,
  },
  {
    name: "Medium",
    desc: "Tim menengah",
    price: "Rp299rb",
    period: "/bulan",
    members: 100,
    features: [
      "100 anggota tim",
      "Tugas unlimited",
      "Chat + file sharing",
      "Catatan & dokumentasi",
      "5GB storage",
    ],
    icon: Users,
    popular: false,
    badge: null,
  },
  {
    name: "Large",
    desc: "Perusahaan besar",
    price: "Rp799rb",
    period: "/bulan",
    members: 500,
    features: [
      "500 anggota tim",
      "Semua fitur unlimited",
      "Analytics lanjutan",
      "Integrasi kustom",
      "50GB storage",
    ],
    icon: Crown,
    popular: true,
    badge: "POPULAR",
  },
  {
    name: "Enterprise",
    desc: "Skala enterprise",
    price: "Rp1.4jt",
    period: "/bulan",
    members: 1000,
    features: [
      "1.000 anggota tim",
      "Analytics lanjutan",
      "Custom integrations",
      "API access",
      "Priority support",
    ],
    icon: Crown,
    popular: false,
    badge: null,
  },
  {
    name: "Corporation",
    desc: "Korporasi nasional",
    price: "Rp4.9jt",
    period: "/bulan",
    members: 5000,
    features: [
      "5.000 anggota tim",
      "Semua fitur",
      "Advanced analytics",
      "Custom integrations",
      "Dedicated support",
    ],
    icon: Crown,
    popular: false,
    badge: null,
  },
  {
    name: "Unicorn",
    desc: "Skala startup unicorn",
    price: "Rp9.9jt",
    period: "/bulan",
    members: 10000,
    features: [
      "10.000 anggota tim",
      "Semua fitur",
      "Advanced analytics",
      "Custom integrations",
      "Dedicated support",
    ],
    icon: Crown,
    popular: false,
    badge: null,
  },
  {
    name: "Mega Corp",
    desc: "Perusahaan multinasional",
    price: "Rp49.9jt",
    period: "/bulan",
    members: 100000,
    features: [
      "100.000 anggota tim",
      "Semua fitur",
      "Advanced analytics",
      "Custom integrations",
      "24/7 support",
    ],
    icon: Crown,
    popular: false,
    badge: "ENTERPRISE",
  },
];

export function Pricing() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? plans : plans.slice(0, 4);

  return (
    <section id="pricing" className="py-24 px-6 relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 gradient-primary text-white border-0 px-4 py-1.5 gap-1">
            <Sparkles className="h-3 w-3" /> HARGA
          </Badge>
          <h2 className="text-3xl font-bold sm:text-5xl mb-4">
            Pilih <span className="gradient-text">paket</span> sesuai kebutuhan
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Satu host membeli paket. Tim bergabung gratis via kode undangan.
            Mulai dengan trial 14 hari.
          </p>
        </motion.div>

        {/* Plan grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          {visible.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -6, scale: 1.02 }}
            >
              <Card className="h-full glass-card border-white/6 transition-all duration-300 cursor-pointer relative overflow-hidden group hover:shadow-xl hover:shadow-violet-500/10 hover:border-violet-500/40 hover:ring-1 hover:ring-violet-500/30 hover:-translate-y-1">
                <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-violet-400 to-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <CardContent className="p-5 flex flex-col h-full relative">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/6 text-violet-400 transition-all duration-300 group-hover:bg-violet-500/20 group-hover:text-violet-300">
                        <plan.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-bold text-sm">{plan.name}</div>
                        {plan.badge && (
                          <Badge
                            className={cn(
                              "text-[8px] px-1.5 py-0 h-4 border-0",
                              plan.badge === "ENTERPRISE"
                                ? "bg-violet-500/15 text-violet-400"
                                : "bg-emerald-500/15 text-emerald-400",
                            )}
                          >
                            {plan.badge}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground mb-2">
                    {plan.desc}
                  </p>

                  <div className="mb-1">
                    <span className="text-2xl font-bold">{plan.price}</span>
                    {plan.period && (
                      <span className="text-xs text-muted-foreground">
                        {plan.period}
                      </span>
                    )}
                  </div>

                  <div className="mb-4 p-2 rounded-lg bg-violet-500/5 border border-violet-500/10">
                    <span className="text-xs font-semibold text-violet-400">
                      Hingga {plan.members.toLocaleString("id-ID")} anggota
                    </span>
                  </div>

                  <ul className="space-y-1.5 mb-4 flex-1">
                    {plan.features.map((f, fi) => (
                      <li key={fi} className="flex items-start gap-1.5 text-xs">
                        <Check className="h-3 w-3 text-violet-400 mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/owtask/register">
                    <Button className="w-full text-xs h-9 gap-1.5 bg-white/6 hover:bg-violet-500 hover:text-white text-white transition-all duration-300">
                      {plan.price === "Gratis" ? "Mulai Gratis" : "Pilih Paket"}{" "}
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {!showAll && (
          <div className="text-center mb-10">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAll(true)}
              className="gap-1.5 text-xs text-muted-foreground hover:text-foreground"
            >
              <ChevronDown className="h-3.5 w-3.5" /> Lihat semua paket (
              {plans.length} paket tersedia)
            </Button>
          </div>
        )}

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-6 mt-10 text-xs text-muted-foreground"
        >
          <span className="flex items-center gap-1.5">
            <Shield className="h-3.5 w-3.5 text-emerald-500" /> SSL Encrypted
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-3.5 w-3.5 text-emerald-500" /> Tanpa kartu
            kredit untuk trial
          </span>
          <span className="flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-amber-500" /> Aktivasi instan
          </span>
          <span>Batalkan kapan saja</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs text-muted-foreground mt-4"
        >
          Satu orang membeli paket (menjadi host). Semua orang bergabung gratis
          via kode undangan.
        </motion.p>
      </div>
    </section>
  );
}

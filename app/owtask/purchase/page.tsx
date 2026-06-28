"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Crown,
  Check,
  CreditCard,
  Lock,
  Shield,
  Zap,
  ArrowRight,
  Sparkles,
  ArrowLeft,
  Users,
  ChevronDown,
  CheckCircle2,
  Leaf,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { GradientOrbs } from "@/components/owtask/shared/animated-bg";
import { cn } from "@/lib/utils";

type Step = "select" | "payment" | "success";

const tiers = [
  {
    members: 5,
    price: 0,
    period: "Gratis",
    label: "Starter",
    desc: "Cocok untuk tim kecil",
    icon: Zap,
    badge: "FREE",
    popular: false,
  },
  {
    members: 25,
    price: 99000,
    period: "/bulan",
    label: "Small",
    desc: "Tim kecil menengah",
    icon: Users,
    badge: null,
    popular: false,
  },
  {
    members: 100,
    price: 299000,
    period: "/bulan",
    label: "Medium",
    desc: "Tim menengah",
    icon: Users,
    badge: null,
    popular: false,
  },
  {
    members: 500,
    price: 799000,
    period: "/bulan",
    label: "Large",
    desc: "Perusahaan besar",
    icon: Users,
    badge: "POPULAR",
    popular: true,
  },
  {
    members: 1000,
    price: 1499000,
    period: "/bulan",
    label: "Enterprise",
    desc: "Skala enterprise",
    icon: Crown,
    badge: null,
    popular: false,
  },
  {
    members: 5000,
    price: 4999000,
    period: "/bulan",
    label: "Corporation",
    desc: "Korporasi nasional",
    icon: Crown,
    badge: null,
    popular: false,
  },
  {
    members: 10000,
    price: 9999000,
    period: "/bulan",
    label: "Unicorn",
    desc: "Skala unicorn startup",
    icon: Crown,
    badge: null,
    popular: false,
  },
  {
    members: 100000,
    price: 49999000,
    period: "/bulan",
    label: "Mega Corp",
    desc: "Perusahaan multinasional",
    icon: Crown,
    badge: "ENTERPRISE",
    popular: false,
  },
];

const features = [
  "Manajemen tugas & deadline",
  "Chat real-time antar anggota",
  "Kalender & jadwal bersama",
  "Catatan & dokumentasi",
  "Dashboard analitik",
  "Lampiran file",
  "Role & permission",
  "Dukungan prioritas",
];

function formatPrice(price: number) {
  if (price === 0) return "Gratis";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export default function PurchasePage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("select");
  const [selectedTier, setSelectedTier] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [showAllTiers, setShowAllTiers] = useState(false);
  const [form, setForm] = useState({
    name: "",
    number: "4444 5555 7777 9999",
    month: "08",
    year: "2030",
    cvv: "473",
  });

  const tier = tiers[selectedTier];
  const visibleTiers = showAllTiers ? tiers : tiers.slice(0, 4);

  const handlePurchase = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setStep("success");
    }, 2500);
  };

  const nextTier = useMemo(() => {
    return tiers.find((t, i) => i > selectedTier && t.price > 0) || null;
  }, [selectedTier]);

  return (
    <div className="min-h-screen bg-warm relative overflow-hidden">
      <GradientOrbs />

      {/* Header */}
      <header className="relative z-10 border-b border-border/30 glass-strong">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
          <Link href="/owtask" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold gradient-text">owTask</span>
          </Link>
          <Link href="/owtask/login">
            <Button variant="ghost" size="sm" className="gap-1.5 text-xs">
              Sudah punya akun? <span className="font-semibold">Masuk</span>
            </Button>
          </Link>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-12">
        {step === "success" ? (
          /* Success */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-lg mx-auto"
          >
            <Card className="border-0 shadow-xl glass-card overflow-hidden">
              <div className="gradient-primary p-8 text-white">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle2 className="h-8 w-8" />
                </motion.div>
                <h2 className="text-2xl font-bold mb-2">Lisensi Aktif!</h2>
                <p className="text-violet-100 text-sm">
                  Kamu sekarang adalah host. Siap mengelola tim kamu.
                </p>
              </div>
              <CardContent className="p-6">
                <div className="glass-card rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary text-white">
                      <Crown className="h-5 w-5" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-sm">
                        {tier.label} License
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Hingga {tier.members.toLocaleString("id-ID")} anggota
                        &middot; {formatPrice(tier.price)}
                        {tier.price > 0 ? tier.period : ""}
                      </div>
                    </div>
                    <Badge className="ml-auto bg-emerald-100 text-emerald-700 border-0 text-[10px]">
                      Aktif
                    </Badge>
                  </div>
                </div>
                <Button
                  onClick={() => router.push("/owtask/dashboard/leader")}
                  className="w-full gradient-primary text-white gap-2"
                >
                  Masuk ke Dashboard Leader <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : step === "payment" ? (
          /* Payment form */
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-lg mx-auto"
          >
            <button
              onClick={() => setStep("select")}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Kembali ke pilihan paket
            </button>

            <Card className="border-0 shadow-xl glass-card">
              <CardContent className="p-6">
                <h2 className="text-lg font-bold mb-1">Detail Pembayaran</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  {tier.label} — {formatPrice(tier.price)}
                  {tier.period}
                </p>

                {/* Card preview */}
                <div className="rounded-2xl bg-linear-to-br from-violet-500 via-purple-500 to-indigo-600 p-5 text-white mb-6 shadow-lg shadow-violet-500/20">
                  <div className="flex items-center justify-between mb-6">
                    <div className="h-8 w-12 rounded-md bg-white/20" />
                    <Crown className="h-5 w-5 text-white/80" />
                  </div>
                  <div className="font-mono text-lg tracking-wider mb-4">
                    {form.number}
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-[10px] text-white/60 uppercase">
                        Cardholder
                      </div>
                      <div className="text-sm font-medium">
                        {form.name || "Nama Kamu"}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-white/60 uppercase">
                        Expires
                      </div>
                      <div className="text-sm font-medium">
                        {form.month}/{form.year}
                      </div>
                    </div>
                  </div>
                </div>

                {tier.price === 0 ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">
                        Nama Lengkap
                      </Label>
                      <Input
                        placeholder="Masukkan nama kamu"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">
                        Email
                      </Label>
                      <Input type="email" placeholder="you@example.com" />
                    </div>
                    <Button
                      onClick={() => {
                        setProcessing(true);
                        setTimeout(() => {
                          setProcessing(false);
                          setStep("success");
                        }, 1500);
                      }}
                      disabled={processing}
                      className="w-full gradient-primary text-white gap-2"
                    >
                      {processing ? (
                        <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <Zap className="h-4 w-4" /> Mulai Gratis
                        </>
                      )}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">
                        Nama di Kartu
                      </Label>
                      <Input
                        placeholder="John Doe"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">
                        Nomor Kartu
                      </Label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={form.number}
                          onChange={(e) =>
                            setForm({ ...form, number: e.target.value })
                          }
                          className="pl-10 font-mono"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">
                          Bulan
                        </Label>
                        <Input
                          value={form.month}
                          onChange={(e) =>
                            setForm({ ...form, month: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">
                          Tahun
                        </Label>
                        <Input
                          value={form.year}
                          onChange={(e) =>
                            setForm({ ...form, year: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">
                          CVV
                        </Label>
                        <div className="relative">
                          <Input
                            value={form.cvv}
                            onChange={(e) =>
                              setForm({ ...form, cvv: e.target.value })
                            }
                          />
                          <Lock className="absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                        </div>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-sm">
                        Total
                      </span>
                      <span className="text-xl font-bold">
                        {formatPrice(tier.price)}
                        <span className="text-sm font-normal text-muted-foreground">
                          {tier.period}
                        </span>
                      </span>
                    </div>

                    <Button
                      onClick={handlePurchase}
                      disabled={processing}
                      className="w-full gradient-primary text-white gap-2"
                    >
                      {processing ? (
                        <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <Lock className="h-4 w-4" /> Beli Lisensi
                        </>
                      )}
                    </Button>

                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                      <Shield className="h-3.5 w-3.5" /> Enkripsi & keamanan
                      terjamin
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          /* Plan selection */
          <div>
            <Link
              href="/owtask"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Kembali ke beranda
            </Link>

            <div className="text-center mb-10">
              <Badge className="mb-3 gradient-accent text-white border-0 gap-1">
                <Sparkles className="h-3 w-3" /> LICENSE
              </Badge>
              <h1 className="text-4xl font-bold mb-3">Pilih Paket Lisensi</h1>
              <p className="text-muted-foreground text-lg max-w-lg mx-auto">
                Beli lisensi untuk menjadi host. Anggota tim bergabung secara
                gratis.
              </p>
            </div>

            {/* Tier cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
              {visibleTiers.map((t, i) => {
                const isSelected = selectedTier === i;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card
                      className={cn(
                        "cursor-pointer transition-all duration-300 border-0 glass-card h-full",
                        isSelected
                          ? t.popular
                            ? "ring-2 ring-violet-400 shadow-xl shadow-violet-500/10"
                            : "ring-2 ring-amber-400 shadow-xl shadow-amber-500/10"
                          : "hover:shadow-lg hover:-translate-y-0.5",
                      )}
                      onClick={() => setSelectedTier(i)}
                    >
                      <CardContent className="p-5 flex flex-col h-full">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div
                              className={cn(
                                "flex h-9 w-9 items-center justify-center rounded-xl",
                                t.popular
                                  ? "gradient-primary text-white"
                                  : "bg-amber-50 text-amber-600",
                              )}
                            >
                              <t.icon className="h-4 w-4" />
                            </div>
                            <div>
                              <div className="font-bold text-sm">{t.label}</div>
                              {t.badge && (
                                <Badge
                                  className={cn(
                                    "text-[8px] px-1.5 py-0 h-4 border-0",
                                    t.popular
                                      ? "gradient-primary text-white"
                                      : t.badge === "ENTERPRISE"
                                        ? "bg-indigo-100 text-indigo-700"
                                        : "bg-amber-100 text-amber-700",
                                  )}
                                >
                                  {t.badge}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="mb-1">
                          <span className="text-2xl font-bold">
                            {t.price === 0 ? "Gratis" : formatPrice(t.price)}
                          </span>
                          {t.price > 0 && (
                            <span className="text-xs text-muted-foreground">
                              {t.period}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mb-4">
                          {t.desc}
                        </p>

                        <div className="flex items-center gap-1.5 mb-4 p-2 rounded-lg bg-violet-500/5 border border-violet-500/10">
                          <Users className="h-3.5 w-3.5 text-violet-500" />
                          <span className="text-xs font-semibold text-violet-600">
                            Hingga {t.members.toLocaleString("id-ID")} anggota
                          </span>
                        </div>

                        <ul className="space-y-1.5 mb-4 flex-1">
                          {features.slice(0, 5).map((f, fi) => (
                            <li
                              key={fi}
                              className="flex items-center gap-1.5 text-xs"
                            >
                              <Check className="h-3 w-3 text-emerald-500 shrink-0" />
                              <span className="text-muted-foreground">{f}</span>
                            </li>
                          ))}
                          {t.price > 500000 && (
                            <li className="flex items-center gap-1.5 text-xs">
                              <Check className="h-3 w-3 text-emerald-500 shrink-0" />
                              <span className="text-muted-foreground">
                                Semua {features.length} fitur
                              </span>
                            </li>
                          )}
                        </ul>

                        <Button
                          className={cn(
                            "w-full text-xs h-9",
                            t.popular
                              ? "gradient-primary text-white"
                              : isSelected
                                ? "bg-amber-500 hover:bg-amber-600 text-white"
                                : "bg-accent",
                          )}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTier(i);
                            setStep("payment");
                          }}
                        >
                          {t.price === 0 ? "Mulai Gratis" : "Pilih Paket"}{" "}
                          <ArrowRight className="h-3 w-3 ml-1" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {!showAllTiers && (
              <div className="text-center mb-8">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAllTiers(true)}
                  className="gap-1.5 text-xs text-muted-foreground hover:text-foreground"
                >
                  <ChevronDown className="h-3.5 w-3.5" /> Lihat semua paket (
                  {tiers.length} paket tersedia)
                </Button>
              </div>
            )}

            {/* Pricing calculator */}
            {selectedTier > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="glass-card border-white/6">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-sm mb-1">
                          Ringkasan Pilihan
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          Paket{" "}
                          <span className="font-semibold text-foreground">
                            {tier.label}
                          </span>{" "}
                          — hingga{" "}
                          <span className="font-semibold text-violet-600">
                            {tier.members.toLocaleString("id-ID")} anggota
                          </span>{" "}
                          —{" "}
                          <span className="font-semibold">
                            {formatPrice(tier.price)}
                            {tier.period}
                          </span>
                        </p>
                      </div>
                      <Button
                        onClick={() => setStep("payment")}
                        className="gradient-primary text-white gap-2"
                      >
                        Beli Sekarang <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                    {nextTier && (
                      <div className="mt-3 p-3 rounded-lg bg-violet-500/5 border border-violet-500/10 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          Butuh lebih dari{" "}
                          {tier.members.toLocaleString("id-ID")} anggota?
                        </span>
                        <button
                          onClick={() =>
                            setSelectedTier(tiers.indexOf(nextTier))
                          }
                          className="text-xs font-semibold text-violet-600 hover:text-violet-700 flex items-center gap-1 transition-colors"
                        >
                          Upgrade ke {nextTier.label}{" "}
                          <ArrowUpRight className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Feature comparison */}
            <div className="mt-10 text-center">
              <h3 className="text-sm font-bold text-muted-foreground mb-2">
                Semua paket termasuk
              </h3>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                {features.map((f, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground"
                  >
                    <Check className="h-3 w-3 text-emerald-500" /> {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

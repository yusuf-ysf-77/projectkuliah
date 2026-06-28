"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Phone,
  Building,
  MapPin,
  ArrowRight,
  ArrowLeft,
  Crown,
  Briefcase,
  Key,
  Plus,
  CheckCircle2,
  AlertCircle,
  Leaf,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { GradientOrbs } from "@/components/owtask/shared/animated-bg";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

type Step = 1 | 2;

export default function OnboardingPage() {
  const router = useRouter();
  const {
    currentUser,
    setCurrentUser,
    updateUser,
    joinCompany,
  } = useStore();
  const [step, setStep] = useState<Step>(1);
  const [error, setError] = useState("");

  const [personal, setPersonal] = useState({
    name: currentUser.name || "",
    phone: currentUser.phone || "",
    location: "Jakarta, Indonesia",
  });

  const [companyAction, setCompanyAction] = useState<"create" | "join" | "">(
    "",
  );
  const [inviteCode, setInviteCode] = useState("");
  const [joinedCompany, setJoinedCompany] = useState<string | null>(null);

  const isLeader = currentUser.role === "leader";

  const handlePersonalNext = () => {
    if (!personal.name.trim()) {
      setError("Nama wajib diisi");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleJoinCompany = () => {
    if (!inviteCode.trim()) {
      setError("Kode undangan wajib diisi");
      return;
    }
    const company = joinCompany(inviteCode, currentUser.id);
    if (!company) {
      setError("Kode undangan tidak valid. Pastikan kode sudah benar.");
      return;
    }
    updateUser(currentUser.id, {
      name: personal.name,
      phone: personal.phone,
      companyId: company.id,
      isNew: false,
    });
    setCurrentUser({
      ...currentUser,
      name: personal.name,
      phone: personal.phone,
      companyId: company.id,
      isNew: false,
    });
    setJoinedCompany(company.name);
    setTimeout(() => router.push("/owtask/dashboard"), 2000);
  };

  return (
    <div className="min-h-screen flex gradient-hero relative overflow-hidden">
      <GradientOrbs />
      <div className="absolute inset-0 dot-pattern opacity-20" />

      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center">
        <div className="absolute inset-0 bg-linear-to-br from-[#12122a]/95 to-[#0c0c1d]/95" />
        <div className="relative z-10 text-white px-12 max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/owtask"
              className="inline-flex items-center gap-2.5 mb-10"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl gradient-primary shadow-lg shadow-violet-500/20">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">owTask</span>
            </Link>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold mb-4 leading-tight"
          >
            {step === 1 ? (
              <>
                Isi data diri{" "}
                <span className="text-violet-400">terlebih dahulu</span>
              </>
            ) : (
              <>
                {isLeader ? "Siapkan" : "Gabung ke"}{" "}
                <span className="text-violet-400">perusahaan</span>
              </>
            )}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-white/40 text-lg mb-10 leading-relaxed"
          >
            {step === 1
              ? "Lengkapi informasi pribadi kamu agar tim bisa mengenali profil kamu."
              : isLeader
                ? "Buat perusahaan baru untuk mulai mengelola tim kamu, atau gabung ke perusahaan yang sudah ada."
                : "Masukkan kode undangan dari leader perusahaan kamu untuk bergabung."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-4 rounded-2xl bg-white/3 border border-white/6"
          >
            <div className="flex items-center gap-2 mb-3">
              {isLeader ? (
                <Crown className="h-4 w-4 text-violet-400" />
              ) : (
                <Briefcase className="h-4 w-4 text-pink-400" />
              )}
              <span className="text-xs font-semibold text-white/60">
                {isLeader ? "Leader" : "Worker"}
              </span>
            </div>
            <p className="text-xs text-white/30 leading-relaxed">
              {isLeader
                ? "Sebagai leader, kamu bisa membuat perusahaan baru dan mengundang anggota tim untuk bergabung."
                : "Sebagai worker, kamu akan bergabung dengan perusahaan yang sudah ada menggunakan kode undangan."}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right side - form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="text-center mb-6 lg:hidden">
            <Link
              href="/owtask"
              className="inline-flex items-center gap-2 mb-4"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary shadow-lg shadow-violet-500/20">
                <Leaf className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">owTask</span>
            </Link>
          </div>

          {/* Mobile heading */}
          <div className="text-center mb-6 lg:hidden">
            <h1 className="text-xl font-bold text-white">Selamat Datang!</h1>
            <p className="text-white/40 text-sm mt-1">
              Lengkapi data kamu untuk memulai
            </p>
          </div>

          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-8 px-6">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold shrink-0 transition-all duration-300",
                    step >= s
                      ? "gradient-primary text-white shadow-lg shadow-violet-500/20"
                      : "bg-white/6 text-white/30",
                  )}
                >
                  {step > s ? <CheckCircle2 className="h-4 w-4" /> : s}
                </div>
                <div className="flex-1 min-w-0">
                  <div
                    className={cn(
                      "text-[11px] font-medium transition-colors",
                      step >= s ? "text-white" : "text-white/30",
                    )}
                  >
                    {s === 1
                      ? "Data Pribadi"
                      : isLeader
                        ? "Perusahaan"
                        : "Gabung"}
                  </div>
                </div>
                {s < 2 && (
                  <div
                    className={cn(
                      "h-0.5 flex-1 rounded-full transition-colors duration-300",
                      step > s ? "bg-violet-500" : "bg-white/6",
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Main card */}
          <Card className="glass-strong border-white/6 shadow-xl shadow-black/20 overflow-hidden">
            <CardContent className="p-6">
              <AnimatePresence mode="wait">
                {joinedCompany ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                      className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 mx-auto mb-5"
                    >
                      <CheckCircle2 className="h-10 w-10 text-emerald-400" />
                    </motion.div>
                    <h3 className="text-xl font-bold mb-2 text-white">
                      Berhasil Bergabung!
                    </h3>
                    <p className="text-white/40 mb-1">Kamu bergabung dengan</p>
                    <p className="text-violet-400 font-semibold text-lg">
                      {joinedCompany}
                    </p>
                    <p className="text-white/30 text-sm mt-4">
                      Mengarahkan ke dashboard...
                    </p>
                    <div className="flex justify-center mt-3">
                      <div className="h-1 w-24 rounded-full bg-white/10 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 1.5 }}
                          className="h-full bg-linear-to-r from-violet-400 to-purple-500 rounded-full"
                        />
                      </div>
                    </div>
                  </motion.div>
                ) : step === 1 ? (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <div
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-xl",
                          isLeader ? "bg-violet-500/10" : "bg-pink-500/10",
                        )}
                      >
                        {isLeader ? (
                          <Crown className="h-5 w-5 text-violet-400" />
                        ) : (
                          <Briefcase className="h-5 w-5 text-pink-400" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white">
                          Data Pribadi
                        </h3>
                        <p className="text-xs text-white/40">
                          Isi informasi dasar kamu
                        </p>
                      </div>
                    </div>

                    <AnimatePresence>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-400"
                        >
                          <AlertCircle className="h-4 w-4 shrink-0" /> {error}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="space-y-1.5">
                      <Label className="text-xs text-white/40 font-medium">
                        Nama Lengkap <span className="text-red-400">*</span>
                      </Label>
                      <div className="relative group">
                        <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30 group-focus-within:text-violet-400 transition-colors" />
                        <Input
                          placeholder="Masukkan nama lengkap"
                          value={personal.name}
                          onChange={(e) =>
                            setPersonal({ ...personal, name: e.target.value })
                          }
                          className="pl-10 h-11 bg-white/5 border-white/8 text-white placeholder:text-white/20 focus:border-violet-500/50 focus:ring-violet-500/20"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs text-white/40 font-medium">
                        No. Telepon
                      </Label>
                      <div className="relative group">
                        <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30 group-focus-within:text-violet-400 transition-colors" />
                        <Input
                          placeholder="08xxxxxxxxxx"
                          value={personal.phone}
                          onChange={(e) =>
                            setPersonal({ ...personal, phone: e.target.value })
                          }
                          className="pl-10 h-11 bg-white/5 border-white/8 text-white placeholder:text-white/20 focus:border-violet-500/50 focus:ring-violet-500/20"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs text-white/40 font-medium">
                        Lokasi
                      </Label>
                      <div className="relative group">
                        <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30 group-focus-within:text-violet-400 transition-colors" />
                        <Input
                          placeholder="Kota, Negara"
                          value={personal.location}
                          onChange={(e) =>
                            setPersonal({
                              ...personal,
                              location: e.target.value,
                            })
                          }
                          className="pl-10 h-11 bg-white/5 border-white/8 text-white placeholder:text-white/20 focus:border-violet-500/50 focus:ring-violet-500/20"
                        />
                      </div>
                    </div>

                    <Button
                      onClick={handlePersonalNext}
                      className="w-full h-11 gradient-primary text-white gap-2 mt-2"
                    >
                      Lanjutkan <ArrowRight className="h-4 w-4" />
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-4"
                  >
                    <AnimatePresence>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-400"
                        >
                          <AlertCircle className="h-4 w-4 shrink-0" /> {error}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {isLeader ? (
                      <>
                        <div className="flex items-center gap-3 mb-5">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10">
                            <Building className="h-5 w-5 text-violet-400" />
                          </div>
                          <div>
                            <h3 className="text-sm font-bold text-white">
                              Setup Perusahaan
                            </h3>
                            <p className="text-xs text-white/40">
                              Buat baru atau gabung yang sudah ada
                            </p>
                          </div>
                        </div>

                        {!companyAction && (
                          <div className="grid grid-cols-2 gap-3">
                            <Card
                              onClick={() => setCompanyAction("create")}
                              className="cursor-pointer glass-card border-white/6 hover:border-violet-500/50 transition-all group"
                            >
                              <CardContent className="p-5 text-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 mx-auto mb-3 group-hover:scale-110 transition-transform">
                                  <Plus className="h-6 w-6 text-violet-400" />
                                </div>
                                <h4 className="text-sm font-bold text-white mb-1">
                                  Buat Baru
                                </h4>
                                <p className="text-[11px] text-white/30">
                                  Buat akun perusahaan baru
                                </p>
                              </CardContent>
                            </Card>
                            <Card
                              onClick={() => setCompanyAction("join")}
                              className="cursor-pointer glass-card border-white/6 hover:border-pink-500/50 transition-all group"
                            >
                              <CardContent className="p-5 text-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-500/10 mx-auto mb-3 group-hover:scale-110 transition-transform">
                                  <Key className="h-6 w-6 text-pink-400" />
                                </div>
                                <h4 className="text-sm font-bold text-white mb-1">
                                  Gabung
                                </h4>
                                <p className="text-[11px] text-white/30">
                                  Masukkan kode undangan
                                </p>
                              </CardContent>
                            </Card>
                          </div>
                        )}

                        {companyAction === "create" && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-4"
                          >
                            <button
                              onClick={() => {
                                setCompanyAction("");
                                setError("");
                              }}
                              className="flex items-center gap-1 text-xs text-white/30 hover:text-white/60 transition-colors"
                            >
                              <ArrowLeft className="h-3 w-3" /> Kembali
                            </button>

                            <div className="rounded-xl bg-violet-500/10 border border-violet-500/20 p-4">
                              <div className="flex items-start gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15 shrink-0">
                                  <CreditCard className="h-5 w-5 text-violet-400" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm text-white font-semibold mb-1">
                                    Beli Lisensi Terlebih Dahulu
                                  </p>
                                  <p className="text-xs text-white/40 leading-relaxed">
                                    Untuk membuat perusahaan baru, kamu perlu
                                    membeli lisensi owTask. Lisensi memberikan
                                    akses penuh ke fitur manajemen tim.
                                  </p>
                                </div>
                              </div>
                            </div>

                            <Link href="/owtask/purchase" className="block">
                              <Button className="w-full h-11 gradient-primary text-white gap-2">
                                <CreditCard className="h-4 w-4" /> Beli Lisensi
                              </Button>
                            </Link>
                          </motion.div>
                        )}

                        {companyAction === "join" && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-4"
                          >
                            <button
                              onClick={() => {
                                setCompanyAction("");
                                setError("");
                              }}
                              className="flex items-center gap-1 text-xs text-white/30 hover:text-white/60 transition-colors"
                            >
                              <ArrowLeft className="h-3 w-3" /> Kembali
                            </button>
                            <div className="space-y-1.5">
                              <Label className="text-xs text-white/40 font-medium">
                                Kode Undangan Leader
                              </Label>
                              <div className="relative group">
                                <Key className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30 group-focus-within:text-violet-400 transition-colors" />
                                <Input
                                  placeholder="LEAD-XXXXXXXX"
                                  value={inviteCode}
                                  onChange={(e) =>
                                    setInviteCode(e.target.value.toUpperCase())
                                  }
                                  className="pl-10 h-11 bg-white/5 border-white/8 text-white placeholder:text-white/20 font-mono focus:border-violet-500/50 focus:ring-violet-500/20"
                                />
                              </div>
                            </div>
                            <Button
                              onClick={handleJoinCompany}
                              className="w-full h-11 gradient-primary text-white gap-2"
                              disabled={!inviteCode.trim()}
                            >
                              <ArrowRight className="h-4 w-4" /> Gabung
                            </Button>
                          </motion.div>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-3 mb-5">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-500/10">
                            <Key className="h-5 w-5 text-pink-400" />
                          </div>
                          <div>
                            <h3 className="text-sm font-bold text-white">
                              Gabung Perusahaan
                            </h3>
                            <p className="text-xs text-white/40">
                              Masukkan kode undangan dari leader
                            </p>
                          </div>
                        </div>

                        <div className="rounded-xl bg-violet-500/10 border border-violet-500/20 p-4">
                          <div className="flex items-start gap-3">
                            <Crown className="h-5 w-5 text-violet-400 shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm text-white/70 font-medium">
                                Butuh kode undangan?
                              </p>
                              <p className="text-xs text-white/40 mt-1">
                                Minta kode dari leader perusahaan kamu. Mereka
                                akan memberikan kode yang berformat{" "}
                                <span className="font-mono text-violet-400 bg-violet-500/10 px-1.5 py-0.5 rounded">
                                  WORK-XXXXXXXX
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <Label className="text-xs text-white/40 font-medium">
                            Kode Undangan Worker{" "}
                            <span className="text-red-400">*</span>
                          </Label>
                          <div className="relative group">
                            <Key className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30 group-focus-within:text-pink-400 transition-colors" />
                            <Input
                              placeholder="WORK-XXXXXXXX"
                              value={inviteCode}
                              onChange={(e) =>
                                setInviteCode(e.target.value.toUpperCase())
                              }
                              className="pl-10 h-11 bg-white/5 border-white/8 text-white placeholder:text-white/20 font-mono focus:border-pink-500/50 focus:ring-pink-500/20"
                            />
                          </div>
                        </div>

                        <Button
                          onClick={handleJoinCompany}
                          className="w-full h-11 gradient-primary text-white gap-2"
                          disabled={!inviteCode.trim()}
                        >
                          <ArrowRight className="h-4 w-4" /> Gabung Perusahaan
                        </Button>
                      </>
                    )}

                    <button
                      onClick={() => {
                        setStep(1);
                        setError("");
                        setCompanyAction("");
                      }}
                      className="w-full flex items-center justify-center gap-1 text-xs text-white/25 hover:text-white/50 transition-colors pt-1"
                    >
                      <ArrowLeft className="h-3 w-3" /> Kembali ke Data Pribadi
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

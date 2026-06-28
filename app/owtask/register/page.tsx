"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  UserPlus,
  CheckCircle2,
  Leaf,
  CheckSquare,
  MessageCircle,
  Calendar,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { GradientOrbs } from "@/components/owtask/shared/animated-bg";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name.trim()) {
      setError("Nama wajib diisi");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Password tidak cocok");
      return;
    }
    if (form.password.length < 6) {
      setError("Password minimal 6 karakter");
      return;
    }
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSuccess(true);
    setTimeout(() => router.push("/owtask/login"), 2000);
  };

  return (
    <div className="min-h-screen flex gradient-hero relative overflow-hidden">
      <GradientOrbs />
      <div className="absolute inset-0 dot-pattern opacity-20" />

      {/* Left panel */}
      <div className="hidden lg:flex lg:w-[45%] relative items-center justify-center">
        <div className="absolute inset-0 bg-linear-to-br from-[#12122a]/95 to-[#0c0c1d]/95" />
        <div className="relative z-10 text-white px-12 max-w-md">
          <Link
            href="/owtask"
            className="inline-flex items-center gap-2.5 mb-10"
          >
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
            Mulai berkolaborasi{" "}
            <span className="text-violet-400">bersama tim</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white/40 text-lg mb-10 leading-relaxed"
          >
            Buat akun baru dan mulai mengelola proyekmu dengan owTask.
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

      {/* Right panel - form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="text-center mb-8 lg:hidden">
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

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Buat Akun</h1>
            <p className="text-white/40 text-sm">
              Isi data diri kamu untuk memulai
            </p>
          </div>

          <Card className="glass-card border-white/6 shadow-xl shadow-black/20">
            <CardContent className="p-6">
              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
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
                      Registrasi Berhasil!
                    </h3>
                    <p className="text-white/40 mb-4">Akun kamu sudah dibuat</p>
                    <p className="text-white/30 text-sm">
                      Mengarahkan ke halaman masuk...
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
                ) : (
                  <form
                    key="form"
                    onSubmit={handleSubmit}
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
                          {error}
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
                          value={form.name}
                          onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                          }
                          className="pl-10 h-11 bg-white/5 border-white/8 text-white placeholder:text-white/20 focus:border-violet-500/50 focus:ring-violet-500/20"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs text-white/40 font-medium">
                        Email <span className="text-red-400">*</span>
                      </Label>
                      <div className="relative group">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30 group-focus-within:text-violet-400 transition-colors" />
                        <Input
                          type="email"
                          placeholder="name@example.com"
                          value={form.email}
                          onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                          }
                          className="pl-10 h-11 bg-white/5 border-white/8 text-white placeholder:text-white/20 focus:border-violet-500/50 focus:ring-violet-500/20"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs text-white/40 font-medium">
                        Password <span className="text-red-400">*</span>
                      </Label>
                      <div className="relative group">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30 group-focus-within:text-violet-400 transition-colors" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Minimal 6 karakter"
                          value={form.password}
                          onChange={(e) =>
                            setForm({ ...form, password: e.target.value })
                          }
                          className="pl-10 pr-10 h-11 bg-white/5 border-white/8 text-white placeholder:text-white/20 focus:border-violet-500/50 focus:ring-violet-500/20"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs text-white/40 font-medium">
                        Konfirmasi Password{" "}
                        <span className="text-red-400">*</span>
                      </Label>
                      <div className="relative group">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30 group-focus-within:text-violet-400 transition-colors" />
                        <Input
                          type="password"
                          placeholder="Ulangi password"
                          value={form.confirm}
                          onChange={(e) =>
                            setForm({ ...form, confirm: e.target.value })
                          }
                          className="pl-10 h-11 bg-white/5 border-white/8 text-white placeholder:text-white/20 focus:border-violet-500/50 focus:ring-violet-500/20"
                          required
                        />
                      </div>
                    </div>

                    <div className="pt-1">
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-11 gradient-primary text-white shadow-lg shadow-violet-500/20 gap-2 font-semibold"
                      >
                        {isLoading ? (
                          <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            <UserPlus className="h-4 w-4" /> Buat Akun
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>

          <p className="mt-6 text-center text-sm text-white/40">
            Sudah punya akun?{" "}
            <Link
              href="/owtask/login"
              className="text-violet-400 hover:text-violet-300 font-medium transition-colors"
            >
              Masuk
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

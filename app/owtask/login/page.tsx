"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  Leaf,
  Sparkles,
  CheckSquare,
  MessageCircle,
  Calendar,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useStore } from "@/lib/store";
import { GradientOrbs } from "@/components/owtask/shared/animated-bg";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { users, setCurrentUser } = useStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const user = users.find((u) => u.email === email);
    if (!user) {
      setError("Email tidak ditemukan");
      setIsLoading(false);
      return;
    }
    if (password !== "password") {
      setError("Password salah");
      setIsLoading(false);
      return;
    }
    setCurrentUser(user);
    if (user.isNew || !user.companyId) {
      router.push("/owtask/select-role");
    } else {
      router.push("/owtask/dashboard");
    }
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
            Kelola tim dengan{" "}
            <span className="text-violet-400">lebih efisien</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white/40 text-lg mb-10 leading-relaxed"
          >
            Kerjakan tugas, berkolaborasi dengan rekan, dan capai lebih banyak
            bersama.
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-10 flex items-center gap-4"
          >
            <div className="flex -space-x-3">
              {["AP", "SD", "BS", "MP"].map((initials, i) => (
                <div
                  key={i}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white text-[10px] font-medium border-2 border-[#12122a]"
                >
                  {initials}
                </div>
              ))}
            </div>
            <div className="text-xs">
              <div className="font-medium text-white/70">2,000+ tim</div>
              <div className="text-white/30">sudah menggunakan owTask</div>
            </div>
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
            <h1 className="text-3xl font-bold text-white mb-2">Masuk</h1>
            <p className="text-white/40 text-sm">
              Selamat datang kembali! Masukkan akun kamu.
            </p>
          </div>

          <Card className="glass-card border-white/6 shadow-xl shadow-black/20">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
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
                    Email
                  </Label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30 group-focus-within:text-violet-400 transition-colors" />
                    <Input
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-11 bg-white/5 border-white/8 text-white placeholder:text-white/20 focus:border-violet-500/50 focus:ring-violet-500/20"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs text-white/40 font-medium">
                    Password
                  </Label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30 group-focus-within:text-violet-400 transition-colors" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Masukkan password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="h-3.5 w-3.5 rounded border-white/20 bg-white/5 accent-violet-500"
                    />
                    <span className="text-xs text-white/40">Ingat saya</span>
                  </label>
                  <button
                    type="button"
                    className="text-xs text-violet-400 hover:text-violet-300 transition-colors"
                  >
                    Lupa password?
                  </button>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 gradient-primary text-white shadow-lg shadow-violet-500/20 gap-2 font-semibold"
                >
                  {isLoading ? (
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <LogIn className="h-4 w-4" /> Masuk
                    </>
                  )}
                </Button>
              </form>

              <div className="relative my-5">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/6" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-[#16162a] px-3 text-white/30">
                    atau masuk dengan
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 h-11 glass-card border-white/6 text-white/60 gap-2 hover:bg-white/5"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 h-11 glass-card border-white/6 text-white/60 gap-2 hover:bg-white/5"
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
                  </svg>
                  Microsoft
                </Button>
              </div>
            </CardContent>
          </Card>

          <p className="mt-6 text-center text-sm text-white/40">
            Belum punya akun?{" "}
            <Link
              href="/owtask/register"
              className="text-violet-400 hover:text-violet-300 font-medium transition-colors"
            >
              Daftar sekarang
            </Link>
          </p>

          {/* Demo accounts */}
          <div className="mt-4 rounded-xl bg-white/2 border border-white/6 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-3.5 w-3.5 text-violet-400" />
              <span className="text-xs font-semibold text-white/50">
                Akun Demo
              </span>
            </div>
            <div className="grid gap-2">
              {[
                {
                  label: "Leader",
                  email: "andi@owtask.com",
                  tag: "langsung masuk",
                  tagColor: "text-emerald-400",
                },
                {
                  label: "Worker",
                  email: "budi@owtask.com",
                  tag: "langsung masuk",
                  tagColor: "text-emerald-400",
                },
                {
                  label: "Baru",
                  email: "rina@owtask.com",
                  tag: "perlu isi data",
                  tagColor: "text-amber-400",
                },
              ].map((account) => (
                <button
                  key={account.email}
                  onClick={() => {
                    setEmail(account.email);
                    setPassword("password");
                  }}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-white/3 border border-white/4 hover:border-white/10 hover:bg-white/5 transition-all text-left group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-semibold text-white/60 w-12">
                      {account.label}
                    </span>
                    <span className="text-[11px] font-mono text-white/30 group-hover:text-white/50 transition-colors">
                      {account.email}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] ${account.tagColor} opacity-60`}
                  >
                    {account.tag}
                  </span>
                </button>
              ))}
              <p className="text-[10px] text-white/20 text-center pt-1">
                Password: <span className="font-mono">password</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

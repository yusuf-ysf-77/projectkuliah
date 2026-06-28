"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Crown,
  Check,
  Copy,
  Users,
  Shield,
  Zap,
  Clock,
  CreditCard,
  Lock,
  Share2,
  UserPlus,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useStore } from "@/lib/store";

type BillingCycle = "weekly" | "monthly" | "yearly";

const plans: Record<
  BillingCycle,
  {
    price: string;
    period: string;
    perMonth?: string;
    savings?: string;
    features: string[];
  }
> = {
  weekly: {
    price: "$4.99",
    period: "/week",
    features: [
      "Up to 10 team members",
      "Unlimited tasks",
      "Chat & collaboration",
      "Calendar & reminders",
      "1 GB storage",
      "Email support",
    ],
  },
  monthly: {
    price: "$14.99",
    period: "/month",
    perMonth: "$14.99/month",
    savings: "Save 40% vs weekly",
    features: [
      "Up to 25 team members",
      "Unlimited tasks",
      "Chat with file sharing",
      "Calendar + reminders",
      "Notes & documentation",
      "5 GB storage",
      "Priority support",
      "Custom workflows",
    ],
  },
  yearly: {
    price: "$119.99",
    period: "/year",
    perMonth: "$9.99/month",
    savings: "Save 67% vs weekly",
    features: [
      "Up to 100 team members",
      "Unlimited everything",
      "Advanced analytics",
      "Custom integrations",
      "API access",
      "50 GB storage",
      "24/7 dedicated support",
      "White-label options",
      "SSO & security",
    ],
  },
};

export default function PaymentPage() {
  const { currentUser } = useStore();
  const [billing, setBilling] = useState<BillingCycle>("monthly");
  const [step, setStep] = useState<"plan" | "payment" | "success">("plan");
  const [processing, setProcessing] = useState(false);
  const [form, setForm] = useState({
    name: currentUser.name,
    number: "4444 5555 7777 9999",
    month: "08",
    year: "2030",
    cvv: "473",
  });
  const [inviteLink, setInviteLink] = useState("");

  const selectedPlan = plans[billing];

  const handlePurchase = () => {
    setProcessing(true);
    setTimeout(() => {
      const link = `https://owtask.app/join/${Math.random().toString(36).slice(2, 10)}`;
      setInviteLink(link);
      setProcessing(false);
      setStep("success");
    }, 2500);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(inviteLink);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl gradient-primary p-6 text-white">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-1/3 w-32 h-32 bg-white/5 rounded-full translate-y-1/2" />
        <div className="relative z-10">
          <h1 className="text-2xl font-bold">Subscription & License</h1>
          <p className="text-emerald-100">
            Purchase a license and invite your team to join for free
          </p>
        </div>
      </div>

      {step === "success" ? (
        /* Success + Invite */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto space-y-6"
        >
          <Card className="border-0 shadow-xl glass-card overflow-hidden">
            <div className="gradient-primary p-8 text-center text-white">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4"
              >
                <Crown className="h-8 w-8" />
              </motion.div>
              <h2 className="text-2xl font-bold mb-2">You&apos;re the Host!</h2>
              <p className="text-emerald-100">
                Your {billing} license is active. Share the link below to invite
                your team.
              </p>
            </div>

            <CardContent className="p-6 space-y-6">
              {/* Invite link */}
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Invite Link
                </Label>
                <div className="flex gap-2">
                  <Input
                    value={inviteLink}
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button
                    onClick={copyLink}
                    variant="outline"
                    className="gap-2 shrink-0"
                  >
                    <Copy className="h-4 w-4" /> Copy
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Anyone with this link can join your workspace for free. You
                  approve each member.
                </p>
              </div>

              <Separator />

              {/* How it works */}
              <div>
                <h3 className="font-semibold mb-3">How it works</h3>
                <div className="grid gap-3">
                  {[
                    {
                      icon: Share2,
                      step: "1",
                      title: "Share the link",
                      desc: "Send the invite link to your team members",
                    },
                    {
                      icon: UserPlus,
                      step: "2",
                      title: "They join free",
                      desc: "Team members create an account at no cost",
                    },
                    {
                      icon: Shield,
                      step: "3",
                      title: "You approve",
                      desc: "Review and approve each request from your dashboard",
                    },
                    {
                      icon: Users,
                      step: "4",
                      title: "Collaborate",
                      desc: "Start working together with full access to all features",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3 rounded-xl bg-accent/50"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg gradient-primary text-white text-xs font-bold">
                        {item.step}
                      </div>
                      <div>
                        <div className="text-sm font-medium">{item.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {item.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Pending members */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">Team Members</h3>
                  <Badge className="gradient-primary text-white border-0 text-xs">
                    0 /{" "}
                    {billing === "weekly"
                      ? "10"
                      : billing === "monthly"
                        ? "25"
                        : "100"}
                  </Badge>
                </div>
                <div className="text-center py-8 text-muted-foreground text-sm">
                  <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  No members yet. Share the invite link to get started.
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ) : step === "payment" ? (
        /* Payment form */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="border-0 shadow-xl glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-bold text-lg">Payment Details</h3>
                  <p className="text-sm text-muted-foreground capitalize">
                    {billing} subscription — {selectedPlan.price}
                    {selectedPlan.period}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setStep("plan")}
                >
                  Change plan
                </Button>
              </div>

              {/* Card preview */}
              <div className="rounded-2xl bg-linear-to-br from-emerald-500 via-teal-500 to-cyan-500 p-5 text-white mb-6 shadow-lg shadow-emerald-500/20">
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
                    <div className="text-sm font-medium">{form.name}</div>
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

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">
                    Cardholder name
                  </Label>
                  <Input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">
                    Card number
                  </Label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      value={form.number}
                      onChange={(e) =>
                        setForm({ ...form, number: e.target.value })
                      }
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">
                      Month
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
                      Year
                    </Label>
                    <Input
                      value={form.year}
                      onChange={(e) =>
                        setForm({ ...form, year: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">CVV</Label>
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

                <div className="flex items-center justify-between pt-2">
                  <span className="text-muted-foreground">Total</span>
                  <span className="text-xl font-bold">
                    {selectedPlan.price}
                    <span className="text-sm font-normal text-muted-foreground">
                      {selectedPlan.period}
                    </span>
                  </span>
                </div>

                <Button
                  onClick={handlePurchase}
                  disabled={processing}
                  className="w-full h-11 gradient-primary text-white shadow-lg shadow-emerald-900/20 gap-2"
                >
                  {processing ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                  ) : (
                    <>
                      <Lock className="h-4 w-4" /> Purchase License
                    </>
                  )}
                </Button>

                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-1">
                  <Shield className="h-3.5 w-3.5" /> Encrypted & secure payment
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        /* Plan selection */
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <Badge className="mb-3 gradient-accent text-white border-0 gap-1">
              <Sparkles className="h-3 w-3" /> LICENSE
            </Badge>
            <h2 className="text-2xl font-bold mb-2">Choose your plan</h2>
            <p className="text-muted-foreground">
              One license = one host. Invite your team to join for free.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {(["weekly", "monthly", "yearly"] as BillingCycle[]).map(
              (cycle, i) => {
                const plan = plans[cycle];
                const isPopular = cycle === "monthly";
                return (
                  <motion.div
                    key={cycle}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="relative"
                  >
                    {isPopular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                        <Badge className="gradient-primary text-white border-0 text-xs px-3">
                          Most Popular
                        </Badge>
                      </div>
                    )}

                    <Card
                      className={`h-full border-0 shadow-lg cursor-pointer transition-all duration-300 hover:shadow-xl ${
                        billing === cycle
                          ? "ring-2 ring-emerald-500 shadow-emerald-500/10"
                          : "hover:-translate-y-1"
                      } ${isPopular ? "glass-card scale-[1.02]" : "glass-card"}`}
                      onClick={() => setBilling(cycle)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                              isPopular
                                ? "gradient-primary text-white"
                                : "bg-emerald-50 text-emerald-600"
                            }`}
                          >
                            {cycle === "weekly" ? (
                              <Clock className="h-5 w-5" />
                            ) : cycle === "monthly" ? (
                              <Zap className="h-5 w-5" />
                            ) : (
                              <Crown className="h-5 w-5" />
                            )}
                          </div>
                          <div>
                            <div className="font-bold capitalize">{cycle}</div>
                            {plan.perMonth && (
                              <div className="text-[10px] text-muted-foreground">
                                {plan.perMonth}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="mb-4">
                          <span className="text-3xl font-bold">
                            {plan.price}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {plan.period}
                          </span>
                        </div>

                        {plan.savings && (
                          <Badge className="mb-4 bg-emerald-50 text-emerald-700 border-0 text-xs">
                            {plan.savings}
                          </Badge>
                        )}

                        <ul className="space-y-2.5 mb-6">
                          {plan.features.map((f, fi) => (
                            <li
                              key={fi}
                              className="flex items-start gap-2 text-sm"
                            >
                              <Check className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>

                        <Button
                          className={`w-full ${
                            billing === cycle
                              ? "gradient-primary text-white shadow-lg shadow-emerald-900/20"
                              : "bg-accent hover:bg-accent/80"
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setBilling(cycle);
                            setStep("payment");
                          }}
                        >
                          {billing === cycle ? "Get Started" : "Select Plan"}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              },
            )}
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>
              One person purchases the license (becomes the host). Everyone else
              joins for free.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

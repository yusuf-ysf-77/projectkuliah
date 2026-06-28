"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Zap, Crown, Building2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/owtask/landing/navbar";

type BillingCycle = "trial" | "weekly" | "monthly" | "yearly";

const plans = [
  {
    name: "Trial",
    description: "Perfect for trying out owTask",
    icon: Zap,
    price: {
      trial: "Free",
      weekly: "$2.99",
      monthly: "$9.99",
      yearly: "$89.99",
    },
    period: {
      trial: "14 days",
      weekly: "/week",
      monthly: "/month",
      yearly: "/year",
    },
    features: [
      "Up to 5 team members",
      "3 active projects",
      "Basic task management",
      "Chat (text only)",
      "Calendar view",
      "500MB storage",
    ],
    cta: "Start Free Trial",
    popular: false,
    gradient: "from-emerald-50 to-green-50",
  },
  {
    name: "Team",
    description: "For growing teams that need more",
    icon: Crown,
    price: {
      trial: "$19",
      weekly: "$7.99",
      monthly: "$29.99",
      yearly: "$249.99",
    },
    period: {
      trial: "/month",
      weekly: "/week",
      monthly: "/month",
      yearly: "/year",
    },
    features: [
      "Up to 25 team members",
      "Unlimited projects",
      "Advanced task management",
      "Chat with file sharing",
      "Calendar + reminders",
      "Notes & documentation",
      "5GB storage",
      "Priority support",
    ],
    cta: "Get Started",
    popular: true,
    gradient: "from-emerald-600 to-teal-600",
  },
  {
    name: "Enterprise",
    description: "For large organizations",
    icon: Building2,
    price: {
      trial: "$79",
      weekly: "$19.99",
      monthly: "$79.99",
      yearly: "$699.99",
    },
    period: {
      trial: "/month",
      weekly: "/week",
      monthly: "/month",
      yearly: "/year",
    },
    features: [
      "Unlimited team members",
      "Unlimited projects",
      "Custom workflows",
      "Advanced analytics",
      "API access",
      "SSO & SAML",
      "100GB storage",
      "Dedicated support",
      "Custom integrations",
    ],
    cta: "Contact Sales",
    popular: false,
    gradient: "from-emerald-700 to-teal-700",
  },
];

const billingOptions: {
  key: BillingCycle;
  label: string;
  discount?: string;
}[] = [
  { key: "trial", label: "Free Trial" },
  { key: "weekly", label: "Weekly" },
  { key: "monthly", label: "Monthly" },
  { key: "yearly", label: "Yearly", discount: "Save 25%" },
];

export default function PricingPage() {
  const [billing, setBilling] = useState<BillingCycle>("monthly");

  return (
    <div className="min-h-screen gradient-hero bg-nature">
      <Navbar />

      <div className="pt-24 pb-16 px-6">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <Link
              href="/owtask"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Back to home
            </Link>
            <h1 className="text-4xl font-bold mb-4">
              Simple, transparent{" "}
              <span className="gradient-text-accent">pricing</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Choose the plan that fits your team. Start free, upgrade when
              you&apos;re ready.
            </p>

            <div className="flex items-center justify-center gap-2 mt-8 p-1 rounded-xl glass-strong border border-border/50 w-fit mx-auto">
              {billingOptions.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => setBilling(opt.key)}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    billing === opt.key
                      ? "gradient-primary text-white shadow-lg shadow-emerald-900/20"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {opt.label}
                  {opt.discount && (
                    <Badge className="absolute -top-2 -right-2 text-[8px] h-4 px-1 gradient-accent text-white border-0">
                      {opt.discount}
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <Badge className="gradient-primary text-white border-0 px-3 py-1 text-xs">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <Card
                  className={`h-full glass-card border-border/30 hover:shadow-xl transition-all duration-300 ${
                    plan.popular
                      ? "ring-2 ring-emerald-500/50 shadow-lg shadow-emerald-500/10"
                      : ""
                  }`}
                >
                  <CardContent className="p-6">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br ${plan.gradient} mb-4`}
                    >
                      <plan.icon className="h-6 w-6 text-white" />
                    </div>

                    <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {plan.description}
                    </p>

                    <div className="mb-6">
                      <span className="text-3xl font-bold">
                        {plan.price[billing]}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {plan.period[billing]}
                      </span>
                    </div>

                    <Button
                      className={`w-full mb-6 ${
                        plan.popular
                          ? "gradient-primary text-white shadow-lg shadow-emerald-900/20"
                          : "bg-accent/50 hover:bg-accent text-foreground"
                      }`}
                    >
                      {plan.cta}
                    </Button>

                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 text-sm"
                        >
                          <Check className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center mt-12 text-sm text-muted-foreground"
          >
            <p>
              All plans include SSL security, 99.9% uptime, and GDPR compliance.
            </p>
            <p className="mt-1">
              Need a custom plan?{" "}
              <a
                href="#"
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Contact us
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

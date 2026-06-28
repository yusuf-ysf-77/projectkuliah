"use client";

import { Navbar } from "@/components/owtask/landing/navbar";
import { Hero } from "@/components/owtask/landing/hero";
import { Features } from "@/components/owtask/landing/features";
import { Pricing } from "@/components/owtask/landing/pricing";
import { CTA } from "@/components/owtask/landing/cta";
import { Footer } from "@/components/owtask/landing/footer";

export default function OwTaskLanding() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  );
}

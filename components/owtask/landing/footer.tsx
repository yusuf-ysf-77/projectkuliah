"use client";

import Link from "next/link";
import { Leaf, Globe, MessageSquare, Share2, Mail } from "lucide-react";

const footerLinks = {
  Produk: [
    { label: "Fitur", href: "#features" },
    { label: "Harga", href: "/owtask/pricing" },
    { label: "Integrasi", href: "#" },
    { label: "Changelog", href: "#" },
  ],
  Perusahaan: [
    { label: "Tentang", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Karir", href: "#" },
    { label: "Kontak", href: "#" },
  ],
  Sumber: [
    { label: "Dokumentasi", href: "#" },
    { label: "Pusat Bantuan", href: "#" },
    { label: "Komunitas", href: "#" },
    { label: "Template", href: "#" },
  ],
  Legal: [
    { label: "Privasi", href: "#" },
    { label: "Syarat", href: "#" },
    { label: "Keamanan", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-white/6 bg-[#080818]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/owtask" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
                <Leaf className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-bold text-white">owTask</span>
            </Link>
            <p className="text-sm text-white/40 max-w-xs mb-6">
              Platform semua-dalam-suatu untuk tim modern. Kelola tugas,
              berkolaborasi, dan tingkatkan produktivitas.
            </p>
            <div className="flex gap-3">
              {[Globe, MessageSquare, Share2, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold mb-4 text-white">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/40 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-white/6 pt-8 text-center text-sm text-white/30">
          &copy; {new Date().getFullYear()} owTask. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

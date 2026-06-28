"use client";

import { useState } from "react";
import {
  Settings,
  User,
  Shield,
  Bell,
  Palette,
  Key,
  Check,
  Camera,
  Mail,
  Smartphone,
  Monitor,
  Sun,
  Download,
  Trash2,
  ChevronRight,
  CreditCard,
  Users,
  Zap,
  Eye,
  EyeOff,
  Globe,
  Copy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useStore } from "@/lib/store";

export default function LeaderSettingsPage() {
  const { currentUser, companies } = useStore();
  const [showPassword, setShowPassword] = useState(false);
  const [copiedLeader, setCopiedLeader] = useState(false);
  const [copiedWorker, setCopiedWorker] = useState(false);
  const company =
    companies.find((c) => c.id === currentUser.companyId) || companies[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-violet-600 via-purple-600 to-indigo-700 p-6 text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-white/5 rounded-full translate-y-1/2" />
        <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-white/5 rounded-full" />
        <div className="relative z-10 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm shrink-0">
            <Settings className="h-7 w-7" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              Settings
              <Badge className="bg-white/20 text-white border-0 text-[10px] rounded-lg">
                <Shield className="h-3 w-3 mr-1" /> Leader
              </Badge>
            </h1>
            <p className="text-violet-100 text-sm mt-0.5">
              Manage your account and team configuration
            </p>
          </div>
        </div>
      </div>

      {/* Profile Card */}
      <Card className="bg-[#16162a] border-white/6 rounded-2xl">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary text-white text-xl font-bold">
                {currentUser.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <button className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#16162a] border border-white/6 shadow-md hover:bg-white/5">
                <Camera className="h-3 w-3 text-white/50" />
              </button>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-white">{currentUser.name}</h3>
              <p className="text-sm text-white/40 truncate">
                {currentUser.email}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <Badge className="text-[10px] gradient-primary text-white border-0 rounded-lg flex items-center gap-1">
                  <Shield className="h-3 w-3" /> Leader
                </Badge>
                <Badge className="text-[10px] bg-white/6 text-white/50 border-0 rounded-lg">
                  {currentUser.division}
                </Badge>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="text-xs border-white/8 text-white/50 hover:text-white hover:bg-white/5 rounded-lg"
            >
              <Camera className="h-3.5 w-3.5 mr-1.5" /> Change Photo
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Account Settings */}
          <Card className="bg-[#16162a] border-white/6 rounded-2xl">
            <CardHeader className="px-6 pt-6 pb-4 border-b border-white/4">
              <CardTitle className="text-sm text-white flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-500/10 shrink-0">
                  <User className="h-4 w-4 text-violet-400" />
                </div>
                Account Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs text-white/40">Full Name</Label>
                  <Input
                    defaultValue={currentUser.name}
                    className="h-10 text-sm bg-white/4 border-white/6 text-white rounded-xl"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-white/40">Email</Label>
                  <Input
                    defaultValue={currentUser.email}
                    className="h-10 text-sm bg-white/4 border-white/6 text-white rounded-xl"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-white/40">Phone</Label>
                  <Input
                    defaultValue={currentUser.phone}
                    className="h-10 text-sm bg-white/4 border-white/6 text-white rounded-xl"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-white/40">Division</Label>
                  <Input
                    defaultValue={currentUser.division}
                    disabled
                    className="h-10 text-sm bg-white/2 border-white/4 text-white/30 rounded-xl"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  className="gradient-primary text-white gap-1.5 text-xs rounded-xl"
                  size="sm"
                >
                  <Check className="h-3.5 w-3.5" /> Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Team Management - Leader Only */}
          <Card className="bg-[#16162a] border-white/6 rounded-2xl">
            <CardHeader className="px-6 pt-6 pb-4 border-b border-white/4">
              <CardTitle className="text-sm text-white flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/10 shrink-0">
                  <Users className="h-4 w-4 text-amber-400" />
                </div>
                Undang Tim
                <Badge className="ml-auto text-[9px] bg-amber-500/15 text-amber-400 border-0 rounded-lg">
                  Leader Only
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="rounded-xl bg-violet-500/10 border border-violet-500/20 p-4">
                <p className="text-xs text-white/50 mb-3">
                  Bagikan kode undangan ini ke orang yang ingin kamu undang
                  bergabung ke perusahaan.
                </p>
              </div>

              <div className="space-y-3">
                <Label className="text-xs text-white/40 font-medium">
                  Kode Undangan Leader
                </Label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 relative group">
                    <Key className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-violet-400" />
                    <Input
                      readOnly
                      value={company?.leaderCode || "LEAD-OWTASK2024"}
                      className="pl-10 h-11 bg-white/4 border-white/6 text-white font-mono text-sm rounded-xl"
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-11 px-4 border-white/8 text-white/50 hover:text-white hover:bg-white/5 rounded-xl gap-1.5"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        company?.leaderCode || "LEAD-OWTASK2024",
                      );
                      setCopiedLeader(true);
                      setTimeout(() => setCopiedLeader(false), 2000);
                    }}
                  >
                    {copiedLeader ? (
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                    {copiedLeader ? "Copied!" : "Copy"}
                  </Button>
                </div>
                <p className="text-[10px] text-white/30">
                  Leader lain bisa gabung perusahaan kamu menggunakan kode ini
                </p>
              </div>

              <Separator className="bg-white/6" />

              <div className="space-y-3">
                <Label className="text-xs text-white/40 font-medium">
                  Kode Undangan Worker
                </Label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 relative group">
                    <Key className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-pink-400" />
                    <Input
                      readOnly
                      value={company?.workerCode || "WORK-OWTASK2024"}
                      className="pl-10 h-11 bg-white/4 border-white/6 text-white font-mono text-sm rounded-xl"
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-11 px-4 border-white/8 text-white/50 hover:text-white hover:bg-white/5 rounded-xl gap-1.5"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        company?.workerCode || "WORK-OWTASK2024",
                      );
                      setCopiedWorker(true);
                      setTimeout(() => setCopiedWorker(false), 2000);
                    }}
                  >
                    {copiedWorker ? (
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                    {copiedWorker ? "Copied!" : "Copy"}
                  </Button>
                </div>
                <p className="text-[10px] text-white/30">
                  Worker bisa gabung perusahaan kamu menggunakan kode ini
                </p>
              </div>

              <Separator className="bg-white/6" />

              <div className="space-y-3">
                <Label className="text-xs text-white/40 font-medium">
                  Cara Mengundang
                </Label>
                <div className="space-y-2">
                  {[
                    {
                      step: "1",
                      text: "Bagikan kode undangan ke orang yang ingin diundang",
                      color: "text-violet-400",
                    },
                    {
                      step: "2",
                      text: "Mereka register akun baru di owTask",
                      color: "text-blue-400",
                    },
                    {
                      step: "3",
                      text: "Saat pilih role, masukkan kode undangan yang kamu berikan",
                      color: "text-emerald-400",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/2"
                    >
                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-full bg-white/6 text-[10px] font-bold ${item.color} shrink-0`}
                      >
                        {item.step}
                      </div>
                      <span className="text-xs text-white/50">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security */}
          <Card className="bg-[#16162a] border-white/6 rounded-2xl">
            <CardHeader className="px-6 pt-6 pb-4 border-b border-white/4">
              <CardTitle className="text-sm text-white flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/10 shrink-0">
                  <Shield className="h-4 w-4 text-amber-400" />
                </div>
                Security
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-5">
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-white/80">
                  Change Password
                </h4>
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs text-white/40">
                      Current Password
                    </Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter current password"
                        className="h-10 text-sm bg-white/4 border-white/6 text-white placeholder:text-white/20 pr-10 rounded-xl"
                      />
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label className="text-xs text-white/40">
                        New Password
                      </Label>
                      <Input
                        type="password"
                        placeholder="New password"
                        className="h-10 text-sm bg-white/4 border-white/6 text-white placeholder:text-white/20 rounded-xl"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs text-white/40">
                        Confirm Password
                      </Label>
                      <Input
                        type="password"
                        placeholder="Confirm password"
                        className="h-10 text-sm bg-white/4 border-white/6 text-white placeholder:text-white/20 rounded-xl"
                      />
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 text-xs border-white/8 text-white/50 hover:text-white hover:bg-white/5 rounded-lg"
                >
                  <Key className="h-3.5 w-3.5" /> Update Password
                </Button>
              </div>

              <Separator className="bg-white/6" />

              <div className="space-y-3">
                <h4 className="text-sm font-medium text-white/80">
                  Two-Factor Authentication
                </h4>
                <div className="flex items-center justify-between p-4 rounded-xl border border-white/6">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 shrink-0">
                      <Smartphone className="h-5 w-5 text-violet-400" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-white/80">
                        Authenticator App
                      </div>
                      <div className="text-xs text-white/40">
                        Use an authenticator app for extra security
                      </div>
                    </div>
                  </div>
                  <Switch />
                </div>
              </div>

              <Separator className="bg-white/6" />

              <div className="space-y-3">
                <h4 className="text-sm font-medium text-white/80">
                  Active Sessions
                </h4>
                <div className="space-y-2">
                  {[
                    {
                      device: "Chrome on Windows",
                      location: "Jakarta, ID",
                      time: "Active now",
                      current: true,
                    },
                    {
                      device: "Safari on iPhone",
                      location: "Jakarta, ID",
                      time: "2 hours ago",
                      current: false,
                    },
                  ].map((session, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-xl border border-white/6"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Monitor className="h-4 w-4 text-white/30 shrink-0" />
                        <div className="min-w-0">
                          <div className="text-sm font-medium text-white/80 truncate">
                            {session.device}
                          </div>
                          <div className="text-xs text-white/40">
                            {session.location} &middot; {session.time}
                          </div>
                        </div>
                      </div>
                      {session.current ? (
                        <Badge className="bg-emerald-500/10 text-emerald-400 border-0 text-[10px] rounded-lg shrink-0">
                          Current
                        </Badge>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs text-red-400/70 hover:text-red-400 hover:bg-red-500/10 rounded-lg shrink-0"
                        >
                          Revoke
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="bg-[#16162a] border-white/6 rounded-2xl">
            <CardHeader className="px-6 pt-6 pb-4 border-b border-white/4">
              <CardTitle className="text-sm text-white flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-500/10 shrink-0">
                  <Bell className="h-4 w-4 text-blue-400" />
                </div>
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-5">
              <div className="space-y-3">
                <h4 className="text-[11px] font-medium text-white/30 uppercase tracking-wider">
                  Channels
                </h4>
                {[
                  {
                    label: "Push Notifications",
                    desc: "Receive push notifications on your devices",
                    icon: Bell,
                    default: true,
                  },
                  {
                    label: "Email Notifications",
                    desc: "Receive email updates for important events",
                    icon: Mail,
                    default: true,
                  },
                  {
                    label: "SMS Notifications",
                    desc: "Receive text messages for critical alerts",
                    icon: Smartphone,
                    default: false,
                  },
                ].map((pref, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-xl border border-white/6"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <pref.icon className="h-4 w-4 text-white/30 shrink-0" />
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-white/80">
                          {pref.label}
                        </div>
                        <div className="text-xs text-white/40">{pref.desc}</div>
                      </div>
                    </div>
                    <Switch defaultChecked={pref.default} />
                  </div>
                ))}
              </div>

              <Separator className="bg-white/6" />

              <div className="space-y-3">
                <h4 className="text-[11px] font-medium text-white/30 uppercase tracking-wider">
                  Events
                </h4>
                {[
                  { label: "Task submissions from workers", default: true },
                  { label: "Task status changes", default: true },
                  { label: "Chat messages", default: true },
                  { label: "Calendar reminders", default: true },
                  { label: "Deadline warnings", default: true },
                  { label: "Team member activity", default: true },
                  { label: "Weekly digest", default: false },
                ].map((pref, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-2.5"
                  >
                    <span className="text-sm text-white/60">{pref.label}</span>
                    <Switch defaultChecked={pref.default} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Appearance */}
          <Card className="bg-[#16162a] border-white/6 rounded-2xl">
            <CardHeader className="px-6 pt-6 pb-4 border-b border-white/4">
              <CardTitle className="text-sm text-white flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-pink-500/10 shrink-0">
                  <Palette className="h-4 w-4 text-pink-400" />
                </div>
                Appearance
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-5">
              <div className="space-y-3">
                <Label className="text-xs text-white/40">Theme</Label>
                <div className="flex items-center gap-3 p-4 rounded-xl border-2 border-violet-500/50 bg-violet-500/5">
                  <Sun className="h-5 w-5 text-violet-400" />
                  <span className="text-sm font-medium text-white">
                    Dark Mode
                  </span>
                  <Badge className="ml-auto bg-violet-500/10 text-violet-400 border-0 text-[10px] rounded-lg">
                    Active
                  </Badge>
                </div>
              </div>

              <Separator className="bg-white/6" />

              <div className="space-y-3">
                <Label className="text-xs text-white/40">Sidebar</Label>
                <div className="space-y-2">
                  {[
                    { label: "Compact mode", default: false },
                    { label: "Show labels", default: true },
                    { label: "Animations", default: true },
                  ].map((pref, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-2"
                    >
                      <span className="text-sm text-white/60">
                        {pref.label}
                      </span>
                      <Switch defaultChecked={pref.default} />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Sidebar Actions */}
        <div className="space-y-6">
          {/* Language & Region */}
          <Card className="bg-[#16162a] border-white/6 rounded-2xl">
            <CardHeader className="px-5 pt-5 pb-3 border-b border-white/4">
              <CardTitle className="text-sm text-white flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/10 shrink-0">
                  <Globe className="h-4 w-4 text-emerald-400" />
                </div>
                Language & Region
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-3">
              <div className="space-y-1.5">
                <Label className="text-xs text-white/40">Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger className="h-9 text-xs bg-white/4 border-white/6 text-white/60 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a30] border-white/8 rounded-xl">
                    <SelectItem value="en" className="text-white/70 rounded-lg">
                      English
                    </SelectItem>
                    <SelectItem value="id" className="text-white/70 rounded-lg">
                      Bahasa Indonesia
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-white/40">Timezone</Label>
                <Select defaultValue="wib">
                  <SelectTrigger className="h-9 text-xs bg-white/4 border-white/6 text-white/60 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a30] border-white/8 rounded-xl">
                    <SelectItem
                      value="wib"
                      className="text-white/70 rounded-lg"
                    >
                      WIB (UTC+7)
                    </SelectItem>
                    <SelectItem
                      value="wita"
                      className="text-white/70 rounded-lg"
                    >
                      WITA (UTC+8)
                    </SelectItem>
                    <SelectItem
                      value="wit"
                      className="text-white/70 rounded-lg"
                    >
                      WIT (UTC+9)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-white/40">Date Format</Label>
                <Select defaultValue="dd/mm/yyyy">
                  <SelectTrigger className="h-9 text-xs bg-white/4 border-white/6 text-white/60 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a30] border-white/8 rounded-xl">
                    <SelectItem
                      value="dd/mm/yyyy"
                      className="text-white/70 rounded-lg"
                    >
                      DD/MM/YYYY
                    </SelectItem>
                    <SelectItem
                      value="mm/dd/yyyy"
                      className="text-white/70 rounded-lg"
                    >
                      MM/DD/YYYY
                    </SelectItem>
                    <SelectItem
                      value="yyyy-mm-dd"
                      className="text-white/70 rounded-lg"
                    >
                      YYYY-MM-DD
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-[#16162a] border-white/6 rounded-2xl">
            <CardHeader className="px-5 pt-5 pb-3 border-b border-white/4">
              <CardTitle className="text-sm text-white flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/10 shrink-0">
                  <Zap className="h-4 w-4 text-amber-400" />
                </div>
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              {[
                {
                  icon: Download,
                  label: "Export Data",
                  color: "text-blue-400",
                },
                {
                  icon: Users,
                  label: "Manage Team",
                  color: "text-emerald-400",
                },
                {
                  icon: CreditCard,
                  label: "Billing",
                  color: "text-violet-400",
                },
              ].map((action, i) => (
                <button
                  key={i}
                  className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-white/3 transition-colors text-left"
                >
                  <action.icon className={`h-4 w-4 ${action.color}`} />
                  <span className="text-sm text-white/60 flex-1">
                    {action.label}
                  </span>
                  <ChevronRight className="h-3 w-3 text-white/20" />
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="bg-[#16162a] border-red-500/20 rounded-2xl">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <h4 className="text-sm font-medium text-red-400">
                    Delete Account
                  </h4>
                  <p className="text-xs text-white/40">
                    Permanently delete your account and all data
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs text-red-400 border-red-500/20 hover:bg-red-500/10 rounded-lg shrink-0"
                >
                  <Trash2 className="h-3 w-3 mr-1" /> Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

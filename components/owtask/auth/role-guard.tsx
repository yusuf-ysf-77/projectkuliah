"use client";

import { useRouter, usePathname } from "next/navigation";
import { AlertTriangle, ArrowRight, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useStore } from "@/lib/store";

export function RoleGuard({ children }: { children: React.ReactNode }) {
  const { currentUser } = useStore();
  const router = useRouter();
  const pathname = usePathname();

  const isLeaderRoute = pathname.startsWith("/owtask/dashboard/leader/");
  const isWorkerRoute = pathname.startsWith("/owtask/dashboard/worker/");

  const violatesRole =
    (currentUser.role === "leader" && isWorkerRoute) ||
    (currentUser.role === "worker" && isLeaderRoute);

  const handleRedirect = () => {
    router.replace(currentUser.role === "leader" ? "/owtask/dashboard/leader" : "/owtask/dashboard/worker");
  };

  const handleLogout = () => {
    router.replace("/owtask/select-role");
  };

  if (violatesRole) {
    return (
      <>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 mx-auto mb-4">
              <AlertTriangle className="h-8 w-8 text-red-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Akses Ditolak</h3>
            <p className="text-sm text-white/40 max-w-xs mx-auto">
              Kamu login sebagai <span className="text-white font-semibold capitalize">{currentUser.role}</span>. Halaman ini tidak bisa diakses.
            </p>
          </div>
        </div>

        <Dialog open={true} onOpenChange={() => {}}>
          <DialogContent className="max-w-sm p-0 overflow-hidden rounded-2xl bg-[#1e1e3a] border border-red-500/20 [&>button]:hidden">
            <div className="bg-red-500/10 p-5 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/15 mx-auto mb-3">
                <AlertTriangle className="h-7 w-7 text-red-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Role Salah</h3>
              <p className="text-sm text-white/50 mt-1">
                Kamu login sebagai <span className="text-white font-semibold capitalize">{currentUser.role}</span>.
              </p>
            </div>
            <div className="p-5 space-y-3">
              <p className="text-xs text-white/40 text-center">
                Reset akun untuk ganti role.
              </p>
              <Button onClick={handleRedirect} className="w-full gradient-primary text-white gap-2 rounded-xl h-11">
                ke Dashboard {currentUser.role === "leader" ? "Leader" : "Worker"} <ArrowRight className="h-4 w-4" />
              </Button>
              <Button onClick={handleLogout} variant="outline" className="w-full border-white/8 text-white/50 hover:text-white hover:bg-white/4 gap-2 rounded-xl h-11">
                <LogOut className="h-4 w-4" /> Reset Akun
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return <>{children}</>;
}

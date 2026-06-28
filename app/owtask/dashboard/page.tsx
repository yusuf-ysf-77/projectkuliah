"use client";

import { useStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { currentUser } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (currentUser.role === "leader") {
      router.replace("/owtask/dashboard/leader");
    } else {
      router.replace("/owtask/dashboard/worker");
    }
  }, [currentUser.role, router]);

  return (
    <div className="flex items-center justify-center h-[60vh]">
      <div className="animate-pulse text-muted-foreground">
        Loading dashboard...
      </div>
    </div>
  );
}

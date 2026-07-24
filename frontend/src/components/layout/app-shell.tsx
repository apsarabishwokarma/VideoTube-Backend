"use client";

import { useState, type ReactNode } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import type { User, UserSummary } from "@/types";

export function AppShell({
  subscriptions,
  currentUser,
  children,
}: {
  subscriptions: UserSummary[];
  currentUser?: User;
  children: ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} subscriptions={subscriptions} />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Header currentUser={currentUser} />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

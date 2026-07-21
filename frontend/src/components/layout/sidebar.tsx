"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clapperboard, Compass, Flame, History, Library, PanelLeft, Users2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { UserSummary } from "@/types";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: Compass },
  { href: "/trending", label: "Trending", icon: Flame },
  { href: "/subscriptions", label: "Subscriptions", icon: Users2 },
  { href: "/library", label: "Library", icon: Library },
  { href: "/history", label: "History", icon: History },
];

export function Sidebar({
  collapsed,
  onToggle,
  subscriptions,
}: {
  collapsed: boolean;
  onToggle: () => void;
  subscriptions: UserSummary[];
}) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "hidden md:flex flex-shrink-0 flex-col border-r bg-background transition-all duration-300",
        collapsed ? "w-[72px]" : "w-60"
      )}
    >
      <div className="flex h-14 flex-shrink-0 items-center gap-3 px-4">
        <button
          onClick={onToggle}
          className="-ml-2 rounded-full p-2 text-foreground transition-colors hover:bg-secondary"
          aria-label="Toggle sidebar"
        >
          <PanelLeft size={20} />
        </button>
        {!collapsed && (
          <Link href="/" className="flex items-center gap-1.5">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary">
              <Clapperboard size={14} className="text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-semibold tracking-tight text-foreground">
              Video<span className="text-primary">Tube</span>
            </span>
          </Link>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-2 no-scrollbar">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={label}
              href={href}
              className={cn(
                "mx-2 flex items-center gap-4 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
                collapsed && "mx-1 justify-center px-0",
                active
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <Icon size={20} />
              {!collapsed && <span>{label}</span>}
            </Link>
          );
        })}

        {!collapsed && (
          <>
            <div className="mb-2 mt-4 px-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Subscriptions
              </p>
            </div>
            {subscriptions.map((sub) => (
              <button
                key={sub._id}
                className="flex w-full items-center gap-3 px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={sub.avatar}
                  alt={sub.fullName}
                  className="h-6 w-6 flex-shrink-0 rounded-full object-cover"
                />
                <span className="truncate">{sub.fullName}</span>
              </button>
            ))}
          </>
        )}
      </nav>
    </aside>
  );
}

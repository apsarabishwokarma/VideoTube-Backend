"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Bell, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import type { User } from "@/types";

export function Header({ currentUser }: { currentUser?: User }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    router.push(query ? `/?${params.toString()}` : "/");
  }

  return (
    <header className="flex h-14 flex-shrink-0 items-center justify-between border-b bg-background px-4">
      <form onSubmit={handleSubmit} className="mx-auto w-full max-w-xl flex-1">
        <div className="relative">
          <Search
            size={16}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search videos, channels..."
            className="rounded-full bg-secondary pl-9"
          />
        </div>
      </form>

      <div className="ml-4 flex items-center gap-2">
        <ThemeToggle />
        <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground">
          <Bell size={20} />
        </Button>
        <Avatar className="h-8 w-8">
          <AvatarImage src={currentUser?.avatar} alt={currentUser?.fullName} />
          <AvatarFallback>{currentUser?.fullName?.[0] ?? "G"}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}

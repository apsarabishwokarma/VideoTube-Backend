import Link from "next/link";
import { cn } from "@/lib/utils";
import type { VideoCategory } from "@/types";

export function CategoryPills({
  categories,
  active,
  query,
}: {
  categories: VideoCategory[];
  active: VideoCategory;
  /** Preserve an in-flight search term when switching categories. */
  query?: string;
}) {
  return (
    <div className="sticky top-0 z-10 flex gap-2 overflow-x-auto border-b bg-background px-6 py-3 no-scrollbar">
      {categories.map((category) => {
        const params = new URLSearchParams();
        if (category !== "All") params.set("category", category);
        if (query) params.set("q", query);
        const href = params.toString() ? `/?${params.toString()}` : "/";

        return (
          <Link
            key={category}
            href={href}
            className={cn(
              "flex-shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-all",
              active === category
                ? "bg-foreground text-background"
                : "bg-secondary text-foreground hover:bg-muted"
            )}
          >
            {category}
          </Link>
        );
      })}
    </div>
  );
}

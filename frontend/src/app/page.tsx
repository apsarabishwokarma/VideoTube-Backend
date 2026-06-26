import { AppShell } from "@/components/layout/app-shell";
import { CategoryPills } from "@/components/video/category-pills";
import { VideoGrid } from "@/components/video/video-grid";
import { categories, getCurrentUser, getMySubscriptions, getVideos } from "@/lib/api";
import type { VideoCategory } from "@/types";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const { category, q } = await searchParams;
  const activeCategory = (categories.includes(category as VideoCategory) ? category : "All") as VideoCategory;

  const [videos, subscriptions, currentUser] = await Promise.all([
    getVideos({ category: activeCategory, query: q }),
    getMySubscriptions(),
    getCurrentUser(),
  ]);

  return (
    <AppShell subscriptions={subscriptions} currentUser={currentUser}>
      <CategoryPills categories={categories} active={activeCategory} query={q} />
      <div className="px-6 py-6">
        <VideoGrid videos={videos} />
      </div>
    </AppShell>
  );
}

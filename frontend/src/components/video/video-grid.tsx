import { VideoCard } from "@/components/video/video-card";
import type { MockVideoWithOwner } from "@/lib/api";

export function VideoGrid({ videos }: { videos: MockVideoWithOwner[] }) {
  if (videos.length === 0) {
    return (
      <div className="py-24 text-center text-muted-foreground">
        <p className="font-display text-2xl mb-2">No videos found</p>
        <p className="text-sm">Try a different search or category</p>
      </div>
    );
  }

  return (
    <div
      className="grid gap-x-5 gap-y-7"
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}
    >
      {videos.map((video) => (
        <VideoCard key={video._id} video={video} />
      ))}
    </div>
  );
}

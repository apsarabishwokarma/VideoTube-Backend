import Link from "next/link";
import { Play } from "lucide-react";
import { formatDuration, formatTimeAgo, formatViews } from "@/lib/format";
import type { MockVideoWithOwner } from "@/lib/api";

export function VideoCard({ video }: { video: MockVideoWithOwner }) {
  return (
    <Link href={`/watch/${video._id}`} className="group block cursor-pointer">
      <div className="relative mb-3 aspect-video overflow-hidden rounded-lg bg-secondary">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={video.thumbnail}
          alt={video.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="rounded-full bg-black/60 p-2">
            <Play size={20} className="fill-white text-white" />
          </div>
        </div>
        <span className="font-mono-data absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-xs text-white">
          {formatDuration(video.duration)}
        </span>
      </div>

      <div className="flex gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={video.owner.avatar}
          alt={video.owner.fullName}
          className="mt-0.5 h-9 w-9 flex-shrink-0 rounded-full object-cover"
        />
        <div className="min-w-0">
          <h3 className="line-clamp-2 text-sm font-medium leading-snug text-foreground transition-colors group-hover:text-primary">
            {video.title}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground hover:text-foreground">
            {video.owner.fullName}
          </p>
          <p className="font-mono-data mt-0.5 text-xs text-muted-foreground">
            {formatViews(video.views)} · {formatTimeAgo(video.createdAt)}
          </p>
        </div>
      </div>
    </Link>
  );
}

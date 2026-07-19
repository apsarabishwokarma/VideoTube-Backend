import Link from "next/link";
import { formatDuration, formatViews } from "@/lib/format";
import type { MockVideoWithOwner } from "@/lib/api";

export function RelatedVideoItem({ video }: { video: MockVideoWithOwner }) {
  return (
    <Link href={`/watch/${video._id}`} className="group flex gap-3">
      <div className="relative aspect-video w-40 flex-shrink-0 overflow-hidden rounded-md bg-secondary">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={video.thumbnail}
          alt={video.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="font-mono-data absolute bottom-1 right-1 rounded bg-black/80 px-1 py-0.5 text-xs text-white">
          {formatDuration(video.duration)}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="line-clamp-2 text-xs font-medium leading-snug text-foreground transition-colors group-hover:text-primary">
          {video.title}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">{video.owner.fullName}</p>
        <p className="font-mono-data text-xs text-muted-foreground">{formatViews(video.views)}</p>
      </div>
    </Link>
  );
}

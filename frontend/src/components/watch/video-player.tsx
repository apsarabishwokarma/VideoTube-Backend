"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Bookmark, Play, Share2, ThumbsUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCount, formatDuration, formatTimeAgo, formatViews } from "@/lib/format";
import { CommentList } from "@/components/watch/comment-list";
import { RelatedVideoItem } from "@/components/watch/related-video-item";
import type { CommentWithOwner } from "@/types";
import type { MockVideoWithOwner } from "@/lib/api";

export function VideoPlayer({
  video,
  comments,
  relatedVideos,
}: {
  video: MockVideoWithOwner;
  comments: CommentWithOwner[];
  relatedVideos: MockVideoWithOwner[];
}) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const likeCount = 4300 + (liked ? 1 : 0);

  return (
    <div className="mx-auto flex w-full max-w-screen-xl gap-6 p-6">
      <div className="min-w-0 flex-1">
        <Link
          href="/"
          className="mb-4 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft size={18} />
          <span>Back</span>
        </Link>

        <div
          className="relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-black"
          style={{ aspectRatio: "16/9" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={video.thumbnail}
            alt={video.title}
            className="absolute inset-0 h-full w-full object-cover opacity-40"
          />
          <div className="relative z-10 flex flex-col items-center gap-3">
            <div className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-full bg-white/10 backdrop-blur transition-colors hover:bg-white/20">
              <Play size={32} className="fill-white text-white" />
            </div>
            <span className="font-mono-data text-sm text-white/60">
              {formatDuration(video.duration)}
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
            <div className="h-full w-1/3 bg-primary" />
          </div>
        </div>

        <h1 className="font-display mt-5 text-xl font-semibold leading-snug text-foreground">
          {video.title}
        </h1>

        <div className="mt-3 flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={video.owner.avatar}
              alt={video.owner.fullName}
              className="h-9 w-9 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-medium text-foreground">{video.owner.fullName}</p>
              <p className="font-mono-data text-xs text-muted-foreground">@{video.owner.username}</p>
            </div>
            <button className="ml-2 rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
              Subscribe
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLiked((l) => !l)}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                liked ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-muted"
              )}
            >
              <ThumbsUp size={16} />
              <span className="font-mono-data">{formatCount(likeCount)}</span>
            </button>
            <button className="flex items-center gap-1.5 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted">
              <Share2 size={16} />
              <span>Share</span>
            </button>
            <button
              onClick={() => setSaved((s) => !s)}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                saved ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-muted"
              )}
            >
              <Bookmark size={16} />
              <span>{saved ? "Saved" : "Save"}</span>
            </button>
          </div>
        </div>

        <div className="mt-4 rounded-lg bg-secondary p-4 text-sm leading-relaxed text-muted-foreground">
          <div className="font-mono-data mb-2 flex gap-4 text-xs text-foreground">
            <span>{formatViews(video.views)}</span>
            <span>{formatTimeAgo(video.createdAt)}</span>
          </div>
          <p>{video.description}</p>
        </div>

        <CommentList comments={comments} />
      </div>

      <div className="hidden w-80 flex-shrink-0 lg:block">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Up Next
        </h3>
        <div className="flex flex-col gap-3">
          {relatedVideos.map((v) => (
            <RelatedVideoItem key={v._id} video={v} />
          ))}
        </div>
      </div>
    </div>
  );
}

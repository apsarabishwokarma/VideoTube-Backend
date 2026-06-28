import { ThumbsUp } from "lucide-react";
import { formatCount, formatTimeAgo } from "@/lib/format";
import type { CommentWithOwner } from "@/types";

export function CommentItem({ comment }: { comment: CommentWithOwner }) {
  return (
    <div className="mb-5 flex gap-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={comment.owner.avatar}
        alt={comment.owner.fullName}
        className="h-8 w-8 flex-shrink-0 rounded-full object-cover"
      />
      <div>
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-semibold text-foreground">@{comment.owner.username}</span>
          <span className="font-mono-data text-xs text-muted-foreground">
            {formatTimeAgo(comment.createdAt)}
          </span>
        </div>
        <p className="mt-0.5 text-sm text-foreground/80">{comment.content}</p>
        <div className="mt-1.5 flex items-center gap-1 text-muted-foreground">
          <ThumbsUp size={14} />
          <span className="font-mono-data text-xs">{formatCount(comment.likesCount)}</span>
        </div>
      </div>
    </div>
  );
}

import { CommentItem } from "@/components/watch/comment-item";
import type { CommentWithOwner } from "@/types";

export function CommentList({ comments }: { comments: CommentWithOwner[] }) {
  return (
    <div className="mt-6">
      <h3 className="mb-4 font-semibold text-foreground">
        <span className="font-mono-data mr-2 text-muted-foreground">{comments.length}</span>
        Comments
      </h3>
      {comments.map((comment) => (
        <CommentItem key={comment._id} comment={comment} />
      ))}
    </div>
  );
}

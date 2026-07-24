import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { VideoPlayer } from "@/components/watch/video-player";
import {
  getCurrentUser,
  getMySubscriptions,
  getRelatedVideos,
  getVideoById,
  getVideoComments,
} from "@/lib/api";

export default async function WatchPage({
  params,
}: {
  params: Promise<{ videoId: string }>;
}) {
  const { videoId } = await params;
  const video = await getVideoById(videoId);
  if (!video) notFound();

  const [comments, relatedVideos, subscriptions, currentUser] = await Promise.all([
    getVideoComments(videoId),
    getRelatedVideos(videoId),
    getMySubscriptions(),
    getCurrentUser(),
  ]);

  return (
    <AppShell subscriptions={subscriptions} currentUser={currentUser}>
      <VideoPlayer video={video} comments={comments} relatedVideos={relatedVideos} />
    </AppShell>
  );
}

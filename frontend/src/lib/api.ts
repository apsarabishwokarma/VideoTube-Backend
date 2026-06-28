/**
 * Mock data-access layer.
 *
 * Every function here stands in for a real call to the VideoTube backend
 * (`/api/v1/...`, see `src/app.js` in the backend repo) and is written with
 * the same async signature a `fetch`-based implementation would have. Data
 * currently comes from the JSON files in `src/data`; when the backend
 * endpoints are implemented, swap the body of each function for a `fetch`
 * call against `NEXT_PUBLIC_API_BASE_URL` and keep the return types as-is.
 *
 * Backend endpoint each function maps to is noted above its signature.
 */
import usersData from "@/data/users.json";
import videosData from "@/data/videos.json";
import commentsData from "@/data/comments.json";
import subscriptionsData from "@/data/subscriptions.json";
import categoriesData from "@/data/categories.json";
import type {
  User,
  UserSummary,
  Video,
  VideoWithOwner,
  CommentWithOwner,
  ChannelProfile,
  VideoCategory,
} from "@/types";

/** Mock-only field; the real `getAllVideos` response has no `category`. */
export type MockVideo = Video & { category: VideoCategory };
export type MockVideoWithOwner = VideoWithOwner & { category: VideoCategory };

interface RawComment {
  _id: string;
  content: string;
  video: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

const users = usersData as User[];
const videos = videosData as MockVideo[];
const comments = commentsData as RawComment[];
const subscriptions = subscriptionsData as { _id: string; subscriber: string; channel: string }[];
export const categories = categoriesData as VideoCategory[];

const GUEST_USER_ID = "64a0000000000000000001f0";

function toUserSummary(user: User): UserSummary {
  return { _id: user._id, username: user.username, fullName: user.fullName, avatar: user.avatar };
}

function findUser(userId: string): User {
  const user = users.find((u) => u._id === userId);
  if (!user) throw new Error(`Mock data error: no user with id ${userId}`);
  return user;
}

function withOwner(video: MockVideo): MockVideoWithOwner {
  const { owner, ...rest } = video;
  return { ...rest, owner: toUserSummary(findUser(owner)) };
}

async function delay<T>(value: T, ms = 150): Promise<T> {
  await new Promise((resolve) => setTimeout(resolve, ms));
  return value;
}

/** `GET /api/v1/videos` */
export async function getVideos(options?: {
  category?: VideoCategory;
  query?: string;
}): Promise<MockVideoWithOwner[]> {
  let result = videos;
  if (options?.category && options.category !== "All") {
    result = result.filter((v) => v.category === options.category);
  }
  if (options?.query) {
    const q = options.query.toLowerCase();
    result = result.filter(
      (v) =>
        v.title.toLowerCase().includes(q) ||
        findUser(v.owner).fullName.toLowerCase().includes(q)
    );
  }
  return delay(result.map(withOwner));
}

/** `GET /api/v1/videos/:videoId` */
export async function getVideoById(videoId: string): Promise<MockVideoWithOwner | null> {
  const video = videos.find((v) => v._id === videoId);
  return delay(video ? withOwner(video) : null);
}

/** No direct backend equivalent yet; approximates a "related videos" feed. */
export async function getRelatedVideos(
  videoId: string,
  limit = 8
): Promise<MockVideoWithOwner[]> {
  const result = videos.filter((v) => v._id !== videoId).slice(0, limit);
  return delay(result.map(withOwner));
}

/** `GET /api/v1/comments/:videoId` */
export async function getVideoComments(videoId: string): Promise<CommentWithOwner[]> {
  const result = comments
    .filter((c) => c.video === videoId)
    .map((c) => ({
      _id: c._id,
      content: c.content,
      video: c.video,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
      owner: toUserSummary(findUser(c.owner)),
      likesCount: 0,
      isLiked: false,
    }));
  return delay(result);
}

/** `GET /api/v1/users/channel/:username` */
export async function getChannelProfile(username: string): Promise<ChannelProfile | null> {
  const user = users.find((u) => u.username === username);
  if (!user) return delay(null);
  const subscribersCount = subscriptions.filter((s) => s.channel === user._id).length;
  const channelSubscribedToCount = subscriptions.filter((s) => s.subscriber === user._id).length;
  const isSubscribed = subscriptions.some(
    (s) => s.channel === user._id && s.subscriber === GUEST_USER_ID
  );
  return delay({
    _id: user._id,
    username: user.username,
    fullName: user.fullName,
    email: user.email,
    avatar: user.avatar,
    coverImage: user.coverImage,
    subscribersCount,
    channelSubscribedToCount,
    isSubscribed,
  });
}

/** `GET /api/v1/subscriptions/u/:subscriberId`, hardcoded to the guest/demo user for now. */
export async function getMySubscriptions(): Promise<UserSummary[]> {
  const channelIds = subscriptions
    .filter((s) => s.subscriber === GUEST_USER_ID)
    .map((s) => s.channel);
  return delay(channelIds.map((id) => toUserSummary(findUser(id))));
}

/** `GET /api/v1/users/current-user` — stubbed to a fixed demo user until auth is wired up. */
export async function getCurrentUser(): Promise<User> {
  return delay(findUser(GUEST_USER_ID));
}

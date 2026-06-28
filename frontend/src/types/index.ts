/**
 * Types mirror the Mongoose schemas in `VideoTube-Backend/src/models` and the
 * `ApiResponse` envelope every controller returns. Keep this file in sync with
 * the backend when a model or controller response shape changes.
 */

/** MongoDB ObjectId, serialized as a string over JSON. */
export type ObjectId = string;

export type ISODateString = string;

/** Wraps every response from `src/utils/ApiResponse.js`. */
export interface ApiResponse<T> {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;
}

/** Shape of errors thrown via `src/utils/ApiError.js`. */
export interface ApiErrorResponse {
  statusCode: number;
  message: string;
  success: false;
  errors: unknown[];
}

/** `src/models/user.models.js`, minus `password` / `refreshToken` (stripped by controllers). */
export interface User {
  _id: ObjectId;
  username: string;
  email: string;
  fullName: string;
  avatar: string;
  coverImage?: string;
  watchHistory: ObjectId[];
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

/** Subset of `User` returned by aggregation `$project` stages (e.g. video owner, comment owner). */
export type UserSummary = Pick<User, "_id" | "username" | "fullName" | "avatar">;

/** Response of `GET /api/v1/users/channel/:username` (`getUserChannelProfile`). */
export interface ChannelProfile
  extends Pick<User, "_id" | "username" | "fullName" | "email" | "avatar" | "coverImage"> {
  subscribersCount: number;
  channelSubscribedToCount: number;
  isSubscribed: boolean;
}

/** `src/models/video.models.js` */
export interface Video {
  _id: ObjectId;
  videoFile: string;
  thumbnail: string;
  title: string;
  description: string;
  /** Duration in seconds, as reported by Cloudinary. */
  duration: number;
  views: number;
  isPublished: boolean;
  owner: ObjectId;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

/** `Video` as returned once the feed/detail aggregation populates `owner`. */
export interface VideoWithOwner extends Omit<Video, "owner"> {
  owner: UserSummary;
}

/** `src/models/comments.models.js` */
export interface Comment {
  _id: ObjectId;
  content: string;
  video: ObjectId;
  owner: ObjectId;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface CommentWithOwner extends Omit<Comment, "owner"> {
  owner: UserSummary;
  likesCount: number;
  isLiked: boolean;
}

/** `src/models/tweets.models.js` */
export interface Tweet {
  _id: ObjectId;
  owner: ObjectId;
  content: string;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

/** `src/models/likes.models.js` — exactly one of `comment` / `video` / `tweet` is set. */
export interface Like {
  _id: ObjectId;
  comment?: ObjectId;
  video?: ObjectId;
  tweet?: ObjectId;
  likedBy: ObjectId;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

/** `src/models/playlist.models.js` */
export interface Playlist {
  _id: ObjectId;
  name: string;
  description: string;
  videos: ObjectId[];
  owner: ObjectId;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

/** `src/models/subscription.models.js` */
export interface Subscription {
  _id: ObjectId;
  subscriber: ObjectId;
  channel: ObjectId;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface ChannelStats {
  totalVideos: number;
  totalViews: number;
  totalSubscribers: number;
  totalLikes: number;
}

/** Query params accepted by `GET /api/v1/videos` (`getAllVideos`). */
export interface GetAllVideosQuery {
  page?: number;
  limit?: number;
  query?: string;
  sortBy?: string;
  sortType?: "asc" | "desc";
  userId?: ObjectId;
}

export interface Paginated<T> {
  docs: T[];
  totalDocs: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

/** UI-only grouping used for the home feed category pills; not a backend concept. */
export type VideoCategory =
  | "All"
  | "Travel"
  | "Science"
  | "Music"
  | "Food"
  | "Sports"
  | "Tech"
  | "Outdoors"
  | "Documentary";

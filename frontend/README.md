# VideoTube frontend

Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui frontend for the
VideoTube backend (`../src`). It currently runs entirely on mock data so the
UI can be built and reviewed independently of the API implementation.

## Stack

- Next.js 16 (App Router, Turbopack, server components)
- TypeScript
- Tailwind CSS v4
- shadcn/ui (Button, Avatar, Input, Card, Tabs, Sheet, etc. in `src/components/ui`)
- lucide-react icons

## Structure

```
src/
  app/               routes: home feed (`/`), watch page (`/watch/[videoId]`)
  components/
    layout/          Sidebar, Header, AppShell
    video/           VideoCard, VideoGrid, CategoryPills
    watch/           VideoPlayer, CommentList, CommentItem, RelatedVideoItem
    ui/              shadcn primitives
  data/              mock JSON: users, videos, comments, subscriptions, categories
  lib/
    api.ts           data-access layer — one function per backend endpoint
    format.ts        view/duration/time-ago formatting helpers
  types/
    index.ts         types mirrored from the backend Mongoose models + ApiResponse<T>
public/images/       placeholder SVG thumbnails/avatars/covers (data/*.json point here)
```

## Types

`src/types/index.ts` mirrors the backend schemas in `../src/models` field-for-field
(`User`, `Video`, `Comment`, `Tweet`, `Like`, `Playlist`, `Subscription`), plus the
`ApiResponse<T>` envelope every controller returns (`../src/utils/ApiResponse.js`).
Populated/aggregated shapes returned by specific controllers (e.g. `ChannelProfile`
from `getUserChannelProfile`, `VideoWithOwner`) are modeled separately. Keep this
file in sync whenever a backend model or controller response shape changes.

## Swapping mock data for the real API

Every function in `src/lib/api.ts` has a doc comment noting the backend route it
stands in for (e.g. `getVideos` → `GET /api/v1/videos`). To connect to the real
backend:

1. Replace each function body with a `fetch` call against the backend
   (`NEXT_PUBLIC_API_BASE_URL` + the route noted in the comment), keeping the
   same return type.
2. Delete the corresponding mock JSON file(s) in `src/data/` once no longer used.
3. Swap placeholder images in `public/images/` for real Cloudinary URLs returned
   by the API — components already just render whatever URL is in `video.thumbnail`
   / `user.avatar`, so no component changes should be needed.
4. `MockVideo` / `MockVideoWithOwner` in `lib/api.ts` add a UI-only `category`
   field that has no backend equivalent yet — drop it (or add it to the backend)
   once real video data is wired up.

## Development

```bash
npm run dev
```

Runs on `http://localhost:3000` (or the next free port).

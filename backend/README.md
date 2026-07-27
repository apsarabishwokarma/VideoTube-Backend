# VideoTube Backend

VideoTube is a Node.js/Express backend for a video-sharing platform. It provides user authentication, video uploads, playlists, comments, likes, subscriptions, tweets, and channel dashboard endpoints backed by MongoDB and Cloudinary.

## Tech Stack

- Node.js
- Express
- MongoDB with Mongoose
- JWT auth with cookies and bearer tokens
- Multer for multipart uploads
- Cloudinary for media storage
- CORS and cookie-parser

## Project Structure

```text
src/
  app.js
  index.js
  config/
  controllers/
  middleware/
  models/
  routes/
  services/
  utils/
```

## Features

- User registration, login, logout, token refresh, and profile management
- Video publishing, listing, updating, deleting, and publish toggling
- Comments on videos
- Likes for videos, comments, and tweets
- Playlists with add/remove video support
- Subscription management for channels
- Tweet creation and per-user tweet listing
- Channel dashboard stats and uploaded video listing
- Health check endpoint

## Environment Variables

Create a `.env` file at the project root and set:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/VideoTube
CORS_ORIGIN=http://localhost:3000
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=10d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

The code defaults `PORT` to `3000` if it is not set.

## Install And Run

```bash
npm install
npm run dev
```

The development script runs:

```bash
nodemon src/index.js
```

## API Base

All routes are mounted under `/api/v1`.

## Routes

### Health

- `GET /api/v1/healthCheck`

### Users

- `POST /api/v1/users/register`
- `POST /api/v1/users/login`
- `POST /api/v1/users/logout`
- `POST /api/v1/users/refresh-token`
- `POST /api/v1/users/change-password`
- `GET /api/v1/users/current-user`
- `PATCH /api/v1/users/update-account`
- `PATCH /api/v1/users/avatar`
- `PATCH /api/v1/users/cover-image`
- `GET /api/v1/users/channel/:username`
- `GET /api/v1/users/watch-history`

### Videos

- `GET /api/v1/videos`
- `POST /api/v1/videos`
- `GET /api/v1/videos/:videoId`
- `PATCH /api/v1/videos/:videoId`
- `DELETE /api/v1/videos/:videoId`
- `PATCH /api/v1/videos/toggle/publish/:videoId`

### Comments

- `GET /api/v1/comments/:videoId`
- `POST /api/v1/comments/:videoId`
- `PATCH /api/v1/comments/c/:commentId`
- `DELETE /api/v1/comments/c/:commentId`

### Likes

- `POST /api/v1/likes/toggle/v/:videoId`
- `POST /api/v1/likes/toggle/c/:commentId`
- `POST /api/v1/likes/toggle/t/:tweetId`
- `GET /api/v1/likes/videos`

### Playlists

- `POST /api/v1/playlist/`
- `GET /api/v1/playlist/:playlistId`
- `PATCH /api/v1/playlist/:playlistId`
- `DELETE /api/v1/playlist/:playlistId`
- `PATCH /api/v1/playlist/add/:videoId/:playlistId`
- `PATCH /api/v1/playlist/remove/:videoId/:playlistId`
- `GET /api/v1/playlist/user/:userId`

### Subscriptions

- `GET /api/v1/subscriptions/c/:channelId`
- `POST /api/v1/subscriptions/c/:channelId`
- `GET /api/v1/subscriptions/u/:subscriberId`

### Tweets

- `POST /api/v1/tweets/`
- `GET /api/v1/tweets/user/:userId`
- `PATCH /api/v1/tweets/:tweetId`
- `DELETE /api/v1/tweets/:tweetId`

### Dashboard

- `GET /api/v1/dashboard/stats`
- `GET /api/v1/dashboard/videos`

## Authentication

Protected routes use `verifyJWT`. The middleware accepts either:

- an `accessToken` cookie, or
- an `Authorization: Bearer <token>` header

## Media Uploads

- User avatars and cover images are handled through Multer and uploaded to Cloudinary.
- Video files and thumbnails are also uploaded through Cloudinary.
- Temporary uploads are written to `public/temp` before upload.

## Data Models

- `User`
- `Video`
- `Comment`
- `Like`
- `Playlist`
- `Subscription`
- `Tweet`

## Current Status

This codebase is currently part-complete. Several controller methods are scaffolded with `TODO` placeholders, so some routes are present but not fully implemented yet.

## Notes

- The app uses ES modules (`"type": "module"`).
- The default server entrypoint is `src/index.js`.
- MongoDB connection is established before `app.listen()` starts the server.

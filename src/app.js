import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "./config/config.js";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: config.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(
  express.json({
    limit: "16kb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

app.use(express.static("public"));

app.use(cookieParser());

// const API_PREFIX = "/api/v1";
// app.use(`${API_PREFIX}/users`, userRouter);

//routes import
import userRouter from "./routes/user.routes.js";
import healthCheckRouter from "./routes/healthCheck.routes.js";
import tweetsRouter from "./routes/tweets.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import videoRouter from "./routes/video.routes.js";
import commentsRouter from "./routes/comments.routes.js";
import likesRouter from "./routes/likes.routes.js";
import playlistRouter from "./routes/playlist.routes.js";
import dashboardRouter from "./routes/dashboard.routes.js";
import unknownEndPoint from "./middleware/unknownEndpoint.middleware.js";

//routes declaration
app.use("/api/v1/healthCheck", healthCheckRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tweets", tweetsRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/videos", videoRouter);
app.use("/api/v1/comments", commentsRouter);
app.use("/api/v1/likes", likesRouter);
app.use("/api/v1/playlist", playlistRouter);
app.use("/api/v1/dashboard", dashboardRouter);
app.use(unknownEndPoint);

export default app;

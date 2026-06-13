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

//routes import
import userRouter from "./routes/user.routes.js";
import unknownEndPoint from "./middleware/unknownEndpoint.middleware.js";

// const Api = app.use("/api/v1")

//routes declaration
app.use("/api/v1/users", userRouter);
app.use(unknownEndPoint);

export default app;

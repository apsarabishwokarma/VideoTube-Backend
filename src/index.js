import express from "express";
import config from "./config/config.js";
import unknownEndPoint from "./middleware/unknownEndpoint.middleware.js";
import connectDB from "./config/db.js";

const app = express();
app.use(express.json());

connectDB;

app.use(unknownEndPoint);

app.listen(config.PORT, () => {
  console.log(`Server running at port ${config.PORT}`);
});

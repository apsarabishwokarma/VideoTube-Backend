import mongoose from "mongoose";

const tweetsSchema = new mongoose.Schema({}, { timestamps: true });

export const Tweet = mongoose.model("Tweet", tweetsSchema);

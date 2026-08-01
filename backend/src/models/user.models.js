import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import bcrypt from "bcrypt";
import ApiError from "../utils/ApiError.js";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      unique: [true, "this username is already taken"],
      lowercase: [true, "username should be in lowercase"],
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "this email is already exist"],
      lowercase: [true, "email should be in lowercase"],
      trim: true,
    },
    fullName: {
      type: String,
      required: [true, "fullname is required"],
      trim: true,
      index: true,
    },
    avatar: {
      type: String, //clCoudinary url
      required: true,
    },
    coverImage: {
      type: String, //cloudinary url
    },
    watchHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  const AccessToken = jwt.sign(
    {
      _id: this._id,
      username: this.username,
      fullName: this.fullName,
      email: this.email,
    },
    config.ACCESS_TOKEN_SECRET,
    { expiresIn: config.ACCESS_TOKEN_EXPIRY }
  );
  return AccessToken;
};

userSchema.methods.generateRefreshToken = function () {
  const RefreshToken = jwt.sign(
    {
      _id: this._id,
    },
    config.REFRESH_TOKEN_SECRET,
    { expiresIn: config.REFRESH_TOKEN_EXPIRY }
  );
  return RefreshToken;
};

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    //saving refresh token in database
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    //returning access token
    return { accessToken, refreshToken };
  } catch (error) {
    console.log("TOKEN ERROR:", error);

    throw new ApiError(
      500,
      "something went wrong while generating access and refresh token"
    );
  }
};
export const User = mongoose.model("User", userSchema);
export default generateAccessAndRefreshTokens;

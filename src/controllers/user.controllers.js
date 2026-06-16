import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import uploadOnCloudinary from "../services/cloudinary.services.js";
import ApiResponse from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  //get user details from frontend
  //validation-not empty
  //check if user already exists:username and email
  // check for images and check for avatar
  // upload them to cloudinary and get url from there, check avatar
  // create user object- create entry in db
  // remove password and  refresh token field from response
  //check for user creation
  // return response otherwise error handling

  const { fullName, email, username, password } = req.body; // data from form ,json  for url different
  console.log(email, fullName, username, password);

  // if (fullName === "") {
  //   throw new ApiError(400, "fullname is required");
  // }
  if (
    [fullName, email, username, password].some((field) => {
      field?.trim() === "";
    })
  ) {
    throw new ApiError(400, " All fields are  required");
  }

  //   const user = User.findOne({ email });
  // if (user.email) {
  //   res.status(400).json({ message: "User already exists" });
  // }

  const existedUser = User.findOne({ $or: [{ email }, { username }] });
  if (existedUser) {
    throw new ApiError(
      409,
      "user with this email and username is already exists"
    );
  }

  //to handle the images
  // multer is in middleware it gives us files from req
  const avatarLocalFilePath = req.files?.avatar[0]?.path; // first property inside we get path object
  const coverImageLocalFilePath = req.files?.coverImage[0].path;
  console.log(req.files);

  if (!avatarLocalFilePath) {
    throw new ApiError(404, "Avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalFilePath);
  const coverImage = await uploadOnCloudinary(coverImageLocalFilePath);

  if (!avatar) {
    throw new ApiError(404, "Avatar file is required");
  }

  const user = await User.create({
    fullName,
    email,
    password,
    username: username.toLowerCase(),
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken" // remove password and  refresh token field from response
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering a user");
  }
  // return new ApiResponse(200, createdUser, "User successfully created!!")
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User successfully created!!"));
});

const loginUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "ok" });
});
export { loginUser, registerUser };

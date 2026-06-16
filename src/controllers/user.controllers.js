import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import generateAcccessAndRefreshTokens, {
  User,
} from "../models/user.models.js";
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

  const existedUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existedUser) {
    throw new ApiError(
      409,
      "user with this email and username is already exists"
    );
  }
  console.log(existedUser);

  //to handle the images
  // multer is in middleware it gives us files from req
  const avatarLocalFilePath = req.files?.avatar[0]?.path; // first property inside we get path object
  // const coverImageLocalFilePath = req.files?.coverImage[0].path;
  let coverImageLocalFilePath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalFilePath = req.files.coverImage[0].path;
  }

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
  //req.body -> data
  // username or email
  // find the user
  // password check
  //access and refresh token
  //send cookie

  const { email, username, password } = req.body;
  if (!username || !email) {
    throw new ApiError(400, "username or email is required");
  }

  const user = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (!user) {
    throw new ApiError(404, "User doesn't exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAcccessAndRefreshTokens(
    user._id
  );
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken" // these should not send to user
  );

  // cookies
  const options = {
    httpOnly: true, // if true can only be modified from server not from frontend
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "user logged in successfully!!"
      )
    );
});

const logoutUser = async (req, res) => {
  //find user
  // clear cookie
  // clear refresh token from db too

  User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "logout successfully"));
};
export { loginUser, registerUser, logoutUser };

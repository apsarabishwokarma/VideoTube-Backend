import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import config from "../config/config.js";

cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});
console.log({
  cloud: process.env.CLOUDINARY_CLOUD_NAME?.length,
  key: process.env.CLOUDINARY_API_KEY?.length,
  secretLength: process.env.CLOUDINARY_API_SECRET?.length,
});
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //upload the file on cloudinary

    const response = await cloudinary.uploader.upload(localFilePath, {
      // public_id:
      resource_type: "auto",
    });

    //file has been uploaded successfully
    console.log("file has been uploaded successfully", response, response.url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.log("ERROR:", error);
    // remove the  temporary saved file as the upload operation got failed
    fs.unlinkSync(localFilePath);
    return null;
  }
};

export default uploadOnCloudinary;

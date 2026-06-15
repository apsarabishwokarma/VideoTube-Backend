import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import config from "../config/config";

cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_KEY,
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
    return response;
  } catch (error) {
    console.log("ERROR:", error);
    // remove the  temporary saved file as the upload operation got failed
    fs.unlinkSync(localFilePath);
    return null;
  }
};

export default uploadOnCloudinary;

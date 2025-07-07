import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import "@dotenvx/dotenvx/config";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath: string) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("File uploaded successfully. resource url" + response.url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    console.log("error occured" + error);
    return null;
  }
};

const deleteFromCloudinary = async (publicID: string) => {
  try {
    const result = await cloudinary.uploader.destroy(publicID);
    console.log("deleted successfully from cloudinary", result, publicID);
  } catch (error) {
    console.log("error deleting from cloudinary", error);
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };

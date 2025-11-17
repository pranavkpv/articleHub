import cloudinary from "../../config/cloudinary";
import { IFileUploader } from "../interface/IFileUploader";

export class CloudinaryUploader implements IFileUploader {
  async upload(filePath: string): Promise<string> {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "articleHub"
    });
    return result.secure_url;
  }
}
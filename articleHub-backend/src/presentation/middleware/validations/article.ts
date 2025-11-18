import { Request, Response, NextFunction } from "express";
import { FileArray, UploadedFile } from "express-fileupload";
import { HTTP_STATUS } from "../../../domain/shared/Status";


type AsyncHandler = (req: Request, res: Response, next: NextFunction) => void;

export const validateArticle: AsyncHandler = async (req, res, next) => {
   const errors: string[] = [];
   const { title, description, category, tags } = req.body;

   if (!title || typeof title !== "string" || title.trim().length === 0) {
      errors.push("Title is required");
   } else if (title.trim().length < 3) {
      errors.push("Title must be at least 3 characters");
   } else if (title.length > 100) {
      errors.push("Title cannot exceed 100 characters");
   }

   if (!description || typeof description !== "string") {
      errors.push("Description is required");
   } else if (description.trim().length < 10) {
      errors.push("Description must be at least 10 characters");
   }


   if (category.length == 0) {
      errors.push("Category is required");
   }

   let parsedTags = [];
   try {
      parsedTags = JSON.parse(tags);
      if (!Array.isArray(parsedTags)) {
         errors.push("Tags must be an array");
      } else if (parsedTags.length < 1) {
         errors.push("At least one tag is required");
      }
   } catch {
      errors.push("Tags must be a valid JSON array");
   }

   const files = req.files as FileArray;
   const file = files?.image as UploadedFile | undefined;

   if (!file) {
      errors.push("Image file is required");
   } else {
      const allowedMime = ["image/jpeg", "image/png", "image/webp"];

      if (!allowedMime.includes(file.mimetype)) {
         errors.push("Invalid image type. Allowed: jpeg, png, webp");
      }

      if (file.size > 3 * 1024 * 1024) {
         errors.push("Image size cannot exceed 3MB");
      }
   }


   if (errors.length > 0) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
         success: false,
         message: errors[0],
      });
      return
   }

   next();
};




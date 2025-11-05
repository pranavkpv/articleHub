import mongoose from "mongoose";
import { IArticleModelEntity } from "../interface/article";

export const articleSchema = new mongoose.Schema<IArticleModelEntity>({
   title: {
      type: String,
      required: true
   },
   description: {
      type: String,
      required: true
   },
   image: {
      type: String
   },
   tags: [String],
   category: {
      type: String,
      required: true
   },
   createdBy: {
      type: String,
      required: true
   },
   deletedStatus: {
      type: Boolean,
      required: true,
      default: false
   }
}, { timestamps: true });


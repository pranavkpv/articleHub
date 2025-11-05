import mongoose from "mongoose";
import { IDislikeModelEntity } from "../interface/dislike";

export const dislikeSchema = new mongoose.Schema<IDislikeModelEntity>({
   userId: {
      type: String, required: true
   },
   articleId: {
      type: String, required: true
   }
}, { timestamps: true });

dislikeSchema.index({ userId: 1, articleId: 1 }, { unique: true });
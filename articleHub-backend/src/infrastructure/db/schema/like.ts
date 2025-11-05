import mongoose from "mongoose";
import { ILikeModelEntity } from "../interface/like";

export const likeSchema = new mongoose.Schema<ILikeModelEntity>({
   userId: {
      type: String, required: true
   },
   articleId: {
      type: String, required: true
   }
}, { timestamps: true });

likeSchema.index({ userId: 1, articleId: 1 }, { unique: true });



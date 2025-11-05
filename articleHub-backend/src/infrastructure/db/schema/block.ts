import mongoose from "mongoose";
import { IBlockModelEntity } from "../interface/block";

export const blockSchema = new mongoose.Schema<IBlockModelEntity>({
   userId: {
      type: String, required: true
   },
   articleId: {
      type: String, required: true
   }
}, { timestamps: true });

blockSchema.index({ userId: 1, articleId: 1 }, { unique: true });
import mongoose from 'mongoose';
import { ICategoryModelEntity } from '../interface/category';

export const categorySchema = new mongoose.Schema<ICategoryModelEntity>({
    name:{
      type:String,
      required:true
    }
}, { timestamps: true });

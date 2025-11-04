import mongoose from 'mongoose';
import { IFoodModelEntity } from '../interface/food';

export const foodSchema = new mongoose.Schema<IFoodModelEntity>({
   event_id: {
      type: String,
      required: true
   },
   user_id: {
      type: String,
      required: true
   },
   count: {
      type: Number,
      required: true
   }
}, { timestamps: true });

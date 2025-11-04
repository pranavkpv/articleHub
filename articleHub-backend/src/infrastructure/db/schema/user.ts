import mongoose from 'mongoose';
import { IUserModelEntity } from '../interface/user';

export const userSchema = new mongoose.Schema<IUserModelEntity>({
   username: {
      type: String,
      required: true,
   },
   email: {
      type: String,
      required: true,
      unique: true,
   },
   phone: {
      type: String,
   },
   password: {
      type: String,
      required: true,
   },
   profile_image: {
      type: String,
   },
   DOB: {
      type: Date
   },
   googleId: {
      type: String,
   },

}, { timestamps: true });

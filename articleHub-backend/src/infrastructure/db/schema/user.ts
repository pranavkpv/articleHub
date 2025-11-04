import mongoose from 'mongoose';
import { IUserModelEntity } from '../interface/user';

export const userSchema = new mongoose.Schema<IUserModelEntity>({
   firstname: {
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
   lastname: {
      type: String,
   },
   DOB: {
      type: Date
   },
   preferences: {
      type: [String],
   },


}, { timestamps: true });

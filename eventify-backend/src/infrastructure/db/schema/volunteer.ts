import mongoose from 'mongoose';
import { IVolunteerEntity } from '../interface/volunteer';

export const volunteerSchema = new mongoose.Schema<IVolunteerEntity>({
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
   delete_status: {
      type: Boolean,
      default:false
   }

}, { timestamps: true });

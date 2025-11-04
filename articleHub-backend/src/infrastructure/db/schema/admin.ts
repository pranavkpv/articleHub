import mongoose from 'mongoose';
import { IAdminModelEntity } from '../interface/admin';

export const adminShema = new mongoose.Schema<IAdminModelEntity>({
   email: {
      type: String
   },
   password: {
      type: String
   }
}, { timestamps: true });

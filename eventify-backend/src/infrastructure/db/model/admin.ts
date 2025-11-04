import mongoose from "mongoose";
import { adminShema } from "../schema/admin";

export const adminDB =  mongoose.model('admin', adminShema);
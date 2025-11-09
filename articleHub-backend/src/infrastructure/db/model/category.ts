import mongoose from "mongoose";
import { categorySchema } from "../schema/category";

export const categoryDB = mongoose.model('category',categorySchema );
import mongoose from "mongoose";
import { foodSchema } from "../schema/food";

export const foodDB = mongoose.model('food', foodSchema);
import mongoose from "mongoose";
import { likeSchema } from "../schema/like";

export const likeDB = mongoose.model('like',likeSchema );
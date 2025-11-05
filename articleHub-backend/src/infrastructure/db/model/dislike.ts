import mongoose from "mongoose";
import { dislikeSchema } from "../schema/dislike";

export const disLikeDB = mongoose.model('dislike',dislikeSchema );
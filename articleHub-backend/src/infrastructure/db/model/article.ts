import mongoose from "mongoose";
import { articleSchema } from "../schema/article";

export const articleDB = mongoose.model('article',articleSchema );
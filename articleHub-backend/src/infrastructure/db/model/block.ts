import mongoose from "mongoose";
import { blockSchema } from "../schema/block";

export const blockDB = mongoose.model('block',blockSchema );
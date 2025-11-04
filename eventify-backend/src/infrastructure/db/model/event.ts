import mongoose from "mongoose";
import { eventSchema } from "../schema/event";

export const eventDB =  mongoose.model('event', eventSchema);
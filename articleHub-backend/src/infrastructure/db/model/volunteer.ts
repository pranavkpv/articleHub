import mongoose from 'mongoose';
import { volunteerSchema } from '../schema/volunteer';


export const volunteerDB = mongoose.model('volunteer', volunteerSchema);

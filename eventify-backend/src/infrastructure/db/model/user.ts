import mongoose from 'mongoose';
import { userSchema } from '../schema/user';


export const userDB = mongoose.model('user', userSchema);

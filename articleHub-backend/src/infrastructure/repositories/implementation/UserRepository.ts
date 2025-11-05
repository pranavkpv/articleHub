import { editPasswordRepo, registerUserData, resendOtpData, tempUserData } from "../../../domain/entities/user";
import { IUserModelEntity } from "../../db/interface/user";
import { userDB } from "../../db/model/user";
import redis from "../../db/redis";
import { IUserRepository } from "../interface/IUserRepository";

export class UserRepository implements IUserRepository {
   async saveUser(user: tempUserData): Promise<boolean> {
      const key = `tempUser:${ user.email }`;
      await redis.hset(key, {
         firstname: user.firstname,
         lastname: user.lastname,
         email: user.email,
         phone: user.phone.toString(),
         password: user.password,
         DOB: user.DOB,
         preference: JSON.stringify(user.preference),
         otp: user.otp,
         otpCreatedAt: user.otpCreatedAt.toISOString(),
      });
      await redis.expire(key, 300);
      return true
   }
   async findTempUserByEmail(email: string): Promise<tempUserData | null> {
      const key = `tempUser:${ email }`;
      const data = await redis.hgetall(key);
      if (Object.keys(data).length === 0) {
         return null;
      }

      const tempUser: tempUserData = {
         firstname: data.firstname || '',
         lastname: data.lastname || '',
         email: data.email || '',
         phone: data.phone || '',
         password: data.password || '',
         DOB: data.DOB || '',
         preference: data.preference ? JSON.parse(data.preference) : [],
         otp: data.otp || '',
         otpCreatedAt: data.otpCreatedAt ? new Date(data.otpCreatedAt) : new Date(),
      };

      return tempUser;
   }
   async registerUser(data: registerUserData): Promise<boolean> {
      const newUser = new userDB(
         data
      )
      await newUser.save()
      return true
   }
   async updateTempUserOTP(data: resendOtpData): Promise<boolean> {
      const key = `tempUser:${ data.email }`;
      await redis.hset(key, {
         otp: data.otp,
         otpCreatedAt: data.otpCreatedAt,
      });
      return true
   }
   async findUserByEmail(email: string): Promise<IUserModelEntity | null> {
      return await userDB.findOne({ email })
   }
   async findUserById(user: string): Promise<IUserModelEntity | null> {
      return await userDB.findById(user)
   }
   async findUserByEmailOrPhone(data: string): Promise<IUserModelEntity | null> {
      return await userDB.findOne({ $or: [{ email: data }, { phone: data }] })
   }
   async updateUser(data: IUserModelEntity): Promise<void> {
      const { _id, firstname, lastname, email, phone, password, DOB, preferences } = data
      await userDB.findByIdAndUpdate(_id, { firstname, lastname, email, phone, password, DOB, preferences })
   }
   async updatepassword(data: editPasswordRepo): Promise<void> {
      const { _id, password } = data
      await userDB.findByIdAndUpdate(_id, { password })
   }
}
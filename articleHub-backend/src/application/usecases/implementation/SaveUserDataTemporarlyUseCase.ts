import { commonOutput } from "../../../domain/entities/common";
import { signupData } from "../../../domain/entities/user";
import { HTTP_STATUS } from "../../../domain/shared/Status";
import { sendEmail } from "../../../domain/shared/utils/nodemailer";
import { IUserRepository } from "../../../infrastructure/repositories/interface/IUserRepository";
import { ISaveUserDataTemporarilyUseCase } from "../interface/ISaveUserDataTemporarilyUseCase";

export class SaveUserDataTemporarlyUseCase implements ISaveUserDataTemporarilyUseCase {
   constructor(
      private _userRepository: IUserRepository
   ) { }
   async execute(userData: signupData): Promise<commonOutput> {
      const otp = (Math.floor(100000 + Math.random() * 900000)).toString();
      const otpCreatedAt = new Date();
      const saveUserTemporarly = await this._userRepository.saveUser({ ...userData, otp, otpCreatedAt })
      if (saveUserTemporarly) {
         const text = `Dear ${ userData.firstname } ${userData.lastname}, your One-Time Password (OTP) for signing up with Eventify is ${ otp }. Do not share this code with anyone.`;
         const emailSend = await sendEmail(userData.email, 'OTP verification', text);
         if (emailSend) {
            console.log(otp);
            return {
               success: true,
               message: "otp send",
               status: HTTP_STATUS.OK
            }
         } else {
            return {
               success: false,
               message: "otp fail",
               status: HTTP_STATUS.CONFLICT
            }
         }
      }
      return {
         success: false,
         message:"otp fail",
         status: HTTP_STATUS.CONFLICT
      }
   }
}
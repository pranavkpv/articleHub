import { commonOutput } from "../../../domain/entities/output";
import { Otp } from "../../../domain/shared/messages/otp";
import { HTTP_STATUS } from "../../../domain/shared/Status";
import { sendEmail } from "../../../domain/shared/utils/nodemailer";
import { IUserRepository } from "../../../infrastructure/repositories/interface/IUserRepository";
import { IUpdateTemporarUserDataUseCase } from "../interface/IUpdateTemporarUserDataUseCase";

export class UpdateTemporarUserDataUseCase implements IUpdateTemporarUserDataUseCase {
   constructor(
      private _userRepository: IUserRepository
   ) { }
   async execute(email: string): Promise<commonOutput> {
      const existUser = await this._userRepository.findTempUserByEmail(email);
      if (existUser) {
         const otp = (Math.floor(100000 + Math.random() * 900000)).toString();
         const text = `Dear ${ existUser.username }, your One-Time Password (OTP) for signing up with BuildERP is ${ otp }. Do not share this code with anyone.`;
         const emailSend = await sendEmail(existUser.email, 'OTP verification', text);

         if (emailSend) {
            console.log(otp);
            const otpCreatedAt: Date = new Date();
            await this._userRepository.updateTempUserOTP({ email, otp, otpCreatedAt });
            return {
               success: true,
               message: Otp.send,
               status: HTTP_STATUS.OK
            }
         } else {
            return {
               success: false,
               message: Otp.sendFail,
               status: HTTP_STATUS.CONFLICT
            }
         }
      }
      return {
         success: false,
         message: Otp.sendFail,
         status: HTTP_STATUS.CONFLICT
      }

   }
}
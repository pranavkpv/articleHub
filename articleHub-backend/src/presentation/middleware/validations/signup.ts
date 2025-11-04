import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../domain/shared/Status";
import { UserName } from "../../../domain/shared/messages/username";
import { Email } from "../../../domain/shared/messages/email";
import { Phone } from "../../../domain/shared/messages/phone";
import { Password } from "../../../domain/shared/messages/password";
import { Otp } from "../../../domain/shared/messages/otp";

type AsyncHandler = (req: Request, res: Response, next: NextFunction) => void;
export const validateSignup: AsyncHandler = async (req, res, next) => {
   const { username, email, phone, password, confirmPassword } = req.body;
   if (!username || username.trim().length === 0) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: UserName.required });
      return;
   }
   if (!email || email.trim().length === 0) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: Email.required });
      return;
   }
   if (!phone || phone.trim().length === 0) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: Phone.required });
      return;
   }
   if (!password || password.trim().length === 0) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: Password.required });
      return;
   }
   if (!confirmPassword || confirmPassword.trim().length === 0) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: Password.required });
      return;
   }
   if (password !== confirmPassword) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: Password.notmatch });
      return;
   }

   next();
};


export const validateVerifyOTP: AsyncHandler = async (req, res, next) => {
   const { email, otp } = req.body;
   if (!email || email.trim().length === 0) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: Email.required });
      return;
   }
   if (!otp || otp.trim().length === 0) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: Otp.required });
      return;
   }
   next();
};

export const validateResendOtp: AsyncHandler = async (req, res, next) => {
   const { email } = req.body;
   if (!email || email.trim().length === 0) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: Email.required });
      return;
   }
   next();
}; 

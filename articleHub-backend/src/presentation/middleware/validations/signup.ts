import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../domain/shared/Status";

type AsyncHandler = (req: Request, res: Response, next: NextFunction) => void;
export const validateSignup: AsyncHandler = async (req, res, next) => {
   const { firstname, lastname, email, phone, password, confirmPassword, DOB, preference } = req.body;
   if (!firstname || firstname.trim().length === 0) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: "Firsytname.required" });
      return;
   }
   if (!lastname) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: "Lastname.required" });
      return;
   }
   if (!DOB) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: "Date of birth is required" });
      return;
   }
   if (preference.length == 0) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: "select atleast one preference" });
      return;
   }
   let now = new Date();
   let dob = new Date(DOB); 

   let ageDiff = now.getFullYear() - dob.getFullYear();
   let monthDiff = now.getMonth() - dob.getMonth();

   if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < dob.getDate())) {
      ageDiff--;
   }

   if (ageDiff < 7) {
      res.status(400).json({
         success: false,
         message: "Only people who are at least 7 years old can join this."
      });
      return;
   }

   if (!email || email.trim().length === 0) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: "Email.required" });
      return;
   }
   if (!phone || phone.trim().length === 0) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: "Phone.required" });
      return;
   }
   if (!password || password.trim().length === 0) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: "Password.required" });
      return;
   }
   if (!confirmPassword || confirmPassword.trim().length === 0) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: "Password.required " });
      return;
   }
   if (password !== confirmPassword) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: "Password.notmatch " });
      return;
   }

   next();
};


export const validateVerifyOTP: AsyncHandler = async (req, res, next) => {
   const { email, otp } = req.body;
   if (!email || email.trim().length === 0) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: "Email.required" });
      return;
   }
   if (!otp || otp.trim().length === 0) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: "Otp.required" });
      return;
   }
   next();
};

export const validateResendOtp: AsyncHandler = async (req, res, next) => {
   const { email } = req.body;
   if (!email || email.trim().length === 0) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: "Email.required" });
      return;
   }
   next();
}; 

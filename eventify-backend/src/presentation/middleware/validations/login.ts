import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../domain/shared/Status";
import { Email } from "../../../domain/shared/messages/email";
import { Password } from "../../../domain/shared/messages/password";


type AsyncHandler = (req: Request, res: Response, next: NextFunction) => void;
export const validateLogin: AsyncHandler = async (req, res, next) => {
   const { email, password } = req.body;
   if (!email || email.trim().length === 0) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: Email.required });
      return;
   }
   if (!password || password.trim().length === 0) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: Password.required });
      return;
   }
   next();
};




import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../domain/shared/Status";



type AsyncHandler = (req: Request, res: Response, next: NextFunction) => void;
export const validateLogin: AsyncHandler = async (req, res, next) => {
   const { email, password } = req.body;
   if (!email || email.trim().length === 0) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: "required all field"});
      return;
   }
   if (!password || password.trim().length === 0) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: "password wrong" });
      return;
   }
   next();
};




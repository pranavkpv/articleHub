import { Request, Response, NextFunction } from "express";

export interface ISignupController {
   signupUser(req: Request, res: Response, next: NextFunction):
      Promise<void>

   verifyUserOtp(req: Request, res: Response, next: NextFunction):
      Promise<void>

   resendUserOtp(req: Request, res: Response, next: NextFunction):
      Promise<void>
}
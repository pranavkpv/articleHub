import { Request, Response, NextFunction } from "express";

export interface ILoginController {
   loginUser(req: Request, res: Response, next: NextFunction):
      Promise<void>

   handleRefreshToken(req: Request, res: Response, next: NextFunction):
      Promise<void>

   logoutHandler(req: Request, res: Response, next: NextFunction):
      Promise<void>
}
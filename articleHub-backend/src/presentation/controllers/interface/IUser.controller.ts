import { Request, Response, NextFunction } from "express";

export interface IUserController {
   editProfile(req: Request, res: Response, next: NextFunction):
      Promise<void>
   editPassword(req: Request, res: Response, next: NextFunction):
      Promise<void>
   getProfile(req: Request, res: Response, next: NextFunction):
      Promise<void>
}
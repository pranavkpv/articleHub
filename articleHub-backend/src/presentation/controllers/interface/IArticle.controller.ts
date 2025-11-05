import { Request, Response, NextFunction } from "express";

export interface IArticleController {
   addArticle(req: Request, res: Response, next: NextFunction):
      Promise<void>
   likeArticle(req: Request, res: Response, next: NextFunction):
      Promise<void>
   dislikeArticle(req: Request, res: Response, next: NextFunction):
      Promise<void>
   blockArticle(req: Request, res: Response, next: NextFunction):
      Promise<void>
   editArticle(req: Request, res: Response, next: NextFunction):
      Promise<void>
   deleteArticle(req: Request, res: Response, next: NextFunction):
      Promise<void>
   getUserBaseArticle(req: Request, res: Response, next: NextFunction):
      Promise<void>
   getPreferenceBaseArticle(req: Request, res: Response, next: NextFunction):
      Promise<void>
}
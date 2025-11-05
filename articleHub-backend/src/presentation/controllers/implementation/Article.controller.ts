import { FileArray, UploadedFile } from "express-fileupload";
import cloudinary from "../../../application/config/cloudinary";
import { IToken } from "../../../application/services/interface/IToken";
import { IArticleController } from "../interface/IArticle.controller";
import { Request, Response, NextFunction } from "express";
import { IArticleSaveUseCase } from "../../../application/usecases/interface/IArticleSaveUseCase";
import { ILikeArticleUseCase } from "../../../application/usecases/interface/ILikeArticleUseCase";
import { IDislikeArticleUseCase } from "../../../application/usecases/interface/IDislikeArticleUseCase";
import { IBlockArticleUseCase } from "../../../application/usecases/interface/IBlockArticleUseCase";
import { IEditArticleUseCase } from "../../../application/usecases/interface/IEditArticleUseCase";
import { IDeleteArticleUseCase } from "../../../application/usecases/interface/IDeleteArticleUseCase";


export class ArticleController implements IArticleController {
   constructor(
      private _saveArticleUsecase: IArticleSaveUseCase,
      private _tokenservice: IToken,
      private _likeArticleUseCase: ILikeArticleUseCase,
      private _dislikeArticleUseCase: IDislikeArticleUseCase,
      private _blockArticleUseCase: IBlockArticleUseCase,
      private _editArticleUseCase: IEditArticleUseCase,
      private _deleteArticleUseCase:IDeleteArticleUseCase
   ) { }
   addArticle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const files = req.files as FileArray;
         const file = files?.file as UploadedFile | undefined;
         if (!file || Array.isArray(file)) return;
         const uploadResult = await cloudinary.uploader.upload(file.tempFilePath, { folder: 'articleHub' });
         const userHeader = req.headers.authorization;
         const accessToken = userHeader?.split(' ')[1];
         if (!accessToken) return
         const payload = await this._tokenservice.verifyAccessToken(accessToken);
         if (!payload) return
         const article = await this._saveArticleUsecase.execute({ ...req.body, userId: payload._id, image: uploadResult.secure_url })
         res.status(article.status).json({ success: article.success, message: article.message })
      } catch (error) {
         next(error)
      }
   }
   likeArticle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const userHeader = req.headers.authorization;
         const accessToken = userHeader?.split(' ')[1];
         if (!accessToken) return
         const payload = await this._tokenservice.verifyAccessToken(accessToken);
         if (!payload) return
         const article = await this._likeArticleUseCase.execute({ ...req.body, userId: payload._id })
         res.status(article.status).json({ success: article.success, message: article.message })
      } catch (error) {
         next(error)
      }
   }
   dislikeArticle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const userHeader = req.headers.authorization;
         const accessToken = userHeader?.split(' ')[1];
         if (!accessToken) return
         const payload = await this._tokenservice.verifyAccessToken(accessToken);
         if (!payload) return
         const article = await this._dislikeArticleUseCase.execute({ ...req.body, userId: payload._id })
         res.status(article.status).json({ success: article.success, message: article.message })
      } catch (error) {
         next(error)
      }
   }
   blockArticle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const userHeader = req.headers.authorization;
         const accessToken = userHeader?.split(' ')[1];
         if (!accessToken) return
         const payload = await this._tokenservice.verifyAccessToken(accessToken);
         if (!payload) return
         const article = await this._blockArticleUseCase.execute({ ...req.body, userId: payload._id })
         res.status(article.status).json({ success: article.success, message: article.message })
      } catch (error) {
         next(error)
      }
   }
   editArticle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const _id = req.params.id
         const files = req.files as FileArray;
         const file = files?.file as UploadedFile | undefined;
         if (!file || Array.isArray(file)) return;
         const uploadResult = await cloudinary.uploader.upload(file.tempFilePath, { folder: 'articleHub' });
         const article = await this._editArticleUseCase.execute({ ...req.body,_id, image: uploadResult.secure_url })
         res.status(article.status).json({ success: article.success, message: article.message })
      } catch (error) {
         next(error)
      }
   }
   deleteArticle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const _id = req.params.id
         const article = await this._deleteArticleUseCase.execute(String(_id))
         res.status(article.status).json({ success: article.success, message: article.message })
      } catch (error) {
         next(error)
      }
   }
}
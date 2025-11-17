import { FileArray, UploadedFile } from "express-fileupload";
import { IToken } from "../../../application/services/interface/IToken";
import { IArticleController } from "../interface/IArticle.controller";
import { Request, Response, NextFunction } from "express";
import { IArticleSaveUseCase } from "../../../application/usecases/interface/IArticleSaveUseCase";
import { ILikeArticleUseCase } from "../../../application/usecases/interface/ILikeArticleUseCase";
import { IDislikeArticleUseCase } from "../../../application/usecases/interface/IDislikeArticleUseCase";
import { IBlockArticleUseCase } from "../../../application/usecases/interface/IBlockArticleUseCase";
import { IEditArticleUseCase } from "../../../application/usecases/interface/IEditArticleUseCase";
import { IDeleteArticleUseCase } from "../../../application/usecases/interface/IDeleteArticleUseCase";
import { HTTP_STATUS } from "../../../domain/shared/Status";
import { IGetUserBaseArticleUseCase } from "../../../application/usecases/interface/IGetUserBaseArticleUseCase";
import { IGetPreferenceBaseArticleUsecase } from "../../../application/usecases/interface/IGetPreferenceBaseArticleUsecase";
import { IFileUploader } from "../../../application/services/interface/IFileUploader";


export class ArticleController implements IArticleController {
   constructor(
      private _saveArticleUsecase: IArticleSaveUseCase,
      private _tokenservice: IToken,
      private _likeArticleUseCase: ILikeArticleUseCase,
      private _dislikeArticleUseCase: IDislikeArticleUseCase,
      private _blockArticleUseCase: IBlockArticleUseCase,
      private _editArticleUseCase: IEditArticleUseCase,
      private _deleteArticleUseCase: IDeleteArticleUseCase,
      private _getUserBaseArticleUseCase: IGetUserBaseArticleUseCase,
      private _getPreferenceBaseArticleUseCase: IGetPreferenceBaseArticleUsecase,
      private _uploadFile: IFileUploader
   ) { }
   addArticle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const { title, description, category, tags } = req.body
         const files = req.files as FileArray;
         const file = files?.image as UploadedFile | undefined;
         if (!file || Array.isArray(file)) {
            return
         };
         const uploadResult = await this._uploadFile.upload(file.tempFilePath)
         const userHeader = req.headers.authorization;
         const accessToken = userHeader?.split(' ')[1];
         if (!accessToken) {
            return
         }
         const payload = await this._tokenservice.verifyAccessToken(accessToken);
         if (!payload) {
            return
         }
         const article = await this._saveArticleUsecase.execute({ title, description, category, tags: JSON.parse(tags), createdBy: payload._id, image: uploadResult })
         res.status(article.status).json({ success: article.success, message: article.message })
      } catch (error) {
         next(error)
      }
   }
   editArticle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const { title, description, category, tags } = req.body
         const _id = req.params.id
         if(!_id){
            return 
         }
         let image = null
         if (req.files) {
            const files = req.files as FileArray;
            const file = files?.image as UploadedFile | undefined;
            if (!file || Array.isArray(file)) return;
            const uploadResult = await this._uploadFile.upload(file.tempFilePath)
            image = uploadResult
         }   
         const article = await this._editArticleUseCase.execute({_id,category,description,tags:JSON.parse(tags),title, image})
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
         const article = await this._likeArticleUseCase.execute({ articleId:req.body.id, userId: payload._id })
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
         const article = await this._dislikeArticleUseCase.execute({ articleId:req.body.id, userId: payload._id })
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
         const article = await this._blockArticleUseCase.execute({ articleId:req.body.id, userId: payload._id })
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
   getUserBaseArticle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const userHeader = req.headers.authorization;
         const accessToken = userHeader?.split(' ')[1];
         if (!accessToken) return
         const payload = await this._tokenservice.verifyAccessToken(accessToken);
         if (!payload) return
         const article = await this._getUserBaseArticleUseCase.execute(payload._id)
         res.status(HTTP_STATUS.OK).json({ success: true, message: "article fetch success", data: article })
      } catch (error) {
         next(error)
      }
   }
   getPreferenceBaseArticle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const userHeader = req.headers.authorization;
         const accessToken = userHeader?.split(' ')[1];
         if (!accessToken) return
         const payload = await this._tokenservice.verifyAccessToken(accessToken);
         if (!payload) return
         const article = await this._getPreferenceBaseArticleUseCase.execute(payload._id)
         res.status(HTTP_STATUS.OK).json({ success: true, message: "article fetch success", data: article })
      } catch (error) {
         next(error)
      }
   }
}
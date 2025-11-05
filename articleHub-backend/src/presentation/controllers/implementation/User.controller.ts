import { Request, Response, NextFunction } from "express";
import { IUserController } from "../interface/IUser.controller";
import { IToken } from "../../../application/services/interface/IToken";
import { FileArray, UploadedFile } from "express-fileupload";
import cloudinary from "../../../application/config/cloudinary";
import { IEditProfileUseCase } from "../../../application/usecases/interface/IEditProfileUseCase";
import { HTTP_STATUS } from "../../../domain/shared/Status";
import { IEditPasswordUseCase } from "../../../application/usecases/interface/IEditPasswordUseCase";
import { IGetUserProfileUsecase } from "../../../application/usecases/interface/IGetUserProfileUsecase";

export class UserController implements IUserController {
   constructor(
      private _tokenservice: IToken,
      private _editProfileUseCase: IEditProfileUseCase,
      private _editPasswordUseCase: IEditPasswordUseCase,
      private _getUserProfileUseCase:IGetUserProfileUsecase
   ) { }
   editProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const userHeader = req.headers.authorization;
         const accessToken = userHeader?.split(' ')[1];
         if (!accessToken) return
         const payload = await this._tokenservice.verifyAccessToken(accessToken);
         if (!payload) return
         const files = req.files as FileArray;
         const file = files?.file as UploadedFile | undefined;
         if (!file || Array.isArray(file)) return;
         const uploadResult = await cloudinary.uploader.upload(file.tempFilePath, { folder: 'articleHub' });
         const user = await this._editProfileUseCase.execute({ ...req.body, _id: payload._id, image: uploadResult.secure_url })
         res.status(user.status).json({ success: user.success, message: user.message })
      } catch (error) {
         next(error)
      }
   }
   editPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const { currentpassword, newpassword, confirmPassword } = req.body
         if (newpassword !== confirmPassword) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: "password not match" })
            return
         }
         const userHeader = req.headers.authorization;
         const accessToken = userHeader?.split(' ')[1];
         if (!accessToken) return
         const payload = await this._tokenservice.verifyAccessToken(accessToken);
         if (!payload) return
         const user = await this._editPasswordUseCase.execute({ _id: payload._id, currentpassword, newpassword })
         res.status(user.status).json({ success: user.success, message: user.message })
      } catch (error) {
         next(error)
      }
   }
   getProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const userHeader = req.headers.authorization;
         const accessToken = userHeader?.split(' ')[1];
         if (!accessToken) return
         const payload = await this._tokenservice.verifyAccessToken(accessToken);
         if (!payload) return
         const user = await this._getUserProfileUseCase.execute(payload._id)
         res.status(HTTP_STATUS.OK).json({ success: true, message: 'userdata fetch success',data:user })
         if (!payload) return
      } catch (error) {
         next(error)
      }
   }
}
import { Request, Response, NextFunction } from "express";
import { ISignupController } from "../interface/ISignup.controller";
import { ISaveUserDataTemporarilyUseCase } from "../../../application/usecases/interface/ISaveUserDataTemporarilyUseCase";
import { ICheckTemporarUserDataUseCase } from "../../../application/usecases/interface/ICheckTemporarUserDataUseCase";
import { IUpdateTemporarUserDataUseCase } from "../../../application/usecases/interface/IUpdateTemporarUserDataUseCase";

export class SignupController implements ISignupController {
   constructor(
      private _saveUserDataTemporarilyUseCase: ISaveUserDataTemporarilyUseCase,
      private _checkTemporarUserDataUseCase : ICheckTemporarUserDataUseCase,
      private _updateTemporarUserDataUseCase : IUpdateTemporarUserDataUseCase
   ) { }
   signupUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         console.log("haiiii this is signup")
         const response = await this._saveUserDataTemporarilyUseCase.execute(req.body)
         res.status(response.status).json({ success: response.success, message: response.message })
      } catch (error) {
         next(error)
      }
   }
   verifyUserOtp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const response = await this._checkTemporarUserDataUseCase.execute(req.body)
         res.status(response.status).json({ success: response.success, message: response.message })
      } catch (error) {
         next(error)
      }
   }
   resendUserOtp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const response = await this._updateTemporarUserDataUseCase.execute(req.body.email)
         res.status(response.status).json({ success: response.success, message: response.message })
      } catch (error) {
         next(error)
      }
   }

}
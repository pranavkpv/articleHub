import { Request, Response, NextFunction } from "express";
import { ILoginController } from "../interface/ILogin.controller";
import { ILoginUserUseCase } from "../../../application/usecases/interface/ILoginUserUseCase";
import { HTTP_STATUS } from "../../../domain/shared/Status";
import { IRefreshTokenUsecase } from "../../../application/usecases/interface/IRefreshTokenUsecase";
import { IToken } from "../../../application/services/interface/IToken";

export class LoginController implements ILoginController {
   constructor(
      private _loginUserUseCase: ILoginUserUseCase,
      private _refreshTokenUseCase: IRefreshTokenUsecase,
      private _jwtservice: IToken
   ) { }
   loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        

         const response = await this._loginUserUseCase.execute(req.body);

         if (!response.success) {
            res.status(response.status).json({ success: response.success, message: response.message });
            return;
         }

         res.cookie('refreshToken', response.data.refreshToken, {
            httpOnly: true,
            secure: true,           // requires HTTPS
            sameSite: 'none',       // allow cross-site
            maxAge: 24 * 60 * 60 * 1000,
         });

         res.status(response.status).json({
            success: response.success,
            message:" Email.login",
            data: { token: response.data.accessToken, role: response.data.role }
         });
      } catch (error) {
         next(error);
      }
   }


   handleRefreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const refreshToken = req.cookies.refreshToken;
         if (!refreshToken) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: "token.no_token", data: '' })
            return
         }
         const data = await this._refreshTokenUseCase.execute(refreshToken);
         res.status(data.status).json({ success: data.success, message: data.message, data: data.data })
      } catch (error) {
         next(error);
      }
   };
   logoutHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const userHeader = req.headers.authorization;
         const accessToken = userHeader?.split(' ')[1];

         if (!accessToken) {
            res.status(HTTP_STATUS.UNAUTHORIZED).json({ success: false, message: "token.invalid_accessToken "});
            return;
         }

         try {
            await this._jwtservice.verifyAccessToken(accessToken);
         } catch {
            
         }
         res.clearCookie('refreshToken', {
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
         });

         res.status(HTTP_STATUS.OK).json({ success: true, message: "token.logout" });
      } catch (error) {
         next(error);
      }
   };

}
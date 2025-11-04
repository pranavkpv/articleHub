import { Router } from 'express';
import { injectedSignupController, injectLoginController } from '../../infrastructure/di/user';
import { validateResendOtp, validateSignup, validateVerifyOTP } from '../middleware/validations/signup';
import { validateLogin } from '../middleware/validations/login';
import { injectedCategoryController } from '../../infrastructure/di/category';


export class authRoute {
   public authRoute: Router;
   constructor() {
      this.authRoute = Router();
      this.setRoute();
   }
   private setRoute() {
      this.authRoute.post(
         '/signup',
         validateSignup,
         injectedSignupController.signupUser
      );
      this.authRoute.post(
         '/verify-otp',
         validateVerifyOTP,
         injectedSignupController.verifyUserOtp
      );
      this.authRoute.post(
         '/resend-otp',
         validateResendOtp,
         injectedSignupController.resendUserOtp
      );
      this.authRoute.post(
         '/login',
         validateLogin,
         injectLoginController.loginUser
      );
      this.authRoute.post(
         '/refreshToken',
         injectLoginController.handleRefreshToken
      );
      this.authRoute.post(
         '/logout',
         injectLoginController.logoutHandler
      );
      //get all category for select preference for user
      this.authRoute.get(
         '/category',
         injectedCategoryController.listAllCategory
      );

   }
}
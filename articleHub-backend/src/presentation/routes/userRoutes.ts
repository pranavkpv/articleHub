import { Router } from 'express';
import { injectedUserController } from '../../infrastructure/di/user';
import { validatEditProfile, validatePassword } from '../middleware/validations/user';


export class userRoute {
   public userRoute: Router;
   constructor() {
      this.userRoute = Router();
      this.setRoute();
   }
   private setRoute() {
      this.userRoute.put(
         '/edit-profile',
         validatEditProfile,
         injectedUserController.editProfile
      );
      this.userRoute.patch(
         '/edit-password',
         validatePassword,
         injectedUserController.editPassword
      );
      this.userRoute.get(
         '/profile',
         injectedUserController.getProfile
      );
   }
}
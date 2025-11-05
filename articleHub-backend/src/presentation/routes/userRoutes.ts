import { Router } from 'express';
import { injectedUserController } from '../../infrastructure/di/user';


export class userRoute {
   public userRoute: Router;
   constructor() {
      this.userRoute = Router();
      this.setRoute();
   }
   private setRoute() {
      this.userRoute.put(
         '/edit-profile',
         injectedUserController.editProfile
      );
      this.userRoute.patch(
         '/edit-password',
         injectedUserController.editPassword
      );
   }
}
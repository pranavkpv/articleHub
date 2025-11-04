import { Router } from 'express';
import { injectedEventController } from '../../infrastructure/di/event';
import { userMiddleware } from '../middleware/authentication/userAuth';
import { Token } from '../../application/services/implementation/Token';


const jwtService = new Token();

export class userRoute {
   public userRoute: Router;
   constructor() {
      this.userRoute = Router();
      this.setRoute();
   }
   private setRoute() {
      this.userRoute.get(
         '/event',
         userMiddleware(jwtService

         ),
         injectedEventController.fetchUserEvent
      );
      this.userRoute.patch(
         '/book-event/:id',
         userMiddleware(jwtService),
         injectedEventController.bookEvent
      );
      this.userRoute.get(
         '/usersevent',
         userMiddleware(jwtService),
         injectedEventController.usersEventFetch
      );
   }
}
import { Router } from 'express';
import { injectedEventController } from '../../infrastructure/di/event';
import { volunteerMiddleware } from '../middleware/authentication/volunteerAuth';
import { Token } from '../../application/services/implementation/Token';


const jwtService = new Token();

export class volunteerRoute {
   public volunteerRoute: Router;
   constructor() {
      this.volunteerRoute = Router();
      this.setRoute();
   }
   private setRoute() {
      this.volunteerRoute.post(
         '/attendance',
         volunteerMiddleware(jwtService),
         injectedEventController.takeAttendance
      );
      this.volunteerRoute.get(
         '/event',
         volunteerMiddleware(jwtService),
         injectedEventController.fetchVolunteerEvent
      );
      this.volunteerRoute.post(
         '/food',
         volunteerMiddleware(jwtService),
         injectedEventController.markAteFood
      );
   }
}
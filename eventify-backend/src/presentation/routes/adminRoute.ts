import { Router } from 'express';
import { validateSaveEvent } from '../middleware/validations/event';
import { injectedEventController } from '../../infrastructure/di/event';
import { injectVolunteerController } from '../../infrastructure/di/volunteer';
import { Token } from '../../application/services/implementation/Token';
import { adminMiddleware } from '../middleware/authentication/adminAuth';
import { validateSaveVolunteer } from '../middleware/validations/volunteer';



export class adminRoute {
   public adminRoute: Router;
   constructor() {
      this.adminRoute = Router();
      this.setRoute();
   }
   private setRoute() {
      const jwtService = new Token();
      this.adminRoute.use(adminMiddleware(jwtService))
      this.adminRoute.post(
         '/add-event',
         validateSaveEvent,
         injectedEventController.saveEvent
      );
      this.adminRoute.get(
         '/event',
         injectedEventController.fetchAdminEvent
      );
      this.adminRoute.post(
         '/add-volunteer',
         validateSaveVolunteer,
         injectVolunteerController.addVolunteer
      );
      this.adminRoute.get(
         '/volunteer',
         injectVolunteerController.getVolunteerList
      );
      this.adminRoute.get(
         '/volunteer-list',
         injectVolunteerController.getAllVolunteer
      );
      this.adminRoute.post(
         '/volunteer-add-event',
         injectVolunteerController.assignVolunteerToEvent
      );
      this.adminRoute.patch(
         '/event/:id',
         injectedEventController.deleteEvent
      );
      this.adminRoute.patch(
         '/volunteer/:id',
         injectVolunteerController.deleteVolunteer
      );
      this.adminRoute.put(
         '/event/:id',
         injectedEventController.editEvent
      );
      this.adminRoute.put(
         '/volunteer/:id',
         injectVolunteerController.editVolunteer
      );
   }
}
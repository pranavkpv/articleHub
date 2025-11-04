import { Request, Response, NextFunction } from "express";

export interface IEventController {
   saveEvent(req: Request, res: Response, next: NextFunction):
      Promise<void>

   fetchAdminEvent(req: Request, res: Response, next: NextFunction):
      Promise<void>

   fetchUserEvent(req: Request, res: Response, next: NextFunction):
      Promise<void>

   bookEvent(req: Request, res: Response, next: NextFunction):
      Promise<void>

   takeAttendance(req: Request, res: Response, next: NextFunction):
      Promise<void>

   fetchVolunteerEvent(req: Request, res: Response, next: NextFunction):
      Promise<void>

   markAteFood(req: Request, res: Response, next: NextFunction):
      Promise<void>
   
   deleteEvent(req: Request, res: Response, next: NextFunction):
      Promise<void>

   editEvent(req: Request, res: Response, next: NextFunction):
      Promise<void>

   usersEventFetch(req: Request, res: Response, next: NextFunction):
      Promise<void>
}
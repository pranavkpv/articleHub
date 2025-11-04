import { Request,Response,NextFunction } from "express";

export interface IVounteerController {
   addVolunteer(req: Request, res: Response, next: NextFunction):
      Promise<void>

   getVolunteerList(req: Request, res: Response, next: NextFunction):
      Promise<void>
   
   getAllVolunteer(req: Request, res: Response, next: NextFunction):
      Promise<void>

   assignVolunteerToEvent(req: Request, res: Response, next: NextFunction):
      Promise<void>
      
   deleteVolunteer(req: Request, res: Response, next: NextFunction):
      Promise<void>
   
   editVolunteer(req: Request, res: Response, next: NextFunction):
      Promise<void>
}
import { Request, Response, NextFunction } from "express";
import { IEventController } from "../interface/IEvent.cotroller";
import { ISaveEventUseCase } from "../../../application/usecases/interface/ISaveEventUseCase";
import { FileArray, UploadedFile } from "express-fileupload";
import cloudinary from "../../../application/config/cloudinary";
import { IGetAdminEventUseCase } from "../../../application/usecases/interface/IGetAdminEventUseCase";
import { IGetUserEventUseCase } from "../../../application/usecases/interface/IGetUserEventUseCase";
import { IBookEventUseCase } from "../../../application/usecases/interface/IBookEventUseCase";
import { IToken } from "../../../application/services/interface/IToken";
import { ITakeAttendanceUseCase } from "../../../application/usecases/interface/ITakeAttendanceUseCase";
import { IGetVolunteerEventUseCase } from "../../../application/usecases/interface/IGetVolunteerEventUseCase";
import { IMarkFoodAteUseCase } from "../../../application/usecases/interface/IMarkFoodAteUseCase";
import { IDeleteEventUseCase } from "../../../application/usecases/interface/IDeleteEventUseCase";
import { IUpdateEventUseCase } from "../../../application/usecases/interface/IUpdateEventUseCase";
import { IGetUserBaseEventUseCase } from "../../../application/usecases/interface/IGetUserBaseEventUseCase";

export class EventController implements IEventController {
   constructor(
      private _saveEventUseCase: ISaveEventUseCase,
      private _getAdminEventUseCase: IGetAdminEventUseCase,
      private _getUserEventUseCase: IGetUserEventUseCase,
      private _bookEventUsecase: IBookEventUseCase,
      private _tokenservice: IToken,
      private _takeAttendanceUsecase: ITakeAttendanceUseCase,
      private _getVolunteerEventUseCase: IGetVolunteerEventUseCase,
      private _markFoodAteUseCase: IMarkFoodAteUseCase,
      private _deleteEventUsecase: IDeleteEventUseCase,
      private _updateEventUseCase: IUpdateEventUseCase,
      private _getUserBaseEventUseCase:IGetUserBaseEventUseCase
   ) { }
   saveEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         let { event_name, start_date, end_date, location, description, rewards, hosted_by, guests, meal_count, max_tickets } = req.body
         rewards = JSON.parse(rewards);
         guests = JSON.parse(guests);
         const files = req.files as FileArray;
         const file = files?.file as UploadedFile | undefined;
         if (!file || Array.isArray(file)) return;
         const uploadResult = await cloudinary.uploader.upload(file.tempFilePath, { folder: 'eventify' });
         const response = await this._saveEventUseCase.execute({ event_name, start_date, end_date, location, description, rewards, hosted_by, guests, meal_count, max_tickets, image: uploadResult.secure_url })
         res.status(response.status).json({ success: response.success, message: response.message })
      } catch (error) {
         next(error)
      }
   }
   fetchAdminEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         req.body
         const event = await this._getAdminEventUseCase.execute()
         res.status(event.status).json({ success: event.success, message: event.message, data: event.data })
      } catch (error) {
         next(error)
      }
   }
   fetchUserEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         req.body
         const event = await this._getUserEventUseCase.execute()
         res.status(event.status).json({ success: event.success, message: event.message, data: event.data })
      } catch (error) {
         next(error)
      }
   }
   bookEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const event = req.params.id
         if (!event) return
         const userHeader = req.headers.authorization;
         const accessToken = userHeader?.split(' ')[1];
         if (!accessToken) return
         const payload = await this._tokenservice.verifyAccessToken(accessToken);
         if (!payload) return
         const response = await this._bookEventUsecase.execute(String(event), String(payload._id))
         res.status(response.status).json({ success: response.success, message: response.message })
      } catch (error) {
         next(error)
      }
   }
   takeAttendance = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const data = req.body.result
         const response = await this._takeAttendanceUsecase.execute(data)
         res.status(response.status).json({ success: response.success, message: response.message })
      } catch (error) {
         next(error)
      }
   }
   fetchVolunteerEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const userHeader = req.headers.authorization;
         const accessToken = userHeader?.split(' ')[1];
         if (!accessToken) return
         const payload = await this._tokenservice.verifyAccessToken(accessToken);
         if (!payload) return
         const event = await this._getVolunteerEventUseCase.execute(payload._id)
         res.status(event.status).json({ success: event.success, message: event.message, data: event.data })
      } catch (error) {
         next(error)
      }
   }
   markAteFood = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const data = req.body.result
         const response = await this._markFoodAteUseCase.execute(data)
         res.status(response.status).json({ success: response.success, message: response.message })
      } catch (error) {
         next(error)
      }
   }
   deleteEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const event = req.params.id
         const response = await this._deleteEventUsecase.execute(String(event))
         res.status(response.status).json({ success: response.success, message: response.message })
      } catch (error) {
         next(error)
      }
   }
   editEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const eventId = req.params.id
         let { event_name, start_date, end_date, location, description, rewards, hosted_by, guests, meal_count, max_tickets } = req.body
         const files = req.files as FileArray;
         const file = files?.file as UploadedFile | undefined;
         if (!file || Array.isArray(file)) {
            const response = await this._updateEventUseCase.execute({
               _id: String(eventId), event_name, start_date, end_date, location, description, rewards, guests, hosted_by, meal_count: Number(meal_count), max_tickets: Number(max_tickets), image: '',
               delete_status: false, judges: [], participants: [], volunteers: []
            })
            res.status(response.status).json({ success: response.success, message: response.message })
            return
         };
         const uploadResult = await cloudinary.uploader.upload(file.tempFilePath, { folder: 'eventify' });
         rewards = JSON.parse(rewards);
         guests = JSON.parse(guests);
         const response = await this._updateEventUseCase.execute({
            _id: String(eventId), event_name, start_date, end_date, location, description, rewards, guests, hosted_by, meal_count: Number(meal_count), max_tickets: Number(max_tickets), image: uploadResult.secure_url,
            delete_status: false, judges: [], participants: [], volunteers: []
         })
         res.status(response.status).json({ success: response.success, message: response.message })
      } catch (error) {
         next(error)
      }
   }
   usersEventFetch = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const userHeader = req.headers.authorization;
         const accessToken = userHeader?.split(' ')[1];
         if (!accessToken) return
         const payload = await this._tokenservice.verifyAccessToken(accessToken);
         if (!payload) return 
         const event = await this._getUserBaseEventUseCase.execute(payload._id)
         res.status(event.status).json({ success: event.success, message: event.message, data: event.data })
      } catch (error) {
         next(error)
      }
   }
}
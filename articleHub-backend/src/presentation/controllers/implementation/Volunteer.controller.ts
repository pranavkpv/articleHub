import { Request, Response, NextFunction } from "express";
import { IVounteerController } from "../interface/IVolunteer.controller";
import { IAddVolunteerUseCase } from "../../../application/usecases/interface/IAddVolunteerUseCase";
import { IGetVolunteerListUsecase } from "../../../application/usecases/interface/IGetVolunteerListUsecase";
import { IGetAllVolunteerUseCase } from "../../../application/usecases/interface/IGetAllVolunteerUseCase";
import { IAssignVolunteerToEventUsecase } from "../../../application/usecases/interface/IAssignVolunteerToEventUsecase";
import { IDeleteVolunteerUseCase } from "../../../application/usecases/interface/IDeleteVolunteerUseCase";
import { IEditVolunteerUseCase } from "../../../application/usecases/interface/IEditVolunteerUseCase";

export class VolunteerController implements IVounteerController {
   constructor(
      private _addVolunteerUseCase: IAddVolunteerUseCase,
      private _getVolunteerListUseCase: IGetVolunteerListUsecase,
      private _getAllVolunteerUseCase: IGetAllVolunteerUseCase,
      private _assignVolunteerToEvent: IAssignVolunteerToEventUsecase,
      private _deleteVolunteerUseCase: IDeleteVolunteerUseCase,
      private _editVolunteerUsecase: IEditVolunteerUseCase
   ) { }
   addVolunteer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const response = await this._addVolunteerUseCase.execute(req.body)
         res.status(response.status).json({ success: response.success, message: response.message })
      } catch (error) {
         next(error)
      }
   }
   getVolunteerList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const search = req.query.search
         const page = req.query.page
         const response = await this._getVolunteerListUseCase.execute({ search: String(search), page: Number(page) })
         res.status(response.status).json({ success: response.success, message: response.message, data: response.data, total: response.total })
      } catch (error) {
         next(error)
      }
   }
   assignVolunteerToEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const response = await this._assignVolunteerToEvent.execute(req.body)
         res.status(response.status).json({ success: response.success, message: response.message })
      } catch (error) {
         next(error)
      }
   }
   getAllVolunteer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         req.body
         const response = await this._getAllVolunteerUseCase.execute()
         res.status(response.status).json({ success: response.success, message: response.message, data: response.data })
      } catch (error) {
         next(error)
      }
   }
   deleteVolunteer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const id = req.params.id
         const response = await this._deleteVolunteerUseCase.execute(String(id))
         res.status(response.status).json({ success: response.success, message: response.message })
      } catch (error) {
         next(error)
      }
   }
   editVolunteer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const id = req.params.id
         const response = await this._editVolunteerUsecase.execute({_id:String(id),...req.body})
         res.status(response.status).json({ success: response.success, message: response.message })
      } catch (error) {
         next(error)
      }
   }
}
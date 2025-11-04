import { addEventData } from "../../../domain/entities/event";
import { commonOutput } from "../../../domain/entities/output";
import { event } from "../../../domain/shared/messages/event";
import { HTTP_STATUS } from "../../../domain/shared/Status";
import { IEventRepository } from "../../../infrastructure/repositories/interface/IEventRepository";
import { ISaveEventUseCase } from "../interface/ISaveEventUseCase";

export class SaveEventUsecase implements ISaveEventUseCase {
   constructor(
      private _eventRepository: IEventRepository
   ) { }
   async execute(data: addEventData): Promise<commonOutput> {
      const existEvent = await this._eventRepository.findEventBynameHostLocStart(data)
      if(existEvent){
         return {
            success: false,
            status: HTTP_STATUS.CONFLICT,
            message: event.add_already
         }
      }
      const saveEvent = await this._eventRepository.saveEvent(data)
      if (!saveEvent) {
         return {
            success: false,
            status: HTTP_STATUS.CONFLICT,
            message: event.error
         }
      }
      return {
         success: true,
         status: HTTP_STATUS.CREATED,
         message: event.success
      }
   }
}
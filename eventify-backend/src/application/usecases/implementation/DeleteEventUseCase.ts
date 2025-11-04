import { commonOutput } from "../../../domain/entities/output";
import { event } from "../../../domain/shared/messages/event";
import { HTTP_STATUS } from "../../../domain/shared/Status";
import { IEventRepository } from "../../../infrastructure/repositories/interface/IEventRepository";
import { IDeleteEventUseCase } from "../interface/IDeleteEventUseCase";

export class DeleteEventUseCase implements IDeleteEventUseCase {
   constructor(
      private _eventRepository: IEventRepository
   ) { }
   async execute(eventdata: string): Promise<commonOutput> {
      const existEvent = await this._eventRepository.findEventById(eventdata)
      if (!existEvent) {
         return {
            message: event.error,
            status: HTTP_STATUS.OK,
            success: false
         }
      }
      if (existEvent?.volunteers.length > 0) {
         return {
            message: event.add_volunteer,
            status: HTTP_STATUS.CONFLICT,
            success: false
         }
      }
      if (existEvent.participants.length > 0) {
         return {
            message: event.add_volunteer,
            status: HTTP_STATUS.CONFLICT,
            success: false
         }
      }
      if (new Date(existEvent?.start_date) <= new Date()) {
         return {
            message: event.already_complete,
            status: HTTP_STATUS.OK,
            success: false
         }
      }
      const deleteEvent = await this._eventRepository.UpdateDeleteStatus(eventdata)
      if (!deleteEvent) {
         return {
            message: event.error,
            status: HTTP_STATUS.OK,
            success: false
         }
      }
      return {
         message: event.delete,
         status: HTTP_STATUS.OK,
         success: true
      }

   }
}
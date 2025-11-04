import { commonOutput } from "../../../domain/entities/output";
import { event } from "../../../domain/shared/messages/event";
import { HTTP_STATUS } from "../../../domain/shared/Status";
import { IEventModelEntity } from "../../../infrastructure/db/interface/event";
import { IEventRepository } from "../../../infrastructure/repositories/interface/IEventRepository";
import { IUpdateEventUseCase } from "../interface/IUpdateEventUseCase";

export class UpdateEventUseCase implements IUpdateEventUseCase {
   constructor(
      private _eventRepository: IEventRepository
   ) { }
   async execute(data: IEventModelEntity): Promise<commonOutput> {
      const existEvent = await this._eventRepository.findEditEventExist(data)
      if (existEvent) {
         return {
            success: false,
            status: HTTP_STATUS.CONFLICT,
            message: event.add_already
         }
      }
      const eventData = await this._eventRepository.findEventById(data._id)
      if (!eventData) {
         return {
            message: event.error,
            status: HTTP_STATUS.BAD_REQUEST,
            success: false
         }
      }
      if (eventData?.volunteers.length > 0) {
         return {
            message: event.add_volunteer,
            status: HTTP_STATUS.CONFLICT,
            success: false
         }
      }
      if (eventData.participants.length > 0) {
         return {
            message: event.add_volunteer,
            status: HTTP_STATUS.CONFLICT,
            success: false
         }
      }
      if (new Date(eventData?.start_date) <= new Date()) {
         return {
            message: event.already_complete,
            status: HTTP_STATUS.OK,
            success: false
         }
      }
      await this._eventRepository.updateEventById(data)
      return {
         message: event.update,
         status: HTTP_STATUS.OK,
         success: true
      }
   }
}
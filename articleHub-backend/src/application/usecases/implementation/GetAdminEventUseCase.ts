import { adminEventOutput } from "../../../domain/entities/output";
import { event } from "../../../domain/shared/messages/event";
import { HTTP_STATUS } from "../../../domain/shared/Status";
import { IEventRepository } from "../../../infrastructure/repositories/interface/IEventRepository";
import { IEventMapper } from "../../../presentation/mapper/interface/IEventmapper";
import { IGetAdminEventUseCase } from "../interface/IGetAdminEventUseCase";

export class GetAdminEventUseCase implements IGetAdminEventUseCase {
   constructor(
      private _eventRepository: IEventRepository,
      private _eventmapper: IEventMapper
   ) { }
   async execute(): Promise<adminEventOutput> {
      const eventData = await this._eventRepository.findAllEvents()
      const mappedData = await this._eventmapper.toAdminEventDto(eventData)
      return {
         data: mappedData,
         message: event.fetch,
         status: HTTP_STATUS.OK,
         success: true
      }
   }
}
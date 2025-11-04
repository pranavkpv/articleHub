import { userEventOutput } from "../../../domain/entities/output";
import { event } from "../../../domain/shared/messages/event";
import { HTTP_STATUS } from "../../../domain/shared/Status";
import { IEventRepository } from "../../../infrastructure/repositories/interface/IEventRepository";
import { IEventMapper } from "../../../presentation/mapper/interface/IEventmapper";
import { IGetUserEventUseCase } from "../interface/IGetUserEventUseCase";

export class GetUserEventUseCase implements IGetUserEventUseCase {
   constructor(
      private _eventRepository: IEventRepository,
      private _eventmapper: IEventMapper
   ) { }
   async execute(): Promise<userEventOutput> {
      const eventData = await this._eventRepository.findAllEvents()
      const mappedData = this._eventmapper.toUserEventDto(eventData)
      return {
         data: mappedData,
         message: event.fetch,
         status: HTTP_STATUS.OK,
         success: true
      }
   }
}
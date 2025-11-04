import { userEventOutput } from "../../../domain/entities/output";
import { event } from "../../../domain/shared/messages/event";
import { HTTP_STATUS } from "../../../domain/shared/Status";
import { IEventRepository } from "../../../infrastructure/repositories/interface/IEventRepository";
import { IEventMapper } from "../../../presentation/mapper/interface/IEventmapper";
import { IGetUserBaseEventUseCase } from "../interface/IGetUserBaseEventUseCase";

export class GetUserBaseEventUseCase implements IGetUserBaseEventUseCase {
   constructor(
      private _eventRepository: IEventRepository,
      private _eventmapper: IEventMapper
   ) { }
   async execute(id: string): Promise<userEventOutput> {
      const eventData = await this._eventRepository.findEventByParticipant(id)
      const mappedData = this._eventmapper.toUserEventDto(eventData)
      return {
         data: mappedData,
         message: event.fetch,
         status: HTTP_STATUS.OK,
         success: true
      }
   }
}
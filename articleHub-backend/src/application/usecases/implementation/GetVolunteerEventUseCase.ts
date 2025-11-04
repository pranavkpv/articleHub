import { userEventOutput } from "../../../domain/entities/output";
import { event } from "../../../domain/shared/messages/event";
import { HTTP_STATUS } from "../../../domain/shared/Status";
import { IEventRepository } from "../../../infrastructure/repositories/interface/IEventRepository";
import { IEventMapper } from "../../../presentation/mapper/interface/IEventmapper";
import { IGetVolunteerEventUseCase } from "../interface/IGetVolunteerEventUseCase";

export class GetVolunteerEventUseCase implements IGetVolunteerEventUseCase {
   constructor(
      private _eventRepository: IEventRepository,
      private _eventmapper: IEventMapper
   ) { }
   async execute(id: string): Promise<userEventOutput> {
      const volunteersEvent = await this._eventRepository.findEventByVolunteerId(id)
      const mappedData = this._eventmapper.toUserEventDto(volunteersEvent)
      return {
         data: mappedData,
         message: event.fetch,
         status: HTTP_STATUS.OK,
         success: true
      }
   }
}
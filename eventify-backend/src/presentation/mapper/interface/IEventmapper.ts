import { adminEventDto, userEventDto } from "../../../application/dtos/event";
import { IEventModelEntity } from "../../../infrastructure/db/interface/event";

export interface IEventMapper {
   toAdminEventDto(data: IEventModelEntity[]): Promise<adminEventDto[]>
   toUserEventDto(data: IEventModelEntity[]):userEventDto[]
}
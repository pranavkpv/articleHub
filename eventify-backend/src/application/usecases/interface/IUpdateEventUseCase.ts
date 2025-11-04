import { commonOutput } from "../../../domain/entities/output";
import { IEventModelEntity } from "../../../infrastructure/db/interface/event";

export interface IUpdateEventUseCase {
   execute(data:IEventModelEntity):Promise<commonOutput>
}
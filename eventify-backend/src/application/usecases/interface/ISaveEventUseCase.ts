import { addEventData } from "../../../domain/entities/event";
import { commonOutput } from "../../../domain/entities/output";

export interface ISaveEventUseCase {
   execute(data: addEventData): Promise<commonOutput>
}
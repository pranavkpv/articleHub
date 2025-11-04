import { commonOutput } from "../../../domain/entities/output";

export interface IDeleteEventUseCase {
   execute(eventdata: string): Promise<commonOutput>
}
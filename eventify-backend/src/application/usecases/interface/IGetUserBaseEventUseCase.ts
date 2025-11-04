import { userEventOutput } from "../../../domain/entities/output";

export interface IGetUserBaseEventUseCase {
   execute(id: string): Promise<userEventOutput>
}
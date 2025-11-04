import { userEventOutput } from "../../../domain/entities/output";

export interface IGetUserEventUseCase {
   execute():Promise<userEventOutput>
}
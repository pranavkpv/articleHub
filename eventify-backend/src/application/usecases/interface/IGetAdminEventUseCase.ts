import { adminEventOutput } from "../../../domain/entities/output";

export interface IGetAdminEventUseCase {
   execute():Promise<adminEventOutput>
}
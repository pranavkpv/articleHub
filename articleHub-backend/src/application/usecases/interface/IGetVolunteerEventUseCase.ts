import { userEventOutput } from "../../../domain/entities/output";

export interface IGetVolunteerEventUseCase {
   execute(id: string): Promise<userEventOutput>
}
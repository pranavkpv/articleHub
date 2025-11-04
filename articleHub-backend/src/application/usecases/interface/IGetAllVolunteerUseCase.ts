import { listVoluntResponse } from "../../../domain/entities/volunteer";

export interface IGetAllVolunteerUseCase {
   execute(): Promise<listVoluntResponse>
}
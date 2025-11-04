import { commonOutput } from "../../../domain/entities/output";
import { editVolunteerData } from "../../../domain/entities/volunteer";

export interface IEditVolunteerUseCase {
   execute(data:editVolunteerData):Promise<commonOutput>
}
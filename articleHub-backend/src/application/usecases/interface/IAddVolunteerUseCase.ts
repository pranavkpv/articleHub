import { commonOutput } from "../../../domain/entities/output";
import { addVolunteerData } from "../../../domain/entities/volunteer";

export interface IAddVolunteerUseCase {
   execute(data: addVolunteerData): Promise<commonOutput>
}
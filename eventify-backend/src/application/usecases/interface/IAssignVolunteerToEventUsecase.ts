import { commonOutput } from "../../../domain/entities/output";
import { assignVolunteerInput } from "../../../domain/entities/volunteer";

export interface IAssignVolunteerToEventUsecase{
   execute(input:assignVolunteerInput):Promise<commonOutput>
}
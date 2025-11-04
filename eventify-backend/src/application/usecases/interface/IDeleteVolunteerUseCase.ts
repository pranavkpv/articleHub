import { commonOutput } from "../../../domain/entities/output";

export interface IDeleteVolunteerUseCase {
   execute(id:string):Promise<commonOutput>
}
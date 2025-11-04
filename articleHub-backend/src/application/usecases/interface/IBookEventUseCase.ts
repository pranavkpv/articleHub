import { commonOutput } from "../../../domain/entities/output";

export interface IBookEventUseCase {
   execute(event:string,user:string):Promise<commonOutput>
}
import { commonOutput } from "../../../domain/entities/common";


export interface IUpdateTemporarUserDataUseCase {
   execute(email:string ): Promise<commonOutput>
}
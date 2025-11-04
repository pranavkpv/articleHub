import { commonOutput } from "../../../domain/entities/output";

export interface IUpdateTemporarUserDataUseCase {
   execute(email:string ): Promise<commonOutput>
}
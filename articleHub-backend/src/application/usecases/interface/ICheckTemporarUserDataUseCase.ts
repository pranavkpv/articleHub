import { commonOutput } from "../../../domain/entities/output";
import { verifyOtpData } from "../../../domain/entities/user";

export interface ICheckTemporarUserDataUseCase {
   execute(data: verifyOtpData): Promise<commonOutput>
}
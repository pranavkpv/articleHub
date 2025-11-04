import { commonOutput } from "../../../domain/entities/common";
import { verifyOtpData } from "../../../domain/entities/user";

export interface ICheckTemporarUserDataUseCase {
   execute(data: verifyOtpData): Promise<commonOutput>
}
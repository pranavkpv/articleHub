
import { commonOutput } from "../../../domain/entities/common";
import { signupData } from "../../../domain/entities/user";

export interface ISaveUserDataTemporarilyUseCase {
   execute(userData: signupData): Promise<commonOutput>
}
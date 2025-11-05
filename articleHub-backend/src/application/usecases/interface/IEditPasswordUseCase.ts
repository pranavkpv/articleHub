import { commonOutput } from "../../../domain/entities/common";
import { editPassword } from "../../../domain/entities/user";

export interface IEditPasswordUseCase {
   execute(data: editPassword): Promise<commonOutput>
}
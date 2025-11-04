import { loginOutput } from "../../../domain/entities/output";
import { loginData } from "../../../domain/entities/user";

export interface ILoginUserUseCase {
   execute(data: loginData): Promise<loginOutput>
}
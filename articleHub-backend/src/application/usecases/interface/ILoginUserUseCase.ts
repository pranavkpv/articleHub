
import { loginData, loginOutput } from "../../../domain/entities/user";

export interface ILoginUserUseCase {
   execute(data: loginData): Promise<loginOutput>
}
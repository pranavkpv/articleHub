import { commonOutput } from "../../../domain/entities/common";
import { getuserProfileData } from "../../../domain/entities/user";

export interface IEditProfileUseCase {
   execute(data:getuserProfileData):Promise<commonOutput>
}
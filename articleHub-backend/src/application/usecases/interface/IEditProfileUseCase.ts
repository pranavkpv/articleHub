import { commonOutput } from "../../../domain/entities/common";
import { IUserModelEntity } from "../../../infrastructure/db/interface/user";

export interface IEditProfileUseCase {
   execute(data:IUserModelEntity):Promise<commonOutput>
}
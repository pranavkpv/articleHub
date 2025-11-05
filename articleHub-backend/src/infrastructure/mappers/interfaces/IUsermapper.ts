import { getuserProfileData } from "../../../domain/entities/user";
import { IUserModelEntity } from "../../db/interface/user";

export interface IUserMapper {
   toProfileDTO(user:IUserModelEntity):getuserProfileData
}
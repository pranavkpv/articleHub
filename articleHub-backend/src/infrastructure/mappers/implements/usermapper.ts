import { getuserProfileData } from "../../../domain/entities/user";
import { IUserModelEntity } from "../../db/interface/user";
import { IUserMapper } from "../interfaces/Iusermapper";

export class UserMapper implements IUserMapper {
   toProfileDTO(user: IUserModelEntity): getuserProfileData {
      return {
         _id: user._id,
         DOB: user.DOB,
         email: user.email,
         firstname: user.firstname,
         lastname: user.lastname,
         phone: user.phone,
         preferences: user.preferences,
         image: user.image
      }
   }
}
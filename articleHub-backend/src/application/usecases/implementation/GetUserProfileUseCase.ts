import { getuserProfileData } from "../../../domain/entities/user";
import { IUserMapper } from "../../../infrastructure/mappers/interfaces/Iusermapper";
import { IUserRepository } from "../../../infrastructure/repositories/interface/IUserRepository";
import { IGetUserProfileUsecase } from "../interface/IGetUserProfileUsecase";

export class GetUserProfileUsecase implements IGetUserProfileUsecase {
   constructor(
      private _userRepository: IUserRepository,
      private _usermapper: IUserMapper
   ) { }
   async execute(id: string): Promise<getuserProfileData> {
      const user = await this._userRepository.findUserById(id)
      if (!user) {
         return {
            _id: '', DOB: new Date(), email: '', firstname: '', image: '', lastname: '', phone: '', preferences: []
         }
      }
      const mappedUser = this._usermapper.toProfileDTO(user)
      return mappedUser
   }
}
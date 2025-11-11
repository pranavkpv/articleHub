import { commonOutput } from "../../../domain/entities/common";
import { getuserProfileData } from "../../../domain/entities/user";
import { HTTP_STATUS } from "../../../domain/shared/Status";
import { IUserRepository } from "../../../infrastructure/repositories/interface/IUserRepository";
import { IEditProfileUseCase } from "../interface/IEditProfileUseCase";

export class EditProfileUseCase implements IEditProfileUseCase {
   constructor(
      private _userRepository: IUserRepository
   ) { }
   async execute(data: getuserProfileData): Promise<commonOutput> {
      await this._userRepository.updateUser(data)
      return {
         message: 'profile updated',
         status: HTTP_STATUS.OK,
         success: true
      }
   }
}
import { commonOutput } from "../../../domain/entities/common";
import { editPassword } from "../../../domain/entities/user";
import { HTTP_STATUS } from "../../../domain/shared/Status";
import { IUserRepository } from "../../../infrastructure/repositories/interface/IUserRepository";
import { IHasher } from "../../services/interface/IHasher";
import { IEditPasswordUseCase } from "../interface/IEditPasswordUseCase";

export class EditPasswordUseCase implements IEditPasswordUseCase {
   constructor(
      private _userRepository: IUserRepository,
      private _hasher: IHasher
   ) { }
   async execute(data: editPassword): Promise<commonOutput> {
      let userById = await this._userRepository.findUserById(data._id)
      if (!userById) {
         return {
            message: 'user not exist',
            status: HTTP_STATUS.CONFLICT,
            success: false
         }
      }
      const checkpassword = await this._hasher.compare(data.currentpassword, userById.password)
      if (!checkpassword) {
         return {
            message: 'enter current password is wrong',
            status: HTTP_STATUS.CONFLICT,
            success: false
         }
      }
      const hashedPassword = await this._hasher.hash(data.newpassword)
      await this._userRepository.updatepassword({ _id: data._id, password: hashedPassword })
      return {
         message: 'password updated success',
         status: HTTP_STATUS.OK,
         success: true
      }
   }
}
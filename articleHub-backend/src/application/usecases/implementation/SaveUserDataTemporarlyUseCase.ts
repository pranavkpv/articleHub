import { commonOutput } from "../../../domain/entities/common";
import { signupData } from "../../../domain/entities/user";
import { HTTP_STATUS } from "../../../domain/shared/Status";
import { IUserRepository } from "../../../infrastructure/repositories/interface/IUserRepository";
import { IHasher } from "../../services/interface/IHasher";
import { ISaveUserDataTemporarilyUseCase } from "../interface/ISaveUserDataTemporarilyUseCase";

export class SaveUserDataTemporarlyUseCase implements ISaveUserDataTemporarilyUseCase {
   constructor(
      private _userRepository: IUserRepository,
      private _hasher: IHasher
   ) { }
   async execute(userData: signupData): Promise<commonOutput> {
     userData.password = await this._hasher.hash(userData.password)
     const saveUser = await this._userRepository.registerUser(userData)
      if (!saveUser) {
         return {
            success: false,
            message: "signup failed",
            status: HTTP_STATUS.CONFLICT
         }
      }
      return {
         success: true,
         message: "signup success",
         status: HTTP_STATUS.CREATED
      }
   }
}
import { commonOutput } from "../../../domain/entities/common";
import { registerUserData, verifyOtpData } from "../../../domain/entities/user";
import { HTTP_STATUS } from "../../../domain/shared/Status";
import { IUserRepository } from "../../../infrastructure/repositories/interface/IUserRepository";
import { IHasher } from "../../services/interface/IHasher";
import { ICheckTemporarUserDataUseCase } from "../interface/ICheckTemporarUserDataUseCase";

export class CheckTemporarUserDataUseCase implements ICheckTemporarUserDataUseCase {
   constructor(
      private _userRepository: IUserRepository,
      private _hasher: IHasher
   ) { }
   async execute(data: verifyOtpData): Promise<commonOutput> {
      const TempuserByEmail = await this._userRepository.findTempUserByEmail(data.email)
      if (!TempuserByEmail) {
         return {
            success: false,
            message: "signup failed",
            status: HTTP_STATUS.CONFLICT
         }
      }
      if (TempuserByEmail.otp !== data.otp) {
         return {
            success: false,
            message: "wrong otp",
            status: HTTP_STATUS.CONFLICT
         }
      }
      const hashedPassword = await this._hasher.hash(TempuserByEmail.password);
      const userData: registerUserData = {
         email: TempuserByEmail.email,
         password: hashedPassword,
         phone: TempuserByEmail.phone,
         firstname: TempuserByEmail.firstname,
         lastname:TempuserByEmail.lastname,
         DOB:TempuserByEmail.DOB,
         preferences:TempuserByEmail.preference
      }
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
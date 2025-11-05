import { editPasswordRepo, registerUserData, resendOtpData, tempUserData } from "../../../domain/entities/user";
import { IUserModelEntity } from "../../db/interface/user";

export interface IUserRepository {
   saveUser(user: tempUserData): Promise<boolean>
   findTempUserByEmail(email: string): Promise<tempUserData | null>
   registerUser(data: registerUserData): Promise<boolean>
   updateTempUserOTP(data: resendOtpData): Promise<boolean>
   findUserByEmail(email: string): Promise<IUserModelEntity | null>
   findUserById(user:string):Promise<IUserModelEntity | null>
   findUserByEmailOrPhone(data:string):Promise<IUserModelEntity | null>
   updateUser(data:IUserModelEntity):Promise<void>
   updatepassword(data:editPasswordRepo):Promise<void>
}
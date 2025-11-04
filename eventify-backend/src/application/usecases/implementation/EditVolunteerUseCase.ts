import { commonOutput } from "../../../domain/entities/output";
import { editVolunteerData } from "../../../domain/entities/volunteer";
import { Email } from "../../../domain/shared/messages/email";
import { volunteer } from "../../../domain/shared/messages/volunteer";
import { HTTP_STATUS } from "../../../domain/shared/Status";
import { sendEmail } from "../../../domain/shared/utils/nodemailer";
import { IUserRepository } from "../../../infrastructure/repositories/interface/IUserRepository";
import { IVolunteerRepository } from "../../../infrastructure/repositories/interface/IVolunteerRepository";
import { IHasher } from "../../services/interface/IHasher";
import { IEditVolunteerUseCase } from "../interface/IEditVolunteerUseCase";

export class EditVolunteerUseCase implements IEditVolunteerUseCase {
   constructor(
      private _volunteerRepository: IVolunteerRepository,
      private _userRepository: IUserRepository,
      private _hasher: IHasher
   ) { }
   async execute(data: editVolunteerData): Promise<commonOutput> {
      const existUser = await this._userRepository.findUserByEmail(data.email)
      if(existUser){
         return {
            success: false,
            message: volunteer.exist,
            status: HTTP_STATUS.CONFLICT
         }
      }
      const existVolunteer = await this._volunteerRepository.findUserByEmailInEdit(data)
      if(existVolunteer){
         return {
            success: false,
            message: volunteer.exist,
            status: HTTP_STATUS.CONFLICT
         }
      }
      const password = await this._volunteerRepository.generateRandomPassword();
      console.log(password)
      const text = `Dear ${ data.username }, your temporary password for BuildERP is: ${ password }. Please log in using this password. For security reasons, it's recommended to change your password after logging in.`;
      const emailSend = await sendEmail(data.email, 'Login Password', text);
      const hashpassword = await this._hasher.hash(String(password));
      if (!emailSend) {
         return {
            success: false,
            message: Email.failSend,
            status: HTTP_STATUS.CONFLICT
         }
      }
      await this._volunteerRepository.updateVolunteer({ ...data, password: hashpassword })
      return {
         message: volunteer.update,
         status: HTTP_STATUS.OK,
         success: true
      }
   }
}
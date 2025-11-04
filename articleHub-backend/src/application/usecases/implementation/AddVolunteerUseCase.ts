import { commonOutput } from "../../../domain/entities/output";
import { addVolunteerData } from "../../../domain/entities/volunteer";
import { Email } from "../../../domain/shared/messages/email";
import { volunteer } from "../../../domain/shared/messages/volunteer";
import { HTTP_STATUS } from "../../../domain/shared/Status";
import { sendEmail } from "../../../domain/shared/utils/nodemailer";
import { IUserRepository } from "../../../infrastructure/repositories/interface/IUserRepository";
import { IVolunteerRepository } from "../../../infrastructure/repositories/interface/IVolunteerRepository";
import { IHasher } from "../../services/interface/IHasher";
import { IAddVolunteerUseCase } from "../interface/IAddVolunteerUseCase";

export class AddVolunteerUseCase implements IAddVolunteerUseCase {
   constructor(
      private _volunteerRepository: IVolunteerRepository,
      private _userRepository:IUserRepository,
      private _hasher: IHasher
   ) { }
   async execute(data: addVolunteerData): Promise<commonOutput> {
      const existUser = await this._userRepository.findUserByEmail(data.email)
      if(existUser){
         return {
            success: false,
            message: volunteer.exist,
            status: HTTP_STATUS.CONFLICT
         }
      }
      const existVolunteer = await this._volunteerRepository.findUserByEmail(data.email)
      if(existVolunteer){
         return {
            success: false,
            message: volunteer.exist,
            status: HTTP_STATUS.CONFLICT
         }
      }
      const password = await this._volunteerRepository.generateRandomPassword();
      console.log(password)
      const text = `Dear ${ data.username }, your temporary password for Eventify is: ${ password }. Please log in using this password. For security reasons, it's recommended to change your password after logging in.`;
      const emailSend = await sendEmail(data.email, 'Login Password', text);
      const hashpassword = await this._hasher.hash(String(password));
      if (!emailSend) {
         return {
            success: false,
            message: Email.failSend,
            status: HTTP_STATUS.CONFLICT
         }
      }
      const response = await this._volunteerRepository.saveVolunteer({...data,password:hashpassword})
      if (!response) {
         return {
            success: false,
            message: volunteer.failSave,
            status: HTTP_STATUS.CONFLICT
         }
      }
      return {
         success: true,
         message: volunteer.successSave,
         status: HTTP_STATUS.CREATED
      }
   }
}
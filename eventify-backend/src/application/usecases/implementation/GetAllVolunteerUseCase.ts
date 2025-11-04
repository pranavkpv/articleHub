import { listVoluntResponse } from "../../../domain/entities/volunteer";
import { volunteer } from "../../../domain/shared/messages/volunteer";
import { HTTP_STATUS } from "../../../domain/shared/Status";
import { IVolunteerRepository } from "../../../infrastructure/repositories/interface/IVolunteerRepository";
import { IGetAllVolunteerUseCase } from "../interface/IGetAllVolunteerUseCase";

export class GetAllVolunteerUseCase implements IGetAllVolunteerUseCase {
   constructor(
      private _volunteerRepository: IVolunteerRepository
   ) { }
   async execute(): Promise<listVoluntResponse> {
      const response = await this._volunteerRepository.findAllVolunteer()
      return {
         data:response,
         message:volunteer.fetchSuccess,
         status:HTTP_STATUS.OK,
         success:true
      }
   }
}